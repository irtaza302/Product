export const PRODUCT_CONSTANTS = {
  STOCK_STATUS: {
    IN_STOCK: (count: number) => `In Stock (${count} available)`,
    OUT_OF_STOCK: 'Out of Stock',
  },
  BUTTONS: {
    ADD_TO_CART: 'Add to Cart',
    ADD_TO_WISHLIST: 'Add to wishlist',
    IN_CART: 'In Cart',
  },
  MESSAGES: {
    ADDED_TO_CART: 'Product added to cart',
    FAILED_TO_ADD: 'Failed to add product to cart',
  },
  PRICE_PREFIX: '$',
} as const; 