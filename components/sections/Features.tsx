"use client"
import React, { useState, useEffect } from 'react';
import { Lock, Users, Search, Cloud, Shield, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';


const FeatureItem = ({ icon: Icon, title, description }) => (
  <motion.div 
    className="flex flex-col items-center text-center p-6 rounded-lg min-w-[280px] mx-2 backdrop-blur-sm"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    style={{ backgroundColor: 'transparent' }} // Explicitly set background to transparent
  >
    <Icon className="h-8 w-8 mb-4 text-cyan-500" />
    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
    <p className="text-sm text-gray-400">{description}</p>
  </motion.div>
);

const features = [
  {
    icon: Lock,
    title: "Secure Storage",
    description: "Keep your documents safe with enterprise-grade encryption."
  },
  {
    icon: Users,
    title: "Easy Collaboration",
    description: "Work together in real-time with team members."
  },
  {
    icon: Search,
    title: "Powerful Search",
    description: "Find any document instantly with our advanced search capabilities."
  },
  {
    icon: Cloud,
    title: "Cloud Sync",
    description: "Access your documents anywhere with our secure cloud sync."
  },
  {
    icon: Shield,
    title: "Advanced Security",
    description: "Protect your data with multi-layered security measures."
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Collaborate with teams from around the world with ease."
  }
];

export function Features() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextFeature = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % features.length);
  };

  const prevFeature = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + features.length) % features.length);
  };

  return (
    <section 
      id="features" 
      className="w-full py-12 px-4 md:px-6 relative z-10 -mt-32"
      style={{ backgroundColor: 'transparent' }} // Ensure the section has a transparent background
    >
      <div 
        className="max-w-4xl mx-auto" 
        style={{ backgroundColor: 'transparent' }} // Ensure the container has a transparent background
      >
        <motion.h2 
          className="text-2xl font-bold tracking-tighter sm:text-3xl text-center mb-8 bg-gradient-to-r from-cyan-500 to-cyan-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Key Features
        </motion.h2>
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden" style={{ backgroundColor: 'transparent' }}>
              <motion.div 
                className="flex transition-transform ease-in-out duration-300"
                style={{ transform: `translateX(-${currentIndex * 100}%)`, backgroundColor: 'transparent' }}
              >
                {features.map((feature, index) => (
                  <FeatureItem key={index} {...feature} />
                ))}
              </motion.div>
            </div>
            <button 
              onClick={prevFeature} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
              style={{ backgroundColor: 'transparent' }} // Set button background to transparent
            >
              <ChevronLeft className="text-white" />
            </button>
            <button 
              onClick={nextFeature} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full"
              style={{ backgroundColor: 'transparent' }} // Set button background to transparent
            >
              <ChevronRight className="text-white" />
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3" style={{ backgroundColor: 'transparent' }}>
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
