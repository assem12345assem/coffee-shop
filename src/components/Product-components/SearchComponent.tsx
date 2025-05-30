import type { ForwardRefRenderFunction } from 'react';
import React, { useState, useImperativeHandle, forwardRef } from 'react';
import type { SearchComponentHandle, SearchComponentProps } from '@/data/interfaces';

const SearchComponent: ForwardRefRenderFunction<SearchComponentHandle, SearchComponentProps> = (
  { placeholder, onSearchChange, className, style },
  ref
) => {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    clear: () => setValue(''),
  }));

  return (
    <input
      type="text"
      placeholder={placeholder ?? 'Start typing here...'}
      value={value}
      onChange={handleChange}
      className="bg-americanSilver border-2 border-coffeeBrown rounded-lg px-4 py-2 text-coffeeBrown placeholder:text-coffeeBrown focus:outline-none focus:border-rustBrown transition-colors duration-300 w-full max-w-[400px] text-lg"
    />
  );
};

export default forwardRef(SearchComponent);
