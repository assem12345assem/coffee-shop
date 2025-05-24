import { renderHook, act } from '@testing-library/react';
import { useRegistration } from '@/utils/useRegistration';
import { registerCustomer } from '@/api/customers';
import { saveLoggedInUserToSessionStorage } from '@/utils/customerUtils';
import { processPurchase } from '@/utils/processPurchase';

const ROUTES = {
  cart: '/cart',
  login: '/login',
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

jest.mock('@/api/customers', () => ({
  registerCustomer: jest.fn(),
}));

jest.mock('@/utils/customerUtils', () => ({
  saveLoggedInUserToSessionStorage: jest.fn(),
}));

jest.mock('@/utils/processPurchase', () => ({
  processPurchase: jest.fn(),
}));

describe('useRegistration hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('registers customer and navigates to cart when cart is present', async () => {
    const mockCustomer = { id: '123', name: 'John Doe' };
    const mockCart = { id: '456', items: [] };
    (registerCustomer as jest.Mock).mockResolvedValue({ customer: mockCustomer, cart: mockCart });

    const { result } = renderHook(() => useRegistration());
    await act(async () => {
      await result.current.register({ email: 'test@example.com', password: 'password' });
      jest.runAllTimers();
    });

    expect(registerCustomer).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(saveLoggedInUserToSessionStorage).toHaveBeenCalledWith(mockCustomer);
    expect(processPurchase).toHaveBeenCalledWith(mockCart);
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.cart);
  });

  test('registers customer and navigates to main when no cart is present', async () => {
    const mockCustomer = { id: '123', name: 'John Doe' };
    (registerCustomer as jest.Mock).mockResolvedValue({ customer: mockCustomer, cart: null });

    const { result } = renderHook(() => useRegistration());
    await act(async () => {
      await result.current.register({ email: 'test@example.com', password: 'password' });
      jest.runAllTimers();
    });

    expect(registerCustomer).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(saveLoggedInUserToSessionStorage).toHaveBeenCalledWith(mockCustomer);
    expect(processPurchase).not.toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.login);
  });

  test('throws error and does not navigate when registration fails', async () => {
    const error = new Error('Registration failed');
    (registerCustomer as jest.Mock).mockRejectedValue(error);

    const { result } = renderHook(() => useRegistration());
    await expect(
      act(async () => {
        await result.current.register({ email: 'test@example.com', password: 'password' });
      })
    ).rejects.toThrow('Registration failed');

    expect(registerCustomer).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(saveLoggedInUserToSessionStorage).not.toHaveBeenCalled();
    expect(processPurchase).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
