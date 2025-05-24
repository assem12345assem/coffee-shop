import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '@/components/Footer-components/Footer';
import { footerNavList, LABELS, ROUTES } from '@/data/routes';

jest.mock('@/assets/footer.png', () => 'mocked-footer-image.png');
jest.mock('@/assets/logo.svg', () => 'mocked-logo.svg');

jest.mock('@/data/routes', () => ({
  footerNavList: [
    { label: 'Home', route: '/' },
    { label: 'About', route: '/about' },
    { label: 'Services', route: '/services' },
  ],
  LABELS: {
    contact: 'Contact Us',
  },
  ROUTES: {
    contact: '/contact',
  },
}));

describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
  });

  it('renders without crashing', () => {
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders navigation links correctly', () => {
    footerNavList.forEach((item) => {
      const linkElement = screen.getByText(item.label);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute('href', item.route);
    });
  });

  it('renders contact information correctly', () => {
    const contactLink = screen.getByText(LABELS.contact);
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', ROUTES.contact);

    const address = screen.getByText('25 Dockhead, London SE1 2BS');
    expect(address).toBeInTheDocument();

    const phoneLink = screen.getByText('tel:020 7131 3535');
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute('href', 'tel:02071313535');
  });

  it('renders logo with correct attributes', () => {
    const logoImage = screen.getByAltText('logo');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', 'mocked-logo.svg');
    expect(logoImage).toHaveClass('w-[120px]');
  });

  it('applies correct background image style', () => {
    const footerDiv = screen.getByRole('contentinfo');
    expect(footerDiv).toHaveStyle({ backgroundImage: 'url(mocked-footer-image.png)' });
  });
});
