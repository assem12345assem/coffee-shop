import { render, screen } from '@testing-library/react';
import Profile from '@/pages/Profile';

describe('Profile Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Profile component with correct content', () => {
    render(<Profile />);

    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  test('renders container div', () => {
    render(<Profile />);

    const containerDiv = screen.getByText('Profile');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.tagName).toBe('DIV');
  });
});
