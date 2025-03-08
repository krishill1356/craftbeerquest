import { useState, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BeerPhotoShare from './BeerPhotoShare';
import { Beer } from '@/services/beerService';

interface BeerPhoto {
  id: string;
  beerId?: string;
  beerName: string;
  brewery?: string;
  imageUrl: string;
  caption: string;
  tags: string[];
  date: string;
  uploader: string;
  likes: number;
}

const BeerPhotos = ({ beer }: { beer?: Beer }) => {
  const [photos, setPhotos] = useState<BeerPhoto[]>([]);
  
  useEffect(() => {
    // Load photos from localStorage
    const savedPhotos = localStorage.getItem('beerPhotos');
    if (savedPhotos) {
      try {
        const allPhotos = JSON.parse(savedPhotos);
        
        // If beer is provided, only show photos for that beer
        if (beer) {
          const filteredPhotos = allPhotos.filter(
            (photo: BeerPhoto) => 
              photo.beerId === beer.id || 
              photo.beerName.toLowerCase() === beer.name.toLowerCase()
          );
          setPhotos(filteredPhotos);
        } else {
          // Otherwise show all photos
          setPhotos(allPhotos);
        }
      } catch (e) {
        console.error('Error parsing beer photos', e);
      }
    }
  }, [beer]);

  const handleLike = (id: string) => {
    const updatedPhotos = photos.map(photo => {
      if (photo.id === id) {
        return { ...photo, likes: photo.likes + 1 };
      }
      return photo;
    });
    
    setPhotos(updatedPhotos);
    
    // Update in localStorage
    const savedPhotos = localStorage.getItem('beerPhotos');
    if (savedPhotos) {
      try {
        const allPhotos = JSON.parse(savedPhotos);
        const updatedAllPhotos = allPhotos.map((photo: BeerPhoto) => {
          if (photo.id === id) {
            return { ...photo, likes: photo.likes + 1 };
          }
          return photo;
        });
        
        localStorage.setItem('beerPhotos', JSON.stringify(updatedAllPhotos));
      } catch (e) {
        console.error('Error updating beer photos', e);
      }
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-beer-dark">
          {beer 
            ? `Photos of ${beer.name}`
            : "Community Beer Photos"
          }
        </h2>
        
        <BeerPhotoShare beer={beer} />
      </div>
      
      {photos.length === 0 ? (
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center border border-beer-amber/10">
          <p className="text-beer-brown">
            {beer
              ? `No photos of ${beer.name} yet. Be the first to share one!`
              : "No beer photos shared yet. Share your beer experiences with the community!"
            }
          </p>
          <div className="mt-4">
            <BeerPhotoShare beer={beer} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map(photo => (
            <div 
              key={photo.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={photo.imageUrl} 
                  alt={photo.beerName} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-beer-dark">{photo.beerName}</h3>
                    {photo.brewery && (
                      <p className="text-sm text-beer-brown">{photo.brewery}</p>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {photo.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-beer-amber/10 px-2 py-0.5 rounded-full text-xs text-beer-brown"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {photo.caption && (
                  <p className="text-sm text-beer-brown mt-2">{photo.caption}</p>
                )}
                
                <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-100">
                  <span className="text-xs text-beer-brown/70">
                    Shared by {photo.uploader} • {new Date(photo.date).toLocaleDateString()}
                  </span>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(photo.id)}
                      className="flex items-center gap-1 text-beer-brown hover:text-beer-amber p-0"
                    >
                      <Heart size={16} className={photo.likes > 0 ? "fill-amber-500 text-amber-500" : ""} />
                      <span className="text-xs">{photo.likes}</span>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="flex items-center gap-1 text-beer-brown hover:text-beer-amber p-0"
                    >
                      <MessageCircle size={16} />
                      <span className="text-xs">0</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeerPhotos;
