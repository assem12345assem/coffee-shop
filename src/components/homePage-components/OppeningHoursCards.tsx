import React from 'react';

function OppeningHoursCards({ day, date }: { day: string; date: string }) {
  return (
    <div>
      <p className="text-white text-4xl max-xl:text-[34px] max-lg:text-[30px] max-md:text-[26px] max-sm:text-[24px] font-third">
        {day}
      </p>
      <p className="text-white text-4xl max-xl:text-[34px] max-lg:text-[30px] max-md:text-[26px] max-sm:text-[24px] font-third">
        {date}
      </p>
    </div>
  );
}

export default OppeningHoursCards;
