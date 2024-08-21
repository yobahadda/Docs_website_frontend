"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import OfferSelection from './OfferSelection';

interface FormData {
  id_user?: number;
  username: string; 
  email: string;
  password: string;
  nom_user: string;
  prenom: string;
  role: string;
  offerId: string;
}

interface Offer {
  id_offre: string;
  nom_offre: string;
  prix_offre: number;
}

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    nom_user: '',
    prenom: '',
    role: 'user',
    offerId: ''
  });

  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/offre');
        setOffers(response.data);
        console.log("Fetched offers:", response.data);  // Log fetched offers
      } catch (error) {
        console.error('Failed to fetch offers', error);
        setError('Failed to load offers');
      }
    };

    fetchOffers();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleOfferSelect = (offerId: string) => {
    console.log("Selected Offer ID:", offerId);  // Log selected offer ID
    setFormData({ ...formData, offerId });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userResponse = await axios.post('http://127.0.0.1:8000/auth/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const userId = userResponse.data.id_user;
      setFormData(prevFormData => ({ ...prevFormData, id_user: userId }));
      setShowPaymentModal(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data);
      setError(error.response?.data?.detail || 'Something went wrong during registration');
    }
  };

  const handlePaymentConfirmation = async () => {
    setLoading(true);
    console.log("Available offers at confirmation:", offers);
    console.log("Selected Offer ID at confirmation:", formData.offerId);
  
    try {
      // Convert offerId to a number if it's a string
      const selectedOffer = offers.find(offer => String(offer.id_offre) === String(formData.offerId));
      console.log("Selected Offer:", selectedOffer);
  
      if (!selectedOffer) {
        throw new Error('Selected offer not found');
      }
  
      if (!formData.id_user) {
        throw new Error('User ID is not defined');
      }
  
      const paymentData = {
        montant: selectedOffer.prix_offre,
        devise: 'USD',
        transaction_id: 'protocole-transaction-id',
        etat_cout: 'confirmed',
        date_paiement: new Date().toISOString(),
        id_user: formData.id_user,
        id_offre: selectedOffer.id_offre
      };
  
      await axios.post('http://127.0.0.1:8000/payment/payment', paymentData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      setLoading(false);
      router.push('/login');
    } catch (error) {
      setLoading(false);
      console.error(error);
      setError(error.message || 'Something went wrong during payment processing');
    }
  };
  

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="grid w-full max-w-3xl gap-8 rounded-lg bg-white p-8 shadow-lg">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Sign Up</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="username" className="text-gray-700">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="nom_user" className="text-gray-700">Nom</Label>
                <Input
                  id="nom_user"
                  name="nom_user"
                  type="text"
                  value={formData.nom_user}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-700">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="prenom" className="text-gray-700">Prenom</Label>
                <Input
                  id="prenom"
                  name="prenom"
                  type="text"
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="role" className="text-gray-700">Role</Label>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-admin"
                    name="role"
                    value="admin"
                    checked={formData.role === 'admin'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <Label htmlFor="role-admin" className="ml-2 text-gray-700">Admin</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-user"
                    name="role"
                    value="user"
                    checked={formData.role === 'user'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <Label htmlFor="role-user" className="ml-2 text-gray-700">User</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-manager"
                    name="role"
                    value="manager"
                    checked={formData.role === 'manager'}
                    onChange={handleChange}
                    className="form-radio text-blue-600"
                  />
                  <Label htmlFor="role-manager" className="ml-2 text-gray-700">Manager</Label>
                </div>
              </div>
            </div>
            <OfferSelection
              selectedOfferId={formData.offerId}
              onSelectOffer={handleOfferSelect}
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 rounded-md hover:from-blue-600 hover:to-teal-600"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
      </div>
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-8 shadow-lg max-w-lg w-full">
            <h3 className="text-xl font-bold text-gray-800">Confirm Payment</h3>
            <p>Confirm your payment for the selected plan.</p>
            <Button
              onClick={handlePaymentConfirmation}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm Payment'}
            </Button>
            <Button
              onClick={() => setShowPaymentModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
