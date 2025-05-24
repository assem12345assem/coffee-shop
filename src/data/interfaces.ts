import type { Cart } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type { ChangeEvent, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, RefObject } from 'react';
import type React from 'react';

export interface Country {
  code: string;
  name: string;
}

export const countries: Country[] = [
  {
    code: 'GE',
    name: 'Georgia',
  },
  {
    code: 'UZ',
    name: 'Uzbekistan',
  },
  {
    code: 'KG',
    name: 'Kyrgyzstan',
  },
  {
    code: 'AU',
    name: 'Australia',
  },
  {
    code: 'UK',
    name: 'United Kingdom',
  },
  {
    code: 'CA',
    name: 'Canada',
  },
  {
    code: 'US',
    name: 'United States',
  },
];

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const currencies: Currency[] = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
  },
];

export interface Language {
  code: string;
  name: string;
  locale: string;
}

export const languages: Language[] = [
  {
    code: 'en',
    name: 'English (United States)',
    locale: 'en-US',
  },
];
export type ProductType = 'Coffee' | 'Tea' | 'Smoothies';

export const productTypes: ProductType[] = ['Coffee', 'Tea', 'Smoothies'];

export interface Address {
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string; // ISO 3166-1 alpha-2 code (e.g., 'GE')
  useAsDefault?: boolean; // Optional: true = use for shipping/billing
}

export interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string; // Format: YYYY-MM-DD
  address?: Address;
}

export interface ApiError {
  statusCode?: number;
  message?: string;
  errors?: { code: string; message: string }[];
}

export interface CommercetoolsSdkError {
  body?: ApiError;
  message?: string;
  statusCode?: number;
}

export interface PopupProps {
  message: string;
  onClose?: () => void;
  autoDismissMs?: number;
}

export interface SignInResponse {
  customer: Customer;
  cart?: Cart;
}

export type VoidFunction = () => void;
export type VoidFunctionOrUndefined = VoidFunction | undefined;
export type StringOrNull = string | null;
export type StringOrUndefined = string | undefined;
export type StringFunction = () => string;

export type ErrorNotificationType = ({
  errorMessage,
  onClear,
  autoDismissMs,
}: {
  errorMessage: StringOrNull;
  onClear: VoidFunctionOrUndefined;
  autoDismissMs?: number;
}) => React.ReactElement | null;

export type SuccessNotificationType = ({
  successMessage,
  onClear,
}: {
  successMessage: StringOrNull;
  onClear: VoidFunctionOrUndefined;
}) => React.ReactElement | null;

export interface InputHandle {
  getValue: StringFunction;
  getError: StringFunction;
  setValueExternally: (value: string) => void;
}
export interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (val: string) => void;
  validate?: (value: string) => string | null;
}
export type RefInputType = ForwardRefExoticComponent<PropsWithoutRef<InputProps> & RefAttributes<InputHandle>>;
export type HandleInputType = (e: ChangeEvent<HTMLInputElement>) => void;
export type RefPropType = ((instance: InputHandle | null) => void) | RefObject<InputHandle | null> | null;
export type PasswordInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  showForgotPassword?: boolean;
  placeholder?: string;
};
export type RefPasswordInputType = ForwardRefExoticComponent<
  PropsWithoutRef<PasswordInputProps> & RefAttributes<InputHandle>
>;
export type FormRefItem = RefObject<InputHandle | null>;
export interface RegistrationFormOutputItems {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  countryName: string;
  email: string;
  password: string;
  useAsDefaultAddress: boolean;
}
export interface RegistrationFormItems {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  street: string;
  city: string;
  postalCode: string;
  countryName: string;
  email: string;
  password: string;
  useSameAddress: boolean;
  shippingStreet: string;
  shippingCity: string;
  shippingPostalCode: string;
  shippingCountry: string;
}

export interface SessionUser {
  customerId: string;
  customerVersion: string;
}
