import { RefObject, useEffect, useRef, useState } from 'react';
import React from 'react';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';
import Input from '@/components/Login-registration-components/Input';
import { validateCity, validateCountry, validatePostalCode, validateStreet } from '@/utils/validation';
import CountryInput from '@/components/Login-registration-components/CountryInput';
import { denormalizeCountryCode, normalizeCountryInput } from '@/utils/customerUtils';
import type { Address } from '@commercetools/platform-sdk';
import type { InputHandle } from '@/data/interfaces';
import pencilIcon from '@/assets/pencil.png';
import removeIcon from '@/assets/remove.png';
import AddressFields from '@/components/Profile-components/AddressFields';
import { showToast } from '@/utils/profileUtils';

interface AddressSectionProps {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer | null>>;
  isEditing: boolean;
  handleSetDefaultAddress: (field: string, addressId: string) => void;
  handleRemoveClick: (addressId: string) => void;
  handleSaveEdit: (
    updatedAddress: Address,
    options?: { isBillingDefault?: boolean; isShippingDefault?: boolean }
  ) => void;
  closeModal: () => void;
}

const AddressSection: React.FC<AddressSectionProps> = ({
  customer,
  setCustomer,
  isEditing,
  handleSetDefaultAddress,
  handleRemoveClick,
  handleSaveEdit,
  closeModal,
}) => {
  const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
  const [indexItem, setIndexItem] = useState(0);
  const addressRefs = useRef<Record<number, Record<string, InputHandle>>>({});

  const [isBillingDefault, setIsBillingDefault] = useState(false);
  const [isShippingDefault, setIsShippingDefault] = useState(false);
  const addressValidityRefs = useRef<Record<number, Record<string, boolean>>>({});

  useEffect(() => {
    if (addressToEdit) {
      setIsBillingDefault(customer.defaultBillingAddressId === addressToEdit.id);
      setIsShippingDefault(customer.defaultShippingAddressId === addressToEdit.id);
    }
  }, [addressToEdit, customer]);

  const handleSaveAndClose = async () => {
    if (!addressToEdit) return;

    const refs = addressRefs.current[indexItem];
    const validityMap = addressValidityRefs.current[indexItem];

    if (!refs || !validityMap) {
      showToast('Validation state is not initialized yet', 'error');
      return;
    }

    const requiredFields = ['streetName', 'city', 'postalCode', 'country'];

    // Step 1: Trigger validations manually
    requiredFields.forEach((field) => {
      const fieldRef = refs[field];
      if (fieldRef?.validate) {
        const value = fieldRef.getValue?.() || '';
        const error = fieldRef.validate(value);
        fieldRef.setErrorExternally?.(error);
        validityMap[field] = error === '';
      }
    });

    // Step 2: Wait one animation frame so DOM updates
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const allValid = requiredFields.every((field) => validityMap[field]);

    if (!allValid) {
      showToast('Please fix validation errors first', 'error');
      console.warn('Validation failed — Save is aborted.');
      return;
    }

    // ✅ All fields are valid — proceed
    handleSaveEdit(addressToEdit, {
      isBillingDefault,
      isShippingDefault,
    });

    setAddressToEdit(null);
    closeModal();
  };

  return (
    <div className="mb-8">
      <h2 className="section-title">Addresses</h2>

      {/* Modal Editing */}
      {addressToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
          <div className="bg-coffeeBrown text-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Address</h2>

            <AddressFields
              address={addressToEdit}
              setAddress={setAddressToEdit}
              customer={customer}
              addressRefs={addressRefs}
              addressValidityRefs={addressValidityRefs}
              index={indexItem}
              isBillingDefault={isBillingDefault}
              setIsBillingDefault={setIsBillingDefault}
              isShippingDefault={isShippingDefault}
              setIsShippingDefault={setIsShippingDefault}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="bg-gray-600 text-white p-2 rounded-md"
                onClick={() => {
                  delete addressValidityRefs.current[indexItem];

                  // ✅ 2. Clear errors from input fields if needed
                  const fieldRefs = addressRefs.current[indexItem];
                  if (fieldRefs) {
                    Object.values(fieldRefs).forEach((ref) => {
                      ref?.setErrorExternally?.('');
                    });
                  }

                  // ✅ 3. Close modal and reset state
                  setAddressToEdit(null);
                }}
              >
                Cancel
              </button>
              <button className="bg-green-600 text-white p-2 rounded-md" onClick={handleSaveAndClose}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-8 p-10">
        {customer.addresses.map((address, index) => (
          <div
            key={address.id || index}
            className="flex flex-col gap-8 transition-transform duration-200 hover:-translate-y-2"
          >
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <h3 className="text-[#f5f5dc] font-semibold text-lg border-b-2 border-[#8b5a2b] pb-2">
                  Address {index + 1}
                </h3>
                <div
                  className="bg-creamLight p-2 rounded-full flex justify-center items-center w-10 h-10 transition-transform duration-200 hover:scale-110 cursor-pointer"
                  onClick={() => {
                    setAddressToEdit(address);
                    setIndexItem(index);
                  }}
                >
                  <img src={pencilIcon} alt="Edit" className="w-6 h-6" />
                </div>

                <div
                  className="bg-creamLight p-2 rounded-full flex justify-center items-center w-10 h-10 transition-transform duration-200 hover:scale-110 cursor-pointer"
                  onClick={() => handleRemoveClick(index)}
                >
                  <img src={removeIcon} alt="Remove" className="w-6 h-6" />
                </div>
              </div>

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

            {/* Inline address fields can be readOnly unless editing whole section */}
            {['streetName', 'city', 'postalCode'].map((field) => (
              <Input
                key={`${index}-${field}`}
                ref={(el) => {
                  if (!addressRefs.current[index]) addressRefs.current[index] = {};
                  addressRefs.current[index][field] = el;
                }}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                initialValue={address[field as keyof Address] ?? ''}
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
              key={`country-${index}`}
              ref={(el) => {
                if (!addressRefs.current[index]) addressRefs.current[index] = {};
                addressRefs.current[index]['country'] = el;
              }}
              label="Country"
              initialValue={isEditing ? address.country : denormalizeCountryCode(address.country)}
              onChange={(selectedCountry) => {
                if (!addressRefs.current[index]) addressRefs.current[index] = {};
                addressRefs.current[index]['country']?.setValueExternally(selectedCountry);

                const currentPostal = addressRefs.current[index]?.postalCode?.getValue() ?? '';
                const error = validatePostalCode(currentPostal, selectedCountry);

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

            {/* Default flags toggles for the list — call handlers directly */}
            {isEditing && (
              <div className="flex flex-col gap-2 mt-4">
                <label className="flex items-center gap-2 cursor-pointer">
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
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
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
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressSection;
