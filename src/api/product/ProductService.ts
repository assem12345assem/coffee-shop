import type {
  Filter,
  Pagination,
  ProductInteface,
  SortField,
  SortOrder,
  SortValues,
  Subscriber,
} from '@/data/interfaces';
import { CoffeeType } from '@/data/interfaces';
import { fetchAllProducts } from '@/api/products';
import { simplifyProducts } from '@/utils/productUtils';
import type { ProductPagedQueryResponse } from '@commercetools/platform-sdk';

class ProductService {
  private static instance: ProductService;
  private products: ProductInteface[] = [];
  private filteredProducts: ProductInteface[] = [];

  private searchTerm: string = '';
  private sortField: SortField = 'id';
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
    const raw: ProductPagedQueryResponse = await fetchAllProducts();
    this.products = simplifyProducts(raw);
    this.applyAll();
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
    const { category, isSale, type } = this.filters;

    return (
      (category ? product.category === category : true) &&
      (isSale !== undefined ? product.is_sale === isSale : true) &&
      (type ? product.type === CoffeeType[type as keyof typeof CoffeeType] : true)
    );
  }

  private applySort(a: ProductInteface, b: ProductInteface): number {
    const field: SortField = this.sortField;
    const order: SortValues = this.sortOrder === 'asc' ? 1 : -1;

    let aValue: string | number = a[field];
    let bValue: string | number = b[field];

    if (field === 'type') {
      aValue = aValue.toString();
      bValue = bValue.toString();
    }

    if (aValue < bValue) return -1 * order;
    if (aValue > bValue) return 1 * order;
    return 0;
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

  public setSort(field: SortField, order: SortOrder = 'asc') {
    this.sortField = field;
    this.sortOrder = order;
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
