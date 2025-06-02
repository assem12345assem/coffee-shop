import type {
  ByProjectKeyCustomersRequestBuilder,
  ClientResponse,
  Customer,
  CustomerDraft,
  CustomerToken,
} from '@commercetools/platform-sdk';
import type { SignInResponse } from '@/data/interfaces';
import { getApiRoot } from '@/utils/getApiRoot';

const customersEndpoint: ByProjectKeyCustomersRequestBuilder = getApiRoot().customers();

export async function registerCustomer(customerDraft: CustomerDraft): Promise<SignInResponse> {
  try {
    const response: ClientResponse<SignInResponse> = await customersEndpoint.post({ body: customerDraft }).execute();
    return response.body;
  } catch (error) {
    console.error('Failed to register user:', error);
    throw error;
  }
}

export const loginCustomer = async (email: string, password: string): Promise<SignInResponse> => {
  try {
    const response: ClientResponse<SignInResponse> = await getApiRoot()
      .login()
      .post({
        body: {
          email,
          password,
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
export const getCustomerById = async (customerId: string): Promise<Customer> => {
  try {
    const response: ClientResponse<Customer> = await customersEndpoint.withId({ ID: customerId }).get().execute();
    return response.body;
  } catch (error) {
    console.error('Failed to fetch a customer:', error);
    throw error;
  }
};
export const requestPasswordResetToken = async (emailUser: string) => {
  try {
    const response: ClientResponse<CustomerToken> = await customersEndpoint
      .passwordToken()
      .post({
        body: {
          email: emailUser,
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Failed to request a token:', error);
    throw error;
  }
};
export const resetCustomerPassword = async (token: string, password: string): Promise<Customer> => {
  try {
    const response: ClientResponse<Customer> = await customersEndpoint
      .passwordReset()
      .post({
        body: {
          tokenValue: token,
          newPassword: password,
        },
      })
      .execute();
    return response.body;
  } catch (error) {
    console.error('Failed to reset password:', error);
    throw error;
  }
};
