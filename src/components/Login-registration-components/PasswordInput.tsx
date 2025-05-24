import React, { forwardRef, type ReactElement, type ChangeEvent, useImperativeHandle, useState } from 'react';
import { Link } from 'react-router-dom';
import TogglePasswordVisibleButton from './TogglePasswordVisibleButton';
import { ROUTES } from '@/data/routes';
import { validatePassword } from '@/utils/validation';
import type {
  HandleInputType,
  InputHandle,
  PasswordInputProps,
  RefPasswordInputType,
  RefPropType,
} from '@/data/interfaces';

const PasswordInput: RefPasswordInputType = forwardRef<InputHandle, PasswordInputProps>(
  ({ showForgotPassword = true, placeholder }: PasswordInputProps, ref: RefPropType): ReactElement => {
    const [showPassword, setShowPassword] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChange: HandleInputType = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue: string = e.target.value;
      setValue(newValue);
      setError(validatePassword(newValue) ?? '');
    };
    useImperativeHandle(
      ref,
      (): InputHandle => ({
        getValue: (): string => value,
        getError: (): string => error,
        setValueExternally: (valueExternal: string): void => {
          setValue(valueExternal);
          setError(validatePassword(valueExternal) ?? '');
        },
      })
    );
    return (
      <div className="flex flex-col w-full">
        <label className="font-semibold text-base mb-1">Password</label>
        <div className="relative w-full">
          <input
            className="w-full h-12 px-3 pr-12 border border-gray-300 rounded-lg bg-white font-poppins text-base"
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder ?? 'Enter your password'}
            value={value}
            onChange={handleChange}
            required
          />

          <TogglePasswordVisibleButton
            showPassword={showPassword}
            onToggle={(): void => setShowPassword(!showPassword)}
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

        {showForgotPassword && (
          <div className="flex justify-end w-full mt-1">
            <Link to={ROUTES.forgotPassword} className="text-blue-500 text-sm underline">
              Forgot password?
            </Link>
          </div>
        )}
      </div>
    );
  }
);

export default PasswordInput;
