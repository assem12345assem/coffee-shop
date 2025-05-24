import type { CommercetoolsSdkError } from '@/data/interfaces';

export default function handleApiError(error: unknown): string {
  if (isApiError(error)) {
    const apiError = error.body;

    if (apiError?.errors?.length) {
      return `${apiError.errors[0].code}: ${apiError.errors[0].message}`;
    }

    if (apiError?.message) {
      return `Error: ${apiError.message}`;
    }
  }

  if (error instanceof Error) {
    return `Error: ${error.message}`;
  }

  return 'An unexpected error occurred. Please try again later.';
}

function isApiError(error: unknown): error is CommercetoolsSdkError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'body' in error &&
    typeof (error as CommercetoolsSdkError).body?.message === 'string'
  );
}
