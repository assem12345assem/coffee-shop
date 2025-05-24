import React, { type FormEvent, useRef, useState } from 'react';
import { useRegistration } from '@/utils/useRegistration';
import { isErrorFree } from '@/utils/formUtils';
import type { FormRefItem, InputHandle, RegistrationFormItems } from '@/data/interfaces';
import handleApiError from '@/utils/handleApiError';
import Input from '@/components/Login-registration-components/Input';
import {
  validateCity,
  validateCountry,
  validateDOB,
  validateEmail,
  validateName,
  validatePostalCode,
  validateStreet,
} from '@/utils/validation';
import DefaultAddressCheckbox from '@/components/Profile-components/DefaultAddressCheckbox';
import PasswordInput from '@/components/Login-registration-components/PasswordInput';
import Button from '@/components/Login-registration-components/Button';
import AuthRedirectMessage from '@/components/Login-registration-components/AuthRedirectMessage';
import { ROUTES } from '@/data/routes';
import { ErrorNotification, SuccessNotification } from '@/components/Popup-components/NotificationBanners';
import { AuthRedirect, FormElements } from '@/data/constants';
import { createCustomerDraft, processCustomerDraftProps } from '@/utils/customerUtils';
import type { CustomerDraft } from '@commercetools/platform-sdk';
import { useAuth } from '@/utils/useAuth';
const RegistrationFormComponent = () => {
  const [loading, setLoading] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [useSameAddress, setUseSameAddress] = useState(true);

  const { register } = useRegistration();

  const emailRef: FormRefItem = useRef<InputHandle>(null);
  const passwordRef: FormRefItem = useRef<InputHandle>(null);
  const firstNameRef: FormRefItem = useRef<InputHandle>(null);
  const lastNameRef: FormRefItem = useRef<InputHandle>(null);
  const dobRef: FormRefItem = useRef<InputHandle>(null);
  const streetRef: FormRefItem = useRef<InputHandle>(null);
  const cityRef: FormRefItem = useRef<InputHandle>(null);
  const postalCodeRef: FormRefItem = useRef<InputHandle>(null);
  const countryRef: FormRefItem = useRef<InputHandle>(null);

  const shippingStreetRef: FormRefItem = useRef<InputHandle>(null);
  const shippingCityRef: FormRefItem = useRef<InputHandle>(null);
  const shippingPostalCodeRef: FormRefItem = useRef<InputHandle>(null);
  const shippingCountryRef: FormRefItem = useRef<InputHandle>(null);

  const country: string = countryRef.current?.getValue() ?? '';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setApiErrorMessage(null);
    setShowSuccess(null);

    if (
      !isErrorFree(
        emailRef,
        passwordRef,
        firstNameRef,
        lastNameRef,
        dobRef,
        streetRef,
        cityRef,
        postalCodeRef,
        countryRef,
        ...(useSameAddress ? [] : [shippingStreetRef, shippingCityRef, shippingPostalCodeRef, shippingCountryRef])
      )
    )
      return;

    const props: RegistrationFormItems = processCustomerDraftProps(
      firstNameRef,
      lastNameRef,
      dobRef,
      streetRef,
      cityRef,
      postalCodeRef,
      countryRef,
      emailRef,
      passwordRef,
      useSameAddress,
      shippingStreetRef,
      shippingCityRef,
      shippingPostalCodeRef,
      shippingCountryRef
    );

    const draft: CustomerDraft = createCustomerDraft(props);

    try {
      setLoading(true);
      await register(draft);
      setShowSuccess('Register successful');
    } catch (error: unknown) {
      setApiErrorMessage(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col items-start gap-5 w-full" onSubmit={handleSubmit}>
      <div className="flex gap-4 w-full">
        <Input
          ref={firstNameRef}
          label={FormElements.firstName.label}
          placeholder={FormElements.firstName.placeholder}
          validate={validateName}
        />
        <Input
          ref={lastNameRef}
          label={FormElements.lastName.label}
          placeholder={FormElements.lastName.placeholder}
          validate={validateName}
        />
      </div>

      <Input ref={dobRef} label={FormElements.dob.label} type={FormElements.dob.type} validate={validateDOB} />

      <div className="flex flex-col w-full">
        <label className="font-semibold text-base mb-1">Billing Address</label>

        <div className="flex gap-4 mt-2">
          <Input
            ref={streetRef}
            label={FormElements.street.label}
            placeholder={FormElements.street.placeholder}
            validate={validateStreet}
          />
          <Input
            ref={cityRef}
            label={FormElements.city.label}
            placeholder={FormElements.city.placeholder}
            validate={validateCity}
          />
        </div>

        <div className="flex gap-4 mt-4">
          <Input
            ref={postalCodeRef}
            label={FormElements.postalCode.label}
            placeholder={FormElements.postalCode.placeholder}
            validate={(val) => validatePostalCode(val, country)}
          />
          <Input
            ref={countryRef}
            label={FormElements.country.label}
            placeholder={FormElements.country.placeholder}
            validate={validateCountry}
          />
        </div>
      </div>

      <DefaultAddressCheckbox checked={useSameAddress} onChange={setUseSameAddress} />

      {!useSameAddress && (
        <div className="flex flex-col w-full mt-4">
          <label className="font-semibold text-base mb-1">Shipping Address</label>

          <div className="flex gap-4 mt-2">
            <Input ref={shippingStreetRef} label="Street" placeholder="Shipping street" validate={validateStreet} />
            <Input ref={shippingCityRef} label="City" placeholder="Shipping city" validate={validateCity} />
          </div>

          <div className="flex gap-4 mt-4">
            <Input
              ref={shippingPostalCodeRef}
              label="Postal Code"
              placeholder="Shipping postal code"
              validate={(val) => validatePostalCode(val, shippingCountryRef.current?.getValue() ?? '')}
            />
            <Input ref={shippingCountryRef} label="Country" placeholder="Shipping country" validate={validateCountry} />
          </div>
        </div>
      )}

      <Input
        ref={emailRef}
        label={FormElements.email.label}
        type={FormElements.email.type}
        placeholder={FormElements.email.placeholder}
        validate={validateEmail}
      />

      <PasswordInput ref={passwordRef} showForgotPassword={false} />

      <Button
        type="submit"
        label={loading ? 'Creating account...' : 'Create account'}
        className="mt-5"
        disabled={loading}
      />

      <AuthRedirectMessage
        message={AuthRedirect.registerPage.question}
        label={AuthRedirect.registerPage.label}
        to={ROUTES.login}
      />

      <SuccessNotification successMessage={showSuccess} onClear={() => setShowSuccess(null)} />
      <ErrorNotification errorMessage={apiErrorMessage} onClear={() => setApiErrorMessage(null)} />
    </form>
  );
};

export default RegistrationFormComponent;
