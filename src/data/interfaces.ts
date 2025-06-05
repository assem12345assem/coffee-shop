import type { Cart } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/cart';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type { ChangeEvent, ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, RefObject } from 'react';
import type React from 'react';
import type { CustomFields } from '@commercetools/platform-sdk';

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
  country: string;
  useAsDefault?: boolean;
}

export interface User {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
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
  triggerValidation?: () => void;
  initialValue?: StringOrNull;
  setErrorExternally?: (error?: string) => void;
}
export interface InputProps {
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  className?: string;
  onChange?: (val: string) => void;
  validate?: (value: string) => string | null;
  initialValue?: string | CustomFields | undefined;
  readOnly?: boolean;
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
  defaultShipping?: boolean;
  defaultBilling?: boolean;
}

export interface SessionUser {
  customerId: string;
  customerVersion: string;
}

export enum CoffeeType {
  hot = 'Hot',
  iced = 'Cold',
}
export enum CategoryType {
  normal_coffee = 'Regular Coffee',
  iced_coffee = 'Chilled Coffee',
  luxury_coffee = 'Luxury Coffee',
}
export interface ProductInteface {
  id: string;
  name: string;
  price: number;
  description: string;
  type: CoffeeType;
  ingredients: string[];
  is_sale: boolean;
  sale_percent: number;
  category: CategoryType;
  images: string[];
  sku: string;
  key: string;
}
export interface ProductSliderProps {
  product: ProductInteface;
}
export type SortField = 'name' | 'price' | 'type';
export type SortOrder = 'asc' | 'desc';
export interface Pagination {
  offset: number;
  limit: number;
}

export interface Filter {
  category?: string;
  isSale?: boolean;
  type?: 'hot' | 'cold';
}

export type Subscriber = VoidFunction;
export type SortValues = 1 | -1;
export interface PaginationHandle {
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  reset: () => void;
  getCurrentPage: () => number;
  getPageSize: () => number;
  setPageSize: (size: number) => void;
}

export interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  initialPageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export interface SearchComponentHandle {
  getValue: () => string;
  clear: () => void;
}

export interface SearchComponentProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
export interface SortingComponentProps {
  initialField?: SortField;
  initialOrder?: SortOrder;
  onSortChange?: (field: SortField, order: SortOrder) => void;
}
export interface PersonalInfoProps {
  customerInputRefs: RefObject<Record<string, HTMLInputElement | HTMLSelectElement | null>>; // Define expected element types
  customer: Customer;
  handleInputChange: (field: string, value: string) => void;
  validationFunctions: Record<string, (...args: unknown[]) => string | null>; // Use `unknown` for safer types
  isEditing: boolean;
}

export type ValidCustomerAction =
  | 'setDateOfBirth'
  | 'changeEmail'
  | 'changeAddress'
  | 'addAddress'
  | 'addBillingAddressId'
  | 'addCustomerGroupAssignment'
  | 'addShippingAddressId'
  | 'addStore'
  | 'removeAddress'
  | 'setVatId'
  | 'setDefaultShippingAddress'
  | 'setAddressCustomType'
  | 'setAuthenticationMode'
  | 'removeBillingAddressId'
  | 'removeShippingAddressId'
  | 'removeStore'
  | 'setAddressCustomField'
  | 'setCompanyName'
  | 'setCustomField'
  | 'setCustomType'
  | 'setCustomerGroup'
  | 'setCustomerNumber'
  | 'setDefaultBillingAddress';

export interface AddressRefs {
  postalCode?: HTMLInputElement;
  country?: HTMLSelectElement;
  streetName?: HTMLInputElement;
  countryName?: HTMLSelectElement;
}
export type CustomerPersonalFields = 'firstName' | 'lastName' | 'dateOfBirth' | 'email';
export interface CustomInput extends HTMLInputElement {
  getValue: () => string;
}
