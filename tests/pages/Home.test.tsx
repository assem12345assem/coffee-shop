import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/Home';

jest.mock('@/components/homePage-components/HomePageHero', () => jest.fn(() => <div>HomePageHero</div>));
jest.mock('@/components/homePage-components/Bartons', () => jest.fn(() => <div>Bartons</div>));
jest.mock('@/components/homePage-components/OpeningHours', () => jest.fn(() => <div>OpeningHours</div>));
jest.mock('@/components/homePage-components/OurMenu', () => jest.fn(() => <div>OurMenu</div>));
jest.mock('@/components/homePage-components/Review', () => jest.fn(() => <div>Review</div>));
jest.mock('@/components/homePage-components/LocationSection', () => jest.fn(() => <div>LocationSection</div>));

describe('HomePage Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders HomePage component with all child pages', () => {
    render(<HomePage />);

    expect(screen.getByText('HomePageHero')).toBeInTheDocument();
    expect(screen.getByText('Bartons')).toBeInTheDocument();
    expect(screen.getByText('OpeningHours')).toBeInTheDocument();
    expect(screen.getByText('OurMenu')).toBeInTheDocument();
    expect(screen.getByText('Review')).toBeInTheDocument();
    expect(screen.getByText('LocationSection')).toBeInTheDocument();
  });

  test('renders child pages in correct order', () => {
    render(<HomePage />);

    const container = screen.getByText('HomePageHero').parentElement;
    const children = container?.children;

    expect(children?.[0]).toHaveTextContent('HomePageHero');
    expect(children?.[1]).toHaveTextContent('Bartons');
    expect(children?.[2]).toHaveTextContent('OpeningHours');
    expect(children?.[3]).toHaveTextContent('OurMenu');
    expect(children?.[4]).toHaveTextContent('Review');
    expect(children?.[5]).toHaveTextContent('LocationSection');
  });
});
