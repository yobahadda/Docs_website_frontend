import React from 'react';
import { cn } from "@/lib/utils"

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ defaultValue, children, className, ...props }) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <div className={cn("w-full", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (React.isValidElement(child) && child.type === TabsContent) {
          return React.cloneElement(child, { activeTab } as React.HTMLAttributes<HTMLDivElement>);
        }
        return child;
      })}
    </div>
  );
};

const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement> & { activeTab: string; setActiveTab: (value: string) => void }> = ({ children, className, activeTab, setActiveTab, ...props }) => {
  return (
    <div className={cn("inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === TabsTrigger) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsTrigger: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string; activeTab: string; setActiveTab: (value: string) => void }> = ({ children, className, value, activeTab, setActiveTab, ...props }) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        activeTab === value && "bg-background text-foreground shadow-sm",
        className
      )}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

const TabsContent: React.FC<React.HTMLAttributes<HTMLDivElement> & { value: string; activeTab: string }> = ({ children, value, activeTab, className, ...props }) => {
  if (value !== activeTab) return null;
  
  return (
    <div
      className={cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className)}
      {...props}
    >
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };