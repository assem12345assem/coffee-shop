import { render, screen } from '@testing-library/react';
import Contact from '@/pages/Contact';

describe('Contact Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Contact component with correct content', () => {
    render(<Contact />);

    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders container div', () => {
    render(<Contact />);

    const containerDiv = screen.getByText('Contact');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.tagName).toBe('DIV');
  });
});
