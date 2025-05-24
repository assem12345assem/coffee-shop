import type { ReactElement } from 'react';
import React, { useEffect, useState } from 'react';
import BasePopup from '@/components/Popup-components/Popup';
import type { PopupProps } from '@/data/interfaces';

const InfoPopup: React.FC<PopupProps> = ({ message, autoDismissMs }: PopupProps): ReactElement => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(true);

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setShowPopup(false);
    }, autoDismissMs);

    return () => clearTimeout(timer);
  }, [autoDismissMs]);

  return (
    <>
      {showPopup && (
        <BasePopup
          message={message}
          autoDismissMs={autoDismissMs}
          icon="ℹ️"
          className="bg-blue-100 text-blue-800"
          positionClassName="top-16 left-1/2 transform -translate-x-1/2"
          closeButtonClassName="text-blue-800"
        />
      )}
    </>
  );
};

export default InfoPopup;
