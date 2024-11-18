import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { authService } from '@/services/auth-service';
import { setUser } from '@/store/slices/auth-slice/authSlice';
import { Input, Button } from '@/components/common';
import { validateEmail } from '@/utils/validation';
import { useAppDispatch } from '@/hooks/use-app-dispatch';
import { useGetCartQuery } from '@/store/api';
import { updateCartFromServer } from '@/store/slices/cart-slice/cartSlice';
import { AUTH_CONSTANTS } from '@constants/authConstants';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { refetch } = useGetCartQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const response = await authService.login(email, password);
      
      dispatch(setUser({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email
      }));
      
      localStorage.setItem('token', response.token);
      
      // Fetch cart data after successful login
      const { data: cartData } = await refetch();
      if (cartData) {
        dispatch(updateCartFromServer(cartData));
      }

      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">{AUTH_CONSTANTS.WELCOME_BACK}</h2>
          <p className="mt-2 text-gray-600">{AUTH_CONSTANTS.SIGN_IN_PROMPT}</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<Mail className="w-5 h-5 text-gray-400" />}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<Lock className="w-5 h-5 text-gray-400" />}
            required
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          {AUTH_CONSTANTS.SIGN_IN_BUTTON}
        </Button>
      </form>
    </div>
  );
}; 