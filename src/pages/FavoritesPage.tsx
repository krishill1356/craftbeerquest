
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FavoriteBeers from '@/components/FavoriteBeers';

const FavoritesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl font-bold text-beer-dark mb-8">Your Favorite Beers</h1>
          <FavoriteBeers />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FavoritesPage;
