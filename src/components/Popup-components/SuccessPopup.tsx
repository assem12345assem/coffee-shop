import BasePopup from '@/components/Popup-components/Popup';
import type { PopupProps } from '@/data/interfaces';
import type { ReactElement } from 'react';
import React from 'react';

const SuccessPopup: React.FC<PopupProps> = ({ message, onClose, autoDismissMs }: PopupProps): ReactElement => {
  return (
    <BasePopup
      message={message}
      onClose={onClose}
      autoDismissMs={autoDismissMs}
      icon="✅"
      className="bg-green-500 text-white"
      positionClassName="bottom-6 right-6"
      closeButtonClassName="text-white hover:text-green-200"
    />
  );
};

export default SuccessPopup;
