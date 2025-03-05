
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Beer } from 'lucide-react';
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-beer-cream/30 px-4">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 mx-auto mb-8 relative">
          <Beer className="w-20 h-20 text-beer-amber opacity-30" />
          <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-beer-dark">404</span>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-beer-dark mb-4">Tap's Dry Here</h1>
        <p className="text-xl text-beer-brown mb-8">
          The beer you're looking for seems to have been consumed. Let's find you a fresh pint!
        </p>
        
        <Link 
          to="/" 
          className="inline-flex items-center justify-center bg-beer-amber text-white px-8 py-3 rounded-full font-medium hover:bg-beer-brown transition-colors"
        >
          Back to Brewery
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
