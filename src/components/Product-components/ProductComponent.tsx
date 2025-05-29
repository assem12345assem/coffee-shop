import React from 'react';
import type { ProductInteface } from '@/data/interfaces';
import { CoffeeType } from '@/data/interfaces';

interface Props {
  product: ProductInteface;
}

const ProductComponent: React.FC<Props> = ({ product }) => {
  const getImageUrl = (path: string) => {
    const cleanPath = path
      .replace(/^assets\//, '')
      .replace(/^\/?src\/assets\//, '')
      .replace(/^public\//, '');
    console.log(cleanPath);
    return `/${cleanPath}`;
  };

  return (
    <div className="bg-coffeeBrown rounded-[20px] p-[15px] w-[260px] h-[444px] relative">
      <div className="mb-2">
        {product.images.length > 0 && (
          <img
            src={getImageUrl(product.images[0])}
            alt={`${product.name} main image`}
            className="w-[230px] h-[148px] object-cover rounded-[20px] mb-2"
          />
        )}
      </div>

      <h2 className="text-white text-2xl mb-2 font-bold">{product.name}</h2>
      <p className="text-white">${product.price.toFixed(2)}</p>
      <p className="text-white">
        <strong>Type:</strong>{' '}
        {Object.keys(CoffeeType).find((key) => CoffeeType[key as keyof typeof CoffeeType] === product.type) ||
          'Unknown'}
      </p>
      <p className="text-white">
        <strong>Ingredients:</strong> {product.ingredients.join(', ')}
      </p>
      <p className="text-white">
        <strong>Sale:</strong> {product.is_sale ? `${product.sale_percent}% off` : 'No'}
      </p>
    </div>
  );
};

export default ProductComponent;
