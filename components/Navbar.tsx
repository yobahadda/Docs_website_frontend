"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, MenuItem, HoveredLink } from './ui/navbar-menu';

export function Navbar() {
  const [active, setActive] = useState(null);

  return (
    <header className="fixed top-0 w-full z-50 px-4 lg:px-6 h-14 flex items-center justify-center border-b border-border">
      <div className="flex items-center justify-between w-full max-w-screen-xl">
        <Link href="/" className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <span className="ml-2 text-xl font-bold text-primary">DocuLens</span>
        </Link>
        <Menu setActive={setActive}>
          <MenuItem setActive={setActive} active={active} item="Products" className="text-primary">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/products">All Products</HoveredLink>
              <HoveredLink href="/new">New Arrivals</HoveredLink>
              <HoveredLink href="/bestsellers">Bestsellers</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Solutions" className="text-primary">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/for-startups">For Startups</HoveredLink>
              <HoveredLink href="/for-enterprise">For Enterprise</HoveredLink>
              <HoveredLink href="/for-government">For Government</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Resources" className="text-primary">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/blog">Blog</HoveredLink>
              <HoveredLink href="/case-studies">Case Studies</HoveredLink>
              <HoveredLink href="/documentation">Documentation</HoveredLink>
            </div>
          </MenuItem>
          <MenuItem setActive={setActive} active={active} item="Pricing" className="text-primary">
            <div className="flex flex-col space-y-4 text-sm">
              <HoveredLink href="/personal">Personal</HoveredLink>
              <HoveredLink href="/business">Business</HoveredLink>
              <HoveredLink href="/enterprise">Enterprise</HoveredLink>
            </div>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}