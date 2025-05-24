import React from 'react';
import Slider from 'react-slick';
import reviewBg from '@/assets/reviewBg.jpg';
import comImage from '@/assets/com-image.png';
import CommentCard from './CommentCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const reviews = [
  {
    img: comImage,
    stars: 5,
    userName: 'John Doe',
    description: 'This coffee was amazing, would definitely buy again.',
    coffeeName: 'Cappuccino',
    date: '2023-05-15',
  },
  {
    img: comImage,
    stars: 4,
    userName: 'Jane Smith',
    description: 'Smooth and flavorful, perfect start to my day.',
    coffeeName: 'Latte',
    date: '2023-06-10',
  },
  {
    img: comImage,
    stars: 5,
    userName: 'Mark Johnson',
    description: 'The aroma alone had me hooked. Excellent brew!',
    coffeeName: 'Espresso',
    date: '2023-07-01',
  },
  {
    img: comImage,
    stars: 4,
    userName: 'Emily Brown',
    description: 'I loved the bold flavor. Worth every penny.',
    coffeeName: 'Americano',
    date: '2023-08-20',
  },
  {
    img: comImage,
    stars: 3,
    userName: 'Michael Lee',
    description: 'Good coffee, but I prefer a stronger roast.',
    coffeeName: 'Mocha',
    date: '2023-09-12',
  },
  {
    img: comImage,
    stars: 5,
    userName: 'Sophia Green',
    description: 'Absolutely delicious! I’ve already ordered more.',
    coffeeName: 'Flat White',
    date: '2023-10-05',
  },
];

function Review() {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    swipeToSlide: true,
    touchMove: true,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: '30px',
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          adaptiveHeight: true,
          centerPadding: '120px',
        },
      },
      {
        breakpoint: 615,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          adaptiveHeight: true,
          centerPadding: '80px',
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          adaptiveHeight: true,
          centerPadding: '50px',
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
          centerMode: true,
          adaptiveHeight: true,
          centerPadding: '10px',
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          centerMode: false,
          centerPadding: '0',
          variableWidth: false,
          adaptiveHeight: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      className="bg-cover bg-center sm:px-8 md:px-16 lg:px-[100px] relative -top-[110px] left-0"
      style={{ backgroundImage: `url(${reviewBg})` }}
    >
      <h2 className="pt-[80px] mb-[30px] text-white text-[40px] font-bold leading-[150%] text-center">
        What our Customers
      </h2>
      <div className="  [&_.slick-dots>li>button::before]:text-[#FFFFFF ] [&_.slick-dots>li.slick-active>button::before]:text-[#8C8C8C] pb-[50px]">
        <Slider {...settings}>
          {reviews.map((review, index) => (
            <div key={index} className="py-6">
              <CommentCard {...review} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Review;
