"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { FlipWords } from "@/components/ui/FlipWords";
import DocumentUploader from '@/components/component/DocumentUploader';
import { jwtDecode } from "jwt-decode";
import NavBar from '@/components/ui/NavBar'; // Import the new NavBar component

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
    return <div>Loading...</div>;
  }

  const words = ["Welcome", "Bienvenue", "Willkommen", "Bienvenido"];

  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <NavBar onDisconnect={handleDisconnect} />
      <div className="relative z-10 text-center p-4">
        <h1 className="text-4xl font-bold mb-6 text-white">
          <FlipWords words={words} duration={2000} className="text-blue-500" />
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          We're thrilled to have you here, {user.username.toUpperCase()}. Explore our features and enjoy your stay!
        </p>
      </div>
      <div className="relative z-10 mt-8 flex-grow">
        <DocumentUploader />
      </div>
    </div>
  );
};

export default WelcomePage;