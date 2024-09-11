import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

const variantStyles = {
  default: 'bg-background border-accent/50',
  destructive: 'bg-destructive/15 border-destructive text-destructive dark:border-destructive',
  success: 'bg-green-50 border-green-500 text-green-700 dark:bg-green-900 dark:border-green-500 dark:text-green-100',
  info: 'bg-blue-50 border-blue-500 text-blue-700 dark:bg-blue-900 dark:border-blue-500 dark:text-blue-100',
  warning: 'bg-yellow-50 border-yellow-500 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-500 dark:text-yellow-100',
};

const variantIcons = {
  default: AlertTriangle,
  destructive: X,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
};

export function Alert({
  variant = 'default',
  title,
  children,
  onClose,
  className = '',
  ...props
}) {
  const VariantIcon = variantIcons[variant];

  return (
    <div
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <VariantIcon className="h-4 w-4" />
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
      {title && <h5 className="mb-1 font-medium leading-none tracking-tight">{title}</h5>}
      {children && <div className="text-sm [&_p]:leading-relaxed">{children}</div>}
    </div>
  );
}

export function AlertTitle({ children, className = '', ...props }) {
  return (
    <h5
      className={`mb-1 font-medium leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h5>
  );
}

export function AlertDescription({ children, className = '', ...props }) {
  return (
    <div
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}