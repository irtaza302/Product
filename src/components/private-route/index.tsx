import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UnauthorizedError } from '../errors/UnauthorizedError';
import type { RootState } from '../../store';

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAuth: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requireAuth }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  // If authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Redirect to login with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authentication is not required but user is authenticated
  if (!requireAuth && isAuthenticated) {
    // Redirect to home or dashboard
    return <Navigate to="/" replace />;
  }

  // If there's an error with authentication
  if (requireAuth && !isAuthenticated) {
    return <UnauthorizedError />;
  }

  // Render children if all conditions are met
  return <>{children}</>;
};

export default PrivateRoute; 