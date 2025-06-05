import type { ClientResponse, CustomerChangePassword, CustomerUpdate } from '@commercetools/platform-sdk';
import { customersEndpoint } from '@/api/customers';
import type { Customer } from '@commercetools/platform-sdk/dist/declarations/src/generated/models/customer';

export async function updateCustomer(customer: Customer, payload: CustomerUpdate) {
  try {
    const response: ClientResponse<Customer> = await customersEndpoint
      .withId({ ID: customer.id })
      .post({ body: payload })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
}

export async function changeCustomerPassword(customer: CustomerChangePassword) {
  try {
    const response: ClientResponse<Customer> = await customersEndpoint
      .password()
      .post({
        body: {
          id: customer.id,
          version: customer.version,
          currentPassword: customer.currentPassword,
          newPassword: customer.newPassword,
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Failed to change password:', error);
    throw error;
  }
}
