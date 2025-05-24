import React from 'react';
import coffeeBg from '@/assets/coffee-illustration.png';
import SearchBar from '../components/NotFound-components/SearchBar';
import BackButton from '@/components/Login-registration-components/BackButton';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow justify-center bg-[#f9e2c3] relative top-[-100px]">
      <div className="w-full h-[100px] bg-black" />
      <div className="mt-10 ml-8">
        <BackButton />
      </div>
      <div className="flex flex-col items-center">
        <img src={coffeeBg} alt="Not Found" className="w-64 h-auto mt-10" />

        <h1 className="text-4xl font-bold mb-4 mt-6 text-gray-800 uppercase">Page Not Found</h1>
        <div className="mt-10 w-full max-w-md relative">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
