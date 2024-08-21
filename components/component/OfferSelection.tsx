"use client";

import { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';

interface Offer {
  id_offre: string;
  nom_offre: string;
  prix_offre: number;
}

interface OfferSelectionProps {
  selectedOfferId: string;
  onSelectOffer: (offerId: string) => void;
}

const OfferSelection: React.FC<OfferSelectionProps> = ({ selectedOfferId, onSelectOffer }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [error, setError] = useState<string>('');

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

  const handleOfferChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectOffer(e.target.value);
  };

  return (
    <div className="space-y-3">
      <label htmlFor="offerId" className="text-gray-700">Offer</label>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <select
          id="offerId"
          name="offerId"
          value={selectedOfferId}
          onChange={handleOfferChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="" disabled>Select an offer</option>
          {offers.map((offer) => (
            <option key={offer.id_offre} value={offer.id_offre}>
              {offer.nom_offre} - ${offer.prix_offre}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default OfferSelection;
