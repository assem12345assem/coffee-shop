import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../../src/pages/NotFoundPage';

jest.mock('../../src/components/Login-registration-components/BackButton', () => () => <button>Back</button>);
jest.mock('../../src/components/NotFound-components/SearchBar', () => () => <input placeholder="Search..." />);
jest.mock('@/assets/coffee-illustration.png', () => 'file stub');

describe('NotFoundPage', () => {
  it('renders the "Page Not Found" heading', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });

  it('renders the back button', () => {
    render(<NotFoundPage />);
    expect(screen.getByText(/back/i)).toBeInTheDocument();
  });

  it('renders the search bar', () => {
    render(<NotFoundPage />);
    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
  });

  it('renders the image with alt text "Not Found"', () => {
    render(<NotFoundPage />);
    expect(screen.getByAltText(/not found/i)).toBeInTheDocument();
  });
});
