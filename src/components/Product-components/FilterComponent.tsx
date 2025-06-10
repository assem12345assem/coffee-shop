import React, { useEffect, useState } from 'react';
import { categoryService } from '@/api/category/CategoryService';

interface FilterComponentProps {
  onFilterChange: (filters: { isSale?: boolean; category?: string; priceMin?: number; priceMax?: number }) => void;
}

interface SimpleCategory {
  key: string;
  label: string;
}

const FilterComponent: React.FC<FilterComponentProps> = ({ onFilterChange }) => {
  const [isSale, setIsSale] = useState<boolean | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<SimpleCategory[]>([]);
  const [priceRange, setPriceRange] = useState<string>('');
  const handleResetFilters = () => {
    setIsSale(undefined);
    setSelectedCategory('');
    setPriceRange('');
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const results = await categoryService.getSubcategoriesByParentKey('coffee');

      const simplified: SimpleCategory[] = results
        .map((cat) => {
          const key = cat.key || cat.slug?.['en-US'];
          const nameObject = cat.name;
          const label = nameObject && typeof nameObject === 'object' ? Object.values(nameObject)[0] : '';

          if (!key || !label) {
            console.warn('⚠️ Skipping category due to missing key or name', cat);
          }

          return {
            key: key || '',
            label: label || key || 'Unnamed Category',
          };
        })
        .filter((cat): cat is SimpleCategory => !!cat.key && !!cat.label);

      setCategories(simplified);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    let min: number | undefined;
    let max: number | undefined;

    if (priceRange === 'under-5') {
      max = 5;
    } else if (priceRange === '5-15') {
      min = 5;
      max = 15;
    } else if (priceRange === 'over-15') {
      min = 15.01;
    }

    onFilterChange({
      isSale,
      category: selectedCategory || undefined,
      priceMin: min,
      priceMax: max,
    });
  }, [isSale, selectedCategory, priceRange, onFilterChange]);

  return (
    <div className="mb-4 flex flex-wrap gap-4 max-[500px]:flex-col max-[500px]:items-start max-[500px]:w-full">
      <select
        className={`
    filter-dropdown px-4 py-2 rounded-lg border-2 border-coffeeBrown cursor-pointer transition-colors duration-300 focus:outline-none focus:border-rustBrown
    ${
      isSale === undefined
        ? 'bg-transparent text-coffeeBrown hover:bg-coffeeBrown hover:text-white'
        : 'bg-coffeeBrown text-white'
    }
  `}
        value={isSale === undefined ? '' : isSale ? 'true' : 'false'}
        onChange={(e) => {
          const val = e.target.value;
          setIsSale(val === '' ? undefined : val === 'true');
        }}
      >
        <option value="">All Sales</option>
        <option value="true">On Sale</option>
        <option value="false">Not On Sale</option>
      </select>

      <select
        className={`
    filter-dropdown px-4 py-2 rounded-lg border-2 border-coffeeBrown cursor-pointer transition-colors duration-300 focus:outline-none focus:border-rustBrown
    ${
      selectedCategory === ''
        ? 'bg-transparent text-coffeeBrown hover:bg-coffeeBrown hover:text-white'
        : 'bg-coffeeBrown text-white'
    }
  `}
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.key} value={category.key}>
            {category.label}
          </option>
        ))}
      </select>

      <select
        className={`
    filter-dropdown px-4 py-2 rounded-lg border-2 border-coffeeBrown cursor-pointer transition-colors duration-300 focus:outline-none focus:border-rustBrown
    ${
      priceRange === ''
        ? 'bg-transparent text-coffeeBrown hover:bg-coffeeBrown hover:text-white'
        : 'bg-coffeeBrown text-white'
    }
  `}
        value={priceRange}
        onChange={(e) => setPriceRange(e.target.value)}
      >
        <option value="">All Prices</option>
        <option value="under-5">Under $5</option>
        <option value="5-15">$5 – $15</option>
        <option value="over-15">Over $15</option>
      </select>

      <button
        onClick={handleResetFilters}
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
        Reset Filters
      </button>
    </div>
  );
};

export default FilterComponent;
