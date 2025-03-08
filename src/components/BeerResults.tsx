
import { useEffect, useState, useMemo } from 'react';
import BeerCard from './BeerCard';
import BeerFilter from './BeerFilter';
import { Beer, findSimilarBeers } from '@/services/beerService';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface BeerResultsProps {
  searchQuery: string;
  isSearching: boolean;
}

type FilterOptions = {
  abv: [number, number];
  ibu: [number, number];
  styles: string[];
  breweries: string[];
}

const BeerResults = ({ searchQuery, isSearching }: BeerResultsProps) => {
  const [results, setResults] = useState<Beer[]>([]);
  const [filteredResults, setFilteredResults] = useState<Beer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    abv: [0, 15],
    ibu: [0, 100],
    styles: [],
    breweries: [],
  });

  // Extract unique beer styles and breweries for filter options
  const availableStyles = useMemo(() => {
    if (results.length === 0) return [];
    const styles = new Set(results.map(beer => beer.style).filter(Boolean));
    return Array.from(styles);
  }, [results]);
  
  const availableBreweries = useMemo(() => {
    if (results.length === 0) return [];
    const breweries = new Set(results.map(beer => beer.brewery).filter(Boolean));
    return Array.from(breweries);
  }, [results]);

  useEffect(() => {
    if (!searchQuery) return;
    
    setIsLoading(true);
    setError(null);
    
    // Simulate network delay for a more realistic experience
    const timer = setTimeout(() => {
      const fetchBeers = async () => {
        try {
          const beers = await findSimilarBeers(searchQuery);
          setResults(beers);
          setFilteredResults(beers);
          
          if (beers.length === 0) {
            setError(`No beers found matching "${searchQuery}". Try another search term.`);
          }
        } catch (err) {
          console.error('Error fetching beer results:', err);
          setError('Something went wrong. Please try again.');
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchBeers();
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [searchQuery, isSearching]);

  // Apply filters when they change
  useEffect(() => {
    if (results.length === 0) return;
    
    const filtered = results.filter(beer => {
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
    
    setFilteredResults(filtered);
  }, [filters, results]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  if (!searchQuery && !isSearching) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 px-4 md:px-8">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="relative w-24 h-24">
            <div className="absolute w-full h-full rounded-full border-4 border-beer-amber/20 border-t-beer-amber animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-beer-amber/10 rounded-full"></div>
            </div>
          </div>
          <p className="mt-4 text-beer-brown font-medium">Finding your next perfect beer...</p>
          <p className="mt-2 text-beer-brown/60 text-sm">Searching multiple sources for the best results</p>
        </div>
      ) : error ? (
        <div className="text-center py-16">
          <p className="text-beer-brown text-lg">{error}</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h2 className="text-2xl font-bold text-beer-dark mb-4 md:mb-0">
              {filteredResults.length} beer{filteredResults.length !== 1 ? 's' : ''} recommended for "
              <span className="text-beer-amber">{searchQuery}</span>"
            </h2>
            
            <BeerFilter 
              onFilterChange={handleFilterChange}
              availableStyles={availableStyles}
              availableBreweries={availableBreweries}
            />
          </div>
          
          {/* Sources summary */}
          <div className="mb-6 flex flex-wrap gap-2">
            {Array.from(new Set(results.map(beer => beer.apiSource))).map(source => (
              <Badge key={source} variant="outline" className="bg-beer-amber/5 border-beer-amber/20 text-beer-brown">
                {source}
              </Badge>
            ))}
          </div>
          
          {filteredResults.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-beer-brown text-lg">No beers match your filters. Try adjusting your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((beer) => (
                <div key={beer.id} className={cn("transform transition-all duration-500 animate-slide-up")}>
                  <BeerCard beer={beer} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BeerResults;
