
import BeerSearch from './BeerSearch';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-16">
      <div className="absolute inset-0 bg-gradient-to-b from-beer-foam/10 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto animate-fade-in">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-beer-dark leading-tight">
          Discover Your 
          <span className="text-beer-amber"> Next Favorite </span>
          Craft Beer
        </h1>
        
        <p className="mt-6 text-xl text-beer-brown">
          Enter a beer you enjoy, a style you prefer, or a flavor profile you're craving—we'll find your perfect next craft beer to try.
        </p>
        
        <div className="mt-10">
          <BeerSearch onSearch={onSearch} />
        </div>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-beer-brown/70">Try searching for:</span>
          {['IPA', 'Stout', 'Sour', 'Hoppy', 'Sierra Nevada', 'Fruity'].map((term) => (
            <button
              key={term}
              onClick={() => onSearch(term)}
              className="px-3 py-1 bg-beer-amber/10 hover:bg-beer-amber/20 rounded-full text-sm text-beer-brown transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="animate-bounce w-10 h-10 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-beer-amber"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
