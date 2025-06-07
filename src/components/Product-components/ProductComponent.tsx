import React from 'react';
import type { ProductInteface } from '@/data/interfaces';
import { Link } from 'react-router-dom';

interface Props {
  product: ProductInteface;
}

const ProductComponent: React.FC<Props> = ({ product }) => {
  const calculateDiscountPrice = () => {
    if (!product.is_sale || !product.sale_percent) return product.price;
    return product.price * (1 - product.sale_percent / 100);
  };

  const originalPrice = product.price.toFixed(2);
  const discountPrice = calculateDiscountPrice().toFixed(2);
  const isOnSale = product.is_sale && product.sale_percent;

  const productName =
    typeof product.name === 'string'
      ? product.name
      : product.name || Object.values(product.name)[0] || 'Unnamed Product';

  return (
    <div
      className="bg-coffeeBrown rounded-[20px] p-[15px] w-[260px] h-[444px] relative transition-transform transition-shadow
     transition-colors duration-500 ease-in-out transform shadow-md hover:shadow-2xl 
     hover:scale-[1.03] hover:bg-coffeeDark/80 flex flex-col"
    >
      <div className="mb-2 h-[148px] bg-coffeeDark rounded-[20px] overflow-hidden flex items-center justify-center">
        {product.images?.length > 0 ? (
          <img
            src={product.images[0]}
            alt={productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/images/coffee-placeholder.jpg';
            }}
          />
        ) : (
          <div className="text-white text-center p-4">No Image Available</div>
        )}
      </div>

      <div className="space-y-2 flex-grow">
        <h2 className="text-white text-xl font-bold line-clamp-2">{productName}</h2>

        {product.ingredients?.length > 0 && (
          <p className="text-coffeeLight text-sm">
            <span className="font-semibold">Ingredients:</span> {product.ingredients.join(', ')}
          </p>
        )}
      </div>

      <div className="mb-2">
        <div className="flex justify-between items-center">
          {isOnSale ? (
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold">${discountPrice}</span>
              <span className="text-coffeeLight line-through text-sm">${originalPrice}</span>
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{product.sale_percent}% OFF</span>
            </div>
          ) : (
            <span className="text-white font-bold">${originalPrice}</span>
          )}
        </div>
      </div>

      <div className="w-full">
        <Link
          to={`/products/${product.id}`}
          className="block w-full bg-rustBrown text-white px-4 py-2 rounded-lg text-center hover:bg-rustDark transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductComponent;
