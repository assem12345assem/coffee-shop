import type { ForwardRefRenderFunction } from 'react';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import type { PaginationHandle, PaginationProps } from '@/data/interfaces';

const PaginationComponent: ForwardRefRenderFunction<PaginationHandle, PaginationProps> = (
  { totalPages, initialPage = 1, initialPageSize = 10, onPageChange, onPageSizeChange, className, style },
  ref
) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [inputPageValue, setInputPageValue] = useState(initialPage.toString());
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [inputSizeValue, setInputSizeValue] = useState(initialPageSize.toString());

  const [pageError, setPageError] = useState('');
  const [sizeError, setSizeError] = useState('');

  useEffect(() => {
    setInputPageValue(currentPage.toString());
    setPageError('');
  }, [currentPage]);

  useEffect(() => {
    setInputSizeValue(pageSize.toString());
    setSizeError('');
  }, [pageSize]);

  const changePage = (page: number) => {
    if (page < 1) {
      setPageError('Page number must be at least 1.');
      return;
    }
    if (page > totalPages) {
      setPageError(`Page number cannot exceed total pages (${totalPages}).`);
      return;
    }
    setPageError('');
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  const nextPage = () => changePage(currentPage + 1);
  const prevPage = () => changePage(currentPage - 1);
  const reset = () => changePage(1);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputPageValue(val);
      setPageError('');
    }
  };

  const handlePageInputBlurOrEnter = () => {
    if (inputPageValue === '') {
      setPageError('Please enter a page number.');
      setInputPageValue(currentPage.toString());
      return;
    }
    const num = Number(inputPageValue);
    if (isNaN(num) || num < 1) {
      setPageError('Page number must be a number >= 1.');
      setInputPageValue(currentPage.toString());
      return;
    }
    if (num > totalPages) {
      setPageError(`Page number cannot exceed total pages (${totalPages}).`);
      setInputPageValue(currentPage.toString());
      return;
    }
    changePage(num);
  };

  const handlePageInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePageInputBlurOrEnter();
    }
  };

  const handleSizeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setInputSizeValue(val);
      setSizeError('');
    }
  };

  const handleSizeInputBlurOrEnter = () => {
    if (inputSizeValue === '') {
      setSizeError('Please enter a page size.');
      setInputSizeValue(pageSize.toString());
      return;
    }
    const num = Number(inputSizeValue);
    if (isNaN(num) || num < 1) {
      setSizeError('Page size must be a number >= 1.');
      setInputSizeValue(pageSize.toString());
      return;
    }
    setSizeError('');
    setPageSizeState(num);
    if (onPageSizeChange) onPageSizeChange(num);
  };

  const handleSizeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSizeInputBlurOrEnter();
    }
  };

  useImperativeHandle(ref, () => ({
    goToPage: changePage,
    nextPage,
    prevPage,
    reset,
    getCurrentPage: () => currentPage,
    getPageSize: () => pageSize,
    setPageSize: (size: number) => {
      if (size >= 1) {
        setPageSizeState(size);
        setInputSizeValue(size.toString());
      }
    },
  }));

  return (
    <div
      className={`mt-4 px-4 flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-black ${className ?? ''}`}
      style={style}
    >
      <span className="text-lg font-medium">
        Page: {currentPage} / {totalPages}
      </span>

      <div className="flex items-center gap-2">
        <button
          disabled={currentPage === 1}
          onClick={prevPage}
          className="px-3 py-1 border border-black text-black rounded-md hover:bg-coffeeBrown hover:text-white transition disabled:opacity-50"
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={nextPage}
          className="px-3 py-1 border border-black text-black rounded-md hover:bg-coffeeBrown hover:text-white transition disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="flex items-center gap-1">
        <label className="text-sm">Go to:</label>
        <input
          type="text"
          value={inputPageValue}
          onChange={handlePageInputChange}
          onBlur={handlePageInputBlurOrEnter}
          onKeyDown={handlePageInputKeyDown}
          className={`w-16 px-2 py-1 border rounded-md text-center text-coffeeBrown outline-none ${pageError ? 'border-red-500' : 'border-coffeeBrown'}`}
          aria-label="Page number input"
        />
      </div>
      {pageError && <div className="text-red-500 text-xs">{pageError}</div>}

      <div className="flex items-center gap-1">
        <label className="text-sm">Items per page:</label>
        <input
          type="text"
          value={inputSizeValue}
          onChange={handleSizeInputChange}
          onBlur={handleSizeInputBlurOrEnter}
          onKeyDown={handleSizeInputKeyDown}
          className={`w-16 px-2 py-1 border rounded-md text-center text-coffeeBrown outline-none ${sizeError ? 'border-red-500' : 'border-coffeeBrown'}`}
          aria-label="Items per page input"
        />
      </div>
      {sizeError && <div className="text-red-500 text-xs">{sizeError}</div>}
    </div>
  );
};

export default forwardRef(PaginationComponent);
