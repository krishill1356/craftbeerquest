
import { useState, useEffect } from 'react';
import BeerCard from './BeerCard';
import { Beer, getFavoriteBeers } from '@/services/beerService';

const FavoriteBeers = () => {
  const [favourites, setFavourites] = useState<Beer[]>([]);

  useEffect(() => {
    setFavourites(getFavoriteBeers());
  }, []);

  const refreshFavourites = () => {
    setFavourites(getFavoriteBeers());
  };

  if (favourites.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center border border-purple-200">
        <p className="text-beer-brown">
          You haven't added any favourite beers yet. Click the heart icon on any beer to add it to your favourites.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {favourites.map((beer) => (
        <div key={beer.id}>
          <BeerCard beer={beer} onFavoriteToggle={refreshFavourites} />
        </div>
      ))}
    </div>
  );
};

export default FavoriteBeers;
