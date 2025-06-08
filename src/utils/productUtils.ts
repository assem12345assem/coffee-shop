import type {
  ProductProjection,
  Attribute,
  ProductVariant,
  ProductProjectionPagedQueryResponse,
  Category,
} from '@commercetools/platform-sdk';
import type { ProductInteface } from '@/data/interfaces';

export function simplifyProducts(
  apiResponse: ProductProjectionPagedQueryResponse,
  categoryMap: Map<string, Category>
): ProductInteface[] {
  return apiResponse.results.map((product) => simplifySingleProduct(product, categoryMap));
}

export function simplifySingleProduct(
  product: ProductProjection,
  categoryMap: Map<string, Category>
): ProductInteface {
  const variant: ProductVariant = product.masterVariant;
  const attributes: Attribute[] = variant.attributes || [];

  const categoryId = product.categories?.[0]?.id;
  const category = categoryId ? categoryMap.get(categoryId) : null;

  const simplifiedCategory = category?.slug?.['en-US']
    ? {
        key: category.slug['en-US'],
        name: category.name ?? {},
      }
    : null;

  return {
    id: product.id,
    name: getAttributeValue(attributes, 'name') || variant.sku || '',
    price: getNumericValue(attributes, 'price') || 0,
    description: getAttributeValue(attributes, 'description') || '',
    type: getAttributeValue(attributes, 'type') || '',
    ingredients: getAttributeValue(attributes, 'ingredients') || [],
    is_sale: getAttributeValue(attributes, 'is_sale') || false,
    sale_percent: getNumericValue(attributes, 'sale_percent') || 0,
    images: variant.images?.map((img) => img.url) || [],
    category: simplifiedCategory,
    sku: variant.sku || '',
    key: variant.key || '',
  };
}

// Helpers
function getAttributeValue(attributes: Attribute[], name: string): any {
  return attributes.find((attr) => attr.name === name)?.value ?? null;
}

function getNumericValue(attributes: Attribute[], name: string): number | null {
  const val = getAttributeValue(attributes, name);
  return typeof val === 'number' ? val : parseFloat(val);
}

function getEnumValue<T>(attributes: Attribute[], name: string, enumMap: Record<string, T>): T | null {
  const attr = attributes.find((attr) => attr.name === name);
  const label = attr?.value?.label;
  return label && label in enumMap ? enumMap[label as keyof typeof enumMap] : null;
}
