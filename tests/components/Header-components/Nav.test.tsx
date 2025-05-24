import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Nav } from '@/components/Header-components/Nav';
import { LABELS, ROUTES } from '@/data/routes';

jest.mock('@/data/routes', () => ({
  LABELS: {
    home: 'Home',
    about: 'About',
    menu: 'Menu',
    products: 'Products',
    locations: 'Locations',
  },
  ROUTES: {
    main: '/',
    about: '/about',
    menu: '/menu',
    products: '/products',
    locations: '/locations',
  },
}));

describe('Nav Component', () => {
  const defaultProps = {
    isVertical: false,
    onItemClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders navigation links correctly', () => {
    render(
      <MemoryRouter>
        <Nav {...defaultProps} />
      </MemoryRouter>
    );

    const menuItems = [
      { label: LABELS.home, route: ROUTES.main },
      { label: LABELS.about, route: ROUTES.about },
      { label: LABELS.menu, route: ROUTES.menu },
      { label: LABELS.products, route: ROUTES.products },
      { label: LABELS.locations, route: ROUTES.locations },
    ];

    menuItems.forEach((item) => {
      const linkElement = screen.getByText(item.label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', item.route);
      expect(linkElement).toHaveClass('uppercase');
    });
  });

  it('renders with horizontal layout when isVertical is false', () => {
    render(
      <MemoryRouter>
        <Nav {...defaultProps} isVertical={false} />
      </MemoryRouter>
    );

    const navList = screen.getByRole('list');
    expect(navList).toHaveClass('flex-row');
    expect(navList).not.toHaveClass('flex-col');
  });

  it('renders with vertical layout when isVertical is true', () => {
    render(
      <MemoryRouter>
        <Nav {...defaultProps} isVertical={true} />
      </MemoryRouter>
    );

    const navList = screen.getByRole('list');
    expect(navList).toHaveClass('flex-col');
    expect(navList).not.toHaveClass('flex-row');
  });

  it('calls onItemClick when a navigation link is clicked', () => {
    render(
      <MemoryRouter>
        <Nav {...defaultProps} />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(LABELS.home);
    fireEvent.click(homeLink);
    expect(defaultProps.onItemClick).toHaveBeenCalledTimes(1);
  });

  it('renders correctly when onItemClick is not provided', () => {
    render(
      <MemoryRouter>
        <Nav isVertical={false} />
      </MemoryRouter>
    );

    const homeLink = screen.getByText(LABELS.home);
    fireEvent.click(homeLink);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});
