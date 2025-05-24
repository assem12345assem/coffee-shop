import React, { useEffect, useState } from 'react';
import { getLoggedInUserFromSessionStorage } from '@/utils/customerUtils';
import { getCustomerById } from '@/api/customers';
import type { SessionUser } from '@/data/interfaces';
import type { Customer } from '@commercetools/platform-sdk';

const CustomerProfile = () => {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const user: SessionUser | null = getLoggedInUserFromSessionStorage();
        if (!user) return;
        const customerId: string | undefined = user.customerId;
        if (!customerId) return;
        const customerData: Customer = await getCustomerById(customerId);
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

  return (
    <div>
      <div>ID: {customer.id}</div>
      <div>Created At: {customer.createdAt}</div>
      <div>Last Modified At: {customer.lastModifiedAt}</div>
      <div>Email: {customer.email}</div>
      <div>First Name: {customer.firstName}</div>
      <div>Last Name: {customer.lastName}</div>
      <div>Date of Birth: {customer.dateOfBirth}</div>
      <div>Is Email Verified: {customer.isEmailVerified ? 'Yes' : 'No'}</div>
      <div>Authentication Mode: {customer.authenticationMode}</div>

      {customer.addresses && customer.addresses.length > 0 && (
        <div>
          <h4>Addresses:</h4>
          {customer.addresses.map((address, index) => (
            <div key={index}>
              <div>ID: {address.id}</div>
              <div>Street Name: {address.streetName}</div>
              <div>Postal Code: {address.postalCode}</div>
              <div>City: {address.city}</div>
              <div>Country: {address.country}</div>
            </div>
          ))}
        </div>
      )}

      <div>Default Shipping Address ID: {customer.defaultShippingAddressId}</div>
      <div>Default Billing Address ID: {customer.defaultBillingAddressId}</div>
      <div>Shipping Address IDs: {customer.shippingAddressIds?.join(', ') ?? ''}</div>
      <div>Billing Address IDs: {customer.billingAddressIds?.join(', ') ?? ''}</div>
    </div>
  );
};

export default CustomerProfile;
