export const PRODUCT_CONSTANTS = {
  STOCK_STATUS: {
    IN_STOCK: (count: number) => `In Stock (${count} available)`,
    OUT_OF_STOCK: 'Out of Stock',
  },
  BUTTONS: {
    ADD_TO_CART: 'Add to Cart',
    ADD_TO_WISHLIST: 'Add to wishlist',
  },
  PRICE_PREFIX: '$',
} as const; 