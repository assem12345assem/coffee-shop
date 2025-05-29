import React, { useState } from 'react';
import type { ProductInteface } from '@/data/interfaces';
import { CoffeeType } from '@/data/interfaces';

interface Props {
  product: ProductInteface;
}

const ProductComponent: React.FC<Props> = ({ product }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  const toggleDescription = () => setShowFullDescription((prev) => !prev);

  return (
    <div style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
      <h2>{product.name}</h2>
      <p>
        <strong>Price:</strong> ${product.price.toFixed(2)}
      </p>
      <p>
        <strong>Type:</strong>{' '}
        {Object.keys(CoffeeType).find((key) => CoffeeType[key as keyof typeof CoffeeType] === product.type) ||
          'Unknown'}
      </p>

      <p>
        <strong>Description:</strong>{' '}
        {showFullDescription ? product.description : `${product.description.slice(0, 100)}...`}
        {product.description.length > 100 && (
          <button onClick={toggleDescription} style={{ marginLeft: '0.5rem' }}>
            {showFullDescription ? 'Show Less' : 'Show More'}
          </button>
        )}
      </p>

      <p>
        <strong>Ingredients:</strong> {product.ingredients.join(', ')}
      </p>
      <p>
        <strong>Sale:</strong> {product.is_sale ? `${product.sale_percent}% off` : 'No'}
      </p>

      <div>
        <strong>Images:</strong>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
          {product.images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${product.name} image ${idx + 1}`}
              style={{
                width: '100px',
                height: 'auto',
                border: selectedImageIdx === idx ? '2px solid blue' : '1px solid #ccc',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedImageIdx(idx)}
            />
          ))}
        </div>
        <img
          src={product.images[selectedImageIdx]}
          alt={`${product.name} selected`}
          style={{ width: '300px', height: 'auto', borderRadius: '8px' }}
        />
      </div>
    </div>
  );
};

export default ProductComponent;
