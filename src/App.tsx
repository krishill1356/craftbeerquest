
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import MerchStore from "./pages/MerchStore";
import FavoritesPage from "./pages/FavoritesPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import BreweryFinderPage from "./pages/BreweryFinderPage";
import TastingJournalPage from "./pages/TastingJournalPage";
import BeerPhotosPage from "./pages/BeerPhotosPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/merch" element={<MerchStore />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/recommendations" element={<RecommendationsPage />} />
          <Route path="/breweries" element={<BreweryFinderPage />} />
          <Route path="/journal" element={<TastingJournalPage />} />
          <Route path="/photos" element={<BeerPhotosPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
