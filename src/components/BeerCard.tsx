
import { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { Beer, saveFavouriteBeer, removeFavouriteBeer, isBeerFavourite } from '@/services/beerService';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from "sonner";
import BeerRating from './BeerRating';
import BeerPhotoShare from './BeerPhotoShare';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface BeerCardProps {
  beer: Beer;
  onFavoriteToggle?: () => void;
}

const BeerCard = ({ beer, onFavoriteToggle }: BeerCardProps) => {
  const [isFavourite, setIsFavourite] = useState(() => isBeerFavourite(beer.id));
  const [imgError, setImgError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const handleFavouriteToggle = () => {
    if (isFavourite) {
      removeFavouriteBeer(beer.id);
      setIsFavourite(false);
      toast.success(`Removed ${beer.name} from favourites`);
    } else {
      saveFavouriteBeer(beer);
      setIsFavourite(true);
      toast.success(`Added ${beer.name} to favourites`);
    }
    
    if (onFavoriteToggle) {
      onFavoriteToggle();
    }
  };
  
  const handleShare = async () => {
    const shareText = `Check out this awesome beer: ${beer.name} by ${beer.brewery} - ${beer.description?.substring(0, 100)}...`;
    const shareUrl = window.location.href;
    
    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share({
          title: beer.name,
          text: shareText,
          url: shareUrl,
        });
        toast.success('Shared successfully');
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error('Error sharing');
          fallbackShare();
        }
      }
    } else {
      fallbackShare();
    }
  };
  
  const fallbackShare = () => {
    const shareText = `Check out this awesome beer: ${beer.name} by ${beer.brewery} - ${beer.description?.substring(0, 100)}...`;
    const shareUrl = window.location.href;
    
    // Fallback to clipboard
    try {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.success('Copied to clipboard! Now you can share it anywhere.');
    } catch (error) {
      toast.error('Unable to copy to clipboard.');
    }
  };
  
  const fallbackImage = "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
  
  return (
    <>
      <Card className="h-full flex flex-col hover:shadow-md transition-shadow overflow-hidden bg-white border-purple-200">
        <div className="relative pt-[56.25%] overflow-hidden bg-purple-50">
          <img 
            src={imgError ? fallbackImage : (beer.specific_image_url || beer.image_url)}
            alt={beer.name}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-transform hover:scale-105 cursor-pointer"
            onClick={() => setShowDetails(true)}
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
              aria-label="Share this beer"
            >
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={handleFavouriteToggle}
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
              aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
            >
              <Heart className={cn("h-5 w-5", isFavourite ? "fill-red-500 text-red-500" : "text-gray-400")} />
            </button>
          </div>
        </div>
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle 
              className="text-xl font-bold text-beer-dark cursor-pointer hover:text-beer-amber transition-colors"
              onClick={() => setShowDetails(true)}
            >
              {beer.name}
            </CardTitle>
            {beer.apiSource && (
              <Badge variant="outline" className="ml-2 bg-purple-50 text-xs text-purple-700 border-purple-200">
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
              <div className="bg-purple-100 rounded-full px-3 py-1 text-xs font-medium text-purple-700">
                ABV: {beer.abv}%
              </div>
            )}
            {beer.ibu > 0 && (
              <div className="bg-purple-100 rounded-full px-3 py-1 text-xs font-medium text-purple-700">
                IBU: {beer.ibu}
              </div>
            )}
          </div>
          
          <div className="mt-2 text-sm text-beer-brown">
            <div><span className="font-medium">Style:</span> {beer.style}</div>
            <div><span className="font-medium">Brewery:</span> {beer.brewery}</div>
          </div>
          
          <div className="mt-4">
            <BeerRating beer={beer} />
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between gap-2 pt-2">
          {beer.breweryUrl && (
            <a 
              href={beer.breweryUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
            >
              Brewery Website
            </a>
          )}
          <a 
            href={beer.purchaseUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-purple-600 hover:text-purple-800 transition-colors ml-auto"
          >
            Where to Buy
          </a>
        </CardFooter>
      </Card>
      
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-beer-dark">{beer.name}</DialogTitle>
            <DialogDescription>{beer.tagline}</DialogDescription>
          </DialogHeader>
          
          <div className="grid sm:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={imgError ? fallbackImage : (beer.specific_image_url || beer.image_url)}
                alt={beer.name}
                onError={() => setImgError(true)}
                className="w-full h-auto rounded-md object-cover aspect-square"
              />
              
              <div className="flex items-center justify-between mt-4">
                <BeerRating beer={beer} />
                
                <button
                  onClick={handleFavouriteToggle}
                  className="flex items-center gap-1 text-sm text-beer-brown hover:text-beer-amber"
                >
                  <Heart className={cn("h-4 w-4", isFavourite ? "fill-red-500 text-red-500" : "")} />
                  <span>{isFavourite ? "Favourited" : "Add to Favourites"}</span>
                </button>
              </div>
              
              <div className="flex gap-4 mt-4">
                <BeerPhotoShare beer={beer} />
                
                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 text-beer-brown px-3 py-1 rounded-md transition-colors"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-beer-brown mb-4">{beer.description}</p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Details</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-beer-brown/70">Style</span>
                      <span className="font-medium">{beer.style}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-beer-brown/70">ABV</span>
                      <span className="font-medium">{beer.abv}%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-beer-brown/70">IBU</span>
                      <span className="font-medium">{beer.ibu}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-beer-brown/70">Brewery</span>
                      <span className="font-medium">{beer.brewery}</span>
                    </li>
                    {beer.similarTo && (
                      <li className="flex justify-between">
                        <span className="text-beer-brown/70">Similar To</span>
                        <span className="font-medium">{beer.similarTo}</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="flex flex-col space-y-3 pt-3 border-t border-gray-100">
                  {beer.breweryUrl && (
                    <a 
                      href={beer.breweryUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 transition-colors"
                    >
                      Visit Brewery Website
                    </a>
                  )}
                  <a 
                    href={beer.purchaseUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    Where to Buy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BeerCard;
