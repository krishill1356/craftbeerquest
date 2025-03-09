export interface Beer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  style: string;
  brewery: string;
  breweryUrl?: string;
  purchaseUrl?: string;
  isFavorite?: boolean;
  apiSource?: string;
  specific_image_url?: string;
  similarTo?: string;
}

export const getFavouriteBeers = (): Beer[] => {
  const favouritesJson = localStorage.getItem('favouriteBeers');
  if (favouritesJson) {
    try {
      return JSON.parse(favouritesJson);
    } catch (error) {
      console.error('Error parsing favourite beers:', error);
      return [];
    }
  }
  return [];
};

export const saveFavouriteBeer = (beer: Beer): void => {
  const favourites = getFavouriteBeers();
  if (!isBeerFavourite(beer.id)) {
    favourites.push(beer);
    localStorage.setItem('favouriteBeers', JSON.stringify(favourites));
  }
};

export const removeFavouriteBeer = (id: string): void => {
  const favourites = getFavouriteBeers();
  const updatedFavourites = favourites.filter(beer => beer.id !== id);
  localStorage.setItem('favouriteBeers', JSON.stringify(updatedFavourites));
};

export const isBeerFavourite = (id: string): boolean => {
  const favourites = getFavouriteBeers();
  return favourites.some(beer => beer.id === id);
};
