export const ORDER_CONSTANTS = {
  INVOICE: {
    TITLE: 'INVOICE',
    BILL_TO: 'Bill To:',
    ITEM_HEADERS: {
      ITEM: 'Item',
      QUANTITY: 'Quantity',
      PRICE: 'Price',
      TOTAL: 'Total',
    },
    THANK_YOU: 'Thank you for your business!',
    SUPPORT_CONTACT: 'For any questions, please contact support@ecomstore.com',
  },
  SUCCESS: {
    TITLE: 'Order Successfully Placed!',
    ORDER_ID_PREFIX: 'Your order ID is #',
    DOWNLOAD_INVOICE: 'Download Invoice',
    CONTINUE_SHOPPING: 'Continue Shopping',
  },
  STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
  },
} as const; 