import React, { useEffect, useState } from 'react';
import { CategoryType } from '@/data/interfaces';

interface FilterComponentProps {
  onFilterChange: (filters: { isSale?: boolean; category?: string }) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange }) => {
  const [isSale, setIsSale] = useState<boolean | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | ''>('');

  useEffect(() => {
    onFilterChange({
      isSale: isSale,
      category: selectedCategory || undefined,
    });
  }, [isSale, selectedCategory, onFilterChange]);

  return (
    <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
      <select
        value={isSale === undefined ? '' : isSale ? 'true' : 'false'}
        onChange={(e) => {
          const val = e.target.value;
          if (val === '') setIsSale(undefined);
          else setIsSale(val === 'true');
        }}
      >
        <option value="">All Products</option>
        <option value="true">On Sale</option>
        <option value="false">Not On Sale</option>
      </select>

      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}>
        <option value="">All Categories</option>
        {Object.values(CategoryType).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterComponent;
