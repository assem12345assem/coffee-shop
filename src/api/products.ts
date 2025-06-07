import type { ClientResponse, ProductProjection, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { getApiRoot } from '@/utils/getApiRoot';

export const fetchAllProducts = async (): Promise<ProductPagedQueryResponse> => {
  try {
    const response: ClientResponse<ProductPagedQueryResponse> = await getApiRoot().products().get().execute();
    return response.body;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const fetchProductById = async (id: string): Promise<ProductProjection> => {
  try {
    const response: ClientResponse<ProductProjection> = await getApiRoot()
      .productProjections()
      .withId({ ID: id })
      .get()
      .execute();

    return response.body;
  } catch (error) {
    console.error(`Failed to fetch product with ID ${id}:`, error);
    throw error;
  }
};
