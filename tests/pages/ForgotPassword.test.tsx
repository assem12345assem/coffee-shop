import { render, screen } from '@testing-library/react';
import ForgotPassword from '@/pages/ForgotPassword';

describe('ForgotPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders ForgotPassword component with correct content', () => {
    render(<ForgotPassword />);

    expect(screen.getByText('ForgotPassword')).toBeInTheDocument();
  });

  test('renders container div', () => {
    render(<ForgotPassword />);

    const containerDiv = screen.getByText('ForgotPassword');
    expect(containerDiv).toBeInTheDocument();
    expect(containerDiv.tagName).toBe('DIV');
  });
});
