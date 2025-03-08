
import { useState, useEffect } from 'react';
import { Book, Plus, Edit2, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Beer } from '@/services/beerService';

interface JournalEntry {
  id: string;
  beerId?: string;
  beerName: string;
  brewery: string;
  notes: string;
  rating: number;
  date: string;
  location?: string;
  tags: string[];
}

const TastingJournal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [formState, setFormState] = useState({
    beerName: '',
    brewery: '',
    notes: '',
    rating: 3,
    location: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem('tastingJournal');
    if (savedEntries) {
      try {
        setEntries(JSON.parse(savedEntries));
      } catch (e) {
        console.error('Error parsing journal entries', e);
      }
    }
  }, []);

  const saveEntries = (newEntries: JournalEntry[]) => {
    localStorage.setItem('tastingJournal', JSON.stringify(newEntries));
    setEntries(newEntries);
  };

  const handleEntrySubmit = () => {
    if (!formState.beerName) {
      toast.error("Beer name is required");
      return;
    }

    const newEntries = [...entries];
    
    if (activeEntry) {
      // Update existing entry
      const index = newEntries.findIndex(e => e.id === activeEntry.id);
      if (index !== -1) {
        newEntries[index] = {
          ...activeEntry,
          ...formState,
          date: new Date().toISOString()
        };
      }
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: `entry-${Date.now()}`,
        beerName: formState.beerName,
        brewery: formState.brewery,
        notes: formState.notes,
        rating: formState.rating,
        location: formState.location,
        tags: formState.tags,
        date: new Date().toISOString()
      };
      newEntries.unshift(newEntry);
    }

    saveEntries(newEntries);
    
    toast.success(activeEntry ? "Entry updated!" : "New entry added!");
    resetForm();
    setIsDialogOpen(false);
  };

  const deleteEntry = (id: string) => {
    const newEntries = entries.filter(entry => entry.id !== id);
    saveEntries(newEntries);
    toast.success("Entry deleted");
  };

  const editEntry = (entry: JournalEntry) => {
    setActiveEntry(entry);
    setFormState({
      beerName: entry.beerName,
      brewery: entry.brewery,
      notes: entry.notes,
      rating: entry.rating,
      location: entry.location || '',
      tags: entry.tags || [],
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setActiveEntry(null);
    setFormState({
      beerName: '',
      brewery: '',
      notes: '',
      rating: 3,
      location: '',
      tags: [],
    });
    setTagInput('');
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (formState.tags.includes(tagInput.trim())) {
      toast.error("Tag already added");
      return;
    }
    
    setFormState({
      ...formState,
      tags: [...formState.tags, tagInput.trim()]
    });
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setFormState({
      ...formState,
      tags: formState.tags.filter(t => t !== tag)
    });
  };

  const addEntryFromBeer = (beer: Beer) => {
    setFormState({
      beerName: beer.name,
      brewery: beer.brewery,
      notes: '',
      rating: 3,
      location: '',
      tags: [beer.style],
    });
    setActiveEntry(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-beer-dark">Your Tasting Journal</h2>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              onClick={resetForm}
              className="bg-beer-amber hover:bg-beer-amber/90"
            >
              <Plus className="mr-2 h-4 w-4" /> New Entry
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {activeEntry ? 'Edit Journal Entry' : 'Add New Journal Entry'}
              </DialogTitle>
              <DialogDescription>
                Record your thoughts about this beer
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label htmlFor="beerName" className="text-sm font-medium">
                  Beer Name*
                </label>
                <Input
                  id="beerName"
                  value={formState.beerName}
                  onChange={(e) => setFormState({ ...formState, beerName: e.target.value })}
                  placeholder="Enter beer name"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="brewery" className="text-sm font-medium">
                  Brewery
                </label>
                <Input
                  id="brewery"
                  value={formState.brewery}
                  onChange={(e) => setFormState({ ...formState, brewery: e.target.value })}
                  placeholder="Enter brewery name"
                />
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="rating" className="text-sm font-medium">
                  Rating: {formState.rating}/5
                </label>
                <input
                  type="range"
                  id="rating"
                  min="1"
                  max="5"
                  step="1"
                  value={formState.rating}
                  onChange={(e) => setFormState({ ...formState, rating: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex justify-between">
                  <span className="text-xs">Poor</span>
                  <span className="text-xs">Excellent</span>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <Input
                  id="location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  placeholder="Where did you try this beer?"
                />
              </div>
              
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formState.tags.map(tag => (
                    <div 
                      key={tag} 
                      className="bg-beer-amber/10 px-3 py-1 rounded-full flex items-center"
                    >
                      <span className="text-sm text-beer-brown mr-1">{tag}</span>
                      <button 
                        type="button" 
                        onClick={() => removeTag(tag)}
                        className="text-beer-brown hover:text-beer-amber"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <label htmlFor="notes" className="text-sm font-medium">
                  Tasting Notes
                </label>
                <Textarea
                  id="notes"
                  value={formState.notes}
                  onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                  placeholder="What did you think? Flavors, aromas, etc."
                  className="min-h-[100px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEntrySubmit}>
                {activeEntry ? 'Save Changes' : 'Add Entry'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {entries.length === 0 ? (
        <Card className="bg-gray-50 border-beer-amber/10">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Book size={48} className="text-beer-amber/60 mb-4" />
            <p className="text-beer-brown text-center">
              Your tasting journal is empty. Add your first entry to start tracking your beer experiences.
            </p>
            <Button
              onClick={() => setIsDialogOpen(true)}
              variant="outline"
              className="mt-4 border-beer-amber/20"
            >
              <Plus className="mr-2 h-4 w-4" /> Add First Entry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl font-bold text-beer-dark">
                      {entry.beerName}
                    </CardTitle>
                    <CardDescription>{entry.brewery}</CardDescription>
                  </div>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < entry.rating 
                            ? 'text-amber-500 fill-amber-500' 
                            : 'text-gray-300'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-beer-brown text-sm">
                  {new Date(entry.date).toLocaleDateString()}
                  {entry.location && ` • ${entry.location}`}
                </p>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {entry.tags?.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-beer-amber/10 px-2 py-0.5 rounded-full text-xs text-beer-brown"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="mt-4 text-beer-brown text-sm line-clamp-3">
                  {entry.notes || "No tasting notes added."}
                </p>
              </CardContent>
              <CardFooter className="pt-2 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => editEntry(entry)}
                  className="text-beer-brown hover:text-beer-amber hover:bg-beer-amber/5"
                >
                  <Edit2 size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteEntry(entry.id)}
                  className="text-beer-brown hover:text-red-500 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TastingJournal;
