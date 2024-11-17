import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { RootState } from '../store';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components';
import { calculateCartTotal } from '../utils';
import { useUpdateCartMutation } from '../store/api';
import { PAGE_CONSTANTS } from '../constants/pageConstants';

import { 
  ShoppingBagIcon, 
  ArrowLeftIcon,
  PlusSmallIcon, 
  MinusSmallIcon, 
  TrashIcon 
} from '@heroicons/react/24/outline';

const CartPage: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [updateCart] = useUpdateCartMutation();

  useEffect(() => {
    const syncCartData = async () => {
      if (auth.isAuthenticated && cart.items.length > 0) {
        try {
          await updateCart({
            items: cart.items,
            total: cart.total
          }).unwrap();
        } catch (error) {
          console.error('Failed to sync cart:', error);
        }
      }
    };

    syncCartData();
  }, [cart.items, cart.total, auth.isAuthenticated, updateCart]);

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
    
    if (auth.isAuthenticated) {
      const updatedItems = cart.items.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      
      try {
        await updateCart({
          items: updatedItems,
          total: calculateCartTotal(updatedItems)
        }).unwrap();
      } catch (error) {
        console.error('Failed to sync cart:', error);
      }
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    dispatch(removeFromCart(itemId));
    
    if (auth.isAuthenticated) {
      const updatedItems = cart.items.filter(item => item._id !== itemId);
      
      try {
        await updateCart({
          items: updatedItems,
          total: calculateCartTotal(updatedItems)
        }).unwrap();
      } catch (error) {
        console.error('Failed to sync cart:', error);
      }
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <ShoppingBagIcon className="w-24 h-24 text-gray-300 mx-auto" />
          <h2 className="text-2xl font-semibold text-gray-900">{PAGE_CONSTANTS.CART_EMPTY_TITLE}</h2>
          <p className="text-gray-500">{PAGE_CONSTANTS.CART_EMPTY_MESSAGE}</p>
          <Button
            onClick={() => navigate('/')}
            variant="primary"
            className="mt-4"
            icon={<ArrowLeftIcon className="w-5 h-5" />}
          >
            {PAGE_CONSTANTS.CART_EMPTY_BUTTON}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{PAGE_CONSTANTS.CART_PAGE_TITLE}</h1>
        <span className="text-gray-500">({cart.items.length} items)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div 
              key={item._id} 
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
            >
              <div className="flex items-start p-4 gap-4">
                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item._id)}
                      className="p-2 text-gray-400 hover:text-red-500"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Price and Quantity Controls */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center bg-gray-50 rounded-lg p-1">
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded-md transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <MinusSmallIcon className="w-5 h-5 text-gray-600" />
                        </button>
                        <span className="w-10 text-center font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded-md transition-colors"
                        >
                          <PlusSmallIcon className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Price per item</p>
                      <div className="flex items-center justify-end space-x-2">
                        <p className="text-lg font-semibold text-gray-900">
                          ${item.price.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          × {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-primary-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">{PAGE_CONSTANTS.ORDER_SUMMARY_TITLE}</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>{PAGE_CONSTANTS.SUBTOTAL}</span>
                <span>${calculateCartTotal(cart.items).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{PAGE_CONSTANTS.SHIPPING}</span>
                <span>Free</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">{PAGE_CONSTANTS.TOTAL}</span>
                  <span className="text-lg font-semibold text-gray-900">
                    ${calculateCartTotal(cart.items).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">{PAGE_CONSTANTS.INCLUDING_VAT}</p>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                className="w-full justify-center"
                size="lg"
                onClick={() => navigate('/checkout')}
                icon={<ShoppingBagIcon className="w-5 h-5" />}
              >
                {PAGE_CONSTANTS.PROCEED_TO_CHECKOUT}
              </Button>
              <Button
                variant="outline"
                className="w-full justify-center"
                size="lg"
                onClick={() => navigate('/')}
                icon={<ArrowLeftIcon className="w-5 h-5" />}
              >
                {PAGE_CONSTANTS.CONTINUE_SHOPPING}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;