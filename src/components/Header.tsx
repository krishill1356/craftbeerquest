
import { useState, useEffect } from 'react';
import { Beer } from 'lucide-react';
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
          <Beer className="h-8 w-8 text-beer-amber" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            <span className="text-beer-dark">My</span>
            <span className="text-beer-amber">Next</span>
            <span className="text-beer-dark">Beer</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#search" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">Discover</a>
          <a href="#favorites" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">Favorites</a>
          <a href="#about" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">About</a>
        </nav>
        
        <div className="md:hidden">
          <Beer className="h-6 w-6 text-beer-amber" />
        </div>
      </div>
    </header>
  );
};

export default Header;
