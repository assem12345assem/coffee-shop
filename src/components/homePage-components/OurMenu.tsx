import React, { useState, useRef } from 'react';
import ourMenuBg from '@/assets/ourMenu.png';
import { Link } from 'react-router-dom';
import OurMenuCoffeeCard from './OurMenuCoffeeCard';
import cappucina from '@/assets/cappucina.jpg';
import moca from '@/assets/moca.jpg';
import late from '@/assets/latte.jpg';
import coldjava from '@/assets/coldjava.jpg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/slider.css';

function OurMenu() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const totalSlides = 7;

  const NextArrow: React.FC<React.HTMLProps<HTMLDivElement>> = ({ style, onClick }) => {
    const isDisabled = currentSlide >= totalSlides - 4;
    return (
      <div
        className={`custom-arrow-next ${isDisabled ? 'arrow-disabled' : ''}`}
        style={{ ...style } as React.CSSProperties}
        onClick={!isDisabled ? (onClick as React.MouseEventHandler<HTMLDivElement>) : undefined}
      >
        <div className="arrow-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 35" fill="none" className="arrow-svg">
            <path
              d="M0.709454 30.5801L13.4179 17.3552L0.709454 4.1302L4.62188 0.067627L21.2705 17.3552L4.62188 34.6427L0.709454 30.5801Z"
              fill={isDisabled ? '#9B9B9B' : '#C08267'}
            />
          </svg>
        </div>
      </div>
    );
  };

  const PrevArrow: React.FC<React.HTMLProps<HTMLDivElement>> = ({ style, onClick }) => {
    const isDisabled = currentSlide === 0;
    return (
      <div
        className={`custom-arrow-prev ${isDisabled ? 'arrow-disabled' : ''}`}
        style={{ ...style } as React.CSSProperties}
        onClick={!isDisabled ? (onClick as React.MouseEventHandler<HTMLDivElement>) : undefined}
      >
        <div className="arrow-icon-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 35" fill="none" className="arrow-svg">
            <path
              d="M20.5611 30.5125L7.8526 17.2875L20.5611 4.06257L16.6486 0L0 17.2875L16.6486 34.5751L20.5611 30.5125Z"
              fill={isDisabled ? '#9B9B9B' : '#C08267'}
            />
          </svg>
        </div>
      </div>
    );
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index: number) => setCurrentSlide(index),
    responsive: [
      {
        breakpoint: 1350,
        settings: { slidesToShow: 3, variableWidth: true, adaptiveHeight: true },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          variableWidth: true,
          adaptiveHeight: true,
        },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, variableWidth: true, adaptiveHeight: true },
      },
    ],
  };

  const coffeeItems = [
    {
      img: cappucina,
      title: 'Cappuccino',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, fermentum id id vitae, integer fermentum tellus.',
      price: 8.6,
    },
    {
      img: moca,
      title: 'Mocha',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, fermentum id id vitae, integer fermentum tellus.',
      price: 7.8,
    },
    {
      img: late,
      title: 'Latte',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, fermentum id id vitae, integer fermentum tellus.',
      price: 6.5,
    },
    {
      img: coldjava,
      title: 'Cold Brew',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, fermentum id id vitae, integer fermentum tellus.',
      price: 5.9,
    },

    {
      img: cappucina,
      title: 'Espresso',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, fermentum id id vitae, integer fermentum tellus.',
      price: 4.2,
    },
    {
      img: moca,
      title: 'Americano',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, fermentum id id vitae, integer fermentum tellus.',
      price: 3.8,
    },
    {
      img: late,
      title: 'Macchiato',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa, fermentum id id vitae, integer fermentum tellus.',
      price: 5.5,
    },
  ];

  return (
    <div
      className="w-full bg-cover bg-center relative -top-[110px] left-0"
      style={{ backgroundImage: `url(${ourMenuBg})` }}
    >
      <h2
        className="text-center font-bold pt-24 mb-10 text-[32px] md:text-[40px] lg:text-[50px]"
        style={{
          color: '#903711',
          WebkitTextStrokeWidth: '2px',
          WebkitTextStrokeColor: '#FFF',
        }}
      >
        Our Menu
      </h2>

      <div className="px-4 sm:px-8 md:px-16 lg:px-[100px] pb-20">
        <Link
          to="/products"
          className="text-Coconut text-[22px] md:text-[26px] lg:text-[30px] font-semibold border-b border-Coconut ml-4 md:ml-10"
        >
          Coffee
        </Link>

        <div className="mt-11 custom-slider">
          <Slider ref={sliderRef} {...settings}>
            {coffeeItems.map((item, index) => (
              <div key={index} className="px-2 ">
                <OurMenuCoffeeCard {...item} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default OurMenu;
