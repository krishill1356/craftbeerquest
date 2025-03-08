
import { useState, useRef } from 'react';
import { Camera, Upload, X, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
import { Beer } from '@/services/beerService';

interface BeerPhoto {
  id: string;
  beerId?: string;
  beerName: string;
  brewery?: string;
  imageUrl: string;
  caption: string;
  tags: string[];
  date: string;
  uploader: string;
  likes: number;
}

interface BeerPhotoShareProps {
  beer?: Beer;
}

const BeerPhotoShare = ({ beer }: BeerPhotoShareProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [beerName, setBeerName] = useState(beer?.name || '');
  const [brewery, setBrewery] = useState(beer?.brewery || '');
  const [userName, setUserName] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>(beer?.style ? [beer.style] : []);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    if (tags.includes(tagInput.trim())) {
      toast.error("Tag already added");
      return;
    }
    
    setTags([...tags, tagInput.trim()]);
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handleSubmit = () => {
    if (!selectedImage) {
      toast.error("Please select an image to share");
      return;
    }

    if (!beerName.trim()) {
      toast.error("Please enter a beer name");
      return;
    }

    if (!userName.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // Create photo object
    const photo: BeerPhoto = {
      id: `photo-${Date.now()}`,
      beerId: beer?.id,
      beerName: beerName,
      brewery: brewery,
      imageUrl: selectedImage,
      caption: caption,
      tags: tags,
      date: new Date().toISOString(),
      uploader: userName,
      likes: 0
    };

    // Save to localStorage
    const savedPhotos = localStorage.getItem('beerPhotos');
    let photos: BeerPhoto[] = [];
    
    if (savedPhotos) {
      try {
        photos = JSON.parse(savedPhotos);
      } catch (e) {
        console.error('Error parsing beer photos', e);
      }
    }
    
    localStorage.setItem('beerPhotos', JSON.stringify([photo, ...photos]));

    // Reset form
    setSelectedImage(null);
    setCaption('');
    setBeerName(beer?.name || '');
    setBrewery(beer?.brewery || '');
    setUserName('');
    setTags(beer?.style ? [beer.style] : []);
    setIsDialogOpen(false);

    toast.success("Photo shared successfully!");
  };

  const clearImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 border-beer-amber/20 hover:bg-beer-amber/10"
        >
          <Camera size={16} />
          <span>Share Beer Photo</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Your Beer Photo</DialogTitle>
          <DialogDescription>
            Upload and share a photo of your beer experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {selectedImage ? (
            <div className="relative">
              <img 
                src={selectedImage} 
                alt="Selected beer" 
                className="w-full h-60 object-cover rounded-md" 
              />
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div 
              onClick={handleCameraClick}
              className="border-2 border-dashed border-gray-300 rounded-md h-60 flex flex-col items-center justify-center cursor-pointer hover:border-beer-amber/50 transition-colors"
            >
              <Upload size={40} className="text-gray-400 mb-2" />
              <p className="text-gray-500">Click to upload or take a photo</p>
              <p className="text-gray-400 text-sm">JPG, PNG, GIF up to 5MB</p>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            capture="environment"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="beerName" className="text-sm font-medium">
                Beer Name*
              </label>
              <Input
                id="beerName"
                value={beerName}
                onChange={(e) => setBeerName(e.target.value)}
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
                value={brewery}
                onChange={(e) => setBrewery(e.target.value)}
                placeholder="Enter brewery name"
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="userName" className="text-sm font-medium">
              Your Name*
            </label>
            <Input
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <label htmlFor="caption" className="text-sm font-medium">
              Caption
            </label>
            <Textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption for your photo"
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <label className="text-sm font-medium">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
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
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!selectedImage || !beerName || !userName}
            className="bg-beer-amber hover:bg-beer-amber/90"
          >
            <Share2 className="mr-2 h-4 w-4" /> Share Photo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BeerPhotoShare;
