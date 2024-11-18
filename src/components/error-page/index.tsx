import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: number;
  action?: {
    label: string;
    onClick?: () => void;
    to?: string;
  };
}

export const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "Oops! Something went wrong",
  message = "We're sorry, but we encountered an unexpected error.",
  code = 500,
  action = {
    label: "Continue Shopping",
    to: "/"
  }
}) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="text-center">
        {/* Error Code */}
        <h1 className="text-9xl font-black text-gray-200">{code}</h1>

        {/* Title */}
        <p className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </p>

        {/* Message */}
        <p className="mt-4 text-gray-500">
          {message}
        </p>

        {/* Action Button */}
        {action.to ? (
          <Link
            to={action.to}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 mt-6 px-6 py-3 text-sm font-semibold text-white bg-primary-600 rounded-full hover:bg-primary-700 transition-colors duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            {action.label}
          </button>
        )}
      </div>
    </div>
  );
}; 