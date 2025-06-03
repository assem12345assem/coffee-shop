import { useEffect, useMemo, useState } from 'react';
import { productService } from './ProductService';
import type { ProductInteface } from '@/data/interfaces';

export function useProducts() {
  const [products, setProducts] = useState<ProductInteface[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const update = () => {
      setProducts(productService.getProducts());
      setTotal(productService.getTotalCount());
    };

    productService.subscribe(update);

    if (productService.getTotalCount() === 0) {
      productService.loadProducts();
    } else {
      update();
    }

    return () => productService.unsubscribe(update);
  }, []);

  const setSearchTerm = useMemo(() => productService.setSearchTerm.bind(productService), []);
  const setFilter = useMemo(() => productService.setFilter.bind(productService), []);
  const setSort = useMemo(() => productService.setSort.bind(productService), []);
  const setPagination = useMemo(() => productService.setPagination.bind(productService), []);

  return {
    products,
    total,
    setSearchTerm,
    setFilter,
    setSort,
    setPagination,
  };
}
