
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BeerResults from '@/components/BeerResults';
import FavoriteBeers from '@/components/FavoriteBeers';
import BeerRecommendations from '@/components/BeerRecommendations';
import BreweryFinder from '@/components/BreweryFinder';
import TastingJournal from '@/components/TastingJournal';
import BeerPhotos from '@/components/BeerPhotos';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import SocialBackgroundSection from '@/components/SocialBackgroundSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    // Scroll to results after a short delay
    setTimeout(() => {
      const resultsElement = document.getElementById('search');
      if (resultsElement) {
        window.scrollTo({
          top: resultsElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection onSearch={handleSearch} />
        <BeerResults searchQuery={searchQuery} isSearching={isSearching} />
        
        <SocialBackgroundSection>
          <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
            <Tabs defaultValue="favorites" className="w-full">
              <TabsList className="mb-8 flex w-full justify-start overflow-x-auto no-scrollbar">
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="breweries">Brewery Finder</TabsTrigger>
                <TabsTrigger value="journal">Tasting Journal</TabsTrigger>
                <TabsTrigger value="photos">Beer Photos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="favorites">
                <FavoriteBeers />
              </TabsContent>
              
              <TabsContent value="recommendations">
                <BeerRecommendations />
              </TabsContent>
              
              <TabsContent value="breweries">
                <BreweryFinder />
              </TabsContent>
              
              <TabsContent value="journal">
                <TastingJournal />
              </TabsContent>
              
              <TabsContent value="photos">
                <BeerPhotos />
              </TabsContent>
            </Tabs>
          </div>
        </SocialBackgroundSection>
        
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
