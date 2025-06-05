import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { normalizeCountryInput } from '@/utils/customerUtils';
import type {
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type { RefObject } from 'react';
import type React from 'react';

export const showToast = (message: string, type: 'success' | 'error') => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: 'top',
    position: 'center',
    background: type === 'success' ? '#28a745' : '#dc3545',
    stopOnFocus: true,
  }).showToast();
};

export const getUpdatedAddressFields = (index: number, addressRefs: React.MutableRefObject<any>) => {
  const updatedAddress: Record<string, string> = {};
  let hasChanges = false;

  ['streetName', 'city', 'postalCode', 'country'].forEach((field) => {
    const inputRef = addressRefs.current[index]?.[field];
    if (inputRef && inputRef.getValue() !== inputRef.initialValue) {
      updatedAddress[field] = field === 'country' ? normalizeCountryInput(inputRef.getValue()) : inputRef.getValue();
      hasChanges = true;
    }
  });

  return hasChanges ? updatedAddress : null;
};

export const generateAddressActions = (customer: Customer, addressRefs: RefObject<any>) => {
  const actions: any[] = [];

  customer.addresses.forEach((address, index) => {
    const updatedAddress = getUpdatedAddressFields(index, addressRefs);
    if (updatedAddress) {
      actions.push({
        action: 'changeAddress',
        addressId: address.id,
        address: updatedAddress,
      });
    }
  });

  return actions;
};

export const generatePersonalInfoActions = (customerInputRefs: React.MutableRefObject<any>) => {
  const actions: CustomerUpdateAction[] = [];

  ['firstName', 'lastName', 'dateOfBirth', 'email'].forEach((field) => {
    const inputRef = customerInputRefs.current[field];

    if (inputRef && inputRef.getValue() !== inputRef.initialValue) {
      const actionName =
        field === 'dateOfBirth'
          ? 'setDateOfBirth'
          : field === 'email'
            ? 'changeEmail'
            : `set${field.charAt(0).toUpperCase()}${field.slice(1)}`;

      actions.push({
        action: actionName,
        [field]: inputRef.getValue(),
      });
    }
  });

  return actions;
};
