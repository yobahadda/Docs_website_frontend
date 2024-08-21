import React from 'react';
import { Navbar } from './Navbar';
import { Hero } from './sections/Hero';
import { Features } from './sections/Features';
import { Testimonials } from './sections/Testimonials';
import { Pricing } from './sections/Pricing';
import { Contact } from './sections/Contact';
import { Footer } from './Footer';

export function DocumentManagementLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}