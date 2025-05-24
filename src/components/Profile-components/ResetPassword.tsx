import type { FormRefItem, InputHandle } from '@/data/interfaces';
import React, { type FormEvent, useRef, useState } from 'react';
import { normalizeInput } from '@/utils/customerUtils';
import { requestPasswordResetToken, resetCustomerPassword } from '@/api/customers';
import { validateEmail, validatePassword } from '@/utils/validation';
import Input from '@/components/Login-registration-components/Input';
import { FormElements } from '@/data/constants';
import Button from '@/components/Login-registration-components/Button';
import PasswordInput from '@/components/Login-registration-components/PasswordInput';
import { ErrorNotification, SuccessNotification } from '@/components/Popup-components/NotificationBanners';
import handleApiError from '@/utils/handleApiError';
import { ROUTES } from '@/data/routes';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const emailRef: FormRefItem = useRef<InputHandle>(null);
  const passwordRef: FormRefItem = useRef<InputHandle>(null);
  const confirmPasswordRef: FormRefItem = useRef<InputHandle>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [tokenValue, setTokenValue] = useState<string | null>(null);

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiErrorMessage(null);
    setShowSuccess(null);
    setLoading(true);

    try {
      const email = normalizeInput(emailRef.current?.getValue?.() ?? '');
      const customerToken = await requestPasswordResetToken(email);
      setTokenValue(customerToken.value);
    } catch (error: unknown) {
      setApiErrorMessage(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiErrorMessage(null);
    setShowSuccess(null);
    setLoading(true);

    const newPassword = normalizeInput(passwordRef.current?.getValue?.() ?? '');
    const confirmPassword = normalizeInput(confirmPasswordRef.current?.getValue?.() ?? '');

    if (newPassword !== confirmPassword) {
      setApiErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }

    if (validatePassword(newPassword)) {
      setApiErrorMessage('Password does not meet security requirements.');
      setLoading(false);
      return;
    }

    try {
      const changedUser = await resetCustomerPassword(tokenValue!, newPassword);
      if (changedUser?.id) {
        setShowSuccess('Your password has been reset.');
        setTimeout(() => {
          navigate(ROUTES.login);
        }, 2000);
      }
    } catch (error: unknown) {
      setApiErrorMessage(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      {!tokenValue ? (
        <form onSubmit={handleEmailSubmit}>
          <Input
            ref={emailRef}
            label={FormElements.email.label}
            type={FormElements.email.type}
            placeholder={FormElements.email.placeholder}
            validate={validateEmail}
          />
          <Button type="submit" label={loading ? 'Submitting...' : 'Confirm'} className="mt-5" />
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <PasswordInput ref={passwordRef} showForgotPassword={false} placeholder="Enter new password" />
          <PasswordInput ref={confirmPasswordRef} showForgotPassword={false} placeholder="Confirm new password" />
          <Button type="submit" label={loading ? 'Submitting...' : 'Confirm'} className="mt-5" />
        </form>
      )}

      <SuccessNotification successMessage={showSuccess} onClear={() => setShowSuccess(null)} />
      <ErrorNotification errorMessage={apiErrorMessage} onClear={() => setApiErrorMessage(null)} />
    </div>
  );
};
export default ResetPassword;
