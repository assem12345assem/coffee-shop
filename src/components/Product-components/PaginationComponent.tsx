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

  const nextPage = () => {
    changePage(currentPage + 1);
  };

  const prevPage = () => {
    changePage(currentPage - 1);
  };

  const reset = () => {
    changePage(1);
  };

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
    <div className={className} style={{ marginTop: '1rem', ...style }}>
      <span>
        Page: {currentPage} / {totalPages}
      </span>
      <button disabled={currentPage === 1} onClick={prevPage} style={{ marginLeft: '1rem' }}>
        Prev
      </button>
      <button disabled={currentPage === totalPages} onClick={nextPage} style={{ marginLeft: '0.5rem' }}>
        Next
      </button>

      <input
        type="text"
        value={inputPageValue}
        onChange={handlePageInputChange}
        onBlur={handlePageInputBlurOrEnter}
        onKeyDown={handlePageInputKeyDown}
        style={{
          marginLeft: '1rem',
          width: '3rem',
          textAlign: 'center',
          borderColor: pageError ? 'red' : undefined,
        }}
        aria-label="Page number input"
      />
      {pageError && <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.8rem' }}>{pageError}</div>}

      <span style={{ marginLeft: '1rem' }}>Items per page:</span>
      <input
        type="text"
        value={inputSizeValue}
        onChange={handleSizeInputChange}
        onBlur={handleSizeInputBlurOrEnter}
        onKeyDown={handleSizeInputKeyDown}
        style={{
          marginLeft: '0.5rem',
          width: '3rem',
          textAlign: 'center',
          borderColor: sizeError ? 'red' : undefined,
        }}
        aria-label="Items per page input"
      />
      {sizeError && <div style={{ color: 'red', marginTop: '0.25rem', fontSize: '0.8rem' }}>{sizeError}</div>}
    </div>
  );
};

export default forwardRef(PaginationComponent);
