
import BeerSearch from './BeerSearch';
import BackgroundGallery, { BackgroundImage } from './BackgroundGallery';

interface HeroSectionProps {
  onSearch: (query: string) => void;
}

const HeroSection = ({ onSearch }: HeroSectionProps) => {
  // Use high-quality unsplash images for the hero
  const heroImages: BackgroundImage[] = [
    {
      url: "https://images.unsplash.com/photo-1575037614876-c38a4d44f5b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Group of friends enjoying craft beer at a bar",
      position: "center"
    },
    {
      url: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Happy people toasting with beer glasses at outdoor gathering",
      position: "top center"
    },
    {
      url: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      alt: "Large group enjoying pub atmosphere with craft beers",
      position: "center"
    }
  ];

  return (
    <BackgroundGallery 
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 pt-16" 
      images={heroImages}
      overlay={true}
      overlayClass="bg-gradient-to-b from-black/70 via-black/50 to-black/70"
    >
      <div className="text-center max-w-3xl mx-auto fade-slide-up">
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
          {['IPA', 'Stout', 'Sour', 'Hoppy', 'Sierra Nevada', 'Fruity'].map((term) => (
            <button
              key={term}
              onClick={() => onSearch(term)}
              className="px-3 py-1 bg-white/20 hover:bg-beer-amber/60 rounded-full text-sm text-white transition-colors staggered-item fade-slide-up"
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
    </BackgroundGallery>
  );
};

export default HeroSection;
