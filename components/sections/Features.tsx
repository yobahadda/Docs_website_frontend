import { LockIcon, SearchIcon, UsersIcon } from 'lucide-react';
import React from 'react';

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <LockIcon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Secure Storage</h3>
            <p className="text-gray-500">Keep your documents safe with enterprise-grade encryption.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <UsersIcon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Easy Collaboration</h3>
            <p className="text-gray-500">Work together in real-time with team members.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <SearchIcon className="h-12 w-12 mb-4 text-primary" />
            <h3 className="text-xl font-bold mb-2">Powerful Search</h3>
            <p className="text-gray-500">Find any document instantly with our advanced search capabilities.</p>
          </div>
        </div>
      </div>
    </section>
  );
}