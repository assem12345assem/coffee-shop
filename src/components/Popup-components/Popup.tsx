import React, { useCallback, useEffect, useState } from 'react';
export type BasePopupProps = {
  message: string;
  onClose?: () => void;
  autoDismissMs?: number;
  icon?: React.ReactNode;
  className?: string;
  positionClassName?: string;
  closeButtonClassName?: string;
};

const BasePopup: React.FC<BasePopupProps> = ({
  message,
  onClose,
  autoDismissMs = 3000,
  icon,
  className = '',
  positionClassName = '',
  closeButtonClassName = '',
}: BasePopupProps) => {
  const [visible, setVisible] = useState(true);

  const closePopup = useCallback(() => {
    if (visible) {
      setVisible(false);
      onClose?.();
    }
  }, [visible, onClose]);

  useEffect(() => {
    const timer: ReturnType<typeof setTimeout> = setTimeout(closePopup, autoDismissMs);
    return () => clearTimeout(timer);
  }, [autoDismissMs, closePopup]);

  useEffect(() => {
    const close = () => setVisible(false);

    document.addEventListener('click', close);
    document.addEventListener('keydown', close);

    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('keydown', close);
    };
  }, []);
  if (!visible) return null;

  return (
    <div className={`fixed z-50 ${positionClassName}`}>
      <div
        className={`flex items-start rounded shadow-lg transition-opacity duration-300 p-4 ${
          visible ? 'opacity-100' : 'opacity-0'
        } ${className}`}
      >
        {icon && <div className="mr-2 text-xl">{icon}</div>}
        <div className="text-sm">{message}</div>
        {onClose && (
          <button
            onClick={closePopup}
            className={`ml-4 text-lg font-bold focus:outline-none ${closeButtonClassName}`}
            aria-label="Close popup"
          >
            &times;
          </button>
        )}
      </div>
    </div>
  );
};

export default BasePopup;
