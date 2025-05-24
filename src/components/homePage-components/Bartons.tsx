import React from 'react';
import coffeeImage from '@/assets/coffee-bg.png';

function Bartons() {
  return (
    <div
      className="h-[655px] relative top-[-110px] flex justify-end items-center bg-cover bg-center max-lg:h-[600px] max-sm:h-[500px] w-full"
      style={{ backgroundImage: `url(${coffeeImage})` }}
    >
      <div className="flex flex-col gap-[30px] max-lg:gap-5 pr-[100px] max-xl:pr-[70px] max-lg:pr-[50px] max-md:pr-[30px] max-sm:pr-5 justify-end items-end w-full max-w-[1200px] ">
        <h2 className="text-Temptress text-[35px] max-xl:text-[32px] max-lg:text-[28px] max-md:text-[24px] max-sm:text-[20px] font-semibold tracking-[-1.575px] max-sm:tracking-[-0.5px] leading-[44.458px] max-sm:leading-[1.3] text-right">
          Welcome to Bartons incredibly
        </h2>
        <p className="max-w-[469px] max-md:max-w-[400px] max-sm:max-w-[300px] text-Temptress font-secondary text-xl max-lg:text-lg max-sm:text-base text-justify">
          Your best local coffee. In addition to delicious sandwiches and cakes and hot dish of the day,
        </p>
        <div>
          <a
            href="/products"
            className="text-white text-[15px] font-semibold bg-LightTaupe rounded-md px-[44px] max-md:px-[35px] max-sm:px-[25px] py-[10px] hover:bg-DarkTaupe transition-colors"
          >
            VIEW MORE
          </a>
        </div>
      </div>
    </div>
  );
}

export default Bartons;
