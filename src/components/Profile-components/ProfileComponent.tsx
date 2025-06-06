import React, { useState, useEffect, useRef } from 'react';
import type {
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { denormalizeCountryCode, getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import { getCustomerById } from '@/api/customers';
import Button from '@/components/Login-registration-components/Button';
import {
  validateCity,
  validateCountry,
  validateDOB,
  validateEmail,
  validateName,
  validatePostalCode,
  validateStreet,
} from '@/utils/validation';
import type { addAddressType, InputHandle } from '@/data/interfaces';
import { updateCustomer } from '@/api/profile/update';
import type { Address, CustomerUpdate } from '@commercetools/platform-sdk';
import 'toastify-js/src/toastify.css';
import { generateAddressActions, generatePersonalInfoActions, showToast } from '@/utils/profileUtils';
import '@/styles/profile.css';
import ProfileHeader from '@/components/Profile-components/ProfileHeader';
import PersonalInfoSection from '@/components/Profile-components/PersonalInfoSection';
import AddressSection from '@/components/Profile-components/AddressSection';
import { PasswordChangeButton } from '@/components/Profile-components/PasswordChangeButton';
import AddAddress from '@/components/Profile-components/AddAddress';

const ProfileComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const customerInputRefs = useRef<{ [key: string]: InputHandle }>({});
  const addressRefs = useRef<{ [key: number]: { [key: string]: InputHandle } }>({});
  const validationFunctions = {
    firstName: validateName,
    lastName: validateName,
    dateOfBirth: validateDOB,
    email: validateEmail,
    streetName: validateStreet,
    city: validateCity,
    postalCode: (val: string, index?: number) =>
      validatePostalCode(val, addressRefs.current[index!]?.country?.getValue() ?? ''),
    country: validateCountry,
  };
  const [originalCustomer, setOriginalCustomer] = useState<Customer | null>(null);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);

  useEffect(() => {
    if (addressToDelete !== null) {
      document.body.style.overflow = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflow = 'visible'; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflow = 'visible'; // Cleanup on unmount
    };
  }, [addressToDelete]);

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        setErrorMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const user = getLoggedInUserFromSessionStorage();
        if (!user || !user.customerId) return;

        const customerData = await getCustomerById(user.customerId);
        if (!customerData) return;

        setCustomer(customerData);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
        throw error;
      }
    };
    fetchCustomer();
  }, []);

  if (!customer) {
    return <div>Loading customer data...</div>;
  }
  const generateUpdatedCustomerPayload = (customer: Customer): CustomerUpdate | null => {
    const actions: CustomerUpdateAction[] = [
      ...generatePersonalInfoActions(customerInputRefs),
      ...generateAddressActions(customer, addressRefs),
    ];

    if (customer.defaultBillingAddressId !== customerInputRefs.current['defaultBilling']?.initialValue) {
      actions.push({
        action: 'setDefaultBillingAddress',
        addressId: customer.defaultBillingAddressId,
      });
    }

    if (customer.defaultShippingAddressId !== customerInputRefs.current['defaultShipping']?.initialValue) {
      actions.push({
        action: 'setDefaultShippingAddress',
        addressId: customer.defaultShippingAddressId,
      });
    }

    return actions.length > 0 ? { version: customer.version, actions } : { version: customer.version, actions: [] };
  };

  const updateCustomerProfile = async (payload: CustomerUpdate) => {
    try {
      const response = await updateCustomer(customer, payload);

      showToast('Profile updated successfully!', 'success');

      setCustomer(response);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating customer:', error);
      showToast('Failed to update profile. Please try again.', 'error');
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = generateUpdatedCustomerPayload(customer);

    if (!payload) {
      setSuccessMessage('No changes detected.');
      setLoading(false);
      return;
    }

    updateCustomerProfile(payload);
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomer((prev) => (prev ? { ...prev, [field]: value } : prev));
  };
  const handleSetDefaultAddress = (field: string, addressId: string) => {
    setCustomer((prev) =>
      prev
        ? {
            ...prev,
            [field]: addressId,
          }
        : prev
    );
  };
  const resetInputFields = () => {
    Object.keys(customerInputRefs.current).forEach((field) => {
      const value = originalCustomer?.[field as keyof Customer];

      customerInputRefs.current[field]?.setValueExternally(typeof value === 'string' ? value : String(value ?? ''));
    });

    customer.addresses.forEach((address, index) => {
      const addressRef = addressRefs.current[index];

      if (!addressRef) return;

      Object.keys(addressRef).forEach((field) => {
        if (field === 'country') {
          const originalCountry = originalCustomer?.addresses[index]?.country;
          addressRef['country']?.setValueExternally(originalCountry ? denormalizeCountryCode(originalCountry) : '');

          setTimeout(() => {
            const postalCodeRef = addressRef?.postalCode;
            if (postalCodeRef && typeof postalCodeRef.setErrorExternally === 'function') {
              postalCodeRef.setErrorExternally(undefined);
            }
          }, 0);
        } else {
          const value = originalCustomer?.addresses[index]?.[field as keyof Address];

          addressRef[field as keyof Address]?.setValueExternally(
            typeof value === 'string' ? value : JSON.stringify(value ?? '')
          );
        }
      });
    });
  };

  const handleCancel = () => {
    if (originalCustomer) {
      setCustomer(originalCustomer);
      resetInputFields();
    }
    setIsEditing(false);
  };
  const onAdd = async (newAddress: addAddressType) => {
    setCustomer((prev) =>
      prev
        ? {
            ...prev,
            addresses: [...prev.addresses, newAddress],
          }
        : prev
    );
    const requestBody: CustomerUpdateAction[] = [];
    requestBody.push({ action: 'addAddress', address: newAddress });

    try {
      let response = await updateCustomer(customer, { version: customer.version, actions: requestBody });
      if (!response || !response.addresses) {
        showToast('Failed to retrieve new address. Please try again.', 'error');
        return;
      }
      setCustomer(response);
      const newAddressId = response.addresses.find(
        (addr) =>
          addr.streetName === newAddress.streetName &&
          addr.city === newAddress.city &&
          addr.postalCode === newAddress.postalCode
      )?.id;

      if (!newAddressId) {
        showToast('Failed to retrieve newly added address. Please try again.', 'error');
        return;
      }
      setCustomer(response);
      const defaultUpdateActions: CustomerUpdateAction[] = [];
      if (newAddress.isDefaultBilling) {
        defaultUpdateActions.push({ action: 'setDefaultBillingAddress', addressId: newAddressId });
      }
      if (newAddress.isDefaultShipping) {
        defaultUpdateActions.push({ action: 'setDefaultShippingAddress', addressId: newAddressId });
      }
      if (defaultUpdateActions.length > 0) {
        response = await updateCustomer(customer, { version: response.version, actions: defaultUpdateActions });
        setCustomer(response);
      }
      showToast('New address added successfully!', 'success');
      setSuccessMessage('New address added successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error adding new address:', error);
      showToast('Failed to add new address. Please try again.', 'error');
      setErrorMessage('Failed to add new address. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveClick = (index: number) => {
    setAddressToDelete(index);
  };
  const handleCancelRemove = () => {
    setAddressToDelete(null);
  };
  const handleConfirmRemove = async () => {
    if (addressToDelete === null) return;

    // Get the address ID for removal
    const addressId = customer?.addresses[addressToDelete]?.id;
    if (!addressId) {
      showToast('Failed to remove address. No ID found.', 'error');
      return;
    }

    // Update request payload
    const requestBody: CustomerUpdateAction[] = [{ action: 'removeAddress', addressId }];

    try {
      const response = await updateCustomer(customer, { version: customer.version, actions: requestBody });

      setCustomer(response); // Update the customer state
      showToast(`Selected address removed successfully!`, 'success');
    } catch (error) {
      console.error('Error removing address:', error);
      showToast('Failed to remove address. Please try again.', 'error');
    } finally {
      setAddressToDelete(null); // Close dialog
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <ProfileHeader />

        <div className="bg-coffeeBrown rounded-lg shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="my-3">
            <PasswordChangeButton />
          </div>
          <div className="my-3">
            <AddAddress onAdd={onAdd} handleSetDefaultAddress={handleSetDefaultAddress} />
          </div>
          {!isEditing && (
            <Button
              type="button"
              label="Edit Profile"
              onClick={() => {
                setOriginalCustomer(JSON.parse(JSON.stringify(customer)));
                setIsEditing(true);
              }}
              className="bg-amber-800 hover:bg-rustBrown text-Temptress mb-4 transition-transform duration-200 hover:scale-105"
            />
          )}
          {addressToDelete !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9998]">
              <div className="bg-coffeeBrown text-creamLight p-6 rounded-lg w-96 z-[9999]">
                <h2 className="text-xl font-semibold mb-4">Are you sure?</h2>
                <p>Do you want to delete the address?</p>

                <div className="flex justify-end gap-2 mt-4">
                  <button
                    className="bg-red-600 text-white p-2 rounded-md transition-transform duration-200 hover:scale-105"
                    onClick={handleConfirmRemove}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="bg-gray-600 text-white p-2 rounded-md transition-transform duration-200 hover:scale-105"
                    onClick={handleCancelRemove}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <PersonalInfoSection
              customerInputRefs={customerInputRefs}
              customer={customer}
              handleInputChange={handleInputChange}
              validationFunctions={validationFunctions}
              isEditing={isEditing}
            />

            <AddressSection
              customer={customer}
              addressRefs={addressRefs}
              setCustomer={setCustomer}
              isEditing={isEditing}
              handleSetDefaultAddress={handleSetDefaultAddress}
              handleRemoveClick={handleRemoveClick}
            />

            {isEditing && (
              <div className="fixed bottom-0 left-0 w-full flex flex-col gap-4 bg-creamLight p-4 shadow-md">
                <div className="text-center">
                  <p className="text-amber-800">
                    You are in edit mode... Use buttons below to save your changes or exist edit mode.{' '}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    type="button"
                    label="Cancel"
                    onClick={handleCancel}
                    className="bg-amber-800 border-creamLight text-black hover:bg-rustBrown transition-transform duration-200 hover:scale-105"
                  />
                  <Button
                    type="submit"
                    label={loading ? 'Saving...' : 'Save Changes'}
                    disabled={loading}
                    className="bg-amber-800 hover:bg-rustBrown text-Temptress transition-transform duration-200 hover:scale-105"
                  />
                </div>
              </div>
            )}
          </form>
          {successMessage && (
            <div className="bg-green-500 text-white font-bold p-3 rounded-md shadow-lg animate-fade">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="bg-red-500 text-white font-bold p-3 rounded-md shadow-lg animate-fade">{errorMessage}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
