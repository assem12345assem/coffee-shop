import { render, screen } from '@testing-library/react';
import About from '@/pages/About';

describe('About Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders About component with correct content', () => {
    render(<About />);

    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders container div', () => {
    render(<About />);

    const containerDiv = screen.getByText('About');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.tagName).toBe('DIV');
  });
});
