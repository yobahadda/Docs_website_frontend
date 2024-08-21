"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import NavBar from '@/components/ui/Navbar';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface User {
  username: string;
  email: string;
  nom_user: string;
  prenom: string;
}

const ModifyInfoPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      router.push("/login");
    } else {
      try {
        const decodedToken: any = jwtDecode(token);
        setUser({
          username: decodedToken.sub,
          email: decodedToken.email,
          nom_user: decodedToken.nom_user,
          prenom: decodedToken.prenom,
        });
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/login");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement the API call to update user information
    // You'll need to create an endpoint in your FastAPI backend for this
    console.log("Updating user information:", user);
    // After successful update, you can show a success message or redirect
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative flex flex-col h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-900">
      <NavBar onDisconnect={() => {
        localStorage.removeItem("userToken");
        router.push("/login");
      }} />
      <div className="relative z-10 w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Modify Your Information</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Username</label>
            <Input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <Input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="nom_user" className="block text-sm font-medium text-gray-700 dark:text-gray-200">Last Name</label>
            <Input
              id="nom_user"
              type="text"
              value={user.nom_user}
              onChange={(e) => setUser({ ...user, nom_user: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 dark:text-gray-200">First Name</label>
            <Input
              id="prenom"
              type="text"
              value={user.prenom}
              onChange={(e) => setUser({ ...user, prenom: e.target.value })}
              className="mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            Update Information
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModifyInfoPage;