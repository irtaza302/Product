import React from 'react';
import { ErrorPage } from '../ErrorPage';

export const NotFoundError: React.FC = () => {
  return (
    <ErrorPage
      code={404}
      title="Page Not Found"
      message="Sorry, we couldn't find the page you're looking for."
      action={{
        label: "Go Back Home",
        to: "/"
      }}
    />
  );
}; 