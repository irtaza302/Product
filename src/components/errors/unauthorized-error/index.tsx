import React from 'react';
import { ErrorPage } from '@/components/error-page';
import { useNavigate } from 'react-router-dom';

export const UnauthorizedError: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      code={401}
      title="Access Denied"
      message="Please log in to access this page."
      action={{
        label: "Log In",
        onClick: () => navigate('/login')
      }}
    />
  );
}; 