import type { RefObject } from 'react';
import React from 'react';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import Input from '@/components/Login-registration-components/Input';
import { validateCity, validateCountry, validatePostalCode, validateStreet } from '@/utils/validation';
import CountryInput from '@/components/Login-registration-components/CountryInput';
import { denormalizeCountryCode, normalizeCountryInput } from '@/utils/customerUtils';
import type { Address } from '@commercetools/platform-sdk';
import type { AddressRefs } from '@/data/interfaces';

interface AddressSectionProps {
  customer: Customer;
  addressRefs: RefObject<Record<string, AddressRefs>>;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  isEditing: boolean;
  handleSetDefaultAddress: (field: string, addressId: string) => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  customer,
  addressRefs,
  setCustomer,
  isEditing,
  handleSetDefaultAddress,
}) => (
  <div className="mb-8">
    <h2 className="section-title">Addresses</h2>
    <div className="flex flex-col gap-8">
      {customer.addresses.map((address, index) => (
        <div key={index}>
          <div className="flex justify-between items-center">
            <h3>Address {index + 1}</h3>
            <div className="flex gap-2">
              {customer.defaultBillingAddressId === address.id && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-semiGreen rounded-full mr-1" />
                  <span className="text-sm text-semiGreen">Default Billing Address</span>
                </div>
              )}
              {customer.defaultShippingAddressId === address.id && (
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-1" />
                  <span className="text-sm text-blue-400">Default Shipping Address</span>
                </div>
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
              initialValue={
                typeof address[field as keyof Address] === 'string'
                  ? address[field as keyof Address]
                  : String(address[field as keyof Address] ?? '')
              }
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
                if (field === 'postalCode')
                  return validatePostalCode(val, addressRefs.current[index]?.country?.getValue() ?? '');
                if (field === 'streetName') return validateStreet(val);
                if (field === 'city') return validateCity(val);
                return null;
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

              console.log('Postal Code:', currentPostal);
              console.log('Selected Country:', selectedCountry);
              console.log('Validation Error:', error);

              addressRefs.current[index]?.postalCode?.setErrorExternally(error);

              setCustomer((prev) =>
                prev
                  ? {
                      ...prev,
                      addresses: prev.addresses.map((addr, addrIndex) =>
                        addrIndex === index ? { ...addr, country: normalizeCountryInput(selectedCountry) } : addr
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
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={customer.defaultBillingAddressId === address.id}
                  onChange={() => {
                    if (address.id) {
                      handleSetDefaultAddress('defaultBillingAddressId', address.id);
                    }
                  }}
                />
                <span className="text-sm text-creamLight">Set as Default Billing Address</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={customer.defaultShippingAddressId === address.id}
                  onChange={() => {
                    if (address.id) {
                      handleSetDefaultAddress('defaultShippingAddressId', address.id);
                    }
                  }}
                />
                <span className="text-sm text-creamLight">Set as Default Shipping Address</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default AddressSection;
