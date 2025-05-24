import React from 'react';
import { FormElements, sameAddressCheckboxMessage } from '@/data/constants';

interface DefaultAddressCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const DefaultAddressCheckbox: React.FC<DefaultAddressCheckboxProps> = ({ checked, onChange }) => {
  return (
    <div className="form-group mt-4">
      <div className="flex items-center gap-2 relative">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-6 h-6 accent-[#6f4e37] cursor-pointer"
          />
          <span className="text-sm">{FormElements.sameAddress.label}</span>
        </label>

        {/* Info icon + tooltip */}
        <div className="relative group">
          <span className="inline-flex items-center justify-center w-5 h-5 ml-1 text-sm cursor-pointer rounded-full ">
            ℹ️
          </span>
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-2 hidden group-hover:block bg-brown text-white text-xs p-2 rounded shadow-lg w-60 z-10">
            {sameAddressCheckboxMessage}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultAddressCheckbox;
