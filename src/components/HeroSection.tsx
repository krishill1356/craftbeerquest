
import BeerSearch from './BeerSearch';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-16 social-bg">
      <div className="absolute inset-0 korean-pattern"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-beer-foam/10 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 text-center max-w-3xl mx-auto social-reveal">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-lg">
          Discover Your 
          <span className="text-beer-amber"> Next Favorite </span>
          Craft Beer
        </h1>
        
        <p className="mt-6 text-xl text-white/90 drop-shadow-md">
          Enter a beer you enjoy, a style you prefer, or a flavor profile you're craving—we'll find your perfect next craft beer to try.
        </p>
        
        <div className="mt-10 delayed-animation">
          <BeerSearch onSearch={onSearch} />
        </div>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-white/80">Try searching for:</span>
          {['IPA', 'Stout', 'Sour', 'Hoppy', 'Sierra Nevada', 'Fruity'].map((term, index) => (
            <button
              key={term}
              onClick={() => onSearch(term)}
              className={`px-3 py-1 bg-white/20 hover:bg-beer-amber/60 rounded-full text-sm text-white transition-colors staggered-item fade-slide-up`}
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
            className="text-white"
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
