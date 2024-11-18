import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/slices/auth-slice/authSlice';

export const AuthPersist: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (user && token) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);

  return null;
}; 