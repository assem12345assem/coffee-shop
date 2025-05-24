import type { Cart } from '@commercetools/platform-sdk';

export function processPurchase(cart: Cart): void {
  console.log(JSON.stringify(cart));
}
