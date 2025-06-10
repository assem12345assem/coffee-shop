import type {
  Filter,
  Pagination,
  ProductInteface,
  SortField,
  SortOrder,
  SortValues,
  Subscriber,
} from '@/data/interfaces';
import { fetchAllProducts } from '@/api/products';
import { simplifyProducts } from '@/utils/productUtils';
import { fetchProductById } from '@/api/products';
import type { ProductProjection } from '@commercetools/platform-sdk';
import type { Category } from '@commercetools/platform-sdk';
import { categoryService } from '@/api/category/CategoryService';

class ProductService {
  private static instance: ProductService;
  private products: ProductInteface[] = [];
  private filteredProducts: ProductInteface[] = [];

  private searchTerm: string = '';
  private sortField: SortField | null = null;

  private sortOrder: SortOrder = 'asc';
  private filters: Filter = {};
  private pagination: Pagination = { offset: 0, limit: 10 };

  private subscribers: Set<Subscriber> = new Set();

  private constructor() {}

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public async loadProducts(): Promise<void> {
    const raw = await fetchAllProducts();
    const categories = await categoryService.getCategories();

    const categoryMap = new Map<string, Category>();
    categories.forEach((cat) => categoryMap.set(cat.id, cat));

    this.products = simplifyProducts(raw, categoryMap);
    this.applyAll();
  }

  public async getProductById(id: string): Promise<ProductProjection | null> {
    try {
      return await fetchProductById(id);
    } catch {
      return null;
    }
  }

  private applyAll() {
    this.filteredProducts = this.products
      .filter((p): boolean => this.applySearch(p))
      .filter((p): boolean => this.applyFilters(p))
      .sort((a, b): number => this.applySort(a, b));
    this.notifySubscribers();
  }

  private applySearch(product: ProductInteface): boolean {
    const term: string = this.searchTerm.toLowerCase();
    return product.name.toLowerCase().includes(term) || product.description.toLowerCase().includes(term);
  }

  private applyFilters(product: ProductInteface): boolean {
    const { category, isSale, type, priceMin, priceMax } = this.filters;

    const matchesCategory = category ? product.category?.key === category : true;
    const matchesSale = isSale !== undefined ? product.is_sale === isSale : true;
    const matchesType = type ? product.type === type : true;
    const matchesPriceMin = priceMin !== undefined ? product.price >= priceMin : true;
    const matchesPriceMax = priceMax !== undefined ? product.price <= priceMax : true;

    return matchesCategory && matchesSale && matchesType && matchesPriceMin && matchesPriceMax;
  }

  private applySort(a: ProductInteface, b: ProductInteface): number {
    if (!this.sortField) return 0;
    const order: SortValues = this.sortOrder === 'asc' ? 1 : -1;

    let aValue: string | number = a[this.sortField];
    let bValue: string | number = b[this.sortField];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue) * order;
    }

    return (aValue < bValue ? -1 : aValue > bValue ? 1 : 0) * order;
  }

  public setSearchTerm(term: string) {
    this.searchTerm = term;
    this.resetPagination();
    this.applyAll();
  }

  public setFilter(filters: Partial<Filter>) {
    this.filters = { ...this.filters, ...filters };
    this.resetPagination();
    this.applyAll();
  }

  public setSort(field: SortField | null, order: SortOrder | null = 'asc') {
    this.sortField = field;
    this.sortOrder = order ?? 'asc';
    this.resetPagination();
    this.applyAll();
  }

  public setPagination(offset: number, limit: number) {
    this.pagination = { offset, limit };
    this.notifySubscribers();
  }

  public getProducts(): ProductInteface[] {
    const { offset, limit } = this.pagination;
    return this.filteredProducts.slice(offset, offset + limit);
  }

  public getTotalCount(): number {
    return this.filteredProducts.length;
  }

  public subscribe(callback: Subscriber) {
    this.subscribers.add(callback);
  }

  public unsubscribe(callback: Subscriber) {
    this.subscribers.delete(callback);
  }

  private notifySubscribers() {
    this.subscribers.forEach((callback) => callback());
  }

  private resetPagination() {
    this.pagination = { offset: 0, limit: this.pagination.limit };
  }
}

export const productService = ProductService.getInstance();
