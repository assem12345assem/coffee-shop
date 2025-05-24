import { render, screen } from '@testing-library/react';
import Register from '@/pages/Registration';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@/components/Login-registration-components/BackButton', () => jest.fn(() => <div>BackButton</div>));
jest.mock('@/components/Login-registration-components/RegistrationFormComponent', () =>
  jest.fn(() => <div>RegistrationForm</div>)
);

describe('Register Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Register component with correct structure', () => {
    render(<Register />);

    expect(screen.getByText('Create an account')).toBeInTheDocument();
    expect(screen.getByText('BackButton')).toBeInTheDocument();
    expect(screen.getByText('RegistrationForm')).toBeInTheDocument();
  });

  test('applies correct classes to container elements', () => {
    render(<Register />);

    const outerDiv = screen.getByText('Create an account').closest('div');
    expect(outerDiv).toHaveClass('w-full max-w-3xl mx-auto bg-[#e6d7c2] rounded-2xl shadow-xl p-8');

    const innerDiv = screen.getByText('Create an account').parentElement;
    expect(innerDiv).toHaveClass('w-full max-w-3xl mx-auto bg-[#e6d7c2] rounded-2xl shadow-xl p-8');
  });

  test('renders BackButton in fixed position', () => {
    render(<Register />);

    const backButtonContainer = screen.getByText('BackButton').parentElement;
    expect(backButtonContainer).toHaveClass('w-full max-w-7xl mx-auto mb-6');
  });

  test('renders heading with correct text and styles', () => {
    render(<Register />);

    const heading = screen.getByText('Create an account');
    expect(heading).toHaveClass('font-semibold text-4xl mb-8');
  });
});
