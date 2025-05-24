import type { NavigateFunction } from 'react-router-dom';
import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { loginCustomer } from '@/api/customers';
import { normalizeInput, saveLoggedInUserToSessionStorage } from '@/utils/customerUtils';
import { ROUTES } from '@/data/routes';
import type { FormRefItem, SignInResponse } from '@/data/interfaces';

export function useAuth(): {
  loginWithRefs: (emailRef: FormRefItem, passwordRef: FormRefItem) => Promise<void>;
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const navigate: NavigateFunction = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  const loginWithRefs = useCallback(
    async (emailRef: FormRefItem, passwordRef: FormRefItem): Promise<void> => {
      const email = normalizeInput(emailRef.current?.getValue?.() ?? '');
      const password = normalizeInput(passwordRef.current?.getValue?.() ?? '');

      const response: SignInResponse = await loginCustomer(email, password);

      if (response.customer) {
        setIsAuthorized(true);
        saveLoggedInUserToSessionStorage(response.customer, true);
        setTimeout(() => {
          navigate(ROUTES.main);
        }, 2000);
      } else {
        setIsAuthorized(false);
        throw new Error('Login failed');
      }
    },
    [navigate]
  );

  return { loginWithRefs, isAuthorized, setIsAuthorized };
}
