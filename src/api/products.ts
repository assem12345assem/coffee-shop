import type { ClientResponse, ProductPagedQueryResponse } from '@commercetools/platform-sdk';
import { getApiRoot } from '@/utils/getApiRoot';

export const fetchAllProducts: () => Promise<ProductPagedQueryResponse> =
  async (): Promise<ProductPagedQueryResponse> => {
    try {
      const response: ClientResponse<ProductPagedQueryResponse> = await getApiRoot().products().get().execute();

      return response.body;
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw error;
    }
  };
