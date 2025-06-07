import { getApiRoot } from '@/api/commerceToolsClient';
import type { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/platform-sdk';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response: ClientResponse<CategoryPagedQueryResponse> = await getApiRoot()
        .categories()
        .get({ queryArgs: { limit: 100 } }) // increased limit just in case
        .execute();

      return response.body.results;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  },

  async getSubcategoriesByParentKey(parentKey: string): Promise<Category[]> {
    try {
      // Step 1: Get the parent category by key directly
      const parentResponse = await getApiRoot()
        .categories()
        .get({ queryArgs: { where: `key="${parentKey}"`, limit: 1 } })
        .execute();

      const parent = parentResponse.body.results?.[0];

      if (!parent) {
        console.warn(`Parent category with key "${parentKey}" not found.`);
        return [];
      }

      // Step 2: Fetch subcategories using parent.id
      const response = await getApiRoot()
        .categories()
        .get({
          queryArgs: {
            where: `parent(id="${parent.id}")`,
            limit: 50,
          },
        })
        .execute();

      return response.body.results;
    } catch (error) {
      console.error('Failed to fetch subcategories:', error);
      return [];
    }
  },
};
