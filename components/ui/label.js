import React from 'react';

export const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="text-gray-300">
      {children}
    </label>
  );
};
