
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TastingJournal from '@/components/TastingJournal';

const TastingJournalPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-3xl font-bold text-beer-dark mb-8">Your Tasting Journal</h1>
          <TastingJournal />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TastingJournalPage;
