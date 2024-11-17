import React, { useEffect } from 'react';

export const TestErrorComponent: React.FC = () => {
  useEffect(() => {
    throw new Error("This is a test error!");
  }, []);

  return null;
}; 