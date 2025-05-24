import handleApiError from '@/utils/handleApiError';
import type { ApiError } from '@/data/interfaces';

describe('handleApiError', () => {
  it('should return the error message for standard Error objects', () => {
    const error = new Error('Something went wrong');
    expect(handleApiError(error)).toBe('Error: Something went wrong');
  });

  it('should return the first error code and message for an ApiError with errors array', () => {
    const apiError = {
      message: 'Invalid request',
      errors: [{ code: '400', detail: 'Bad request' }],
    };
    expect(handleApiError(apiError)).toBe('400: Invalid request');
  });

  it('should return the message when an ApiError has no error array', () => {
    const apiError = { message: 'Unauthorized access' };
    expect(handleApiError(apiError)).toBe('Error: Unauthorized access');
  });

  it('should return a generic error message for unexpected inputs', () => {
    expect(handleApiError(null)).toBe('An unexpected error occurred. Please try again later.');
    expect(handleApiError(undefined)).toBe('An unexpected error occurred. Please try again later.');
    expect(handleApiError(123)).toBe('An unexpected error occurred. Please try again later.');
    expect(handleApiError({})).toBe('An unexpected error occurred. Please try again later.');
  });

  it('should ignore errors with a `statusCode` field and treat them as unknown', () => {
    const errorWithStatusCode = new Error('Forbidden');
    (errorWithStatusCode as ApiError).statusCode = 403;
    expect(handleApiError(errorWithStatusCode)).toBe('Error: Forbidden');
  });
});
