import type { RefObject } from 'react';
import React, { useEffect } from 'react';
import Input from '@/components/Login-registration-components/Input';
import CountryInput from '@/components/Login-registration-components/CountryInput';
import { validatePostalCode, validateCountry } from '@/utils/validation';
import type { Address } from '@commercetools/platform-sdk';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { denormalizeCountryCode } from '@/utils/customerUtils';
import type { InputHandle } from '@/data/interfaces';

interface AddressFieldsProps {
  address?: Address;
  setAddress: (updatedAddress: Address) => void;
  customer: Customer;
  addressRefs: RefObject<Record<number, Record<string, InputHandle>>>;
  index: number;

  isBillingDefault: boolean;
  setIsBillingDefault: (value: boolean) => void;
  isShippingDefault: boolean;
  setIsShippingDefault: (value: boolean) => void;
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  address = { streetName: '', city: '', postalCode: '', country: '' },
  setAddress,
  customer,
  addressRefs,
  index,
  isBillingDefault,
  setIsBillingDefault,
  isShippingDefault,
  setIsShippingDefault,
}) => {
  // Define the fields you want to render inputs for
  const allowedFields = ['streetName', 'city', 'postalCode', 'country'];

  return (
    <div className="flex flex-col gap-4">
      {allowedFields.map((field) =>
        field === 'country' ? (
          <CountryInput
            key={field}
            ref={(el) => {
              if (!addressRefs.current[index]) addressRefs.current[index] = {};
              addressRefs.current[index][field] = el;
            }}
            label="Country"
            initialValue={denormalizeCountryCode(address.country)}
            onChange={(selectedCountry) => {
              setAddress({ ...address, country: selectedCountry });
              // Validate postal code whenever country changes
              const currentPostal = address.postalCode || '';
              const error = validatePostalCode(currentPostal, selectedCountry);
              addressRefs.current[index]?.postalCode?.setErrorExternally(error);
            }}
            validate={validateCountry}
          />
        ) : (
          <Input
            key={field}
            ref={(el) => {
              if (!addressRefs.current[index]) addressRefs.current[index] = {};
              addressRefs.current[index][field] = el;
            }}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            initialValue={address[field as keyof Address] ?? ''}
            onChange={(val) => {
              setAddress({ ...address, [field]: val });
              if (field === 'postalCode') {
                const error = validatePostalCode(val, address.country);
                addressRefs.current[index]?.postalCode?.setErrorExternally(error);
              }
            }}
            validate={field === 'postalCode' ? (val) => validatePostalCode(val, address.country) : undefined}
          />
        )
      )}

      <div className="flex flex-col gap-2 mt-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isBillingDefault} onChange={(e) => setIsBillingDefault(e.target.checked)} />
          <span className="text-sm text-gray-600">Set as Default Billing Address</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isShippingDefault} onChange={(e) => setIsShippingDefault(e.target.checked)} />
          <span className="text-sm text-gray-600">Set as Default Shipping Address</span>
        </label>
      </div>
    </div>
  );
};

export default AddressFields;
