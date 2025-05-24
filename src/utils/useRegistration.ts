import { useCallback } from 'react';
import type { NavigateFunction } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { registerCustomer } from '@/api/customers';
import type { CustomerDraft, CustomerSignInResult } from '@commercetools/platform-sdk';
import { ROUTES } from '@/data/routes';

import { processPurchase } from '@/utils/processPurchase';

export function useRegistration(): {
  register: (customerDraft: CustomerDraft) => Promise<void>;
} {
  const navigate: NavigateFunction = useNavigate();

  const register: (customerDraft: CustomerDraft) => Promise<void> = useCallback(
    async (customerDraft: CustomerDraft): Promise<void> => {
      try {
        const response: CustomerSignInResult = await registerCustomer(customerDraft);

        if (response.customer) {
          if (response.cart) {
            processPurchase(response.cart);
            setTimeout((): void => {
              navigate(ROUTES.cart);
            }, 2000);
          } else {
            setTimeout((): void => {
              navigate(ROUTES.login);
            }, 2000);
          }
          console.log(response.customer);
        } else {
          throw new Error('Registration failed: No customer returned.');
        }
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    },
    [navigate]
  );

  return { register };
}
