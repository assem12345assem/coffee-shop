import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProfileModal from '@/components/Header-components/ProfileModal';
import { logoutUser } from '@/utils/customerUtils';

jest.mock('@/utils/customerUtils', () => ({
  logoutUser: jest.fn(),
}));

describe('ProfileModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <MemoryRouter>
        <ProfileModal />
      </MemoryRouter>
    );
  });

  it('renders without crashing', () => {
    const modalElement = screen.getByRole('dialog', { hidden: true });
    expect(modalElement).toBeInTheDocument();
  });

  it('renders Profile link with correct attributes', () => {
    const profileLink = screen.getByText('Profile');
    expect(profileLink).toBeInTheDocument();
    expect(profileLink).toHaveAttribute('href', '/profile');
    expect(profileLink).toHaveClass('text-americanSilver hover:text-white transition-colors duration-200');
  });

  it('renders Log Out button with correct attributes', () => {
    const logoutButton = screen.getByText('Log Out');
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveClass('text-americanSilver hover:text-white transition-colors duration-200');
  });

  it('calls logoutUser when Log Out button is clicked', () => {
    const logoutButton = screen.getByText('Log Out');
    fireEvent.click(logoutButton);
    expect(logoutUser).toHaveBeenCalledTimes(1);
  });

  it('applies correct styling to the modal container', () => {
    const modalElement = screen.getByRole('dialog', { hidden: true });
    expect(modalElement).toHaveClass(
      'w-[200px] bg-brown p-6 flex flex-col items-center gap-4 rounded-xl shadow-lg animate-slideFade z-50'
    );
  });
});
