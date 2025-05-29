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
      className={className}
      style={{
        padding: '0.5rem',
        width: '100%',
        marginBottom: '1rem',
        fontSize: '1rem',
        ...style,
      }}
    />
  );
};

export default forwardRef(SearchComponent);
