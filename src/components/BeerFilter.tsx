
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

type FilterOptions = {
  abv: [number, number];
  ibu: [number, number];
  styles: string[];
  breweries: string[];
}

interface BeerFilterProps {
  onFilterChange: (filters: FilterOptions) => void;
  availableStyles: string[];
  availableBreweries: string[];
}

const BeerFilter = ({ onFilterChange, availableStyles, availableBreweries }: BeerFilterProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    abv: [0, 15],
    ibu: [0, 100],
    styles: [],
    breweries: [],
  });

  const handleAbvChange = (values: number[]) => {
    // Ensure we always have exactly two values for the tuple
    const abvValues: [number, number] = [
      values[0] !== undefined ? values[0] : filters.abv[0],
      values[1] !== undefined ? values[1] : filters.abv[1]
    ];
    
    const newFilters = { ...filters, abv: abvValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleIbuChange = (values: number[]) => {
    // Ensure we always have exactly two values for the tuple
    const ibuValues: [number, number] = [
      values[0] !== undefined ? values[0] : filters.ibu[0],
      values[1] !== undefined ? values[1] : filters.ibu[1]
    ];
    
    const newFilters = { ...filters, ibu: ibuValues };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStyleChange = (style: string, checked: boolean) => {
    let newStyles: string[];
    
    if (checked) {
      newStyles = [...filters.styles, style];
    } else {
      newStyles = filters.styles.filter(s => s !== style);
    }
    
    const newFilters = { ...filters, styles: newStyles };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBreweryChange = (brewery: string, checked: boolean) => {
    let newBreweries: string[];
    
    if (checked) {
      newBreweries = [...filters.breweries, brewery];
    } else {
      newBreweries = filters.breweries.filter(b => b !== brewery);
    }
    
    const newFilters = { ...filters, breweries: newBreweries };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters: FilterOptions = {
      abv: [0, 15],
      ibu: [0, 100],
      styles: [],
      breweries: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 border-beer-amber/20 hover:bg-beer-amber/10">
          <Filter size={16} />
          <span>Filter</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filter Beers</SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect beer.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6 space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">ABV Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[filters.abv[0], filters.abv[1]]} 
                max={15} 
                step={0.1} 
                onValueChange={handleAbvChange} 
              />
              <div className="flex justify-between mt-2 text-sm text-beer-brown">
                <span>{filters.abv[0]}%</span>
                <span>{filters.abv[1]}%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">IBU Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[filters.ibu[0], filters.ibu[1]]} 
                max={100} 
                step={1} 
                onValueChange={handleIbuChange} 
              />
              <div className="flex justify-between mt-2 text-sm text-beer-brown">
                <span>{filters.ibu[0]}</span>
                <span>{filters.ibu[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Beer Style</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableStyles.map((style) => (
                <div key={style} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`style-${style}`} 
                    checked={filters.styles.includes(style)}
                    onCheckedChange={(checked) => handleStyleChange(style, checked as boolean)}
                  />
                  <Label 
                    htmlFor={`style-${style}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {style}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Brewery</h3>
            <div className="grid grid-cols-2 gap-2">
              {availableBreweries.map((brewery) => (
                <div key={brewery} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`brewery-${brewery}`} 
                    checked={filters.breweries.includes(brewery)}
                    onCheckedChange={(checked) => handleBreweryChange(brewery, checked as boolean)}
                  />
                  <Label 
                    htmlFor={`brewery-${brewery}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {brewery}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={resetFilters} className="mr-2">
            Reset
          </Button>
          <Button onClick={() => onFilterChange(filters)}>
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BeerFilter;
