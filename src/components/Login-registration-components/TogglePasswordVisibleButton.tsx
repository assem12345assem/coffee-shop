import React, { type ReactElement } from 'react';
import eyeOnIcon from '@/assets/eye.png';
import eyeOffIcon from '@/assets/eye-off.png';

interface TogglePasswordVisibleButtonProps {
  showPassword: boolean;
  onToggle: () => void;
}

const TogglePasswordVisibleButton: React.FC<TogglePasswordVisibleButtonProps> = ({
  showPassword,
  onToggle,
}: TogglePasswordVisibleButtonProps): ReactElement => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-transparent p-0
      cursor-pointer opacity-70 flex justify-center items-center"
    >
      <img
        src={showPassword ? eyeOffIcon : eyeOnIcon}
        alt={showPassword ? 'Hide password' : 'Show password'}
        className="w-[20px] h-[20px] object-contain"
      />
    </button>
  );
};

export default TogglePasswordVisibleButton;
