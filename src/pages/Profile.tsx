import React, { useState, useEffect } from 'react';
import Input from '@/components/Login-registration-components/Input';
import Button from '@/components/Login-registration-components/Button';
import DefaultAddressCheckbox from '@/components/Profile-components/DefaultAddressCheckbox';
import headerBg from '@/assets/footer.png';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import { getCustomerById } from '@/api/customers';
import type { SessionUser } from '@/data/interfaces';
import type { Customer } from '@commercetools/platform-sdk';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [useSameAddress, setUseSameAddress] = useState(true);
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const user: SessionUser | null = getLoggedInUserFromSessionStorage();
        if (!user || !user.customerId) return;
        const customerData = await getCustomerById(user.customerId);
        if (customerData) setCustomer(customerData);
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      }
    };
    fetchCustomer();
  }, []);
  console.log(customer);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  if (!customer) {
    return <div className="text-center text-white mt-10">Loading customer data...</div>;
  }

  return (
    <div className="relative w-full min-h-screen bg-[#221B18] text-americanSilver py-10 px-4 sm:px-6 lg:px-8">
      <div
        className="absolute top-[-110px] left-0 h-[115px] w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${headerBg})` }}
      ></div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-creamLight font-third">My Profile</h1>
          <p className="mt-2 text-americanSilver">Manage your account information</p>
        </div>

        <div className="bg-coffeeBrown rounded-lg shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {/* Personal Info */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  value={customer.firstName}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
                <Input
                  label="Last Name"
                  value={customer.lastName}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={customer.dateOfBirth}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
                <Input
                  label="Email"
                  type="email"
                  value={customer.email}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
              </div>
            </div>

            {/* Billing Address */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">
                Billing Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Street"
                  value={customer.addresses[0]?.streetName}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
                <Input
                  label="City"
                  value={customer.addresses[0]?.city}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
                <Input
                  label="Postal Code"
                  value={customer.addresses[0]?.postalCode}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
                <Input
                  label="Country"
                  value={customer.addresses[0]?.country}
                  onChange={() => {}}
                  className="bg-brownTransparent border-rustBrown text-Temptress"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <DefaultAddressCheckbox checked={useSameAddress} onChange={setUseSameAddress} className="text-creamLight" />

            {!useSameAddress && (
              <div className="mb-8 mt-6">
                <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Street"
                    value={customer.addresses[1]?.streetName || ''}
                    onChange={() => {}}
                    className="bg-brownTransparent border-rustBrown text-Temptress"
                  />
                  <Input
                    label="City"
                    value={customer.addresses[1]?.city || ''}
                    onChange={() => {}}
                    className="bg-brownTransparent border-rustBrown text-Temptress"
                  />
                  <Input
                    label="Postal Code"
                    value={customer.addresses[1]?.postalCode || ''}
                    onChange={() => {}}
                    className="bg-brownTransparent border-rustBrown text-Temptress"
                  />
                  <Input
                    label="Country"
                    value={customer.addresses[1]?.country || ''}
                    onChange={() => {}}
                    className="bg-brownTransparent border-rustBrown text-Temptress"
                  />
                </div>
              </div>
            )}

            {/* Buttons and Feedback */}
            <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
              <Button
                type="button"
                label="Cancel"
                variant="outline"
                className="border-creamLight text-black hover:bg-rustBrown"
              />
              <Button
                type="submit"
                label={loading ? 'Saving...' : 'Save Changes'}
                disabled={loading}
                className="bg-LightTaupe hover:bg-rustBrown text-Temptress"
              />
            </div>

            {successMessage && (
              <div className="mt-6 p-3 bg-semiGreen bg-opacity-20 text-semiGreen rounded">{successMessage}</div>
            )}
            {errorMessage && (
              <div className="mt-6 p-3 bg-red-500 bg-opacity-20 text-red-500 rounded">{errorMessage}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
