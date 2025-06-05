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
import type { InputHandle } from '@/data/interfaces';
import { updateCustomer } from '@/api/profile/update';
import type { Address, CustomerUpdate } from '@commercetools/platform-sdk';
import 'toastify-js/src/toastify.css';
import { generateAddressActions, generatePersonalInfoActions, showToast } from '@/utils/profileUtils';
import '@/styles/profile.css';
import ProfileHeader from '@/components/Profile-components/ProfileHeader';
import PersonalInfoSection from '@/components/Profile-components/PersonalInfoSection';
import AddressSection from '@/components/Profile-components/AddressSection';
import { PasswordChangeButton } from '@/components/Profile-components/PasswordChangeButton';

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
  const handleSetDefaultAddress = (type: 'billing' | 'shipping', addressId: string) => {
    setCustomer((prev) =>
      prev
        ? {
            ...prev,
            [type === 'billing' ? 'defaultBillingAddressId' : 'defaultShippingAddressId']: addressId,
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
  return (
    <div className="profile-page">
      <div className="profile-container">
        <ProfileHeader />

        <div className="bg-coffeeBrown rounded-lg shadow-xl overflow-hidden p-6 sm:p-8">
          <div className="my-3">
            <PasswordChangeButton />
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
            />

            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
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
            )}
          </form>
          {successMessage && <div className="success">{successMessage}</div>}
          {errorMessage && <div className="error">{errorMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
