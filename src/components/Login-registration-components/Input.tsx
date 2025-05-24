import type { ReactElement, ChangeEvent } from 'react';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import type { HandleInputType, InputHandle, InputProps, RefInputType, RefPropType } from '@/data/interfaces';

const Input: RefInputType = forwardRef<InputHandle, InputProps>(
  (
    { label, type = 'text', placeholder, validate, value: propValue, onChange, className }: InputProps,
    ref: RefPropType
  ): ReactElement => {
    const [internalValue, setInternalValue] = useState('');
    const [error, setError] = useState('');

    const isControlled = propValue !== undefined;
    const value = isControlled ? propValue : internalValue;

    const handleChange: HandleInputType = (e: ChangeEvent<HTMLInputElement>): void => {
      const newValue: string = e.target.value;

      if (!isControlled) {
        setInternalValue(newValue);
      }

      setError(validate?.(newValue) ?? '');
      onChange?.(newValue);
    };

    useImperativeHandle(
      ref,
      (): InputHandle => ({
        getValue: (): string => value,
        getError: (): string => error,
        setValueExternally: (val: string): void => {
          if (!isControlled) {
            setInternalValue(val);
          }
          setError(validate?.(val) ?? '');
        },
      })
    );

    return (
      <div className="flex flex-col w-full">
        {label && <label className="font-semibold text-base mb-1">{label}</label>}
        <input
          className={`w-full h-12 px-3 border border-gray-300 rounded-lg bg-white font-poppins text-base ${className}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
