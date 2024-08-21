import React from 'react';
import Link from 'next/link';
import { MountainIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <MountainIcon className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose text-gray-600 md:text-left">
              © 2024 DocuManage. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}