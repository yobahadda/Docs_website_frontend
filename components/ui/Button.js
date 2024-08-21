import React from 'react';

export const Button = ({ children, variant, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50";

  const variantStyles = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-gray-300 text-gray-300 hover:bg-gray-700",
  };

  return (
    <button
      className={`${baseStyle} ${variant ? variantStyles[variant] : ''}`}
      {...props}
    >
      {children}
    </button>
  );
};
