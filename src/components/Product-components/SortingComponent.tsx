import React, { useState } from 'react';
import type { SortField, SortOrder, SortingComponentProps } from '@/data/interfaces';

const sortFieldLabels: Record<SortField, string> = {
  name: 'Name',
  price: 'Price',
  type: 'Type',
};

const sortFields = (Object.keys(sortFieldLabels) as SortField[]).map((field) => ({
  label: sortFieldLabels[field],
  field,
}));

const SortingComponent: React.FC<SortingComponentProps> = ({
  initialField = 'name',
  initialOrder = 'asc',
  onSortChange,
}) => {
  const [sortField, setSortField] = useState<SortField>(initialField);
  const [sortOrder, setSortOrder] = useState<SortOrder>(initialOrder);

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

  const renderSortIcon = (field: SortField) => {
    if (field !== sortField) return null;
    return sortOrder === 'asc' ? '▲' : '▼';
  };

  return (
    <div className="mb-4 flex flex-wrap gap-4 items-center">
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
          aria-label={`Sort by ${label} ${
            field === sortField ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'
          }`}
        >
          {label} <span>{renderSortIcon(field)}</span>
        </button>
      ))}
    </div>
  );
};

export default SortingComponent;
