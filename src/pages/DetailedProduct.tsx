import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '@/api/product/ProductService';
import { categoryService } from '@/api/category/CategoryService';
import type { ProductInteface } from '@/data/interfaces';
import { simplifySingleProduct } from '@/utils/productUtils';
import ProductSlider from '@/components/Product-components/ProductSlider';
import type { Category } from '@commercetools/platform-sdk';

const DetailedProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductInteface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSlider, setShowSlider] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const fetchProductWithCategory = async () => {
      try {
        const [result, categories] = await Promise.all([
          productService.getProductById(id),
          categoryService.getCategories(),
        ]);

        if (!result) {
          setError('Product not found');
          return;
        }

        const categoryMap = new Map<string, Category>();
        categories.forEach((cat) => categoryMap.set(cat.id, cat));

        const simplified = simplifySingleProduct(result, categoryMap);
        setProduct(simplified);
      } catch {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductWithCategory();
  }, [id]);

  const calculateDiscountPrice = () => {
    if (!product?.is_sale || !product?.sale_percent) return product?.price || 0;
    return product.price * (1 - product.sale_percent / 100);
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error || !product) return <div className="p-6 text-red-500">{error || 'Product not available.'}</div>;

  const originalPrice = product.price.toFixed(2);
  const discountPrice = calculateDiscountPrice().toFixed(2);
  const isOnSale = product.is_sale && product.sale_percent;

  return (
    <div className="bg-lightCream py-10 px-4 sm:px-6 md:px-10 lg:px-20 relative">
      <div className="max-w-screen-xl mx-auto mb-6 relative">
        <button
          onClick={() => navigate('/products')}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5E3C] to-[#3B2F2F] flex items-center justify-center text-white font-bold text-xl shadow-[0_4px_0_#3B2F2F] transition-all duration-200 ease-in-out relative hover:-translate-y-1 hover:shadow-[0_6px_0_#3B2F2F] active:translate-y-0 active:shadow-none focus:ring-0"
          aria-label="Back to products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex-1 space-y-4 md:mr-6">
          <h1 className="text-3xl sm:text-4xl font-bold text-black">{product.name}</h1>

          <div className="flex items-center gap-3">
            <span className="text-xl font-semibold text-black">Price:</span>
            {isOnSale ? (
              <>
                <span className="text-red-500 text-2xl font-bold">${discountPrice}</span>
                <span className="line-through text-coffeeLight text-lg">${originalPrice}</span>
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {product.sale_percent}% OFF
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold text-black">${originalPrice}</span>
            )}
          </div>

          <div className="text-coffeeLight text-base space-y-2">
            {product.category && (
              <p>
                <span className="font-semibold">Category:</span>{' '}
                {product.category.name?.en || Object.values(product.category.name)[0] || product.category.key}
              </p>
            )}

            {product.ingredients.length > 0 && (
              <p>
                <span className="font-semibold">Ingredients:</span> {product.ingredients.join(', ')}
              </p>
            )}

            <p className="whitespace-pre-line text-black pt-5">
              <span className="font-semibold">Description:</span> {product.description}
            </p>
          </div>
        </div>

        <div className="w-full md:w-[400px] lg:w-[500px] p-2 md:p-0 flex justify-center mx-auto">
          <div className="relative w-full max-w-[400px] group">
            <img
              src={product.images[0]}
              alt={`${typeof product.name === 'string' ? product.name : product.name || 'Product image'}`}
              className="w-full h-auto rounded-lg shadow-md object-cover"
            />
            <div
              onClick={() => setShowSlider(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 before:absolute before:inset-0 before:bg-black before:opacity-0 hover:before:opacity-40 before:rounded-lg"
            >
              <span className="relative z-10 text-white font-bold text-lg">Show more images</span>
            </div>
          </div>
        </div>
      </div>

      {showSlider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div onClick={() => setShowSlider(false)} className="fixed inset-0 bg-black bg-opacity-90 cursor-pointer" />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowSlider(false);
            }}
            className="absolute top-4 right-4 text-white text-3xl z-50 hover:text-gray-300"
            aria-label="Close gallery"
          >
            &times;
          </button>
          <div className="relative w-full max-w-4xl z-40" onClick={(e) => e.stopPropagation()}>
            <ProductSlider product={product} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedProduct;
