import React from 'react';
import { Link } from 'react-router-dom';
import { LABELS, ROUTES } from '@/data/routes';

interface NavProps {
  isVertical?: boolean;
  onItemClick?: () => void;
}

export const Nav: React.FC<NavProps> = ({ isVertical = false, onItemClick }) => {
  const menuItems = [
    { route: ROUTES.main, label: LABELS.home },
    { route: ROUTES.about, label: LABELS.about },
    { route: ROUTES.menu, label: LABELS.menu },
    { route: ROUTES.products, label: LABELS.products },
    { route: ROUTES.locations, label: LABELS.locations },
  ];

  return (
    <nav className="">
      <ul className={`flex ${isVertical ? 'flex-col' : 'flex-row'}  items-center gap-8 text-white text-lg`}>
        {menuItems.map((item) => (
          <li key={item.route}>
            <Link to={item.route} className="uppercase" onClick={onItemClick}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
