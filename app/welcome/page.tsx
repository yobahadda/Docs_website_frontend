"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FlipWords } from "@/components/ui/FlipWords";
import DocumentUploader from '@/components/component/DocumentUploader';
import { jwtDecode } from "jwt-decode";
import NavBar from '@/components/ui/NavBar';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Footer } from "@/components/Footer";
import JsonAnalyzer from "@/components/component/JsonAnalyzer";

interface User {
  username: string;
}

const WelcomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (!token) {
      router.push("/login");
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        setUser({ username: decodedToken.sub });
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/login");
      }
    }
  }, [router]);

  const handleDisconnect = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const words = ["Welcome", "Bienvenue", "Willkommen", "Bienvenido"];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 overflow-hidden">
      <NavBar onDisconnect={handleDisconnect} />
      
      {/* Background animation */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-bold mb-6 text-black">
            <FlipWords words={words} duration={2000} className="text-gray-50 bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500" />
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl text-gray-300 mb-8"
          >
            We're thrilled to have you here, {user.username.toUpperCase()}!
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-blue-700 transition duration-300"
          >
            <Sparkles className="mr-2" />
            Explore Our Features
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-full max-w-2xl"
        >
          <DocumentUploader />
        </motion.div>
        <JsonAnalyzer/>

      </div>
      <Footer/>
    </div>
  );
};

export default WelcomePage;