import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";

interface Offer {
  id: number;
  title: string;
  description: string;
  prix_offre: number;
}

interface NavBarProps {
  onDisconnect: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ onDisconnect }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [showOffers, setShowOffers] = useState<boolean>(false);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/offre/?skip=0&limit=10');
        const data = await response.json();
        setOffers(data);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    if (showOffers) {
      fetchOffers();
    }
  }, [showOffers]);

  const toggleOffers = () => {
    setShowOffers(prevShowOffers => !prevShowOffers);
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-4 px-6 bg-transparent">
        <div className="flex space-x-4">
          <Button variant="ghost" className="text-white hover:text-gray-300" style={{ fontFamily: 'Helvetica' }}>
            Home
          </Button>
          <Button 
            variant="ghost" 
            className="text-white hover:text-gray-300" 
            style={{ fontFamily: 'Helvetica' }}
            onClick={toggleOffers}
          >
            {showOffers ? 'Hide Offers' : 'Show Offers'}
          </Button>
          <Button variant="ghost" className="text-white hover:text-gray-300" style={{ fontFamily: 'Helvetica' }}>
            Modify Info
          </Button>
        </div>
        <Button 
          onClick={onDisconnect}
          variant="outline"
          className="text-white border-white hover:bg-white hover:text-gray-900"
          style={{ fontFamily: 'Helvetica' }}
        >
          Disconnect
        </Button>
      </nav>

      {/* Offers Section */}
      <div className="mt-16 px-6">
        {showOffers && offers.length > 0 ? (
          <ul className="bg-blue p-4 rounded shadow-md" style={{ fontFamily: 'Helvetica' }}>
            {offers.map((offer) => (
              <li key={offer.id} className="mb-2">
                <h2 className="text-lg font-bold">{offer.title}</h2>
                <p>{offer.description}</p>
                <p className="text-sm text-white-600">Price: ${offer.prix_offre}</p>
              </li>
            ))}
          </ul>
        ) : (
          showOffers && <p className="text-white">No offers available</p>
        )}
      </div>
    </div>
  );
};

export default NavBar;
