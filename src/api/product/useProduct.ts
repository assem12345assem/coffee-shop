import { useEffect, useState } from 'react';
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

  return {
    products,
    total,
    setSearchTerm: productService.setSearchTerm.bind(productService),
    setFilter: productService.setFilter.bind(productService),
    setSort: productService.setSort.bind(productService),
    setPagination: productService.setPagination.bind(productService),
  };
}
