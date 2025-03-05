
import { useState, useEffect } from 'react';
import { Beer as BeerIcon, Link, Star } from 'lucide-react';
import { Beer, isBeerFavorite, saveFavoriteBeer, removeFavoriteBeer } from '@/services/beerService';
import { cn } from '@/lib/utils';

interface BeerCardProps {
  beer: Beer;
  onFavoriteToggle?: () => void;
}

const BeerCard = ({ beer, onFavoriteToggle }: BeerCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isImageError, setIsImageError] = useState(false);

  useEffect(() => {
    setIsFavorite(isBeerFavorite(beer.id));
  }, [beer.id]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavoriteBeer(beer.id);
    } else {
      saveFavoriteBeer(beer);
    }
    setIsFavorite(!isFavorite);
    if (onFavoriteToggle) onFavoriteToggle();
  };

  return (
    <div className="beer-card flex flex-col h-full">
      <div className="relative pb-[100%] overflow-hidden bg-beer-amber/10 rounded-t-lg">
        {!imageLoaded && !isImageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-beer-amber/30 border-t-beer-amber animate-spin"></div>
          </div>
        )}
        
        {isImageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-beer-amber/10">
            <BeerIcon className="w-16 h-16 text-beer-amber opacity-50" />
          </div>
        ) : (
          <img
            src={beer.image_url}
            alt={beer.name}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={toggleFavorite}
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center transition-all",
              isFavorite 
                ? "bg-beer-amber text-white" 
                : "bg-white/80 text-beer-amber hover:bg-white"
            )}
          >
            <Star className={cn("w-5 h-5", isFavorite && "fill-current")} />
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 beer-pour-animation">
          <div className="bubbles">
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
            <div className="bubble"></div>
          </div>
        </div>
      </div>
      
      <div className="flex-1 p-5 bg-white border border-t-0 border-beer-amber/10 rounded-b-lg">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-xl text-beer-dark">{beer.name}</h3>
            <p className="text-beer-amber font-medium text-sm mt-1">{beer.tagline}</p>
          </div>
          <div className="bg-beer-cream rounded-full px-2 py-1 text-xs font-medium text-beer-brown">
            {beer.style}
          </div>
        </div>
        
        <p className="mt-3 text-beer-brown/80 text-sm line-clamp-3">{beer.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-sm">
              <span className="font-bold text-beer-dark">{beer.abv}%</span>
              <span className="text-beer-brown/70 ml-1">ABV</span>
            </div>
            
            <div className="text-sm">
              <span className="font-bold text-beer-dark">{beer.ibu}</span>
              <span className="text-beer-brown/70 ml-1">IBU</span>
            </div>
          </div>
          
          <div className="text-sm font-medium text-beer-brown">
            {beer.brewery}
          </div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-beer-amber/10 flex items-center justify-between">
          <a 
            href={beer.purchaseUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-beer-amber hover:text-beer-brown transition-colors flex items-center"
          >
            <span>Find to buy</span>
            <Link className="ml-1 w-4 h-4" />
          </a>
          
          <a 
            href={beer.breweryUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-beer-dark hover:text-beer-amber transition-colors"
          >
            Visit brewery
          </a>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
