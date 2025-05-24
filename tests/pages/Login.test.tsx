import { render, screen } from '@testing-library/react';
import LoginPage from '@/pages/Login';

jest.mock('@/components/Login-registration-components/BackButton', () => jest.fn(() => <div>BackButton</div>));
jest.mock('@/components/Login-registration-components/LoginFormComponent', () => jest.fn(() => <div>LoginForm</div>));
jest.mock('@/utils/useRedirect', () => jest.fn(() => <div>UserRedirect</div>));

describe('LoginPage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders LoginPage component with all child components', () => {
    render(<LoginPage />);

    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(screen.getByText('BackButton')).toBeInTheDocument();
    expect(screen.getByText('LoginForm')).toBeInTheDocument();
    expect(screen.getByText('UserRedirect')).toBeInTheDocument();
  });

  test('renders container div with correct styles', () => {
    render(<LoginPage />);

    const outerDiv = screen.getByText('Login to your account').closest('div');
    expect(outerDiv).toHaveAttribute('class', expect.stringContaining('w-full'));
    expect(outerDiv).toHaveAttribute('class', expect.stringContaining('bg-[#e6d7c2]'));
    expect(outerDiv).toHaveAttribute('class', expect.stringContaining('shadow-xl'));
    expect(outerDiv).toHaveAttribute('class', expect.stringContaining('p-8'));
  });

  test('renders BackButton container with correct styles', () => {
    render(<LoginPage />);

    const backButtonContainer = screen.getByText('BackButton').parentElement;
    expect(backButtonContainer).toHaveAttribute('class', expect.stringContaining('w-full'));
    expect(backButtonContainer).toHaveAttribute('class', expect.stringContaining('max-w-7xl'));
    expect(backButtonContainer).toHaveAttribute('class', expect.stringContaining('mx-auto'));
    expect(backButtonContainer).toHaveAttribute('class', expect.stringContaining('mb-6'));
  });

  test('renders heading with correct text and styles', () => {
    render(<LoginPage />);

    const heading = screen.getByText('Login to your account');
    expect(heading).toHaveClass('font-semibold text-4xl mb-8 text-center');
  });
});
