import React, { type ReactElement } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
  variant?: string;
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  onClick,
  label,
  className = '',
  disabled = false,
}: ButtonProps): ReactElement => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled} // <-- pass to button
      className={`w-full h-[52px] flex justify-center items-center 
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6f4e37]'} 
        text-white font-semibold text-lg rounded-lg ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;
