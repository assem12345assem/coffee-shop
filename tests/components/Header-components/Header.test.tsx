import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '@/components/Header-components/Header';
import { getIsAuthorizedFromSessionStorage } from '@/utils/customerUtils';

jest.mock('@/assets/logo.svg', () => 'logo.svg');
jest.mock('@/assets/cart.png', () => 'cart.png');
jest.mock('@/assets/burger.png', () => 'burger.png');
jest.mock('@/assets/close.png', () => 'close.png');
jest.mock('@/assets/user-Prifile-icon.png', () => 'user-Prifile-icon.png');
jest.mock('@/assets/login.png', () => 'login.png');
jest.mock('@/utils/customerUtils', () => ({
  getIsAuthorizedFromSessionStorage: jest.fn(),
}));

describe('Header Component', () => {
  it('renders logo and navigation items', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByAltText('cart')).toBeInTheDocument();
    expect(screen.getByAltText('Burger-icon')).toBeInTheDocument();
  });

  it('shows login button when user is not authorized', () => {
    (getIsAuthorizedFromSessionStorage as jest.Mock).mockReturnValue(false);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
    expect(screen.queryByAltText('userIcon')).not.toBeInTheDocument();
  });

  it('shows profile icon when user is authorized', () => {
    (getIsAuthorizedFromSessionStorage as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByAltText('userIcon')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /login/i })).not.toBeInTheDocument();
  });

  it('toggles profile modal when clicking user icon', () => {
    (getIsAuthorizedFromSessionStorage as jest.Mock).mockReturnValue(true);

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const userIcon = screen.getByAltText('userIcon');
    fireEvent.click(userIcon);
    expect(screen.getByText(/Profile/i)).toBeInTheDocument();

    fireEvent.mouseDown(document.body);

    expect(screen.queryByText(/Profile/i)).not.toBeInTheDocument();
  });
});
