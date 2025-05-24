import React from 'react';

interface CommentCardProps {
  img: string;
  stars: number;
  userName: string;
  description: string;
  coffeeName: string;
  date: string;
}
function CommentCard({ img, stars, userName, description, coffeeName, date }: CommentCardProps) {
  return (
    <div className="w-[379px] max-[1380px]:w-[350px] max-[1300px]:w-[330px] max-[400px]:w-[300px] bg-brownTransparent drop-shadow-custom over p-4 rounded-lg shadow-md relative flex flex-col items-center">
      <img
        src={img}
        alt={`${userName}'s profile`}
        className="w-12 h-12 rounded-full object-cover absolute top-0 translate-y-[-50%] z-20"
      />

      <div className="flex gap-2 pt-1">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < stars ? 'text-yellow-400' : 'text-gray-300'}>
            ★
          </span>
        ))}
      </div>

      <h4 className="text-white text-4xl font-bold mb-2 leading-[150%]">{userName}</h4>
      <p className="text-americanSilver font-bold w-[293px] text-center leading-[150%]">{description}</p>
      <div className="mt-[22px] text-center">
        <h3 className="font-bold text-base text-semiGreen leading-[150%]">{coffeeName}</h3>
        <p className="text-americanSilver text-sm font-bold leading-[150%]">{date}</p>
      </div>
    </div>
  );
}

export default CommentCard;
