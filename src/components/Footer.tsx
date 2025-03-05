
import { Beer } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-beer-dark text-white py-8 px-4 md:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Beer className="h-6 w-6 text-beer-amber" />
            <h2 className="text-xl font-bold tracking-tight">
              <span className="text-white">My</span>
              <span className="text-beer-amber">Next</span>
              <span className="text-white">Beer</span>
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#search" className="text-white/80 hover:text-beer-amber transition-colors text-sm">Discover</a>
            <a href="#favorites" className="text-white/80 hover:text-beer-amber transition-colors text-sm">Favorites</a>
            <a href="#about" className="text-white/80 hover:text-beer-amber transition-colors text-sm">About</a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center md:text-left">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} My Next Beer. All rights reserved.
          </p>
          <p className="text-white/40 text-xs mt-2">
            This is a demo application. Information about beers is for demonstration purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
