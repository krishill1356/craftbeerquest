
import { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { getSearchSuggestions } from '@/services/beerService';
import { cn } from '@/lib/utils';

interface BeerSearchProps {
  onSearch: (query: string) => void;
}

const BeerSearch = ({ onSearch }: BeerSearchProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const results = getSearchSuggestions(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if (query.length >= 2) {
      const results = getSearchSuggestions(query);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto" id="search">
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search beers, styles, or flavors..."
          className="w-full bg-white/80 backdrop-blur-sm border border-beer-amber/20 rounded-full px-6 py-4 pl-12 pr-32 focus:outline-none focus:ring-2 focus:ring-beer-amber/50 focus:border-beer-amber/50 transition-all text-beer-dark placeholder:text-beer-brown/50"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-beer-amber">
          <Search size={20} />
        </div>
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-beer-amber text-white px-6 py-2 rounded-full font-medium transition-all hover:bg-beer-brown"
        >
          Find
        </button>
      </form>

      {showSuggestions && (
        <div 
          ref={suggestionsRef}
          className={cn(
            "absolute z-10 mt-2 w-full bg-white/95 backdrop-blur-sm border border-beer-amber/20 rounded-xl shadow-lg py-2 animate-fade-in",
            suggestions.length === 0 && "hidden"
          )}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="px-6 py-2 hover:bg-beer-amber/10 cursor-pointer text-beer-brown transition-colors"
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BeerSearch;
