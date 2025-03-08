
import { Beer } from '@/services/beerService';

export const filterBeers = (
  beers: Beer[], 
  filters: {
    abv: [number, number];
    ibu: [number, number];
    styles: string[];
    breweries: string[];
  }
): Beer[] => {
  return beers.filter(beer => {
    // Filter by ABV
    if (beer.abv < filters.abv[0] || beer.abv > filters.abv[1]) {
      return false;
    }
    
    // Filter by IBU
    if (beer.ibu < filters.ibu[0] || beer.ibu > filters.ibu[1]) {
      return false;
    }
    
    // Filter by style
    if (filters.styles.length > 0 && beer.style && !filters.styles.includes(beer.style)) {
      return false;
    }
    
    // Filter by brewery
    if (filters.breweries.length > 0 && beer.brewery && !filters.breweries.includes(beer.brewery)) {
      return false;
    }
    
    return true;
  });
};

export const getBeerStyles = (beers: Beer[]): string[] => {
  const styles = new Set(beers.map(beer => beer.style).filter(Boolean));
  return Array.from(styles);
};

export const getBreweries = (beers: Beer[]): string[] => {
  const breweries = new Set(beers.map(beer => beer.brewery).filter(Boolean));
  return Array.from(breweries);
};

export const getSimilarBeers = (beer: Beer, allBeers: Beer[], limit = 3): Beer[] => {
  const similarBeers = allBeers
    .filter(b => b.id !== beer.id) // Exclude the current beer
    .filter(b => {
      // Check if beer style or brewery matches
      return b.style === beer.style || b.brewery === beer.brewery;
    })
    // Shuffle and limit results
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
    
  return similarBeers;
};
