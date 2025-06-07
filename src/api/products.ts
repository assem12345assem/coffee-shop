import type {
  ClientResponse,
  ProductProjection,
  ProductProjectionPagedQueryResponse,
} from '@commercetools/platform-sdk';
import { getApiRoot } from '@/utils/getApiRoot';

export const fetchAllProducts = async (): Promise<ProductProjectionPagedQueryResponse> => {
  const response: ClientResponse<ProductProjectionPagedQueryResponse> = await getApiRoot()
    .productProjections()
    .get({ queryArgs: { limit: 500 } })
    .execute();
  return response.body;
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
