
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BeerResults from '@/components/BeerResults';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

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
        <AboutSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
