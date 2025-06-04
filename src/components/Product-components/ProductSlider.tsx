import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import type { ProductSliderProps } from '@/data/interfaces';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '@/styles/productSlider.css';

function ProductSlider({ product }: ProductSliderProps) {
  const sliderImages = product.images || [];

  return (
    <div className="w-full max-w-[600px] h-[400px] sm:h-[500px] md:h-[600px] mx-auto my-10 relative px-2">
      <Swiper
        pagination={{
          type: 'fraction',
          renderFraction: (currentClass, totalClass) =>
            `<span class="${currentClass} text-white"></span> <span class="text-white">/</span> <span class="${totalClass} text-white"></span>`,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper h-full"
      >
        {sliderImages.map((image: string, index: number) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Product Image ${index + 1}`} className="w-full h-full object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductSlider;
