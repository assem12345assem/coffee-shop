import React, { useState, useEffect, useRef } from 'react';
import type {
  Customer,
  CustomerUpdateAction,
} from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import {
  denormalizeCountryCode,
  getLoggedInUserFromSessionStorage,
  normalizeCountryInput,
} from '@/utils/customerUtils';
import { getCustomerById } from '@/api/customers';
import Button from '@/components/Login-registration-components/Button';
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
import CountryInput from '@/components/Login-registration-components/CountryInput';
import type { InputHandle } from '@/data/interfaces';
import { countries } from '@/data/interfaces';
import { updateCustomer } from '@/api/profile/update';
import type { CustomerUpdate } from '@commercetools/platform-sdk';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';

const ProfileComponent: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const countryRefs = useRef<(InputHandle | null)[]>([]);
  const postalCodeRefs = useRef<(InputHandle | null)[]>([]);
  const customerInputRefs = useRef<{ [key: string]: InputHandle }>({});
  const addressRefs = useRef<{ [key: number]: { [key: string]: InputHandle } }>({});
  const validationFunctions = {
    firstName: validateName,
    lastName: validateName,
    dateOfBirth: validateDOB,
    email: validateEmail,
    streetName: validateStreet,
    city: validateCity,
    postalCode: (val, index) => validatePostalCode(val, addressRefs.current[index]?.country?.getValue() ?? ''),
    country: validateCountry,
  };

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
    const actions: CustomerUpdateAction[] = [];

    // Check personal information updates
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

    // Check for address updates
    customer.addresses.forEach((address, index) => {
      const updatedAddress: Record<string, string> = {};
      let hasChanges = false;

      ['streetName', 'city', 'postalCode', 'country'].forEach((field) => {
        const inputRef = addressRefs.current[index]?.[field];
        if (inputRef && inputRef.getValue() !== inputRef.initialValue) {
          updatedAddress[field] =
            field === 'country' ? normalizeCountryInput(inputRef.getValue()) : inputRef.getValue();
          hasChanges = true;
        }
      });

      if (hasChanges) {
        actions.push({
          action: 'changeAddress',
          addressId: address.id,
          address: updatedAddress,
        });
      }
    });

    // Check for default billing/shipping changes
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

  const updateCustomerProfile = async (payload: any) => {
    try {
      const response = await updateCustomer(customer, payload);

      Toastify({
        text: 'Profile updated successfully!',
        duration: 3000,
        gravity: 'top',
        position: 'center',
        backgroundColor: '#28a745',
        stopOnFocus: true,
      }).showToast();

      setCustomer(response);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating customer:', error);
      Toastify({
        text: 'Failed to update profile. Please try again.',
        duration: 3000,
        gravity: 'top',
        position: 'center',
        backgroundColor: '#dc3545',
        stopOnFocus: true,
      }).showToast();
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
  return (
    <div className="relative w-full min-h-screen bg-[#221B18] text-americanSilver py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-creamLight font-third">My Profile</h1>
          <p className="mt-2 text-americanSilver">Manage your account information</p>
        </div>

        <div className="bg-coffeeBrown rounded-lg shadow-xl overflow-hidden p-6 sm:p-8">
          {!isEditing && (
            <Button
              type="button"
              label="Edit Profile"
              onClick={() => setIsEditing(true)}
              className="bg-LightTaupe hover:bg-rustBrown text-Temptress mb-4"
            />
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['firstName', 'lastName', 'dateOfBirth', 'email'].map((name) => (
                  <Input
                    ref={(el) => (customerInputRefs.current[name] = el)}
                    key={name}
                    label={name.replace(/^\w/, (c) => c.toUpperCase())}
                    type={name === 'dateOfBirth' ? 'date' : 'text'}
                    initialValue={
                      name === 'dateOfBirth'
                        ? customer.dateOfBirth
                          ? new Date(customer.dateOfBirth).toISOString().split('T')[0]
                          : ''
                        : (customer[name] ?? '')
                    }
                    onChange={(val) => handleInputChange(name, val)}
                    validate={validationFunctions[name]}
                    readOnly={!isEditing}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">Addresses</h2>

              <div className="flex flex-col gap-8">
                {customer.addresses.map((address, index) => (
                  <div key={index}>
                    <div>
                      <h3>Address {index + 1}</h3>
                      <div className="flex justify-between items-center">
                        {customer.defaultBillingAddressId === address.id && (
                          <span className="text-sm text-semiGreen">Default Billing Address</span>
                        )}
                        {customer.defaultShippingAddressId === address.id && (
                          <span className="text-sm text-semiGreen">Default Shipping Address</span>
                        )}
                      </div>
                    </div>
                    {['streetName', 'city', 'postalCode'].map((field) => (
                      <Input
                        ref={(el) => {
                          if (!addressRefs.current[index]) addressRefs.current[index] = {};
                          addressRefs.current[index][field] = el;
                        }}
                        key={`${index}-${field}`}
                        label={field.replace(/^\w/, (c) => c.toUpperCase())}
                        initialValue={address[field] ?? ''}
                        onChange={(val) =>
                          setCustomer((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  addresses: prev.addresses.map((addr, addrIndex) =>
                                    addrIndex === index ? { ...addr, [field]: val } : addr
                                  ),
                                }
                              : prev
                          )
                        }
                        validate={(val) => {
                          if (field === 'postalCode') {
                            return validatePostalCode(val, addressRefs.current[index]?.country?.getValue() ?? '');
                          } else if (field === 'streetName') {
                            return validateStreet(val);
                          } else if (field === 'city') {
                            return validateCity(val);
                          }

                          return null; // Default case (in case a field is missing)
                        }}
                        readOnly={!isEditing}
                      />
                    ))}

                    <CountryInput
                      ref={(el) => {
                        if (!addressRefs.current[index]) addressRefs.current[index] = {};
                        addressRefs.current[index]['country'] = el;
                      }}
                      label="Country"
                      placeholder="Select a country"
                      initialValue={isEditing ? address.country : denormalizeCountryCode(address.country)}
                      onChange={(selectedCountry) => {
                        if (!addressRefs.current[index]) addressRefs.current[index] = {};
                        addressRefs.current[index]['country']?.setValueExternally(selectedCountry);

                        const currentPostal = addressRefs.current[index]?.postalCode?.getValue() ?? '';
                        const error = validatePostalCode(currentPostal, selectedCountry);

                        if (error) {
                          setTimeout(() => {
                            addressRefs.current[index]?.postalCode?.setValueExternally(currentPostal);
                          }, 0);
                        }

                        setCustomer((prev) =>
                          prev
                            ? {
                                ...prev,
                                addresses: prev.addresses.map((addr, addrIndex) =>
                                  addrIndex === index
                                    ? { ...addr, country: normalizeCountryInput(selectedCountry) }
                                    : addr
                                ),
                              }
                            : prev
                        );
                      }}
                      validate={validateCountry}
                      readOnly={!isEditing}
                    />
                    {isEditing && (
                      <div className="flex flex-col gap-2 mt-4">
                        {/* Default Billing Address Checkbox */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={customer.defaultBillingAddressId === address.id}
                            onChange={() => handleSetDefaultAddress('billing', address.id)}
                          />
                          <label className="text-sm text-creamLight">Set as Default Billing Address</label>
                        </div>

                        {/* Default Shipping Address Checkbox */}
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={customer.defaultShippingAddressId === address.id}
                            onChange={() => handleSetDefaultAddress('shipping', address.id)}
                          />
                          <label className="text-sm text-creamLight">Set as Default Shipping Address</label>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {isEditing && (
              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
                <Button
                  type="button"
                  label="Cancel"
                  onClick={() => setIsEditing(false)}
                  className="border-creamLight text-black hover:bg-rustBrown"
                />
                <Button
                  type="submit"
                  label={loading ? 'Saving...' : 'Save Changes'}
                  disabled={loading}
                  className="bg-LightTaupe hover:bg-rustBrown text-Temptress"
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
