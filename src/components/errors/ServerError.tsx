import React from 'react';
import { ErrorPage } from '../error-page';

interface ServerErrorProps {
  error?: Error;
  reset?: () => void;
}

export const ServerError: React.FC<ServerErrorProps> = ({ error, reset }) => {
  return (
    <ErrorPage
      code={500}
      title="Server Error"
      message={error?.message || "We're having trouble processing your request."}
      action={{
        label: "Try Again",
        onClick: reset
      }}
    />
  );
}; 