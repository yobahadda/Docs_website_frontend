import React from 'react';
import { cn } from "@/lib/utils"

interface AlertProps {
  variant?: 'default' | 'destructive';
  children: React.ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ variant = 'default', children, className, ...props }) => {
  return (
    <div
      className={cn(
        "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:text-foreground [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&:has(svg)]:pl-11",
        variant === 'default' && "bg-background text-foreground",
        variant === 'destructive' && "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const AlertDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => {
  return (
    <p
      className={cn("text-sm [&_p]:leading-relaxed", className)}
      {...props}
    />
  );
};

export { Alert, AlertDescription };