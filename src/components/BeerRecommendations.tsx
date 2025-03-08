import { useEffect, useState } from 'react';
import { Beer, getFavoriteBeers } from '@/services/beerService';
import BeerCard from './BeerCard';

const BeerRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Beer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRecommendations = async () => {
      setLoading(true);
      
      try {
        // Get user favorites to base recommendations on
        const favorites = getFavoriteBeers();
        
        // If no favorites, we'll need to show generic popular beers
        if (favorites.length === 0) {
          // In a real app, you would fetch popular beers from an API
          // For now, mock some recommendations from our beerService
          const mockRecommendations = await mockGetRecommendations([]);
          setRecommendations(mockRecommendations);
          return;
        }
        
        // Get styles and breweries from favorites to recommend similar beers
        const favoriteStyles = favorites.map(beer => beer.style);
        const favoriteBreweries = favorites.map(beer => beer.brewery);
        
        // In a real app, this would call a backend recommendation engine
        // For now, mock recommendations based on favorite styles/breweries
        const recommendations = await mockGetRecommendations(favorites);
        setRecommendations(recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getRecommendations();
  }, []);

  // Mock recommendation engine - in a real app, this would be a backend service
  const mockGetRecommendations = async (favorites: Beer[]): Promise<Beer[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate recommendations based on favorites or popular styles
    const favoriteStyles = new Set(favorites.map(beer => beer.style));
    const favoriteBreweries = new Set(favorites.map(beer => beer.brewery));
    const favoriteIds = new Set(favorites.map(beer => beer.id));
    
    // Fetch some beers for potential recommendations
    const response = await fetch('/api/beers.json')
      .then(res => res.json())
      .catch(() => {
        // Fallback to localStorage if fetch fails
        const savedBeers = localStorage.getItem('mockBeers');
        return savedBeers ? JSON.parse(savedBeers) : [];
      });
    
    // Filter to find beers similar to favorites but not already favorited
    let possibleRecommendations = response
      .filter((beer: Beer) => !favoriteIds.has(beer.id))
      .filter((beer: Beer) => {
        // If user has favorites, recommend based on style or brewery
        if (favorites.length > 0) {
          return favoriteStyles.has(beer.style) || favoriteBreweries.has(beer.brewery);
        }
        // Otherwise just return true for all beers
        return true;
      });
    
    // Fallback to some manual recommendations
    if (possibleRecommendations.length === 0) {
      possibleRecommendations = [
        {
          id: 'rec1',
          name: 'Recommended IPA',
          tagline: 'Based on your taste profile',
          description: 'A hoppy IPA with citrus notes that matches your preferences for bitter, aromatic beers.',
          image_url: 'https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          abv: 6.5,
          ibu: 60,
          brewery: 'Recommendation Brewing Co.',
          breweryUrl: 'https://example.com',
          style: 'IPA',
          purchaseUrl: 'https://example.com',
          apiSource: 'Recommendation Engine'
        },
        {
          id: 'rec2',
          name: 'Suggested Stout',
          tagline: 'Perfectly matched to your preferences',
          description: 'A rich, chocolatey stout with coffee notes, recommended based on your past ratings.',
          image_url: 'https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
          abv: 7.2,
          ibu: 35,
          brewery: 'Suggestion Brewers',
          breweryUrl: 'https://example.com',
          style: 'Stout',
          purchaseUrl: 'https://example.com',
          apiSource: 'Recommendation Engine'
        }
      ];
    }
    
    // Return random subset of recommendations (up to 3)
    return possibleRecommendations
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-beer-dark mb-6">Your Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-[400px] bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-beer-dark mb-6">Recommended For You</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((beer) => (
          <div key={beer.id}>
            <BeerCard beer={beer} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeerRecommendations;
