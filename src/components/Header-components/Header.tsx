import React, { useState, useEffect, useRef } from 'react';
import { Nav } from './Nav';
import logo from '@/assets/logo.svg';
import cart from '@/assets/cart.png';
import burger from '@/assets/burger.png';
import close from '@/assets/close.png';
import userIcon from '@/assets/user-Prifile-icon.png';
import loginIcon from '@/assets/login.png';
import { LABELS, ROUTES } from '@/data/routes';
import { Link, useLocation } from 'react-router-dom';
import { getIsAuthorizedFromSessionStorage } from '@/utils/customerUtils';
import ProfileModal from './ProfileModal';
import headerBg from '@/assets/footer.png';
import registerIcon from '@/assets/register-icon.svg';

function Header() {
  const location = useLocation();
  const isMainPage = location.pathname === ROUTES.main;
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const userIconRef = useRef(null);
  const isAuthorized = getIsAuthorizedFromSessionStorage();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const toggleProfile = () => setIsProfileOpen((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        userIconRef.current &&
        !(profileRef.current as HTMLElement).contains(event.target as Node) &&
        !(userIconRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsProfileOpen(false);
  }, [location]);

  return (
    <div
      className="z-10 w-full flex justify-between items-center pt-2 px-4 ${
        !isMainPage ? 'relative' : ''
      }"
      style={
        !isMainPage
          ? {
              backgroundImage: `url(${headerBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '115px',
              top: 0,
            }
          : undefined
      }
    >
      <div>
        <Link to={ROUTES.main}>
          <img src={logo} alt="logo" className="w-[80px] h-[80px]" />
        </Link>
      </div>

      <div className="max-[900px]:hidden">
        <Nav />
      </div>

      <div className="flex justify-center items-center ">
        <div>
          <Link to={ROUTES.cart}>
            <img src={cart} alt="cart" className="w-8 mr-5" />
          </Link>
        </div>

        {isAuthorized ? (
          <div ref={userIconRef} onClick={toggleProfile} className="relative cursor-pointer">
            <img src={userIcon} alt="userIcon" className="w-10 h-10" />
            {isProfileOpen && (
              <div ref={profileRef} className="absolute top-[70px] right-[-20px]">
                <ProfileModal />
              </div>
            )}
          </div>
        ) : (
          <div className="flex ">
            <Link
              to={ROUTES.login}
              className="ml-3 group flex items-center justify-center gap-2 w-fit mx-auto uppercase bg-LightTaupe text-white px-6 py-2 rounded-md text-lg font-medium transition-transform duration-500 ease-in-out hidden min-[900px]:flex"
            >
              <img src={loginIcon} alt="Login icon" className="w-5 h-5" />
              <span className="transition-transform duration-500 ease-in-out group-hover:scale-110">
                {LABELS.login}
              </span>
            </Link>
            <Link
              to={ROUTES.register}
              onClick={closeMenu}
              className="ml-3 group flex items-center justify-center gap-2 w-fit mx-auto uppercase bg-LightTaupe text-white px-6 py-2 rounded-md text-lg font-medium transition-transform duration-500 ease-in-out hidden min-[900px]:flex"
            >
              <img src={registerIcon} alt="Register icon" className="w-5 h-5" />
              <span className="transition-transform duration-500 ease-in-out group-hover:scale-110">
                {LABELS.register}
              </span>
            </Link>
          </div>
        )}

        <div className="flex justify-center items-center px-5">
          <img
            src={burger}
            onClick={toggleMenu}
            alt="Burger-icon"
            className="hidden w-8 max-[900px]:flex cursor-pointer"
          />
        </div>
      </div>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen z-10 flex">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMenu} />
          <div className="relative z-20 bg-LightTaupe w-[70%] h-full flex flex-col justify-center items-center gap-8">
            <img
              src={close}
              alt="Close-icon"
              onClick={closeMenu}
              className="w-8 absolute top-5 right-5 cursor-pointer"
            />
            <Nav isVertical onItemClick={closeMenu} />
            {isAuthorized ? (
              ''
            ) : (
              <div className="mt-8">
                <Link
                  to={ROUTES.login}
                  className="group uppercase bg-LightTaupe px-3 py-1.5 rounded-md text-base text-white flex items-center gap-1.5 transition-all duration-500 ease-in-out hover:scale-[1.03] hover:bg-[#bc8f7a]"
                >
                  <img
                    src={loginIcon}
                    alt="Login icon"
                    className="w-4 h-4 transition-opacity duration-500 group-hover:opacity-90"
                  />
                  {LABELS.login}
                </Link>

                <Link
                  to={ROUTES.register}
                  className="group uppercase bg-LightTaupe px-3 py-1.5 rounded-md text-base text-white flex items-center gap-1.5 transition-all duration-500 ease-in-out hover:scale-[1.03] hover:bg-[#bc8f7a]"
                >
                  <img
                    src={registerIcon}
                    alt="Register icon"
                    className="w-4 h-4 transition-opacity duration-500 group-hover:opacity-90"
                  />
                  {LABELS.register}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
