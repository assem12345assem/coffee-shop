import { getApiRoot } from '@/api/commerceToolsClient';
import type { Category, CategoryPagedQueryResponse } from '@commercetools/platform-sdk';
import type { ClientResponse } from '@commercetools/platform-sdk';

export const categoryService = {
  async getCategories(): Promise<Category[]> {
    try {
      const response: ClientResponse<CategoryPagedQueryResponse> = await getApiRoot()
        .categories()
        .get({ queryArgs: { limit: 100 } })
        .execute();

      return response.body.results;
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  },

  async getCategoryByKey(key: string): Promise<Category | null> {
    try {
      const response = await getApiRoot()
        .categories()
        .get({ queryArgs: { where: `key="${key}"`, limit: 1 } })
        .execute();

      return response.body.results[0] || null;
    } catch (error) {
      console.error(`Failed to fetch category by key "${key}":`, error);
      return null;
    }
  },

  async getSubcategoriesByParentKey(parentKey: string): Promise<Category[]> {
    try {
      const parent = await categoryService.getCategoryByKey(parentKey);

      if (!parent) {
        console.warn(`Parent category with key "${parentKey}" not found.`);
        return [];
      }

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

  async getCategoryMap(): Promise<Map<string, Category>> {
    const categories = await categoryService.getCategories();
    const map = new Map<string, Category>();
    categories.forEach((cat) => map.set(cat.id, cat));
    return map;
  },

  getBreadcrumbPath(categoryId: string, categoryMap: Map<string, Category>): Category[] {
    const path: Category[] = [];
    let current = categoryMap.get(categoryId);

    while (current) {
      path.unshift(current);
      const parentId = current.parent?.id;
      current = parentId ? categoryMap.get(parentId) : undefined;
    }

    return path;
  },
};
