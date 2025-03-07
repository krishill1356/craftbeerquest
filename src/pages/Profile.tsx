
import { useState, useEffect } from 'react';
import { Beer, getFavoriteBeers } from '@/services/beerService';
import BeerCard from '@/components/BeerCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const [favorites, setFavorites] = useState<Beer[]>([]);
  
  useEffect(() => {
    setFavorites(getFavoriteBeers());
  }, []);

  const refreshFavorites = () => {
    setFavorites(getFavoriteBeers());
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-beer-dark mb-6">Your Profile</h1>
          
          <Tabs defaultValue="favorites" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="favorites" className="mt-4">
              <h2 className="text-2xl font-bold text-beer-dark mb-6">Your Favorite Beers</h2>
              
              {favorites.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center border border-beer-amber/10">
                  <p className="text-beer-brown">
                    You haven't added any favorite beers yet. Click the heart icon on any beer to add it to your favorites.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {favorites.map((beer) => (
                    <div key={beer.id}>
                      <BeerCard beer={beer} onFavoriteToggle={refreshFavorites} />
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <h2 className="text-2xl font-bold text-beer-dark mb-6">Browsing History</h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center border border-beer-amber/10">
                <p className="text-beer-brown">
                  Your browsing history will appear here in a future update.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <h2 className="text-2xl font-bold text-beer-dark mb-6">Account Settings</h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 text-center border border-beer-amber/10">
                <p className="text-beer-brown">
                  Account preferences and settings will be available in a future update.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
