import React from 'react';
import hoursBg from '@/assets/openingHours.png';
import OppeningHoursCards from './OppeningHoursCards';

function OpeningHours() {
  return (
    <div
      className="w-full h-[438px] max-xl:h-[400px]   max-sm:h-[650px] bg-cover bg-center flex gap-7 max-[880px]:flex-col items-center justify-between px-[100px] max-xl:px-[70px] max-lg:px-[50px] max-md:px-[30px] max-sm:px-5 max-[880px]:py-10 relative top-[-110px] left-0"
      style={{ backgroundImage: `url(${hoursBg})` }}
    >
      <div className=" max-md:text-center">
        <h2 className="text-white text-[64px] max-xl:text-[56px] max-lg:text-[48px] max-md:text-[40px] max-sm:text-[36px] font-third py-[34px] max-lg:py-[24px] px-[44px] max-lg:px-[34px] rounded-xl bg-bg">
          Opening Hours
        </h2>
      </div>

      <div className="flex justify-center items-center gap-[80px] max-xl:gap-[60px] max-lg:gap-[40px] max-md:gap-[30px] max-sm:flex-col max-sm:gap-[40px]">
        <div className="flex flex-col gap-[30px] max-lg:gap-[15px] max-sm:items-center max-sm:text-center">
          <OppeningHoursCards day="Mon-Thu" date="Mon-Thu" />

          <OppeningHoursCards day="Fri" date="08:00-19:00" />
        </div>

        <div className="flex flex-col gap-[30px] max-lg:gap-[20px] max-sm:items-center max-sm:text-center">
          <OppeningHoursCards day="Sun" date="9:00-18:00" />

          <OppeningHoursCards day="Sat" date="9:00-18:00" />
        </div>
      </div>
    </div>
  );
}

export default OpeningHours;
