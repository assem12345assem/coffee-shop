import type { ReactElement, ChangeEvent } from 'react';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import type { InputHandle, RefPropType } from '@/data/interfaces';
import { allowedCountries } from '@/data/constants';

interface CountryInputProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  validate?: (value: string) => string | null;
  className?: string;
  countries?: string[];
  placeholder?: string;
  readOnly?: boolean;
  initialValue?: string;
}

const CountryInput = forwardRef<InputHandle, CountryInputProps>(
  (
    {
      label,
      value: propValue,
      onChange,
      validate,
      className = '',
      countries = allowedCountries,
      placeholder = 'Select a country',
      readOnly = false,
      initialValue, // Ensure initialValue is passed
    }: CountryInputProps,
    ref: RefPropType
  ): ReactElement => {
    const [internalValue, setInternalValue] = useState(initialValue ?? propValue ?? '');
    const [error, setError] = useState('');

    const isControlled = propValue !== undefined;
    const value = isControlled ? propValue : internalValue;

    const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
      if (readOnly) return; // Prevent selection when read-only

      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      setError(validate?.(newValue) ?? '');
      onChange?.(newValue);
    };

    useImperativeHandle(ref, () => ({
      getValue: () => value,
      getError: () => {
        const validationError = validate?.(value) ?? null;
        setError(validationError ?? '');
        return validationError ?? '';
      },
      setValueExternally: (val: string) => {
        if (!isControlled) {
          setInternalValue(val);
        }
        setError(validate?.(val) ?? '');
      },
    }));

    return (
      <div className="flex flex-col w-full">
        {label && <label className="font-semibold text-base mb-1">{label}</label>}
        <select
          className={`appearance-none text-gray-400 w-full h-12 px-3 border border-gray-300 rounded-lg bg-white font-poppins text-base ${className}`}
          value={value}
          onChange={handleChange}
          onBlur={() => setError(validate?.(value) ?? '')}
          disabled={readOnly} // Set disabled when readonly
        >
          <option value="">{placeholder}</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default CountryInput;
