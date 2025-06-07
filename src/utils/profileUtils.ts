import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { denormalizeCountryCode, normalizeCountryInput } from '@/utils/customerUtils';
import type {
  Customer,
  CustomerSetAddressCustomTypeAction,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type { RefObject } from 'react';
import type { AddressRefs, CustomerPersonalFields, ValidCustomerAction } from '@/data/interfaces';
import {
  validateCity,
  validateCountry,
  validateDOB,
  validateEmail,
  validateName,
  validatePassword,
  validatePostalCode,
  validateStreet,
} from '@/utils/validation';
import type { Address } from '@commercetools/platform-sdk';

export const showToast = (message: string, type: 'success' | 'error') => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'center',
    style: {
      backgroundColor: type === 'success' ? '#28a745' : '#dc3545',
    },
    stopOnFocus: true,
  }).showToast();
};

export const getUpdatedAddressFields = (index: number, addressRefs: RefObject<Record<string, AddressRefs>>) => {
  const updatedAddress: Record<string, string> = {};

  ['streetName', 'city', 'postalCode', 'country'].forEach((field) => {
    const inputRef = addressRefs.current[index]?.[field];
    if (inputRef) {
      updatedAddress[field] = field === 'country' ? normalizeCountryInput(inputRef.getValue()) : inputRef.getValue();
    }
  });

  return updatedAddress;
};

export const generateAddressActions = (customer: Customer) => {
  const actions: CustomerUpdateAction[] = [];

  customer.addresses.forEach((address) => {
    if (Object.keys(address).length > 0) {
      actions.push({
        action: 'changeAddress',
        addressId: address.id,
        address: address,
      });
    }
  });

  return actions;
};

export const generatePersonalInfoActions = (
  customerInputRefs: RefObject<Record<CustomerPersonalFields, HTMLInputElement | null>>
) => {
  const actions: CustomerUpdateAction[] = [];

  ['firstName', 'lastName', 'dateOfBirth', 'email'].forEach((field) => {
    const inputRef = customerInputRefs.current[field as CustomerPersonalFields];

    if (inputRef && inputRef.getValue() !== inputRef.initialValue) {
      const actionName =
        field === 'dateOfBirth'
          ? 'setDateOfBirth'
          : field === 'email'
            ? 'changeEmail'
            : `set${field.charAt(0).toUpperCase()}${field.slice(1)}`;

      const actionObject = {
        action: actionName as ValidCustomerAction,
        [field]: inputRef.getValue(),
      } as Partial<CustomerUpdateAction>;

      if (actionName === 'setAddressCustomType') {
        actions.push({
          action: 'setAddressCustomType',
          addressId: inputRef.getValue(),
        } as CustomerSetAddressCustomTypeAction);
      } else {
        actions.push({
          action: actionName as ValidCustomerAction,
          [field]: inputRef.getValue(),
        } as CustomerUpdateAction);
      }

      actions.push(actionObject as CustomerUpdateAction);
    }
  });

  return actions;
};

export function validateCustomer(customer: Customer): Record<string, string | Record<string, string>[]> {
  const errors: Record<string, string> = {};

  // Validation mappings
  const validators: Record<string, (value: string) => string | null> = {
    email: validateEmail,
    firstName: validateName,
    lastName: validateName,
    dateOfBirth: validateDOB,
  };

  // Validate customer fields and **only store actual errors**
  Object.keys(validators).forEach((field) => {
    if (customer[field]) {
      const error = validators[field](customer[field]);
      if (error !== null) {
        errors[field] = error;
      }
    }
  });

  if (Array.isArray(customer.addresses)) {
    const addressErrors = customer.addresses
      .map((address) => {
        const addrErrors: Record<string, string> = {};
        const fullNameCountry = denormalizeCountryCode(address.country);

        if (address.streetName) {
          const error = validateStreet(address.streetName);
          if (error !== null) addrErrors.streetName = error;
        }
        if (address.city) {
          const error = validateCity(address.city);
          if (error !== null) addrErrors.city = error;
        }
        if (address.postalCode && address.country) {
          const error = validatePostalCode(address.postalCode, fullNameCountry);
          if (error !== null) addrErrors.postalCode = error;
        }
        if (address.country) {
          const error = validateCountry(fullNameCountry);
          if (error !== null) addrErrors.country = error;
        }

        return Object.keys(addrErrors).length > 0 ? addrErrors : null;
      })
      .filter((error) => error !== null); // ✅ Removes `null` errors completely

    if (addressErrors.length > 0) {
      errors.addresses = addressErrors;
    }
  }

  return errors;
}
export function validateAddressEntry(address: Address): Record<string, string> | null {
  const addrErrors: Record<string, string> = {};
  const fullNameCountry = denormalizeCountryCode(address.country);

  if (address.streetName) {
    const error = validateStreet(address.streetName);
    if (error !== null) addrErrors.streetName = error;
  }
  if (address.city) {
    const error = validateCity(address.city);
    if (error !== null) addrErrors.city = error;
  }
  if (address.postalCode && address.country) {
    const error = validatePostalCode(address.postalCode, fullNameCountry);
    if (error !== null) addrErrors.postalCode = error;
  }
  if (address.country) {
    const error = validateCountry(fullNameCountry);
    if (error !== null) addrErrors.country = error;
  }

  return Object.keys(addrErrors).length > 0 ? addrErrors : null;
}
