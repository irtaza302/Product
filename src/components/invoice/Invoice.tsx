import React from 'react';
import { format } from 'date-fns';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { ORDER_CONSTANTS } from '@constants/orderConstants';

interface InvoiceProps {
  orderDetails: {
    orderId: string;
    date: Date;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
    }>;
    shippingDetails: {
      fullName: string;
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    total: number;
  };
}

export const Invoice: React.FC<InvoiceProps> = ({ orderDetails }) => {
  return (
    <div className="p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingBagIcon className="w-8 h-8 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900">EcomStore</h2>
          </div>
          <p className="text-gray-500 mt-1">www.ecomstore.com</p>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-gray-900">
            {ORDER_CONSTANTS.INVOICE.TITLE}
          </h1>
          <p className="text-gray-500">#{orderDetails.orderId}</p>
          <p className="text-gray-500">
            {format(new Date(orderDetails.date), 'MMMM dd, yyyy')}
          </p>
        </div>
      </div>

      {/* Billing Details */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            {ORDER_CONSTANTS.INVOICE.BILL_TO}
          </h3>
          <div className="text-gray-600">
            <p>{orderDetails.shippingDetails.fullName}</p>
            <p>{orderDetails.shippingDetails.address}</p>
            <p>{orderDetails.shippingDetails.city}, {orderDetails.shippingDetails.postalCode}</p>
            <p>{orderDetails.shippingDetails.country}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4">Item</th>
            <th className="text-center py-3 px-4">Quantity</th>
            <th className="text-right py-3 px-4">Price</th>
            <th className="text-right py-3 px-4">Total</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails.items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-4 px-4">{item.name}</td>
              <td className="text-center py-4 px-4">{item.quantity}</td>
              <td className="text-right py-4 px-4">${item.price.toFixed(2)}</td>
              <td className="text-right py-4 px-4">
                ${(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal:</span>
            <span className="font-medium">${orderDetails.total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping:</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="border-t border-gray-200 pt-2 mt-2">
            <div className="flex justify-between">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-primary-600">
                ${orderDetails.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500">
        <p>{ORDER_CONSTANTS.INVOICE.THANK_YOU}</p>
        <p className="mt-1">{ORDER_CONSTANTS.INVOICE.SUPPORT_CONTACT}</p>
      </div>
    </div>
  );
}; 