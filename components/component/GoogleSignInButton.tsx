import React from 'react';
import { Button } from "@/components/ui/button";
import { FcGoogle } from 'react-icons/fc';

interface GoogleSignInButtonProps {
  onClick: () => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-white text-black border border-gray-300 hover:bg-gray-100 flex items-center justify-center"
    >
      <FcGoogle className="mr-2" size={20} />
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;