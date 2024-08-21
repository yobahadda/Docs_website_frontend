import React from 'react';

export const Textarea = ({ id, ...props }) => {
  return (
    <textarea
      id={id}
      className="bg-[#4b5563] text-gray-300 border-[#4b5563] rounded-md px-4 py-2 w-full"
      {...props}
    />
  );
};
