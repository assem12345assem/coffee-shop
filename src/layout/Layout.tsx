import Header from '@/components/Header-components/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/Footer-components/Footer';

function Layout() {
  return (
    <div className="min-h-screen max-w-[1440px] mx-auto flex flex-col items-center w-full px-5 relative">
      <Header />
      <div className="flex-1 w-full">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
