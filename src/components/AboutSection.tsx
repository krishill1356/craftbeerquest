
import { Beer, GlassWater, Star } from 'lucide-react';

const AboutSection = () => {
  return (
    <div id="about" className="w-full max-w-7xl mx-auto mt-16 px-4 md:px-8 py-8 mb-16">
      <h2 className="text-2xl font-bold text-beer-dark mb-6">About My Next Beer</h2>
      
      <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-beer-amber/10 p-6 md:p-8">
        <p className="text-beer-brown">
          My Next Beer is your companion in the craft beer journey, helping you discover new and exciting brews based on your preferences.
          Whether you're a seasoned craft beer enthusiast or just starting to explore beyond the mainstream, we'll help you find your next favorite beer.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-beer-cream/50 p-6 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-beer-amber/20 flex items-center justify-center mb-4">
              <Beer className="text-beer-amber w-6 h-6" />
            </div>
            <h3 className="font-bold text-beer-dark mb-2">Discover New Beers</h3>
            <p className="text-sm text-beer-brown">
              Enter your favorite beer, style or flavor profile, and we'll suggest craft beers that match your preferences.
            </p>
          </div>
          
          <div className="bg-beer-cream/50 p-6 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-beer-amber/20 flex items-center justify-center mb-4">
              <Star className="text-beer-amber w-6 h-6" />
            </div>
            <h3 className="font-bold text-beer-dark mb-2">Save Your Favorites</h3>
            <p className="text-sm text-beer-brown">
              Keep track of beers you love or want to try by adding them to your favorites list for easy reference.
            </p>
          </div>
          
          <div className="bg-beer-cream/50 p-6 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-beer-amber/20 flex items-center justify-center mb-4">
              <GlassWater className="text-beer-amber w-6 h-6" />
            </div>
            <h3 className="font-bold text-beer-dark mb-2">Expand Your Palette</h3>
            <p className="text-sm text-beer-brown">
              Learn about different beer styles, flavor profiles, and brewing techniques to become a more informed beer enthusiast.
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-beer-amber/10">
          <p className="text-sm text-beer-brown italic">
            Please drink responsibly. My Next Beer encourages the appreciation of craft beer for its artisanal qualities and flavor profiles. 
            We do not promote excessive alcohol consumption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
