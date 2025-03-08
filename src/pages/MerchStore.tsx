
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MerchItem, { MerchItemProps } from '@/components/MerchItem';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShoppingBag, ShoppingCart } from 'lucide-react';

// Merchandise data
const merchandiseItems: MerchItemProps[] = [
  {
    id: "tshirt-logo",
    name: "My Next Beer Logo T-Shirt",
    description: "Classic t-shirt featuring our iconic beer logo. Made with premium cotton.",
    price: 19.99,
    currency: "GBP",
    imageSrc: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Amber", "Dark", "Cream", "White"]
  },
  {
    id: "hoodie-logo",
    name: "Beer Connoisseur Hoodie",
    description: "Stay warm while showing off your beer expertise. Features our logo on the front.",
    price: 39.99,
    currency: "GBP",
    imageSrc: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Dark", "Amber", "Brown"]
  },
  {
    id: "cap-logo",
    name: "Brewery Cap",
    description: "Classic cap with embroidered beer logo. Perfect for sunny days at the brewery.",
    price: 14.99,
    currency: "GBP",
    imageSrc: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: ["S", "M", "L"],
    colors: ["Amber", "Dark", "Cream"]
  },
  {
    id: "glass-set",
    name: "Craft Beer Glass Set",
    description: "Set of 4 premium glasses, each designed for different beer styles.",
    price: 29.99,
    currency: "GBP",
    imageSrc: "https://images.unsplash.com/photo-1577032229840-33197764440d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: [],
    colors: []
  },
  {
    id: "poster-beers",
    name: "Beer Styles Chart Poster",
    description: "Educational and decorative poster showing various beer styles and characteristics.",
    price: 11.99,
    currency: "GBP",
    imageSrc: "https://images.unsplash.com/photo-1561013125-3ded8e304785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: [],
    colors: []
  },
  {
    id: "tote-bag",
    name: "Beer Lover's Tote Bag",
    description: "Sturdy canvas tote featuring our logo, perfect for carrying your favorite brews.",
    price: 12.99,
    currency: "GBP",
    imageSrc: "https://images.unsplash.com/photo-1597484662317-c93a6b307e80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    sizes: [],
    colors: ["Cream", "Amber", "Dark"]
  }
];

const MerchStore = () => {
  const [filter, setFilter] = useState("all");
  
  const filteredItems = merchandiseItems.filter(item => {
    if (filter === "all") return true;
    if (filter === "apparel") return item.sizes.length > 0;
    if (filter === "accessories") return item.sizes.length === 0;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <ShoppingBag className="h-8 w-8 text-beer-amber mr-2" />
              <h1 className="text-3xl md:text-4xl font-bold text-beer-dark">My Next Beer Merchandise</h1>
            </div>
            <p className="text-beer-brown max-w-2xl mx-auto">
              Show your love for craft beer with our premium merchandise. From comfortable apparel to unique accessories, we've got everything for the true beer enthusiast.
            </p>
          </div>
          
          <Tabs defaultValue="all" className="w-full mb-10">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setFilter("all")}>All Items</TabsTrigger>
                <TabsTrigger value="apparel" onClick={() => setFilter("apparel")}>Apparel</TabsTrigger>
                <TabsTrigger value="accessories" onClick={() => setFilter("accessories")}>Accessories</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <MerchItem key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="apparel" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <MerchItem key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="accessories" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <MerchItem key={item.id} {...item} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="bg-beer-amber/10 rounded-lg p-6 border border-beer-amber/20 mt-12">
            <div className="flex items-center mb-4">
              <ShoppingCart className="h-6 w-6 text-beer-amber mr-2" />
              <h2 className="text-xl font-bold text-beer-dark">Shipping Information</h2>
            </div>
            <p className="text-beer-brown mb-4">
              Free shipping on all orders over £40. Standard shipping takes 3-5 business days. Express shipping options available at checkout.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-medium text-beer-dark mb-2">Returns</h3>
                <p className="text-sm text-beer-brown">
                  We accept returns within 30 days of purchase. Items must be unworn and in original packaging.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-beer-dark mb-2">Questions?</h3>
                <p className="text-sm text-beer-brown">
                  Contact our customer service team at support@mynextbeer.com or call us at +44 (0) 123 456 7890.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MerchStore;
