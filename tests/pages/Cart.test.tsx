import { render, screen } from '@testing-library/react';
import Cart from '@/pages/Cart';

describe('Cart Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Cart component with correct content', () => {
    render(<Cart />);

    expect(screen.getByText('cart')).toBeInTheDocument();
  });

  test('renders container div', () => {
    render(<Cart />);

    const containerDiv = screen.getByText('cart');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.tagName).toBe('DIV');
  });
});
