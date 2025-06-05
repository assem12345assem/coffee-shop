import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import { normalizeCountryInput } from '@/utils/customerUtils';
import type {
  Customer,
  CustomerSetAddressCustomTypeAction,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import type { RefObject } from 'react';
import type React from 'react';
import type { ValidCustomerAction } from '@/data/interfaces';

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
