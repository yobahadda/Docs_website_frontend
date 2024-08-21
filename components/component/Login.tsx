// components/Login.tsx

import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<FormData>({ username: '', password: '' });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const encodedFormData = new URLSearchParams();
    encodedFormData.append('username', formData.username);
    encodedFormData.append('password', formData.password);

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/token', encodedFormData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      const token = response.data.access_token;
      localStorage.setItem('userToken', token); // Store the token in localStorage
      setSuccess(true);
      router.push('/welcome'); // Redirect to the welcome page
    } catch (error: any) {
      setLoading(false);
      setError(error.response?.data?.detail || 'Something went wrong during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="grid w-full max-w-md gap-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Login</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Label htmlFor="username" className="text-gray-700">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="password" className="text-gray-700">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded hover:from-blue-600 hover:to-teal-600"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">Login successful!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
