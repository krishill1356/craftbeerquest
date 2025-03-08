
import { useState, useEffect } from 'react';
import { MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

interface Brewery {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  website_url: string;
  latitude: string;
  longitude: string;
  distance?: number;
}

const BreweryFinder = () => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);

  const handleSearch = async () => {
    if (!location.trim() && !usingCurrentLocation) {
      toast.error("Please enter a location or use your current location");
      return;
    }

    setIsLoading(true);
    setBreweries([]);

    try {
      // Use OpenBreweryDB API
      let url;
      if (usingCurrentLocation) {
        url = `https://api.openbrewerydb.org/breweries?per_page=10`;
      } else {
        // Encode the location for the URL
        const encodedLocation = encodeURIComponent(location);
        url = `https://api.openbrewerydb.org/breweries?by_city=${encodedLocation}&per_page=10`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch breweries');
      }
      
      let breweryData = await response.json();

      // If using current location, calculate distances and sort
      if (usingCurrentLocation && navigator.geolocation) {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        
        // Add distance to each brewery
        breweryData = breweryData
          .filter((brewery: Brewery) => brewery.latitude && brewery.longitude)
          .map((brewery: Brewery) => {
            const distance = calculateDistance(
              latitude, 
              longitude, 
              parseFloat(brewery.latitude), 
              parseFloat(brewery.longitude)
            );
            return { ...brewery, distance };
          })
          .sort((a: Brewery, b: Brewery) => (a.distance || 0) - (b.distance || 0));
      }

      setBreweries(breweryData);
      
      if (breweryData.length === 0) {
        toast.info("No breweries found in this area. Try another location.");
      }
    } catch (error) {
      console.error('Error fetching breweries:', error);
      toast.error("Failed to fetch breweries. Please try again.");
    } finally {
      setIsLoading(false);
      setUsingCurrentLocation(false);
    }
  };

  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }
      
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      });
    });
  };

  const useCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    try {
      setIsLoading(true);
      const position = await getCurrentPosition();
      const { latitude, longitude } = position.coords;
      
      // Get location name from coordinates using reverse geocoding
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
        );
        const data = await response.json();
        setLocation(data.address.city || data.address.town || 'Current Location');
      } catch (error) {
        console.error('Error getting location name:', error);
        setLocation('Current Location');
      }
      
      setUsingCurrentLocation(true);
      handleSearch();
    } catch (error) {
      console.error('Error getting current location:', error);
      toast.error("Failed to get your location. Please try entering it manually.");
      setIsLoading(false);
    }
  };

  // Calculate distance between two points using the Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRadian = (degree: number) => degree * Math.PI / 180;
    
    const R = 6371; // Earth radius in km
    const dLat = toRadian(lat2 - lat1);
    const dLon = toRadian(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10; // Round to 1 decimal place
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <h2 className="text-2xl font-bold text-beer-dark mb-6">Find Local Breweries</h2>
      
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Enter city or postal code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-10"
          />
        </div>
        <Button onClick={handleSearch} disabled={isLoading} className="bg-beer-amber hover:bg-beer-amber/90">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Find Breweries'
          )}
        </Button>
        <Button
          variant="outline"
          onClick={useCurrentLocation}
          disabled={isLoading}
          className="border-beer-amber/20"
        >
          <MapPin className="mr-2 h-4 w-4" />
          Use My Location
        </Button>
      </div>
      
      {breweries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {breweries.map((brewery) => (
            <Card key={brewery.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-bold text-beer-dark">{brewery.name}</CardTitle>
                <CardDescription className="capitalize">
                  {brewery.brewery_type} brewery
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm">
                  {brewery.street && (
                    <p className="text-beer-brown">{brewery.street}</p>
                  )}
                  <p className="text-beer-brown">
                    {brewery.city}, {brewery.state} {brewery.postal_code}
                  </p>
                  {brewery.distance && (
                    <p className="text-beer-brown font-medium mt-2">
                      {brewery.distance} km away
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-2">
                {brewery.website_url && (
                  <a
                    href={brewery.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-beer-amber hover:text-beer-brown transition-colors"
                  >
                    Visit Website
                  </a>
                )}
                {brewery.phone && (
                  <a
                    href={`tel:${brewery.phone}`}
                    className="text-beer-amber hover:text-beer-brown transition-colors ml-auto"
                  >
                    {brewery.phone}
                  </a>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {!isLoading && breweries.length === 0 && location && (
        <Card className="bg-gray-50 border-beer-amber/10">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-beer-brown text-center">
              Search for breweries by entering a city or postal code, or use your current location.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BreweryFinder;
