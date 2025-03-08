
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Camera, Book, Compass, Star, Beer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 md:px-8",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/lovable-uploads/db89d245-e910-4746-8f61-efde767fb63f.png" 
              alt="My Next Beer Logo" 
              className="h-10 w-auto"
            />
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">Home</Link>
          <a href="#search" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">Discover</a>
          <Link to="/favorites" className="text-beer-dark hover:text-beer-amber transition-colors font-medium flex items-center gap-1">
            <Star className="h-4 w-4" />
            Favorites
          </Link>
          <Link to="/recommendations" className="text-beer-dark hover:text-beer-amber transition-colors font-medium flex items-center gap-1">
            <Beer className="h-4 w-4" />
            Recommendations
          </Link>
          <Link to="/breweries" className="text-beer-dark hover:text-beer-amber transition-colors font-medium flex items-center gap-1">
            <Compass className="h-4 w-4" />
            Breweries
          </Link>
          <Link to="/journal" className="text-beer-dark hover:text-beer-amber transition-colors font-medium flex items-center gap-1">
            <Book className="h-4 w-4" />
            Journal
          </Link>
          <Link to="/photos" className="text-beer-dark hover:text-beer-amber transition-colors font-medium flex items-center gap-1">
            <Camera className="h-4 w-4" />
            Photos
          </Link>
          <Link to="/profile" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">Profile</Link>
          <Link to="/merch" className="text-beer-dark hover:text-beer-amber transition-colors font-medium flex items-center gap-1">
            <ShoppingBag className="h-4 w-4" />
            Merch
          </Link>
          <a href="#about" className="text-beer-dark hover:text-beer-amber transition-colors font-medium">About</a>
        </nav>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 focus:outline-none"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-beer-dark" />
            ) : (
              <Menu className="h-6 w-6 text-beer-dark" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md py-4 px-6 flex flex-col gap-4 transition-all">
          <Link to="/" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <a href="#search" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Discover
          </a>
          <Link to="/favorites" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Star className="h-4 w-4" />
            Favorites
          </Link>
          <Link to="/recommendations" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Beer className="h-4 w-4" />
            Recommendations
          </Link>
          <Link to="/breweries" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Compass className="h-4 w-4" />
            Breweries
          </Link>
          <Link to="/journal" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Book className="h-4 w-4" />
            Journal
          </Link>
          <Link to="/photos" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Camera className="h-4 w-4" />
            Photos
          </Link>
          <Link to="/profile" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            Profile
          </Link>
          <Link to="/merch" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2 flex items-center gap-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            <ShoppingBag className="h-4 w-4" />
            Merch
          </Link>
          <a href="#about" 
            className="text-beer-dark hover:text-beer-amber transition-colors font-medium py-2"
            onClick={() => setMobileMenuOpen(false)}
          >
            About
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
