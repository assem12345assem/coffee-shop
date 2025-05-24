import type { PopupProps } from '@/data/interfaces';
import BasePopup from '@/components/Popup-components/Popup';
import type { ReactElement } from 'react';
import React from 'react';

const ErrorPopup: React.FC<PopupProps> = ({ message, onClose, autoDismissMs }: PopupProps): ReactElement => {
  return (
    <BasePopup
      message={message}
      onClose={onClose}
      autoDismissMs={autoDismissMs}
      icon="⚠️"
      className="bg-red-100 text-red-700 border border-red-300"
      positionClassName="inset-0 flex items-center justify-center"
      closeButtonClassName="text-red-500 hover:text-red-700"
    />
  );
};

export default ErrorPopup;
