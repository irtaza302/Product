import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useGetCartQuery } from '../../../store/api/cart-api';
import { useAppDispatch } from '../../../hooks/use-app-dispatch';
import { updateCartFromServer } from '../../../store/slices/cartSlice';

export const CartInitializer: React.FC = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { data: cartData } = useGetCartQuery(undefined, {
    skip: !auth.isAuthenticated,
  });

  useEffect(() => {
    if (auth.isAuthenticated && cartData) {
      dispatch(updateCartFromServer(cartData));
    }
  }, [auth.isAuthenticated, cartData, dispatch]);

  return null;
}; 