import type { RefObject } from 'react';
import React, { useCallback, useEffect } from 'react';
import Input from '@/components/Login-registration-components/Input';
import CountryInput from '@/components/Login-registration-components/CountryInput';
import { validatePostalCode, validateCountry, validateStreet, validateCity } from '@/utils/validation';
import type { Address } from '@commercetools/platform-sdk';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import { denormalizeCountryCode } from '@/utils/customerUtils';
import type { InputHandle } from '@/data/interfaces';

interface AddressFieldsProps {
  address?: Address;
  setAddress: (updatedAddress: Address) => void;
  customer: Customer;
  addressRefs: RefObject<Record<number, Record<string, InputHandle>>>;
  addressValidityRefs: RefObject<Record<number, Record<string, boolean>>>;
  index: number;
  isBillingDefault: boolean;
  setIsBillingDefault: (value: boolean) => void;
  isShippingDefault: boolean;
  setIsShippingDefault: (value: boolean) => void;
}

const AddressFields: React.FC<AddressFieldsProps> = ({
  address = {
    streetName: '',
    city: '',
    postalCode: '',
    country: '',
  },
  setAddress,
  customer,
  addressRefs,
  addressValidityRefs,
  index,
  isBillingDefault,
  setIsBillingDefault,
  isShippingDefault,
  setIsShippingDefault,
}) => {
  const allowedFields = ['streetName', 'city', 'postalCode', 'country'];

  const ensureValidityRefExists = useCallback(() => {
    if (!addressValidityRefs.current[index]) {
      addressValidityRefs.current[index] = {
        streetName: false,
        city: false,
        postalCode: false,
        country: false,
      };
    }
  }, [addressValidityRefs, index]);

  useEffect(() => {
    ensureValidityRefExists();
  }, [ensureValidityRefExists]);

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
              // ✅ Update address synchronously
              const updatedAddress = { ...address, country: selectedCountry };
              setAddress(updatedAddress);

              // ✅ Validate country
              const countryError = validateCountry(selectedCountry);
              addressValidityRefs.current[index].country = countryError === '';
              addressRefs.current[index]?.country?.setErrorExternally?.(countryError);

              // ✅ Re-validate postal code with updated country
              const postalCodeVal = addressRefs.current[index]?.postalCode?.getValue() || '';
              const postalCodeError = validatePostalCode(postalCodeVal, selectedCountry);
              addressRefs.current[index]?.postalCode?.setErrorExternally(postalCodeError);
              addressValidityRefs.current[index].postalCode = postalCodeError === '';
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
              const updatedAddress = { ...address, [field]: val };
              setAddress(updatedAddress);

              let error = '';
              if (field === 'streetName') {
                error = validateStreet(val);
              } else if (field === 'city') {
                error = validateCity(val);
              } else if (field === 'postalCode') {
                error = validatePostalCode(val, address.country);
              }

              addressRefs.current[index]?.[field]?.setErrorExternally(error);
              addressValidityRefs.current[index][field] = error === '';
            }}
            validate={
              field === 'streetName'
                ? validateStreet
                : field === 'city'
                  ? validateCity
                  : field === 'postalCode'
                    ? (val) => validatePostalCode(val, address.country)
                    : undefined
            }
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
