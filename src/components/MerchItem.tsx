
import { useState } from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

export type MerchSize = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface MerchItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  imageSrc: string;
  sizes: MerchSize[];
  colors?: string[];
}

const MerchItem = ({ 
  id, 
  name, 
  description, 
  price, 
  currency = "GBP", 
  imageSrc, 
  sizes, 
  colors = [] 
}: MerchItemProps) => {
  const { toast } = useToast();
  const [selectedSize, setSelectedSize] = useState<MerchSize | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(colors.length > 0 ? colors[0] : null);

  const handleAddToCart = () => {
    if (!selectedSize && sizes.length > 0) {
      toast({
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Added to cart!",
      description: `${name}${selectedSize ? ` (${selectedSize})` : ''} has been added to your cart.`,
    });
  };

  const handleWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: `${name} has been added to your wishlist.`,
    });
  };

  const getColorStyles = (color: string) => {
    const baseStyles = "h-6 w-6 rounded-full border border-gray-300 cursor-pointer transition-all";
    
    switch (color.toLowerCase()) {
      case 'amber':
        return `${baseStyles} bg-beer-amber`;
      case 'dark':
        return `${baseStyles} bg-beer-dark`;
      case 'cream':
        return `${baseStyles} bg-beer-cream`;
      case 'brown':
        return `${baseStyles} bg-beer-brown`;
      case 'foam':
        return `${baseStyles} bg-beer-foam`;
      case 'stout':
        return `${baseStyles} bg-beer-stout`;
      case 'black':
        return `${baseStyles} bg-black`;
      case 'white':
        return `${baseStyles} bg-white`;
      default:
        return `${baseStyles} bg-gray-400`;
    }
  };

  const formatCurrency = (value: number, currencyCode: string) => {
    if (currencyCode === "GBP") {
      return `£${value.toFixed(2)}`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageSrc} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
        >
          <Heart className="h-5 w-5 text-beer-amber" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-beer-dark">{name}</h3>
        <p className="text-beer-brown mt-1">{description}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-beer-dark">{formatCurrency(price, currency)}</span>
        </div>
        
        {sizes.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-beer-brown mb-2">Size:</p>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded-md text-sm transition-colors ${
                    selectedSize === size 
                      ? 'border-beer-amber bg-beer-amber/10 text-beer-dark font-medium' 
                      : 'border-gray-300 text-beer-brown hover:border-beer-amber'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {colors.length > 0 && (
          <div className="mt-4">
            <p className="text-sm text-beer-brown mb-2">Color:</p>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`${getColorStyles(color)} ${
                    selectedColor === color ? 'ring-2 ring-beer-amber ring-offset-2' : ''
                  }`}
                  aria-label={`Color: ${color}`}
                />
              ))}
            </div>
          </div>
        )}
        
        <Button 
          className="w-full mt-4 bg-beer-amber hover:bg-beer-dark text-white flex items-center justify-center gap-2"
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default MerchItem;
