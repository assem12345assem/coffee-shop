import type {
  ProductProjection,
  Attribute,
  Product,
  ProductPagedQueryResponse,
  ProductVariant,
} from '@commercetools/platform-sdk';
import { CategoryType, CoffeeType, type ProductInteface } from '@/data/interfaces';

export function simplifyProducts(apiResponse: ProductPagedQueryResponse): ProductInteface[] {
  return apiResponse.results.map((element: Product) => {
    const item: ProductVariant = element.masterData.current.masterVariant;
    const attributes: Attribute[] = item.attributes || [];

    return {
      id: element.id,
      name: getAttributeValue(attributes, 'name') || item.sku || '',
      price: getNumericValue(attributes, 'price') || 0,
      description: getAttributeValue(attributes, 'description') || '',
      type: getEnumValue(attributes, 'type', CoffeeType) || CoffeeType.hot,
      ingredients: getAttributeValue(attributes, 'ingredients') || [],
      is_sale: getAttributeValue(attributes, 'is_sale') || false,
      sale_percent: getNumericValue(attributes, 'sale_percent') || 0,
      images: item.images?.map((img) => img.url) || [], // ✅ FIXED
      category: getEnumValue(attributes, 'category', CategoryType) || CategoryType.normal_coffee,
      sku: item.sku || '',
      key: item.key || '',
    };
  });
}

export function simplifySingleProduct(product: ProductProjection): ProductInteface {
  const item = product.masterVariant;
  const attributes: Attribute[] = item.attributes || [];

  const getAttributeValue = (name: string): any => attributes.find((attr) => attr.name === name)?.value ?? null;

  const getEnumValue = <T>(name: string, enumMap: Record<string, T>): T | null => {
    const label = attributes.find((attr) => attr.name === name)?.value?.label;
    return label && label in enumMap ? enumMap[label as keyof typeof enumMap] : null;
  };

  const getNumericValue = (name: string): number | null => {
    const val = getAttributeValue(name);
    return typeof val === 'number' ? val : parseFloat(val);
  };

  return {
    id: product.id,
    name: getAttributeValue('name') || item.sku || '',
    price: getNumericValue('price') || 0,
    description: getAttributeValue('description') || '',
    type: getEnumValue('type', CoffeeType) || CoffeeType.hot,
    ingredients: getAttributeValue('ingredients') || [],
    is_sale: getAttributeValue('is_sale') || false,
    sale_percent: getNumericValue('sale_percent') || 0,
    images: item.images?.map((img) => img.url) || [], // ✅ FIXED
    category: getEnumValue('category', CategoryType) || CategoryType.normal_coffee,
    sku: item.sku || '',
    key: item.key || '',
  };
}

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
