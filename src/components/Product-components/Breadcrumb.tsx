import React, { useEffect, useState } from 'react';
import { categoryService } from '@/api/category/CategoryService';
import type { Category } from '@commercetools/platform-sdk';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  currentCategoryKey?: string;
  productName?: string;
  onNavigate?: (key: string | undefined) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ currentCategoryKey, productName, onNavigate }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const results = await categoryService.getCategories();
      setCategories(results);
    };
    fetchCategories();
  }, []);

  const categoryMap = new Map(categories.map((cat) => [cat.key, cat]));
  const hierarchy: Category[] = [];

  if (currentCategoryKey && categoryMap.has(currentCategoryKey)) {
    let current: Category | undefined = categoryMap.get(currentCategoryKey);

    while (current) {
      hierarchy.unshift(current);
      const parentId = current.parent?.id;
      current = categories.find((cat) => cat.id === parentId);
    }
  }

  return (
    <nav className="text-coffeeBrown text-lg font-medium flex items-center gap-1">
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <span>{'>'}</span>
      <Link to="/products" className="hover:underline">
        Products
      </Link>

      {hierarchy.map((cat, index) => (
        <React.Fragment key={cat.key}>
          <span>{'>'}</span>
          {onNavigate ? (
            <button onClick={() => onNavigate(cat.key)} className="hover:underline">
              {cat.name?.['en-US'] || Object.values(cat.name)[0] || cat.key}
            </button>
          ) : (
            <span>{cat.name?.['en-US'] || Object.values(cat.name)[0] || cat.key}</span>
          )}
        </React.Fragment>
      ))}

      {productName && (
        <>
          <span>{'>'}</span>
          <span className="text-coffeeBrown">{productName}</span>
        </>
      )}
    </nav>
  );
};

export default Breadcrumb;
