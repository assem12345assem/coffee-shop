import React from 'react';
interface OurMenuCoffeCardProps {
  img: string;
  title: string;
  description: string;
  price: number;
}
function OurMenuCoffeeCard({ img, title, description, price }: OurMenuCoffeCardProps) {
  return (
    <div className="bg-coffeeBrown rounded-[20px] p-[15px] w-[260px] h-[444px] relative">
      <div>
        <img className="w-[230px] h-[148px] object-cover rounded-[20px] mb-2" src={img} alt="coffee card" />
        <h3 className="text-white text-2xl mb-2 font-bold">{title}</h3>
        <p className="text-creamLight text-xs font-light leading-[21px] tracking-[0.24px]">{description}</p>
      </div>
      <div className="w-full flex gap-[70px]  items-center absolute bottom-4 ">
        <p className="text-white text-[21px] font-bold  ">${price}</p>
        <button className="bg-rustBrown text-white px-4 py-2 rounded-lg">Order now</button>
      </div>
    </div>
  );
}

export default OurMenuCoffeeCard;
