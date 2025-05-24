import React from 'react';
import footerImage from '@/assets/footer.png';
import { Link } from 'react-router-dom';
import { footerNavList, LABELS, ROUTES } from '@/data/routes';
import logo from '@/assets/logo.svg';

function Footer() {
  return (
    <footer className="w-full bg-cover bg-center " style={{ backgroundImage: `url(${footerImage})` }}>
      <div className="bg-[rgba(29,23,20,0.84)] w-full h-full flex flex-col md:flex-row justify-between items-start gap-12 px-6 py-12 md:px-[100px] md:py-[100px]">
        <nav>
          <ul className="flex flex-col gap-4 text-white text-base sm:text-lg md:text-[20px]">
            {footerNavList.map((item) => (
              <li key={item.route}>
                <Link to={item.route} className="uppercase">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col gap-4 text-white text-base sm:text-lg md:text-[20px]">
          <Link to={ROUTES.contact}>{LABELS.contact}</Link>
          <p>25 Dockhead, London SE1 2BS</p>
          <a href="tel:02071313535">tel:020 7131 3535</a>
        </div>

        {/* Logo */}
        <div className="mt-4 md:mt-0">
          <a href="/">
            <img src={logo} alt="logo" className="w-[120px] sm:w-[160px] md:w-auto" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
