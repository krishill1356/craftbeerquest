
export interface Beer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  specific_image_url?: string; // Added field for specific beer images
  abv: number;
  ibu: number;
  brewery: string;
  breweryUrl: string;
  style: string;
  purchaseUrl: string;
  similarTo?: string;
}

// Mock database of craft beers
const beerDatabase: Beer[] = [
  {
    id: "1",
    name: "Hazy IPA",
    tagline: "Juicy and Tropical",
    description: "A hazy, juicy IPA with notes of tropical fruit, citrus, and a soft mouthfeel.",
    image_url: "https://images.unsplash.com/photo-1566633806327-68e152aaf26d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1612510532384-9eea6e164d8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.8,
    ibu: 55,
    brewery: "Cloudwater Brew Co",
    breweryUrl: "https://cloudwaterbrew.co/",
    style: "New England IPA",
    purchaseUrl: "https://www.google.com/search?q=Cloudwater+Hazy+IPA+buy",
    similarTo: "Sierra Nevada Hazy Little Thing"
  },
  {
    id: "2",
    name: "Bourbon County Stout",
    tagline: "Rich and Complex",
    description: "Imperial stout aged in bourbon barrels for a deep, complex flavor profile with notes of chocolate, vanilla, and oak.",
    image_url: "https://images.unsplash.com/photo-1518176258769-f227c798150e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1517256673644-36ad11246d21?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 14.3,
    ibu: 60,
    brewery: "Goose Island",
    breweryUrl: "https://www.gooseisland.com/",
    style: "Imperial Stout",
    purchaseUrl: "https://www.google.com/search?q=Goose+Island+Bourbon+County+Stout+buy",
    similarTo: "Founders KBS"
  },
  {
    id: "3",
    name: "Pliny the Elder",
    tagline: "Legendary Double IPA",
    description: "Well-balanced with big hop aromas, bitter but not harsh. A true classic in the craft beer world.",
    image_url: "https://images.unsplash.com/photo-1523567830207-96731740fa71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1613766413624-3d1d85cc5b68?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 8.0,
    ibu: 100,
    brewery: "Russian River Brewing Company",
    breweryUrl: "https://russianriverbrewing.com/",
    style: "Double IPA",
    purchaseUrl: "https://www.google.com/search?q=Russian+River+Pliny+the+Elder+buy",
    similarTo: "Bell's Hopslam"
  },
  {
    id: "4",
    name: "Saison Dupont",
    tagline: "Classic Belgian Farmhouse",
    description: "The benchmark of the style. Slightly fruity with a mild tartness, dry finish, and distinctive yeast character.",
    image_url: "https://images.unsplash.com/photo-1600788886242-5c96aabe3757?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1612528538906-c421c8a3ae75?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.5,
    ibu: 30,
    brewery: "Brasserie Dupont",
    breweryUrl: "https://www.brasserie-dupont.com/",
    style: "Saison",
    purchaseUrl: "https://www.google.com/search?q=Saison+Dupont+buy",
    similarTo: "Tank 7 Farmhouse Ale"
  },
  {
    id: "5",
    name: "Weihenstephaner Hefeweissbier",
    tagline: "World-Class Wheat Beer",
    description: "A traditional Bavarian wheat beer with characteristic banana and clove notes from the yeast.",
    image_url: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1600788887277-5ada0594d32a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 5.4,
    ibu: 14,
    brewery: "Weihenstephaner",
    breweryUrl: "https://www.weihenstephaner.de/",
    style: "Hefeweizen",
    purchaseUrl: "https://www.google.com/search?q=Weihenstephaner+Hefeweissbier+buy",
    similarTo: "Paulaner Hefeweizen"
  },
  {
    id: "6",
    name: "Duchesse De Bourgogne",
    tagline: "Flemish Red Ale",
    description: "A traditional Flemish red ale, matured in oak barrels for 18 months. Slightly sweet with a sour finish.",
    image_url: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1638845576329-2b33d5496144?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.2,
    ibu: 15,
    brewery: "Brouwerij Verhaeghe",
    breweryUrl: "https://www.verhaeghe.be/",
    style: "Flanders Red Ale",
    purchaseUrl: "https://www.google.com/search?q=Duchesse+De+Bourgogne+buy",
    similarTo: "Rodenbach Grand Cru"
  },
  {
    id: "7",
    name: "Pilsner Urquell",
    tagline: "The Original Pilsner",
    description: "The world's first golden lager, with a complex yet balanced flavor profile and a refreshing hop bitterness.",
    image_url: "https://images.unsplash.com/photo-1600788886076-fa088b3cf54f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1630446070374-df1ec648ac65?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", 
    abv: 4.4,
    ibu: 40,
    brewery: "Pilsner Urquell",
    breweryUrl: "https://www.pilsnerurquell.com/",
    style: "Czech Pilsner",
    purchaseUrl: "https://www.google.com/search?q=Pilsner+Urquell+buy",
    similarTo: "Bitburger Premium Pils"
  },
  {
    id: "8",
    name: "Orval",
    tagline: "Legendary Trappist Ale",
    description: "Unique among Trappist beers for its use of dry hopping and Brettanomyces yeast. Complex and evolves over time.",
    image_url: "https://images.unsplash.com/photo-1613520761181-a157937e9407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1613502647924-763be3477bdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.2,
    ibu: 32,
    brewery: "Brasserie d'Orval",
    breweryUrl: "https://www.orval.be/",
    style: "Belgian Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Orval+Trappist+Ale+buy",
    similarTo: "St. Bernardus Tripel"
  },
  {
    id: "9",
    name: "Two Hearted Ale",
    tagline: "Balanced American IPA",
    description: "An American IPA with a significant malt body balancing the hop bitterness and featuring a floral hop aroma.",
    image_url: "https://images.unsplash.com/photo-1588615419966-0c0f3b0c4d41?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1551798662-4bd75e89fca3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 7.0,
    ibu: 55,
    brewery: "Bell's Brewery",
    breweryUrl: "https://www.bellsbeer.com/",
    style: "American IPA",
    purchaseUrl: "https://www.google.com/search?q=Bell%27s+Two+Hearted+Ale+buy",
    similarTo: "Founders Centennial IPA"
  },
  {
    id: "10",
    name: "Guinness Draught",
    tagline: "Iconic Irish Stout",
    description: "Smooth and creamy with a distinctive roasted bitterness. The most famous stout in the world.",
    image_url: "https://images.unsplash.com/photo-1577504677382-2179e8300d4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 4.2,
    ibu: 45,
    brewery: "Guinness",
    breweryUrl: "https://www.guinness.com/",
    style: "Irish Dry Stout",
    purchaseUrl: "https://www.google.com/search?q=Guinness+Draught+buy",
    similarTo: "Murphy's Irish Stout"
  },
  {
    id: "11",
    name: "Sierra Nevada Pale Ale",
    tagline: "The American Craft Classic",
    description: "A pioneer in the American craft beer movement. Balanced and complex with a refreshing hop character.",
    image_url: "https://images.unsplash.com/photo-1600788830439-c433325bb5b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1581873372796-635b67ca2008?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 5.6,
    ibu: 38,
    brewery: "Sierra Nevada Brewing Co.",
    breweryUrl: "https://sierranevada.com/",
    style: "American Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Sierra+Nevada+Pale+Ale+buy",
    similarTo: "Stone Pale Ale"
  },
  {
    id: "12",
    name: "Chimay Blue",
    tagline: "Strong Dark Trappist Ale",
    description: "Rich and complex with flavors of dark fruit, spice, and caramel. Improves with age.",
    image_url: "https://images.unsplash.com/photo-1600788886067-5e16705744fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1567103472667-6898f3a79cf2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 9.0,
    ibu: 30,
    brewery: "Chimay",
    breweryUrl: "https://chimay.com/",
    style: "Belgian Strong Dark Ale",
    purchaseUrl: "https://www.google.com/search?q=Chimay+Blue+buy",
    similarTo: "Rochefort 10"
  }
];

// Popular beer styles for recommendations
const beerStyles = [
  "IPA", "Stout", "Pilsner", "Lager", "Porter", "Wheat Beer", "Sour", 
  "Belgian", "Pale Ale", "Amber Ale", "Brown Ale", "Saison", "Hefeweizen"
];

// Popular beer brands for search suggestions
const popularBrands = [
  "Sierra Nevada", "Dogfish Head", "Stone Brewing", "Goose Island", 
  "Bell's Brewery", "Founders", "Lagunitas", "New Belgium", "Brooklyn Brewery", 
  "BrewDog", "Mikkeller", "Weihenstephaner", "Chimay", "Orval", "Guinness"
];

// Beer characteristics/flavors for search suggestions
const beerCharacteristics = [
  "Hoppy", "Fruity", "Malty", "Bitter", "Sweet", "Sour", "Crisp", 
  "Smooth", "Roasty", "Chocolatey", "Coffee", "Citrus", "Tropical", 
  "Caramel", "Spicy", "Floral", "Piney", "Earthy", "Smoky"
];

export const getSearchSuggestions = (query: string): string[] => {
  if (!query || query.length < 2) return [];
  
  const lowerQuery = query.toLowerCase();
  const allTerms = [...beerStyles, ...popularBrands, ...beerCharacteristics];
  
  return allTerms.filter(term => 
    term.toLowerCase().includes(lowerQuery)
  ).slice(0, 5);
};

export const findSimilarBeers = (query: string): Beer[] => {
  if (!query || query.trim() === "") return [];
  
  const lowerQuery = query.toLowerCase().trim();
  
  // Search through all beers and match based on various criteria
  return beerDatabase.filter(beer => {
    // Match by name, brewery, style, or tagline
    if (beer.name.toLowerCase().includes(lowerQuery)) return true;
    if (beer.brewery.toLowerCase().includes(lowerQuery)) return true;
    if (beer.style.toLowerCase().includes(lowerQuery)) return true;
    if (beer.tagline.toLowerCase().includes(lowerQuery)) return true;
    if (beer.description.toLowerCase().includes(lowerQuery)) return true;
    if (beer.similarTo?.toLowerCase().includes(lowerQuery)) return true;
    
    // Match by characteristics (extract from description)
    for (const characteristic of beerCharacteristics) {
      if (characteristic.toLowerCase() === lowerQuery && 
          beer.description.toLowerCase().includes(characteristic.toLowerCase())) {
        return true;
      }
    }
    
    return false;
  });
};

export const getFavoriteBeers = (): Beer[] => {
  const saved = localStorage.getItem('favoriteBeers');
  if (!saved) return [];
  
  try {
    return JSON.parse(saved);
  } catch (e) {
    console.error('Error parsing favorite beers', e);
    return [];
  }
};

export const saveFavoriteBeer = (beer: Beer): void => {
  const currentFavorites = getFavoriteBeers();
  
  // Check if beer already exists in favorites
  if (!currentFavorites.some(b => b.id === beer.id)) {
    const updatedFavorites = [...currentFavorites, beer];
    localStorage.setItem('favoriteBeers', JSON.stringify(updatedFavorites));
  }
};

export const removeFavoriteBeer = (beerId: string): void => {
  const currentFavorites = getFavoriteBeers();
  const updatedFavorites = currentFavorites.filter(beer => beer.id !== beerId);
  localStorage.setItem('favoriteBeers', JSON.stringify(updatedFavorites));
};

export const isBeerFavorite = (beerId: string): boolean => {
  const favorites = getFavoriteBeers();
  return favorites.some(beer => beer.id === beerId);
};
