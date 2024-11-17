import React from 'react';
import { UnauthorizedError } from '../components/errors/UnauthorizedError';

const PrivateRoute: React.FC<{ requireAuth: boolean }> = ({ requireAuth }) => {
  const isAuthenticated = true; // Replace with actual authentication logic

  if (!isAuthenticated) {
    return <UnauthorizedError />;
  }

  return null;
};

export default PrivateRoute; 