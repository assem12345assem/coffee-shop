import React, { useState } from 'react';
import type { SortField, SortOrder, SortingComponentProps } from '@/data/interfaces';

const sortFieldLabels: Record<SortField, string> = {
  name: 'Name',
  price: 'Price',
};

const sortFields = (Object.keys(sortFieldLabels) as SortField[]).map((field) => ({
  label: sortFieldLabels[field],
  field,
}));

const SortingComponent: React.FC<SortingComponentProps> = ({ onSortChange }) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const toggleSort = (field: SortField) => {
    if (field === sortField) {
      const nextOrder = sortOrder === 'asc' ? 'desc' : 'asc';
      setSortOrder(nextOrder);
      onSortChange?.(field, nextOrder);
    } else {
      setSortField(field);
      setSortOrder('asc');
      onSortChange?.(field, 'asc');
    }
  };

  const handleReset = () => {
    setSortField(null);
    setSortOrder('asc');
    onSortChange?.(null, null); // 🔁 Inform ProductService to use original order
  };

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortOrder === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="mb-4 flex flex-wrap gap-4 items-center" role="group" aria-label="Sort products">
      {sortFields.map(({ label, field }) => (
        <button
          key={field}
          onClick={() => toggleSort(field)}
          className={`
            px-4 py-2
            rounded-lg
            border-2 border-coffeeBrown
            flex items-center gap-1
            select-none
            cursor-pointer
            transition-colors duration-300
            ${
              field === sortField
                ? 'font-bold bg-coffeeBrown text-white border-coffeeBrown'
                : 'font-normal bg-transparent text-coffeeBrown border-coffeeBrown hover:bg-coffeeBrown hover:text-white'
            }
            focus:outline-none focus:border-rustBrown
          `}
          aria-pressed={field === sortField}
        >
          {label} <span>{renderSortIcon(field)}</span>
        </button>
      ))}

      <button
        onClick={handleReset}
        className={`
          px-4 py-2
          rounded-lg
          border-2 border-coffeeBrown
          bg-transparent
          text-coffeeBrown
          font-semibold
          transition-colors duration-300
          hover:bg-coffeeBrown hover:text-white
          focus:outline-none focus:border-rustBrown
        `}
      >
        Reset Sort
      </button>
    </div>
  );
};

export default SortingComponent;
