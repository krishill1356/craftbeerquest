
import { useState } from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogDescription
} from '@/components/ui/dialog';
import { Beer } from '@/services/beerService';
import { toast } from "sonner";

interface BeerRatingProps {
  beer: Beer;
  onRatingSubmit?: (beerId: string, rating: number, review: string) => void;
}

const BeerRating = ({ beer, onRatingSubmit }: BeerRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleRatingClick = (selectedRating: number) => {
    setRating(selectedRating);
  };

  const handleMouseEnter = (star: number) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting");
      return;
    }

    // Save the rating (in a real app, this would send to a backend)
    if (onRatingSubmit) {
      onRatingSubmit(beer.id, rating, review);
    }

    // Store in localStorage for demo purposes
    const ratings = JSON.parse(localStorage.getItem('beerRatings') || '{}');
    ratings[beer.id] = { rating, review, date: new Date().toISOString() };
    localStorage.setItem('beerRatings', JSON.stringify(ratings));

    toast.success(`You rated ${beer.name} ${rating} stars!`);
    setIsOpen(false);
    setReview('');
  };

  const getSavedRating = () => {
    try {
      const ratings = JSON.parse(localStorage.getItem('beerRatings') || '{}');
      return ratings[beer.id] || null;
    } catch (e) {
      return null;
    }
  };

  const savedRating = getSavedRating();

  return (
    <div>
      {savedRating ? (
        <div className="flex items-center space-x-2">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                className={`${
                  star <= savedRating.rating
                    ? 'text-amber-500 fill-amber-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-beer-brown">Your rating</span>
        </div>
      ) : (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center space-x-1 text-beer-brown hover:text-beer-amber hover:bg-transparent p-0"
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-gray-300" />
                ))}
              </div>
              <span className="text-sm">Rate this beer</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Rate {beer.name}</DialogTitle>
              <DialogDescription>
                Share your experience with this beer
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-6">
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={`cursor-pointer mx-1 ${
                      star <= (hoverRating || rating)
                        ? 'text-amber-500 fill-amber-500'
                        : 'text-gray-300'
                    }`}
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => handleMouseEnter(star)}
                    onMouseLeave={handleMouseLeave}
                  />
                ))}
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Review (Optional)</label>
                <Textarea
                  placeholder="What did you think about this beer?"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                onClick={handleSubmit}
                disabled={rating === 0}
                className="bg-beer-amber hover:bg-beer-amber/90"
              >
                Submit Rating
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default BeerRating;
