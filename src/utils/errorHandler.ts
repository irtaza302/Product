import axios from 'axios';

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return new ApiError(
      error.response?.data?.message || 'An error occurred',
      error.response?.status,
      error.code
    );
  }
  if (error instanceof Error) {
    return new ApiError(error.message);
  }
  return new ApiError('An unknown error occurred');
}; 