import React, { useState } from 'react';
import type { SortField, SortOrder, SortingComponentProps } from '@/data/interfaces';

const sortFieldLabels: Record<SortField, string> = {
  id: 'ID',
  name: 'Name',
  price: 'Price',
  type: 'Type',
  category: 'Category',
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
    <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
      {sortFields.map(({ label, field }) => (
        <button
          key={field}
          onClick={() => toggleSort(field)}
          style={{
            padding: '0.5rem 1rem',
            fontWeight: field === sortField ? 'bold' : 'normal',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: field === sortField ? '#e0e0e0' : 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            userSelect: 'none',
          }}
          aria-pressed={field === sortField}
          aria-label={`Sort by ${label} ${field === sortField ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}`}
        >
          {label} <span>{renderSortIcon(field)}</span>
        </button>
      ))}
    </div>
  );
};

export default SortingComponent;
