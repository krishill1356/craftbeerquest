
import { useState, useEffect } from 'react';
import BeerCard from './BeerCard';
import { Beer, getFavoriteBeers } from '@/services/beerService';

const FavoriteBeers = () => {
  const [favorites, setFavorites] = useState<Beer[]>([]);

  useEffect(() => {
    setFavorites(getFavoriteBeers());
  }, []);

  const refreshFavorites = () => {
    setFavorites(getFavoriteBeers());
  };

  if (favorites.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center border border-beer-amber/10">
        <p className="text-beer-brown">
          You haven't added any favorite beers yet. Click the star icon on any beer to add it to your favorites.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {favorites.map((beer) => (
        <div key={beer.id}>
          <BeerCard beer={beer} onFavoriteToggle={refreshFavorites} />
        </div>
      ))}
    </div>
  );
};

export default FavoriteBeers;
