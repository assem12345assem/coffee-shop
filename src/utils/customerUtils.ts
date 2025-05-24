import type { Customer, CustomerDraft } from '@commercetools/platform-sdk';
import { customerId, customerVersion } from '@/data/constants';
import type { Country, FormRefItem, RegistrationFormItems, SessionUser } from '@/data/interfaces';
import { countries } from '@/data/interfaces';

export function processCustomerDraftProps(
  firstNameRef: FormRefItem,
  lastNameRef: FormRefItem,
  dobRef: FormRefItem,
  streetRef: FormRefItem,
  cityRef: FormRefItem,
  postalCodeRef: FormRefItem,
  countryRef: FormRefItem,
  emailRef: FormRefItem,
  passwordRef: FormRefItem,
  useSameAddress: boolean,
  shippingStreetRef: FormRefItem,
  shippingCityRef: FormRefItem,
  shippingPostalCodeRef: FormRefItem,
  shippingCountryRef: FormRefItem
): RegistrationFormItems {
  return {
    firstName: firstNameRef.current?.getValue() ?? '',
    lastName: lastNameRef.current?.getValue() ?? '',
    dateOfBirth: dobRef.current?.getValue() ?? '',
    street: streetRef.current?.getValue() ?? '',
    city: cityRef.current?.getValue() ?? '',
    postalCode: postalCodeRef.current?.getValue() ?? '',
    countryName: countryRef.current?.getValue() ?? '',
    email: emailRef.current?.getValue() ?? '',
    password: passwordRef.current?.getValue() ?? '',
    useSameAddress,
    shippingStreet: shippingStreetRef?.current?.getValue() ?? '',
    shippingCity: shippingCityRef?.current?.getValue() ?? '',
    shippingPostalCode: shippingPostalCodeRef?.current?.getValue() ?? '',
    shippingCountry: shippingCountryRef?.current?.getValue() ?? '',
  };
}

export function createCustomerDraft(prop: RegistrationFormItems): CustomerDraft {
  const country: string = normalizeCountryInput(prop.countryName);
  const shippingCountry: string = normalizeCountryInput(prop.shippingCountry ?? '');

  const addresses = [
    {
      streetName: prop.street,
      city: prop.city,
      postalCode: prop.postalCode,
      country,
    },
  ];

  if (!prop.useSameAddress) {
    addresses.push({
      streetName: prop.shippingStreet ?? '',
      city: prop.shippingCity ?? '',
      postalCode: prop.shippingPostalCode ?? '',
      country: shippingCountry,
    });
  }

  return {
    email: prop.email,
    password: prop.password,
    firstName: prop.firstName,
    lastName: prop.lastName,
    dateOfBirth: prop.dateOfBirth,
    addresses,
    defaultBillingAddress: 0,
    defaultShippingAddress: prop.useSameAddress ? 0 : 1,
    isEmailVerified: true,
  };
}

export const isAuthorizedKey = 'isAuthorized';

export function normalizeInput(userInput: string): string {
  return userInput.trim();
}

export function normalizeCountryInput(countryName: string): string {
  const match: Country | undefined = countries.find(
    (country: Country): boolean => country.name.toLowerCase() === countryName.trim().toLowerCase()
  );
  return match ? match.code : 'GE';
}

export function saveToSessionStorage(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

export function saveLoggedInUserToSessionStorage(customer: Customer, isAuthorized?: boolean): void {
  saveToSessionStorage(customerId, customer.id);
  saveToSessionStorage(customerVersion, `${customer.version}`);
  saveToSessionStorage(isAuthorizedKey, JSON.stringify(isAuthorized));
}

export const getLoggedInUserFromSessionStorage = (): SessionUser | null => {
  const customerIdFromStorage = sessionStorage.getItem(customerId);
  const customerVersionFromStorage = sessionStorage.getItem(customerVersion);

  if (customerIdFromStorage && customerVersionFromStorage) {
    return {
      customerId: customerIdFromStorage,
      customerVersion: customerVersionFromStorage,
    };
  }

  return null;
};

export const getIsAuthorizedFromSessionStorage = (): boolean => {
  const value = sessionStorage.getItem(isAuthorizedKey);
  return value === 'true';
};

export const logoutUser = (): void => {
  sessionStorage.removeItem(customerId);
  sessionStorage.removeItem(customerVersion);
  sessionStorage.removeItem(isAuthorizedKey);
};
