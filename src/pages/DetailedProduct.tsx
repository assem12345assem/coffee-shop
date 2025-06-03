// src/pages/DetailedProductPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const DetailedProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Product Details</h1>
      <p className="mt-4">You are viewing product with ID: {id}</p>
    </div>
  );
};

export default DetailedProduct;
