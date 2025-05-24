import React from 'react';
import hero from '@/assets/home-hero.png';

function HomePageHero() {
  return (
    <div
      className="w-full h-[786px] max-lg:h-[700px] max-sm:h-[600px] bg-cover bg-center flex items-center justify-start max-lg:justify-center relative top-[-100px] left-0"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <div className=" pl-[100px] text-left text-white max-w-[643px] max-sm:max-w-full flex flex-col justify-center items-start max-lg:items-center max-lg:text-center  max-sm:px-4">
        <h1 className="text-[64px] max-lg:text-5xl max-sm:text-4xl font-bold leading-tight max-sm:leading-snug">
          FRESH COFFEE IN THE MORNING
        </h1>
        <p className="mt-4 text-2xl max-lg:text-xl max-sm:text-lg">
          Start your day right with the aroma of freshly brewed coffee. Discover our handcrafted blends made to energize
          and inspire.
        </p>
        <a
          href="/products"
          className="text-2xl max-lg:text-xl max-sm:text-lg font-bold text-white bg-LightTaupe py-[25px] px-[88px] max-lg:py-[20px] max-lg:px-[50px] max-sm:py-4 max-sm:px-8 mt-[50px] max-sm:mt-8 rounded-xl hover:bg-DarkTaupe transition-colors duration-300"
        >
          ORDER NOW
        </a>
      </div>
    </div>
  );
}

export default HomePageHero;
