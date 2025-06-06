import React, { useState, useRef } from 'react';
import Input from '@/components/Login-registration-components/Input';
import CountryInput from '@/components/Login-registration-components/CountryInput';
import { showToast } from '@/utils/profileUtils';
import { validateStreet, validateCity, validatePostalCode, validateCountry } from '@/utils/validation';
import { normalizeCountryInput } from '@/utils/customerUtils';
import type { AddressRefs } from '@/data/interfaces';
import Button from '@/components/Login-registration-components/Button';

export const AddAddress: React.FC<{
  onAdd: (newAddress: any) => void;
  handleSetDefaultAddress: (field: string, addressId: string) => void;
}> = ({ onAdd, handleSetDefaultAddress }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDefaultBilling, setIsDefaultBilling] = useState(false);
  const [isDefaultShipping, setIsDefaultShipping] = useState(false);
  const addressRefs = useRef<{ [key: string]: AddressRefs }>({});

  const handleSave = () => {
    const street = addressRefs.current['streetName']?.getValue() || '';
    const city = addressRefs.current['city']?.getValue() || '';
    const postalCode = addressRefs.current['postalCode']?.getValue() || '';
    const country = addressRefs.current['country']?.getValue() || '';

    const errors = [
      addressRefs.current['streetName']?.getError(),
      addressRefs.current['city']?.getError(),
      addressRefs.current['postalCode']?.getError(),
      addressRefs.current['country']?.getError(),
    ];

    if (errors.some((error) => error)) {
      showToast('Please fix validation errors before saving!', 'error');
      return;
    }
    const newAddress = {
      streetName: street,
      city,
      postalCode,
      country: normalizeCountryInput(country),
      isDefaultBilling,
      isDefaultShipping,
    };
    onAdd(newAddress);
    setIsOpen(false);
  };
  const validatePostalCodeWrapper = (postalCode: string, country?: string) => {
    if (!country) {
      console.error('Country is undefined in postal code validation!');
      return 'Country is required for postal code validation.';
    }

    return validatePostalCode(postalCode, country.trim());
  };

  return (
    <div>
      <Button
        label="Add New Address"
        className="bg-rose-300 text-slate-600 transition-transform duration-200 hover:scale-105"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9998]">
          <div className="bg-coffeeBrown p-6 rounded-lg w-96 flex flex-col gap-2 fixed top-5 left-1/2 transform -translate-x-1/2 z-[9999]">
            <h2 className="text-xl font-semibold mb-4">Add New Address</h2>

            <Input
              ref={(el) => (addressRefs.current['streetName'] = el!)}
              label="Street Name"
              validate={validateStreet}
            />
            <Input ref={(el) => (addressRefs.current['city'] = el!)} label="City" validate={validateCity} />
            <Input
              ref={(el) => (addressRefs.current['postalCode'] = el!)}
              label="Postal Code"
              validate={(val) => validatePostalCodeWrapper(val, addressRefs.current['country']?.getValue() || '')}
            />
            <CountryInput
              ref={(el) => (addressRefs.current['country'] = el!)}
              label="Country"
              placeholder="Select a country"
              onChange={(selectedCountry) => {
                addressRefs.current['country']?.setValueExternally(selectedCountry);

                const currentPostal = addressRefs.current['postalCode']?.getValue() ?? '';

                const error = validatePostalCode(currentPostal, selectedCountry);
                addressRefs.current['postalCode']?.setErrorExternally(error);

                console.log('Postal Code:', currentPostal);
                console.log('Selected Country:', selectedCountry);
                console.log('Validation Error:', error);
              }}
              validate={validateCountry}
            />

            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-300">
                {' '}
                <input
                  type="checkbox"
                  checked={isDefaultBilling}
                  onChange={() => setIsDefaultBilling(!isDefaultBilling)}
                />
                <span className="text-sm ">Set as Default Billing Address</span>
              </div>
              <div className="flex items-center gap-2 transition-colors duration-200 hover:text-blue-300">
                {' '}
                <input
                  type="checkbox"
                  checked={isDefaultShipping}
                  onChange={() => setIsDefaultShipping(!isDefaultShipping)}
                />
                <span className="text-sm ">Set as Default Shipping Address</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => {
                  showToast('Address entry canceled', 'error');
                  setIsOpen(false);
                }}
                className="bg-[#6f4e37] text-gray-50 p-2 rounded w-full transition-transform duration-200 hover:scale-105"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#6f4e37] text-white p-2 rounded w-full transition-transform duration-200 hover:scale-105"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAddress;
