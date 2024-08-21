// components/Layout.tsx
"use Client";
import React from 'react';
import ParticlesComponent from './ParticlesBackground';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <ParticlesComponent id="tsparticles" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;