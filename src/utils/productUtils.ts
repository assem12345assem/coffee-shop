import type { Attribute, Product, ProductPagedQueryResponse, ProductVariant } from '@commercetools/platform-sdk';
import { CategoryType, CoffeeType, type ProductInteface } from '@/data/interfaces';

export function simplifyProducts(apiResponse: ProductPagedQueryResponse): ProductInteface[] {
  const simplified: ProductInteface[] = [];

  apiResponse.results.forEach((element: Product) => {
    const item: ProductVariant = element.masterData.current.masterVariant;
    const attributes: Attribute[] = item.attributes || [];
    const product: ProductInteface = {
      id: getAttributeValue(attributes, 'custom-id'),
      name: item.sku || '',
      price: getAttributeValue(attributes, 'price'),
      description: getAttributeValue(attributes, 'description') || '',
      type: getAttributeValue(attributes, 'type') || '',
      ingredients: getAttributeValue(attributes, 'ingredients') || [],
      is_sale: getAttributeValue(attributes, 'is_sale') || false,
      sale_percent: getAttributeValue(attributes, 'sale_percent') || 0,
      images: getAttributeValue(attributes, 'images') || [],
      category: getAttributeValue(attributes, 'category') || '',
      sku: item.sku || '',
      key: item.key || '',
    };
    console.log(typeof product.category);
    simplified.push(product);
  });

  return simplified;
}

function getAttributeValue(attributes: Attribute[], name: string) {
  const attribute: Attribute | undefined = attributes.find((attribute): boolean => attribute.name === name);
  if (attribute?.name === 'type') {
    const label = attribute.value?.label;
    return CoffeeType[label as keyof typeof CoffeeType];
  }
  if (attribute?.name === 'category') {
    const label = attribute.value?.label;
    return CategoryType[label as keyof typeof CategoryType];
  }
  return attribute ? attribute.value : null;
}
