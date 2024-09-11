import React, { useEffect, useState, ChangeEvent } from 'react';
import axios from 'axios';
import { ChevronDown, Loader2, AlertCircle } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/offre');
        setOffers(response.data);
      } catch (error) {
        console.error('Failed to fetch offers', error);
        setError('Failed to load offers');
      } finally {
        setIsLoading(false);
      }
    };  

    fetchOffers();
  }, []);

  const handleOfferChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onSelectOffer(e.target.value);
  };

  return (
    <div className="space-y-3">
      <label htmlFor="offerId" className="block text-sm font-medium text-gray-700">
        Select an Offer
      </label>
      {isLoading ? (
        <div className="flex items-center space-x-2 text-blue-500">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-black">Loading offers...</span>
        </div>
      ) : error ? (
        <div className="flex items-center space-x-2 text-red-500">
          <AlertCircle className="w-5 h-5" />
          <span className="text-black">{error}</span>
        </div>
      ) : (
        <div className="relative">
          <select
            id="offerId"
            name="offerId"
            value={selectedOfferId}
            onChange={handleOfferChange}
            required
            className="block w-full pl-3 pr-10 py-2 text-base focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md transition duration-150 ease-in-out text-black"
          >
            <option value="" disabled>Select an offer</option>
            {offers.map((offer) => (
              <option key={offer.id_offre} value={offer.id_offre}>
                {offer.nom_offre} - ${offer.prix_offre.toFixed(2)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="w-5 h-5" />
          </div>
        </div>
      )}
      {selectedOfferId && (
        <p className="mt-2 text-sm text-green-500">
          Selected offer: {offers.find(o => o.id_offre === selectedOfferId)?.nom_offre}
        </p>
      )}
    </div>
  );
};

export default OfferSelection;