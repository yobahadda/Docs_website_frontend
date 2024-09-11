"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import OfferSelection from './OfferSelection';
import { motion } from 'framer-motion';
import { User, Mail, Lock, CreditCard } from 'lucide-react';

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

    try {
      const selectedOffer = offers.find(offer => String(offer.id_offre) === String(formData.offerId));

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
    <div className="flex min-h-screen w-full items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl overflow-hidden rounded-lg bg-card shadow-2xl"
      >
        <div className="flex flex-col md:flex-row">
          <div className="bg-gradient-to-br from-primary to-accent p-8 text-primary-foreground md:w-1/3">
            <h2 className="mb-6 text-3xl font-bold font-heading">Welcome!</h2>
            <p className="mb-6">Join our community and unlock exclusive features.</p>
            <ul className="space-y-2">
              <li className="flex items-center"><User className="mr-2" size={18} /> Personalized experience</li>
              <li className="flex items-center"><CreditCard className="mr-2" size={18} /> Secure payments</li>
              <li className="flex items-center"><Lock className="mr-2" size={18} /> Data protection</li>
            </ul>
          </div>
          <div className="p-8 md:w-2/3">
            <h2 className="mb-6 text-center text-3xl font-bold font-heading text-foreground">Create an Account</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-foreground">Username</Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="nom_user" className="text-sm font-medium text-foreground">Last Name</Label>
                  <Input
                    id="nom_user"
                    name="nom_user"
                    type="text"
                    value={formData.nom_user}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="prenom" className="text-sm font-medium text-foreground">First Name</Label>
                  <Input
                    id="prenom"
                    name="prenom"
                    type="text"
                    value={formData.prenom}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full bg-input text-foreground"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-foreground">Role</Label>
                  <div className="mt-1 flex space-x-4">
                    {['user', 'admin', 'manager'].map((role) => (
                      <label key={role} className="flex items-center">
                        <input
                          type="radio"
                          name="role"
                          value={role}
                          checked={formData.role === role}
                          onChange={handleChange}
                          className="mr-2 text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-foreground capitalize">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <OfferSelection
                selectedOfferId={formData.offerId}
                onSelectOffer={handleOfferSelect}
              />
              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              {error && <p className="text-center text-sm text-destructive">{error}</p>}
            </form>
          </div>
        </div>
      </motion.div>
      {showPaymentModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-md overflow-hidden rounded-lg bg-card p-8 shadow-xl"
          >
            <h3 className="mb-4 text-2xl font-bold font-heading text-foreground">Confirm Payment</h3>
            <p className="mb-6 text-muted-foreground">Please confirm your payment for the selected plan.</p>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => setShowPaymentModal(false)}
                variant="outline"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePaymentConfirmation}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Payment'}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Signup;