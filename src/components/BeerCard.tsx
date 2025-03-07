
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Beer, saveFavoriteBeer, removeFavoriteBeer, isBeerFavorite } from '@/services/beerService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from "sonner";

interface BeerCardProps {
  beer: Beer;
}

const BeerCard = ({ beer }: BeerCardProps) => {
  const [isFavorite, setIsFavorite] = useState(() => isBeerFavorite(beer.id));
  const [imgError, setImgError] = useState(false);
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavoriteBeer(beer.id);
      setIsFavorite(false);
      toast.success(`Removed ${beer.name} from favorites`);
    } else {
      saveFavoriteBeer(beer);
      setIsFavorite(true);
      toast.success(`Added ${beer.name} to favorites`);
    }
  };
  
  const fallbackImage = "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden bg-white border-beer-amber/10">
      <div className="relative pt-[56.25%] overflow-hidden bg-beer-amber/5">
        <img 
          src={imgError ? fallbackImage : (beer.specific_image_url || beer.image_url)}
          alt={beer.name}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105"
        />
        <button
          onClick={handleFavoriteToggle}
          className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500 text-red-500" : "text-gray-400")} />
        </button>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-beer-dark">{beer.name}</CardTitle>
          {beer.apiSource && (
            <Badge variant="outline" className="ml-2 bg-beer-amber/5 text-xs">
              {beer.apiSource}
            </Badge>
          )}
        </div>
        <CardDescription className="text-beer-brown/80">{beer.tagline}</CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-sm text-beer-brown line-clamp-3 mb-4">{beer.description}</p>
        
        <div className="flex gap-3 my-2">
          {beer.abv > 0 && (
            <div className="bg-beer-amber/10 rounded-full px-3 py-1 text-xs font-medium text-beer-brown">
              ABV: {beer.abv}%
            </div>
          )}
          {beer.ibu > 0 && (
            <div className="bg-beer-amber/10 rounded-full px-3 py-1 text-xs font-medium text-beer-brown">
              IBU: {beer.ibu}
            </div>
          )}
        </div>
        
        <div className="mt-2 text-sm text-beer-brown">
          <div><span className="font-medium">Style:</span> {beer.style}</div>
          <div><span className="font-medium">Brewery:</span> {beer.brewery}</div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between gap-2 pt-2">
        {beer.breweryUrl && (
          <a 
            href={beer.breweryUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-beer-amber hover:text-beer-brown transition-colors"
          >
            Brewery Website
          </a>
        )}
        <a 
          href={beer.purchaseUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-beer-amber hover:text-beer-brown transition-colors ml-auto"
        >
          Where to Buy
        </a>
      </CardFooter>
    </Card>
  );
};

export default BeerCard;
