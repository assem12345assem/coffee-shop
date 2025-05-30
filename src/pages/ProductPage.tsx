import React, { useState, useRef, useCallback } from 'react';
import { useProducts } from '@/api/product/useProduct';
import ProductComponent from '@/components/Product-components/ProductComponent';
import SortingComponent from '@/components/Product-components/SortingComponent';
import {
  CategoryType,
  CoffeeType,
  PaginationHandle,
  ProductInteface,
  SearchComponentHandle,
  SortField,
  SortOrder,
} from '@/data/interfaces';
import SearchComponent from '@/components/Product-components/SearchComponent';
import PaginationComponent from '@/components/Product-components/PaginationComponent';
import FilterComponent from '@/components/Product-components/FilterComponent';
import hero from '@/assets/menu-page.jpg';

const ProductPage: React.FC = () => {
  const { products, total, setSearchTerm, setFilter, setPagination, setSort } = useProducts();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages: number = Math.ceil(total / pageSize);

  const searchRef: React.RefObject<SearchComponentHandle | null> = useRef<SearchComponentHandle | null>(null);
  const paginationRef: React.RefObject<PaginationHandle | null> = useRef<PaginationHandle | null>(null);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchTerm(value);
      setCurrentPage(1);
      setPagination(0, pageSize);
      paginationRef.current?.reset();
    },
    [setSearchTerm, setPagination, pageSize, paginationRef]
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      setPagination((newPage - 1) * pageSize, pageSize);
    },
    [pageSize]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setPageSize(size);
      setCurrentPage(1);
      setPagination(0, size);
    },
    [setPagination]
  );

  const handleSortChange = useCallback(
    (field: SortField, order: SortOrder) => {
      setSort(field, order);
      setCurrentPage(1);
      setPagination(0, pageSize);
    },
    [setSort, setPagination, pageSize]
  );

  const handleFilterChange = useCallback(
    (filters: { is_sale?: boolean; category?: string }) => {
      setFilter(filters);
      setPagination(0, pageSize);
      setCurrentPage(1);
    },
    [setFilter, setPagination, pageSize]
  );

  return (
    <div className="w-full  bg-cover bg-center py-[100px]" style={{ backgroundImage: `url(${hero})` }}>
      <div className="w-full flex justify-between items-baseline gap-4 mb-8 px-4 max-[1180px]:flex-col max-[1130px]:items-center">
        <SearchComponent ref={searchRef} placeholder="Search by name..." onSearchChange={handleSearchChange} />
        <div className="flex gap-4 items-center max-[800px]:flex-col max-[800px]:items-center">
          <SortingComponent onSortChange={handleSortChange} />
          <FilterComponent onFilterChange={handleFilterChange} />
        </div>
      </div>

      <div className=" w-full flex flex-wrap gap-4 justify-center">
        {products.length === 0 ? (
          <p>No products match your search.</p>
        ) : (
          products.map((product: ProductInteface) => <ProductComponent key={product.id} product={product} />)
        )}
      </div>

      <PaginationComponent
        totalPages={totalPages}
        initialPage={currentPage}
        initialPageSize={pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default ProductPage;
