import React, { type FormEvent, useRef, useState } from 'react';
import { useAuth } from '@/utils/useAuth';
import { validateEmail } from '@/utils/validation';
import { ErrorNotification, SuccessNotification } from '@/components/Popup-components/NotificationBanners';
import Input from '@/components/Login-registration-components/Input';
import PasswordInput from '@/components/Login-registration-components/PasswordInput';
import Button from '@/components/Login-registration-components/Button';
import AuthRedirectMessage from '@/components/Login-registration-components/AuthRedirectMessage';
import { ROUTES } from '@/data/routes';
import handleApiError from '@/utils/handleApiError';
import type { FormRefItem, InputHandle } from '@/data/interfaces';
import { isErrorFree } from '@/utils/formUtils';
import { AuthRedirect, FormElements } from '@/data/constants';

const LoginFormComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);

  const { loginWithRefs } = useAuth();

  const emailRef: FormRefItem = useRef<InputHandle>(null);
  const passwordRef: FormRefItem = useRef<InputHandle>(null);

  const handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setApiErrorMessage(null);
    setShowSuccess(null);

    if (!isErrorFree(emailRef, passwordRef)) return;

    try {
      setLoading(true);
      await loginWithRefs(emailRef, passwordRef);
      setShowSuccess('Login successful');
    } catch (error: unknown) {
      setApiErrorMessage(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-start gap-5 w-full" onSubmit={handleSubmit}>
      <Input
        ref={emailRef}
        label={FormElements.email.label}
        type={FormElements.email.type}
        placeholder={FormElements.email.placeholder}
        validate={validateEmail}
      />
      <PasswordInput ref={passwordRef} />
      <Button type="submit" label={loading ? 'Logging in...' : 'Login now'} className="mt-5" />
      <AuthRedirectMessage
        message={AuthRedirect.loginPage.question}
        label={AuthRedirect.loginPage.label}
        to={ROUTES.register}
      />

      <SuccessNotification successMessage={showSuccess} onClear={() => setShowSuccess(null)} />
      <ErrorNotification errorMessage={apiErrorMessage} onClear={() => setApiErrorMessage(null)} />
    </form>
  );
};

export default LoginFormComponent;
