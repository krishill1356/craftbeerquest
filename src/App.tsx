
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import FavouritesPage from './pages/FavouritesPage';
import RecommendationsPage from './pages/RecommendationsPage';
import BreweryFinderPage from './pages/BreweryFinderPage';
import BeerPhotosPage from './pages/BeerPhotosPage';
import TastingJournalPage from './pages/TastingJournalPage';
import MerchStore from './pages/MerchStore';
import Profile from './pages/Profile';
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/recommendations" element={<RecommendationsPage />} />
        <Route path="/breweries" element={<BreweryFinderPage />} />
        <Route path="/photos" element={<BeerPhotosPage />} />
        <Route path="/journal" element={<TastingJournalPage />} />
        <Route path="/merch" element={<MerchStore />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
