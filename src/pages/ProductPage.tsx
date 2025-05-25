import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from '@/api/products';

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data.results);
      } catch (err) {
        setError('Could not load products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>{p.masterData.current.name['en-US']} </li>
      ))}
    </ul>
  );
};

export default ProductPage;
