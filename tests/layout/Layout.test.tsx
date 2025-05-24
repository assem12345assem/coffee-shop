import { render, screen } from '@testing-library/react';
import Layout from '@/layout/Layout';

jest.mock('@/components/Header-components/Header', () => jest.fn(() => <div>Header</div>));
jest.mock('@/components/Footer-components/Footer', () => jest.fn(() => <div>Footer</div>));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: jest.fn(() => <div>Outlet</div>),
}));

describe('Layout Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Layout component with Header, Outlet, and Footer', () => {
    render(<Layout />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Outlet')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('applies correct classes to Outlet container', () => {
    render(<Layout />);

    const outletContainer = screen.getByText('Outlet').parentElement;
    expect(outletContainer).toHaveAttribute('class', expect.stringContaining('flex-1'));
    expect(outletContainer).toHaveAttribute('class', expect.stringContaining('w-full'));
  });

  test('renders components in correct order', () => {
    render(<Layout />);

    const mainContainer = screen.getByText('Header').parentElement;
    const children = mainContainer?.children;

    expect(children?.[0]).toHaveTextContent('Header');
    expect(children?.[1]).toHaveTextContent('Outlet');
    expect(children?.[2]).toHaveTextContent('Footer');
  });
});
