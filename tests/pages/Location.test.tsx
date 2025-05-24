import { render, screen } from '@testing-library/react';
import Location from '@/pages/Location';

describe('Location Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Location component with correct content', () => {
    render(<Location />);

    expect(screen.getByText('Location')).toBeInTheDocument();
  });

  test('renders container div', () => {
    render(<Location />);

    const containerDiv = screen.getByText('Location');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.tagName).toBe('DIV');
  });
});
