import ErrorPopup from './ErrorPopup';
import SuccessPopup from './SuccessPopup';
import type { ReactElement } from 'react';
import React from 'react';
import type {
  ErrorNotificationType,
  StringOrNull,
  SuccessNotificationType,
  VoidFunctionOrUndefined,
} from '@/data/interfaces';

export const ErrorNotification: ErrorNotificationType = ({
  errorMessage,
  onClear,
  autoDismissMs = 3000,
}: {
  errorMessage: StringOrNull;
  onClear: VoidFunctionOrUndefined;
  autoDismissMs?: number;
}): ReactElement | null => {
  if (!errorMessage) return null;

  return <ErrorPopup message={errorMessage} onClose={onClear} autoDismissMs={autoDismissMs} />;
};

export const SuccessNotification: SuccessNotificationType = ({
  successMessage,
  onClear,
}: {
  successMessage: StringOrNull;
  onClear: VoidFunctionOrUndefined;
}): ReactElement | null => {
  if (!successMessage) return null;

  return <SuccessPopup message={successMessage} onClose={onClear} />;
};
