import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { clearCart } from '../../store/slices/cart-slice/cartSlice';
import { useCreateOrderMutation } from '../../store/api';
import { useUpdateCartMutation } from '../../store/api/cart-api';
import { LoadingSpinner } from '../../components';
import { validateShippingDetails } from '../../utils';
import { useStockCheck } from '../../hooks';
import type { ShippingDetails } from '../../types';

const CheckoutPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [createOrder, { isLoading: isProcessing }] = useCreateOrderMutation();
  const checkStockForItems = useStockCheck();
  const [updateCart] = useUpdateCartMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate shipping details
    const validationErrors = validateShippingDetails(shippingDetails);
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    try {
      // Check stock for all items
      await checkStockForItems(cart.items);

      const response = await createOrder({
        items: cart.items.map(item => ({
          product: item._id,
          quantity: item.quantity,
          price: item.price
        })),
        shippingDetails,
        total: cart.total
      }).unwrap();

      if (response.success) {
        // Clear local cart state
        dispatch(clearCart());
        
        // Clear server-side cart if authenticated
        if (auth.isAuthenticated) {
          try {
            await updateCart({ items: [], total: 0 }).unwrap();
          } catch (err) {
            console.error('Failed to clear server cart:', err);
            // Continue with checkout even if server cart clear fails
          }
        }

        navigate('/order-success', { 
          state: { 
            orderDetails: {
              orderId: response.order.id,
              date: new Date(),
              items: cart.items,
              shippingDetails,
              total: cart.total
            }
          }
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process order';
      setError(errorMessage);
      console.error('Checkout error:', err);
    }
  };

  // Render loading state
  if (isProcessing) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (cart.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">Checkout</h1>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Details Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Shipping Details</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={shippingDetails.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingDetails.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingDetails.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingDetails.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Country</label>
                <input
                  type="text"
                  name="country"
                  value={shippingDetails.country}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed font-medium"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Processing...</span>
                </span>
              ) : (
                'Place Order'
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Order Summary</h2>
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div 
                key={item._id} 
                className="flex items-start justify-between py-4 border-b border-gray-200 last:border-0"
              >
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                </div>
                <span className="font-medium text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-800">Total</span>
                <span className="text-lg font-bold text-blue-600">
                  ${cart.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
