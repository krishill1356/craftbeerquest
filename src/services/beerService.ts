
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
  apiSource?: string; // Track which API the beer came from
}

// Interface for OpenBreweryDB response
interface OpenBreweryDBBeer {
  id: string;
  name: string;
  brewery_type: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  updated_at: string;
  created_at: string;
}

// Interface for Untappd response
interface UntappdBeer {
  bid: number;
  beer_name: string;
  beer_label: string;
  beer_abv: number;
  beer_ibu: number;
  beer_description: string;
  beer_style: string;
  brewery: {
    brewery_id: number;
    brewery_name: string;
    brewery_slug: string;
    brewery_page_url: string;
    brewery_label: string;
  };
}

// Interface for Untappd API response
interface UntappdResponse {
  meta: {
    code: number;
    response_time: {
      time: number;
      measure: string;
    };
    init_time: {
      time: number;
      measure: string;
    };
  };
  response: {
    beers: {
      count: number;
      items: {
        beer: UntappdBeer;
        brewery: any;
        checkin_count: number;
        have_had: boolean;
      }[];
    };
  };
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
  },
  {
    id: "13",
    name: "Faith",
    tagline: "Modern Pale Ale",
    description: "A modern pale ale with vibrant notes of citrus, pine, and tropical fruits. Clean, balanced and highly drinkable.",
    image_url: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 5.1,
    ibu: 40,
    brewery: "Northern Monk",
    breweryUrl: "https://www.northernmonkbrewco.com/",
    style: "Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Northern+Monk+Faith+buy",
    similarTo: "Beavertown Neck Oil"
  },
  {
    id: "14",
    name: "Eternal",
    tagline: "Session IPA",
    description: "Light-bodied but full-flavored session IPA with notes of mango, citrus, and pine from generous dry-hopping.",
    image_url: "https://images.unsplash.com/photo-1557142046-c704a3266b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1558642891-54be180ea339?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 4.1,
    ibu: 45,
    brewery: "Northern Monk",
    breweryUrl: "https://www.northernmonkbrewco.com/",
    style: "Session IPA",
    purchaseUrl: "https://www.google.com/search?q=Northern+Monk+Eternal+buy",
    similarTo: "Tiny Rebel Clwb Tropica"
  },
  {
    id: "15",
    name: "Bloom",
    tagline: "Hazy IPA",
    description: "A vibrant IPA with intense tropical fruit flavors and a soft, pillowy mouthfeel. Dry-hopped with Citra, Mosaic and Simcoe.",
    image_url: "https://images.unsplash.com/photo-1563804447127-f2af8161bf39?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1600788886106-f4802b4e1c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.5,
    ibu: 35,
    brewery: "Verdant",
    breweryUrl: "https://verdantbrewing.co/",
    style: "New England IPA",
    purchaseUrl: "https://www.google.com/search?q=Verdant+Bloom+IPA+buy",
    similarTo: "Deya Steady Rolling Man"
  },
  {
    id: "16",
    name: "Lightbulb",
    tagline: "Extra Pale Ale",
    description: "Clean, crisp extra pale ale with delicate hop character and subtle citrus notes. Extremely refreshing.",
    image_url: "https://images.unsplash.com/photo-1518099074172-2e47ee6cfdc0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 4.5,
    ibu: 30,
    brewery: "Verdant",
    breweryUrl: "https://verdantbrewing.co/",
    style: "Extra Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Verdant+Lightbulb+buy",
    similarTo: "Thornbridge Jaipur"
  },
  {
    id: "17",
    name: "Raspberry Sour",
    tagline: "Fruit Sour Ale",
    description: "A vibrant, tart sour beer packed with juicy raspberry flavor. Clean, refreshing and perfectly balanced.",
    image_url: "https://images.unsplash.com/photo-1600788847853-a3ba5534a0d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1566633804183-63be24e1d639?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 4.8,
    ibu: 10,
    brewery: "Vault City",
    breweryUrl: "https://vaultcity.co.uk/",
    style: "Fruit Sour",
    purchaseUrl: "https://www.google.com/search?q=Vault+City+Raspberry+Sour+buy",
    similarTo: "The Bruery Frucht"
  },
  {
    id: "18",
    name: "Passionfruit Session Sour",
    tagline: "Tropical Fruit Sour",
    description: "Bursting with tropical passionfruit flavor, this session sour has the perfect balance of sweetness and acidity.",
    image_url: "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 3.8,
    ibu: 8,
    brewery: "Vault City",
    breweryUrl: "https://vaultcity.co.uk/",
    style: "Fruit Sour",
    purchaseUrl: "https://www.google.com/search?q=Vault+City+Passionfruit+Session+Sour+buy",
    similarTo: "Cascade Brewing Sour Ales"
  },
  {
    id: "19",
    name: "Steady Rolling Man",
    tagline: "Pale Ale",
    description: "A juicy, balanced pale ale with tangerine, peach and citrus notes. Soft mouthfeel with a restrained bitterness.",
    image_url: "https://images.unsplash.com/photo-1596424927240-b3875c5926e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1586993451228-09818021e309?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 5.2,
    ibu: 35,
    brewery: "Deya",
    breweryUrl: "https://deyabrewing.com/",
    style: "Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Deya+Steady+Rolling+Man+buy",
    similarTo: "Thornbridge Melba"
  },
  {
    id: "20",
    name: "Into the Haze",
    tagline: "DDH Pale Ale",
    description: "Double dry-hopped pale ale with intense tropical fruit aromas, soft body and a smooth finish. Dangerously drinkable.",
    image_url: "https://images.unsplash.com/photo-1600788886404-0a6901d39f6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1614311483175-5a9c8a86bffc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.2,
    ibu: 40,
    brewery: "Deya",
    breweryUrl: "https://deyabrewing.com/",
    style: "DDH Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Deya+Into+the+Haze+buy",
    similarTo: "Cloudwater DDH Pale"
  },
  {
    id: "21",
    name: "DDH Pale",
    tagline: "Modern Hoppy Pale",
    description: "A vibrant double dry-hopped pale ale loaded with tropical fruit flavors and aromas. Pillowy soft with minimal bitterness.",
    image_url: "https://images.unsplash.com/photo-1600805685428-d2baef9b9e40?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1549396560-0171acd420f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 5.5,
    ibu: 30,
    brewery: "Cloudwater",
    breweryUrl: "https://cloudwaterbrew.co/",
    style: "DDH Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Cloudwater+DDH+Pale+buy",
    similarTo: "Track Brewing Sonoma"
  },
  {
    id: "22",
    name: "DIPA",
    tagline: "Double IPA",
    description: "A full-bodied, intensely hoppy double IPA with resinous pine, tropical fruit and citrus notes. Bold yet balanced.",
    image_url: "https://images.unsplash.com/photo-1600788886055-f2100a1a9bd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1545879256-deaa0673476b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 8.0,
    ibu: 65,
    brewery: "Cloudwater",
    breweryUrl: "https://cloudwaterbrew.co/",
    style: "Double IPA",
    purchaseUrl: "https://www.google.com/search?q=Cloudwater+DIPA+buy",
    similarTo: "Wylam Jakehead"
  },
  {
    id: "23",
    name: "Juice Springsteen",
    tagline: "Juicy IPA",
    description: "A hazy, juicy IPA with huge tropical and stone fruit aromas. Soft mouthfeel with low bitterness and a dry finish.",
    image_url: "https://images.unsplash.com/photo-1600788886513-0f305dde223f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1614313511387-1436a4480ebb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.5,
    ibu: 45,
    brewery: "Neon Raptor",
    breweryUrl: "https://www.neonraptorbrewingco.com/",
    style: "New England IPA",
    purchaseUrl: "https://www.google.com/search?q=Neon+Raptor+Juice+Springsteen+buy",
    similarTo: "Polly's Brew Co Augment"
  },
  {
    id: "24",
    name: "Cosmic Toothpaste",
    tagline: "Mint Choc Chip Stout",
    description: "A decadent dessert stout with natural mint and rich chocolate flavors reminiscent of mint chocolate chip ice cream.",
    image_url: "https://images.unsplash.com/photo-1572060816362-7dd95d096145?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 8.5,
    ibu: 40,
    brewery: "Neon Raptor",
    breweryUrl: "https://www.neonraptorbrewingco.com/",
    style: "Dessert Stout",
    purchaseUrl: "https://www.google.com/search?q=Neon+Raptor+Cosmic+Toothpaste+buy",
    similarTo: "Omnipollo Noa Pecan Mud Cake"
  },
  {
    id: "25",
    name: "Augment",
    tagline: "DDH IPA",
    description: "A hugely hoppy double dry-hopped IPA with intense tropical fruit character and a smooth, creamy finish.",
    image_url: "https://images.unsplash.com/photo-1584225065152-4a1454aa3d4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1549060279-7fb46595ba0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 6.8,
    ibu: 50,
    brewery: "Polly's Brew Co",
    breweryUrl: "https://www.pollysbrewco.com/",
    style: "DDH IPA",
    purchaseUrl: "https://www.google.com/search?q=Pollys+Brew+Co+Augment+buy",
    similarTo: "Northern Monk Heathen"
  },
  {
    id: "26",
    name: "Citra Ekuanot",
    tagline: "Hop Forward Pale",
    description: "A hop forward pale ale showcasing Citra and Ekuanot hops with notes of citrus, peach, and pine. Crisp and refreshing.",
    image_url: "https://images.unsplash.com/photo-1600788886631-f062c4f00dc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    specific_image_url: "https://images.unsplash.com/photo-1561870051-80d103b572f7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    abv: 5.6,
    ibu: 42,
    brewery: "Polly's Brew Co",
    breweryUrl: "https://www.pollysbrewco.com/",
    style: "American Pale Ale",
    purchaseUrl: "https://www.google.com/search?q=Pollys+Brew+Co+Citra+Ekuanot+buy",
    similarTo: "Verdant Allen"
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

// Function to fetch beers from OpenBreweryDB
const fetchFromOpenBreweryDB = async (query: string): Promise<Beer[]> => {
  try {
    // OpenBreweryDB allows searching by name
    const response = await fetch(`https://api.openbrewerydb.org/breweries/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`OpenBreweryDB API error: ${response.status}`);
    }
    
    const breweries: OpenBreweryDBBeer[] = await response.json();
    
    // Convert OpenBreweryDB results to our Beer format
    return breweries.map(brewery => ({
      id: `openbrewerydb-${brewery.id}`,
      name: brewery.name,
      tagline: `${brewery.brewery_type} brewery in ${brewery.city}`,
      description: `${brewery.name} is a ${brewery.brewery_type} brewery located in ${brewery.city}, ${brewery.state}.`,
      image_url: "https://images.unsplash.com/photo-1584225064785-c62a8b43d148?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // Default image
      abv: 0, // No ABV info from this API
      ibu: 0, // No IBU info from this API
      brewery: brewery.name,
      breweryUrl: brewery.website_url || "",
      style: brewery.brewery_type || "Unknown",
      purchaseUrl: brewery.website_url || `https://www.google.com/search?q=${encodeURIComponent(brewery.name)}`,
      apiSource: "OpenBreweryDB"
    }));
  } catch (error) {
    console.error("Error fetching from OpenBreweryDB:", error);
    return [];
  }
};

// Function to fetch beers from Untappd
const fetchFromUntappd = async (query: string): Promise<Beer[]> => {
  try {
    // Note: Untappd requires authentication. This is a mock implementation.
    // In a real app, you'd need to set up server-side requests with proper authentication.
    // This is for demonstration purposes only.
    
    // Mock response for now - in production, you would replace this with actual API calls
    // using your Untappd API credentials through a secure backend endpoint
    console.log("Searching Untappd for:", query);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data - in a real implementation you would fetch from Untappd API
    const mockBeers = [
      {
        bid: 1000001,
        beer_name: `${query} IPA`,
        beer_label: "https://images.unsplash.com/photo-1613520761181-a157937e9407?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        beer_abv: 6.2,
        beer_ibu: 45,
        beer_description: `A delicious IPA related to your search for "${query}". Notes of citrus and pine.`,
        beer_style: "IPA",
        brewery: {
          brewery_id: 1001,
          brewery_name: "Mock Brewery",
          brewery_slug: "mock-brewery",
          brewery_page_url: "https://untappd.com",
          brewery_label: "https://untappd.com/brewery/logo.png"
        }
      },
      {
        bid: 1000002,
        beer_name: `${query} Stout`,
        beer_label: "https://images.unsplash.com/photo-1518176258769-f227c798150e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
        beer_abv: 7.5,
        beer_ibu: 30,
        beer_description: `A rich and smooth stout related to your search for "${query}". Notes of chocolate and coffee.`,
        beer_style: "Stout",
        brewery: {
          brewery_id: 1002,
          brewery_name: "Mock Stout Brewery",
          brewery_slug: "mock-stout-brewery",
          brewery_page_url: "https://untappd.com",
          brewery_label: "https://untappd.com/brewery/logo.png"
        }
      }
    ];
    
    // Convert mock Untappd results to our Beer format
    return mockBeers.map(beer => ({
      id: `untappd-${beer.bid}`,
      name: beer.beer_name,
      tagline: `${beer.beer_style} by ${beer.brewery.brewery_name}`,
      description: beer.beer_description,
      image_url: beer.beer_label,
      abv: beer.beer_abv,
      ibu: beer.beer_ibu,
      brewery: beer.brewery.brewery_name,
      breweryUrl: beer.brewery.brewery_page_url,
      style: beer.beer_style,
      purchaseUrl: `https://www.google.com/search?q=${encodeURIComponent(beer.beer_name)}`,
      apiSource: "Untappd"
    }));
  } catch (error) {
    console.error("Error fetching from Untappd:", error);
    return [];
  }
};

export const findSimilarBeers = async (query: string): Promise<Beer[]> => {
  if (!query || query.trim() === "") return [];
  
  const lowerQuery = query.toLowerCase().trim();
  
  // First, get local database results
  const localResults = beerDatabase.filter(beer => {
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
  
  try {
    // Fetch from external APIs in parallel
    const [openBreweryResults, untappdResults] = await Promise.all([
      fetchFromOpenBreweryDB(query),
      fetchFromUntappd(query)
    ]);
    
    // Combine and return all results
    // Add source property to local results
    const localResultsWithSource = localResults.map(beer => ({
      ...beer,
      apiSource: "Local Database"
    }));
    
    return [...localResultsWithSource, ...openBreweryResults, ...untappdResults];
  } catch (error) {
    console.error("Error fetching from external APIs:", error);
    // If APIs fail, still return local results
    return localResults;
  }
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
