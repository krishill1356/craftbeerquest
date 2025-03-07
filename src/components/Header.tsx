
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/db89d245-e910-4746-8f61-efde767fb63f.png" 
            alt="My Next Beer Logo" 
            className="h-10 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#search" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">Discover</a>
          <a href="#favorites" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">Favorites</a>
          <a href="#about" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">About</a>
        </nav>
        
        <div className="md:hidden">
          <img 
            src="/lovable-uploads/db89d245-e910-4746-8f61-efde767fb63f.png" 
            alt="My Next Beer Logo" 
            className="h-6 w-auto"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
