import React from 'react';

export const Select = ({ id, value, onChange, children }) => {
  return (
    <select
      id={id}
      value={value}
      onChange={onChange}
      className="bg-[#4b5563] text-gray-300 border-[#4b5563] rounded-md px-4 py-2 w-full"
    >
      {children}
    </select>
  );
};

export const SelectTrigger = ({ children }) => <>{children}</>;
export const SelectValue = ({ placeholder }) => <option value="">{placeholder}</option>;
export const SelectContent = ({ children }) => <>{children}</>;
export const SelectItem = ({ value, children }) => <option value={value}>{children}</option>;
