'use client';

import React, { useState } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage?: number;
  pageRangeDisplayed?: number;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage = 1,
  pageRangeDisplayed = 7,
  className = '',
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [activePage, setActivePage] = useState<number>(currentPage);

  const movePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setActivePage(page);
  };

  const startPage = Math.floor((activePage - 1) / pageRangeDisplayed) * pageRangeDisplayed + 1;
  const endPage = Math.min(startPage + pageRangeDisplayed - 1, totalPages);

  const arrowButtonClass =
    'flex h-5 w-5 items-center justify-center text-gray-black disabled:text-gray-40';

  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-4 ${className}`}>
      <button
        disabled={activePage === 1}
        className={arrowButtonClass}
        onClick={() => movePage(activePage - 1)}
      >
        &lt;
      </button>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => {
        const pageNumber = startPage + index;
        return (
          <button
            key={pageNumber}
            onClick={() => movePage(pageNumber)}
            className={`flex h-8 w-8 items-center justify-center rounded-[4px] text-xs sm:text-sm ${
              activePage === pageNumber
                ? 'bg-red-30 text-white'
                : 'text-gray-black hover:bg-gray-10'
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={activePage === totalPages}
        className={arrowButtonClass}
        onClick={() => movePage(activePage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
