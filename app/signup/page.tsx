// pages/signup/page.tsx
"use client";
import Signup from '@/components/component/signup';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';

const SignupPage = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
      <Signup />
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
