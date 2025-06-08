import { useState } from 'react';
import { updateCustomer } from '@/api/profile/update';
import type { Customer, CustomerUpdateAction } from '@commercetools/platform-sdk';
import { showToast } from '@/utils/profileUtils';
import type { addAddressType } from '@/data/interfaces';

export const useAddAddress = (customer: Customer, setCustomer: (updatedCustomer: Customer) => void) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const addAddress = async (newAddress: addAddressType) => {
    if (!customer) return;

    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const requestBody: CustomerUpdateAction[] = [{ action: 'addAddress', address: newAddress }];

    try {
      let response = await updateCustomer(customer, { version: customer.version, actions: requestBody });

      if (!response?.addresses) {
        throw new Error('Failed to retrieve new address.');
      }

      setCustomer(response);

      const newAddressId = response.addresses.find(
        (addr) =>
          addr.streetName === newAddress.streetName &&
          addr.city === newAddress.city &&
          addr.postalCode === newAddress.postalCode
      )?.id;

      if (!newAddressId) {
        throw new Error('Failed to retrieve newly added address ID.');
      }

      const defaultUpdateActions: CustomerUpdateAction[] = [];
      if (newAddress.isDefaultBilling) {
        defaultUpdateActions.push({ action: 'setDefaultBillingAddress', addressId: newAddressId });
      }
      if (newAddress.isDefaultShipping) {
        defaultUpdateActions.push({ action: 'setDefaultShippingAddress', addressId: newAddressId });
      }

      if (defaultUpdateActions.length > 0) {
        response = await updateCustomer(response, { version: response.version, actions: defaultUpdateActions });
        setCustomer(response);
      }

      showToast('New address added successfully!', 'success');
      setSuccessMessage('New address added successfully!');
    } catch (error) {
      console.error('Error adding address:', error);
      showToast('Failed to add new address. Please try again.', 'error');
      setErrorMessage('Failed to add new address. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return { addAddress, loading, errorMessage, successMessage };
};
