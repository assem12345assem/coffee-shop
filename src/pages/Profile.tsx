import React, { useState } from 'react';
import Input from '@/components/Login-registration-components/Input';
import Button from '@/components/Login-registration-components/Button';
import DefaultAddressCheckbox from '@/components/Profile-components/DefaultAddressCheckbox';

function Profile() {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [useSameAddress, setUseSameAddress] = useState(true);

  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    email: 'john.doe@example.com',
    street: '123 Main St',
    city: 'New York',
    postalCode: '10001',
    country: 'US',
    shippingStreet: '456 Shipping Ave',
    shippingCity: 'Brooklyn',
    shippingPostalCode: '11201',
    shippingCountry: 'US',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className=" relative w-full min-h-screen bg-[#221B18] text-americanSilver py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-creamLight font-third">My Profile</h1>
          <p className="mt-2 text-americanSilver">Manage your account information</p>
        </div>

        <div className="bg-coffeeBrown rounded-lg shadow-xl overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  value={userData.firstName}
                  onChange={(val) => handleInputChange('firstName', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
                <Input
                  label="Last Name"
                  value={userData.lastName}
                  onChange={(val) => handleInputChange('lastName', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
                <Input
                  label="Date of Birth"
                  type="date"
                  value={userData.dob}
                  onChange={(val) => handleInputChange('dob', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
                <Input
                  label="Email"
                  type="email"
                  value={userData.email}
                  onChange={(val) => handleInputChange('email', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">
                Billing Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Street"
                  value={userData.street}
                  onChange={(val) => handleInputChange('street', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
                <Input
                  label="City"
                  value={userData.city}
                  onChange={(val) => handleInputChange('city', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
                <Input
                  label="Postal Code"
                  value={userData.postalCode}
                  onChange={(val) => handleInputChange('postalCode', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
                <Input
                  label="Country"
                  value={userData.country}
                  onChange={(val) => handleInputChange('country', val)}
                  className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                />
              </div>
            </div>

            <DefaultAddressCheckbox checked={useSameAddress} onChange={setUseSameAddress} className="text-creamLight" />

            {!useSameAddress && (
              <div className="mb-8 mt-6">
                <h2 className="text-xl font-semibold text-creamLight border-b border-rustBrown pb-2 mb-6">
                  Shipping Address
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Street"
                    value={userData.shippingStreet}
                    onChange={(val) => handleInputChange('shippingStreet', val)}
                    className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                  />
                  <Input
                    label="City"
                    value={userData.shippingCity}
                    onChange={(val) => handleInputChange('shippingCity', val)}
                    className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                  />
                  <Input
                    label="Postal Code"
                    value={userData.shippingPostalCode}
                    onChange={(val) => handleInputChange('shippingPostalCode', val)}
                    className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                  />
                  <Input
                    label="Country"
                    value={userData.shippingCountry}
                    onChange={(val) => handleInputChange('shippingCountry', val)}
                    className="bg-brownTransparent border-rustBrown text-Temptress focus:outline-none"
                  />
                </div>
              </div>
            )}

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
