import { render, screen } from '@testing-library/react';
import Menu from '@/pages/Menu';

describe('Menu Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Menu component with correct content', () => {
    render(<Menu />);

    expect(screen.getByText('Menu')).toBeInTheDocument();
  });

  test('renders container div', () => {
    render(<Menu />);

    const containerDiv = screen.getByText('Menu');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.tagName).toBe('DIV');
  });
});
