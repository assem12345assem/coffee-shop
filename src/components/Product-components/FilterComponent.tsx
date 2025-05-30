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
    <div className="mb-4 flex gap-4 max-[500px]:flex-col max-[500px]:items-start max-[500px]:w-full">
      <select
        className="bg-transparent border-2 border-coffeeBrown rounded-lg px-4 py-2 text-coffeeBrown placeholder:text-coffeeBrown focus:outline-none focus:border-rustBrown transition-colors duration-300 w-[215px] text-lg
             hover:bg-coffeeBrown hover:text-white max-[500px]:w-full"
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

      <select
        className="bg-transparent border-2 border-coffeeBrown rounded-lg px-5 py-2 text-coffeeBrown placeholder:text-coffeeBrown focus:outline-none focus:border-rustBrown transition-colors duration-300 w-[220px] text-lg
             hover:bg-coffeeBrown hover:text-white max-[500px]:w-full"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value as CategoryType)}
      >
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
