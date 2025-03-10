import { useState, useRef, useCallback, useEffect } from 'react';
import { MapPin, Loader2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

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
  latitude: string | null;
  longitude: string | null;
  distance?: number;
}

interface MapCenter {
  lat: number;
  lng: number;
}

const GOOGLE_MAPS_API_KEY = "AIzaSyDU8igFYlMv9YkFYzSYKXU22ndOMO_mmZs"; // This is a frontend-only API key with restrictions
const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem',
  marginBottom: '1rem'
};

// Define libraries with the correct type
const libraries: ("places" | "drawing" | "geometry" | "visualization")[] = ["places"];

const BreweryFinder = () => {
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [breweries, setBreweries] = useState<Brewery[]>([]);
  const [usingCurrentLocation, setUsingCurrentLocation] = useState(false);
  const [mapCenter, setMapCenter] = useState<MapCenter>({ lat: 40.7128, lng: -74.0060 }); // Default to NYC
  const [mapZoom, setMapZoom] = useState(11);
  const [selectedBrewery, setSelectedBrewery] = useState<Brewery | null>(null);
  
  const mapRef = useRef<google.maps.Map | null>(null);
  
  const { isLoaded: mapsLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries
  });
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const handleSearch = async () => {
    if (!location.trim() && !usingCurrentLocation) {
      toast.error("Please enter a location or use your current location");
      return;
    }

    setIsLoading(true);
    setBreweries([]);

    try {
      let url;
      if (usingCurrentLocation) {
        url = 'https://api.openbrewerydb.org/v1/breweries?per_page=50';
      } else {
        const encodedLocation = encodeURIComponent(location);
        url = `https://api.openbrewerydb.org/v1/breweries?by_city=${encodedLocation}&per_page=15`;
      }

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      let breweryData = await response.json();

      breweryData = breweryData.filter((brewery: Brewery) => 
        brewery.latitude && brewery.longitude && 
        parseFloat(brewery.latitude) !== 0 && 
        parseFloat(brewery.longitude) !== 0
      );

      if (usingCurrentLocation && navigator.geolocation) {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        
        setMapCenter({ lat: latitude, lng: longitude });
        
        breweryData = breweryData
          .filter((brewery: Brewery) => brewery.latitude && brewery.longitude)
          .map((brewery: Brewery) => {
            const distance = calculateDistance(
              latitude, 
              longitude, 
              parseFloat(brewery.latitude || '0'), 
              parseFloat(brewery.longitude || '0')
            );
            return { ...brewery, distance };
          })
          .sort((a: Brewery, b: Brewery) => (a.distance || Infinity) - (b.distance || Infinity))
          .slice(0, 15);
      } else {
        if (breweryData.length > 0 && breweryData[0].latitude && breweryData[0].longitude) {
          setMapCenter({
            lat: parseFloat(breweryData[0].latitude),
            lng: parseFloat(breweryData[0].longitude)
          });
        } else {
          try {
            const geocodeResponse = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}`
            );
            const geocodeData = await geocodeResponse.json();
            
            if (geocodeData && geocodeData.length > 0) {
              setMapCenter({
                lat: parseFloat(geocodeData[0].lat),
                lng: parseFloat(geocodeData[0].lon)
              });
            }
          } catch (error) {
            console.error('Error geocoding location:', error);
          }
        }
      }

      setBreweries(breweryData);
      
      if (breweryData.length === 0) {
        toast.info("No breweries found in this area. Try another location.");
      } else {
        toast.success(`Found ${breweryData.length} breweries`);
        
        if (mapRef.current && breweryData.length > 1) {
          const bounds = new google.maps.LatLngBounds();
          breweryData.forEach((brewery: Brewery) => {
            if (brewery.latitude && brewery.longitude) {
              bounds.extend({
                lat: parseFloat(brewery.latitude),
                lng: parseFloat(brewery.longitude)
              });
            }
          });
          mapRef.current.fitBounds(bounds);
        } else if (breweryData.length === 1) {
          setMapZoom(14);
        }
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
        timeout: 10000,
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
      
      setMapCenter({ lat: latitude, lng: longitude });
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
        );
        const data = await response.json();
        setLocation(data.address?.city || data.address?.town || 'Current Location');
      } catch (error) {
        console.error('Error getting location name:', error);
        setLocation('Current Location');
      }
      
      setUsingCurrentLocation(true);
      setTimeout(() => handleSearch(), 100);
    } catch (error) {
      console.error('Error getting current location:', error);
      toast.error("Failed to get your location. Please try entering it manually.");
      setIsLoading(false);
    }
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRadian = (degree: number) => degree * Math.PI / 180;
    
    const R = 6371;
    const dLat = toRadian(lat2 - lat1);
    const dLon = toRadian(lon2 - lon1);
    
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance * 10) / 10;
  };

  const handleMarkerClick = (brewery: Brewery) => {
    setSelectedBrewery(brewery);
  };

  const getDirections = (brewery: Brewery) => {
    if (brewery.latitude && brewery.longitude) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${brewery.latitude},${brewery.longitude}`;
      window.open(url, '_blank');
    }
  };

  if (loadError) {
    return (
      <div className="w-full max-w-7xl mx-auto py-8">
        <Card className="bg-gray-50 border-beer-amber/10">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-beer-brown text-center">
              Error loading Google Maps. Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <Input
            type="text"
            placeholder="Enter city or postal code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-10"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
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
      
      {!isLoading && mapsLoaded && (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={mapZoom}
          onLoad={onMapLoad}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            styles: [
              {
                featureType: "poi.business",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          }}
        >
          {breweries.map((brewery) => (
            brewery.latitude && brewery.longitude && (
              <Marker
                key={brewery.id}
                position={{
                  lat: parseFloat(brewery.latitude),
                  lng: parseFloat(brewery.longitude)
                }}
                onClick={() => handleMarkerClick(brewery)}
                icon={{
                  url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%23D3A04D' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 5v16M5 5.03a3 3 0 0 1 4.5-.79l.7.86a3 3 0 0 0 4.6 0l.7-.86a3 3 0 0 1 4.5.79V19.5a3 3 0 0 1-4.5.79l-.7-.86a3 3 0 0 0-4.6 0l-.7.86a3 3 0 0 1-4.5-.79V5.03Z'/%3E%3C/svg%3E",
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            )
          ))}
          
          {selectedBrewery && selectedBrewery.latitude && selectedBrewery.longitude && (
            <InfoWindow
              position={{
                lat: parseFloat(selectedBrewery.latitude),
                lng: parseFloat(selectedBrewery.longitude)
              }}
              onCloseClick={() => setSelectedBrewery(null)}
            >
              <div className="p-2 max-w-xs">
                <h3 className="font-bold text-beer-dark">{selectedBrewery.name}</h3>
                <p className="text-sm capitalize mb-1">{selectedBrewery.brewery_type} brewery</p>
                {selectedBrewery.street && (
                  <p className="text-sm text-beer-brown">{selectedBrewery.street}</p>
                )}
                <p className="text-sm text-beer-brown mb-2">
                  {selectedBrewery.city}, {selectedBrewery.state} {selectedBrewery.postal_code}
                </p>
                <div className="flex gap-2 mt-2">
                  {selectedBrewery.website_url && (
                    <a
                      href={selectedBrewery.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-beer-amber hover:text-beer-brown font-medium"
                    >
                      Website
                    </a>
                  )}
                  <button
                    onClick={() => getDirections(selectedBrewery)}
                    className="text-sm text-beer-amber hover:text-beer-brown font-medium flex items-center"
                  >
                    <Navigation className="h-3 w-3 mr-1" /> Directions
                  </button>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
      
      {!mapsLoaded && !isLoading && (
        <Card className="bg-gray-50 border-beer-amber/10 mb-8">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-beer-amber mb-4" />
            <p className="text-beer-brown text-center">
              Loading Google Maps...
            </p>
          </CardContent>
        </Card>
      )}
      
      {breweries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
              <CardFooter className="pt-2 flex justify-between">
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
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    handleMarkerClick(brewery);
                    if (mapRef.current && brewery.latitude && brewery.longitude) {
                      mapRef.current.panTo({
                        lat: parseFloat(brewery.latitude),
                        lng: parseFloat(brewery.longitude)
                      });
                      mapRef.current.setZoom(15);
                    }
                  }}
                  className="text-beer-amber hover:text-beer-brown transition-colors"
                >
                  <MapPin className="mr-1 h-4 w-4" />
                  View on Map
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {!isLoading && breweries.length === 0 && (
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
