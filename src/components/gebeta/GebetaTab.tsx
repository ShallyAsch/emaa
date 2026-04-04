'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, Flame, Leaf, Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FoodItem {
  id: string;
  name: string;
  amharicName?: string;
  description: string;
  emotionalDescription: string;
  image: string;
  tags: string[];
  spiceLevel: number;
  aiReason?: string;
  rating: number;
  category: 'meat' | 'vegetarian' | 'breakfast' | 'drinks' | 'sides';
}

// Emama's Picks - featured items
const emamasPicks: FoodItem[] = [
  {
    id: 'emama-1',
    name: 'Tibs',
    amharicName: 'ጥብስ',
    description: 'Sauteed cubes of tender beef with fresh tomatoes, jalapenos, onions, and rosemary. Served sizzling hot.',
    emotionalDescription: 'The sizzle and aroma that fills the room, bringing joy and warmth to every gathering.',
    image: '/dining-hall.jpg',
    tags: ['Sizzling', 'Fresh', 'Hearty'],
    spiceLevel: 3,
    aiReason: 'A family favorite that brings everyone together',
    rating: 4.9,
    category: 'meat',
  },
  {
    id: 'emama-2',
    name: 'Doro Wat',
    amharicName: 'ዶሮ ወጥ',
    description: 'A rich, spicy chicken stew slow-cooked in berbere spices with hard-boiled eggs, served with traditional injera.',
    emotionalDescription: 'The queen of Ethiopian dishes, a recipe passed down through generations of loving mothers.',
    image: '/buna-ceremony.jpg',
    tags: ['Traditional', 'Spicy', 'Comfort'],
    spiceLevel: 4,
    aiReason: 'Your love for bold, spicy flavors makes this perfect',
    rating: 4.9,
    category: 'meat',
  },
  {
    id: 'emama-3',
    name: 'Kitfo',
    amharicName: 'ክትፎ',
    description: 'Premium minced beef seasoned with mitmita and niter kibbeh, served warm with ayib cheese and gomen.',
    emotionalDescription: 'A delicacy for the adventurous soul, honoring centuries of Ethiopian culinary tradition.',
    image: '/kuriftu-resort.jpg',
    tags: ['Authentic', 'Premium', 'Bold'],
    spiceLevel: 3,
    aiReason: 'Based on your preference for premium, authentic dishes',
    rating: 4.8,
    category: 'meat',
  },
];

// All Ethiopian foods
const allFoods: FoodItem[] = [
  // Meat Dishes
  {
    id: '1',
    name: 'Siga Wat',
    amharicName: 'ስጋ ወጥ',
    description: 'Spicy beef stew cooked in berbere sauce with onions and niter kibbeh.',
    emotionalDescription: 'A hearty dish that warms the soul on any day.',
    image: '/dining-hall.jpg',
    tags: ['Spicy', 'Beef', 'Traditional'],
    spiceLevel: 4,
    rating: 4.7,
    category: 'meat',
  },
  {
    id: '2',
    name: 'Zilzil Tibs',
    amharicName: 'ዝልዝል ጥብስ',
    description: 'Strips of beef sauteed with onions and peppers, tender and flavorful.',
    emotionalDescription: 'Quick, delicious, and perfect for any occasion.',
    image: '/ethiopian-landscape.jpg',
    tags: ['Beef', 'Sauteed', 'Mild'],
    spiceLevel: 2,
    rating: 4.6,
    category: 'meat',
  },
  {
    id: '3',
    name: 'Awaze Tibs',
    amharicName: 'አዋዜ ጥብስ',
    description: 'Extra spicy beef tibs marinated in awaze sauce, for heat lovers.',
    emotionalDescription: 'A fiery celebration of Ethiopian spice traditions.',
    image: '/pool-garden.jpg',
    tags: ['Extra Spicy', 'Bold', 'Traditional'],
    spiceLevel: 5,
    rating: 4.8,
    category: 'meat',
  },
  {
    id: '4',
    name: 'Gored Gored',
    amharicName: 'ጎረድ ጎረድ',
    description: 'Cubed raw beef seasoned with awaze and mitmita, an Ethiopian delicacy.',
    emotionalDescription: 'For the truly adventurous, a taste of authentic tradition.',
    image: '/dining-hall.jpg',
    tags: ['Raw', 'Bold', 'Traditional'],
    spiceLevel: 4,
    rating: 4.5,
    category: 'meat',
  },
  {
    id: '5',
    name: 'Yebeg Tibs',
    amharicName: 'የበግ ጥብስ',
    description: 'Sauteed lamb with rosemary, garlic, and traditional spices.',
    emotionalDescription: 'Tender lamb that melts in your mouth.',
    image: '/kuriftu-resort.jpg',
    tags: ['Lamb', 'Aromatic', 'Special'],
    spiceLevel: 2,
    rating: 4.7,
    category: 'meat',
  },
  {
    id: '6',
    name: 'Yebeg Wat',
    amharicName: 'የበግ ወጥ',
    description: 'Lamb stew in rich berbere sauce, slow-cooked to perfection.',
    emotionalDescription: 'A festive dish reserved for special celebrations.',
    image: '/buna-ceremony.jpg',
    tags: ['Lamb', 'Spicy', 'Festive'],
    spiceLevel: 4,
    rating: 4.8,
    category: 'meat',
  },
  {
    id: '7',
    name: 'Dulet',
    amharicName: 'ዱለት',
    description: 'Minced tripe, liver, and lean beef fried with berbere, jalapenos, and niter kibbeh.',
    emotionalDescription: 'A bold dish for those who appreciate every part of the animal.',
    image: '/dining-hall.jpg',
    tags: ['Organ Meat', 'Bold', 'Traditional'],
    spiceLevel: 4,
    rating: 4.4,
    category: 'meat',
  },
  {
    id: '8',
    name: 'Key Wat',
    amharicName: 'ቀይ ወጥ',
    description: 'Classic red beef stew with intense berbere flavor and tender meat.',
    emotionalDescription: 'The foundation of Ethiopian cuisine, perfected over centuries.',
    image: '/pool-garden.jpg',
    tags: ['Spicy', 'Classic', 'Comfort'],
    spiceLevel: 4,
    rating: 4.7,
    category: 'meat',
  },
  // Vegetarian Dishes
  {
    id: '9',
    name: 'Shiro',
    amharicName: 'ሽሮ',
    description: 'Creamy chickpea stew infused with aromatic spices and niter kibbeh.',
    emotionalDescription: 'Gentle on the palate, rich in tradition. A hug in a bowl.',
    image: '/kuriftu-resort.jpg',
    tags: ['Vegetarian', 'Comfort', 'Mild'],
    spiceLevel: 2,
    rating: 4.7,
    category: 'vegetarian',
  },
  {
    id: '10',
    name: 'Misir Wat',
    amharicName: 'ምስር ወጥ',
    description: 'Spiced red lentil stew cooked with berbere, onions, and garlic.',
    emotionalDescription: 'Simple ingredients transformed into something extraordinary.',
    image: '/dining-hall.jpg',
    tags: ['Vegetarian', 'Spicy', 'Protein'],
    spiceLevel: 3,
    rating: 4.6,
    category: 'vegetarian',
  },
  {
    id: '11',
    name: 'Gomen',
    amharicName: 'ጎመን',
    description: 'Sauteed collard greens with garlic, ginger, and mild spices.',
    emotionalDescription: 'Fresh, healthy, and full of Ethiopian flavor.',
    image: '/ethiopian-landscape.jpg',
    tags: ['Vegetarian', 'Healthy', 'Mild'],
    spiceLevel: 1,
    rating: 4.5,
    category: 'vegetarian',
  },
  {
    id: '12',
    name: 'Atakilt Wat',
    amharicName: 'አታክልት ወጥ',
    description: 'Cabbage, carrots, and potatoes gently cooked with turmeric and spices.',
    emotionalDescription: 'Comfort food that nourishes body and soul.',
    image: '/pool-garden.jpg',
    tags: ['Vegetarian', 'Mild', 'Comfort'],
    spiceLevel: 1,
    rating: 4.5,
    category: 'vegetarian',
  },
  {
    id: '13',
    name: 'Ayib',
    amharicName: 'አይብ',
    description: 'Fresh Ethiopian cottage cheese, mild and creamy.',
    emotionalDescription: 'A cooling companion to spicy dishes.',
    image: '/kuriftu-resort.jpg',
    tags: ['Vegetarian', 'Mild', 'Fresh'],
    spiceLevel: 0,
    rating: 4.4,
    category: 'vegetarian',
  },
  {
    id: '14',
    name: 'Kik Alicha',
    amharicName: 'ክክ አልጫ',
    description: 'Mild yellow split pea stew with turmeric and herbs.',
    emotionalDescription: 'Gentle and soothing, perfect for any palate.',
    image: '/dining-hall.jpg',
    tags: ['Vegetarian', 'Mild', 'Comfort'],
    spiceLevel: 1,
    rating: 4.5,
    category: 'vegetarian',
  },
  {
    id: '15',
    name: 'Tikil Gomen',
    amharicName: 'ትክል ጎመን',
    description: 'Cabbage and potatoes cooked in mild spices and turmeric.',
    emotionalDescription: 'Home-style cooking at its finest.',
    image: '/ethiopian-landscape.jpg',
    tags: ['Vegetarian', 'Mild', 'Home-style'],
    spiceLevel: 1,
    rating: 4.4,
    category: 'vegetarian',
  },
  {
    id: '16',
    name: 'Fasolia',
    amharicName: 'ፋሶሊያ',
    description: 'Green beans and carrots sauteed with onions and mild spices.',
    emotionalDescription: 'Fresh vegetables elevated with Ethiopian technique.',
    image: '/pool-garden.jpg',
    tags: ['Vegetarian', 'Fresh', 'Healthy'],
    spiceLevel: 1,
    rating: 4.3,
    category: 'vegetarian',
  },
  {
    id: '17',
    name: 'Beyaynetu',
    amharicName: 'በያይነቱ',
    description: 'A colorful platter of various vegetarian dishes on injera.',
    emotionalDescription: 'Experience the full spectrum of Ethiopian flavors in one beautiful presentation.',
    image: '/culture-hero.jpg',
    tags: ['Vegetarian', 'Variety', 'Sharing'],
    spiceLevel: 2,
    rating: 4.9,
    category: 'vegetarian',
  },
  // Breakfast Items
  {
    id: '18',
    name: 'Firfir',
    amharicName: 'ፍርፍር',
    description: 'Shredded injera mixed with berbere sauce and niter kibbeh.',
    emotionalDescription: 'The beloved breakfast that starts every Ethiopian day right.',
    image: '/dining-hall.jpg',
    tags: ['Breakfast', 'Traditional', 'Filling'],
    spiceLevel: 3,
    rating: 4.6,
    category: 'breakfast',
  },
  {
    id: '19',
    name: 'Chechebsa',
    amharicName: 'ጨጨብሳ',
    description: 'Shredded flatbread mixed with niter kibbeh and berbere.',
    emotionalDescription: 'A cozy morning treat that brings back childhood memories.',
    image: '/kuriftu-resort.jpg',
    tags: ['Breakfast', 'Comfort', 'Traditional'],
    spiceLevel: 2,
    rating: 4.5,
    category: 'breakfast',
  },
  {
    id: '20',
    name: 'Kinche',
    amharicName: 'ቅንጬ',
    description: 'Cracked wheat porridge with niter kibbeh, simple and nutritious.',
    emotionalDescription: 'Warm, comforting, and perfect for a peaceful morning.',
    image: '/ethiopian-landscape.jpg',
    tags: ['Breakfast', 'Healthy', 'Mild'],
    spiceLevel: 0,
    rating: 4.4,
    category: 'breakfast',
  },
  {
    id: '21',
    name: 'Enqulal Firfir',
    amharicName: 'እንቁላል ፍርፍር',
    description: 'Scrambled eggs with injera pieces, tomatoes, and jalapenos.',
    emotionalDescription: 'A hearty breakfast that fuels your adventures.',
    image: '/dining-hall.jpg',
    tags: ['Breakfast', 'Eggs', 'Filling'],
    spiceLevel: 2,
    rating: 4.6,
    category: 'breakfast',
  },
  {
    id: '22',
    name: 'Ful',
    amharicName: 'ፉል',
    description: 'Fava beans mashed with olive oil, jalapenos, tomatoes, and spices.',
    emotionalDescription: 'A protein-rich start to your day.',
    image: '/pool-garden.jpg',
    tags: ['Breakfast', 'Vegetarian', 'Protein'],
    spiceLevel: 2,
    rating: 4.5,
    category: 'breakfast',
  },
  // Drinks
  {
    id: '23',
    name: 'Buna (Coffee)',
    amharicName: 'ቡና',
    description: 'Traditional Ethiopian coffee, roasted and brewed in ceremony.',
    emotionalDescription: 'The birthplace of coffee shares its most precious gift.',
    image: '/buna-ceremony.jpg',
    tags: ['Drink', 'Traditional', 'Ceremonial'],
    spiceLevel: 0,
    rating: 5.0,
    category: 'drinks',
  },
  {
    id: '24',
    name: 'Tej',
    amharicName: 'ጠጅ',
    description: 'Traditional honey wine, sweet and slightly effervescent.',
    emotionalDescription: 'An ancient drink that celebrates life.',
    image: '/kuriftu-resort.jpg',
    tags: ['Drink', 'Alcoholic', 'Traditional'],
    spiceLevel: 0,
    rating: 4.7,
    category: 'drinks',
  },
  {
    id: '25',
    name: 'Tella',
    amharicName: 'ጠላ',
    description: 'Traditional Ethiopian beer made from fermented grains.',
    emotionalDescription: 'A rustic brew with deep cultural roots.',
    image: '/dining-hall.jpg',
    tags: ['Drink', 'Alcoholic', 'Traditional'],
    spiceLevel: 0,
    rating: 4.3,
    category: 'drinks',
  },
  {
    id: '26',
    name: 'Atmit',
    amharicName: 'አጥሚት',
    description: 'Warm barley drink with niter kibbeh, honey, and spices.',
    emotionalDescription: 'A nourishing drink that heals and comforts.',
    image: '/pool-garden.jpg',
    tags: ['Drink', 'Non-alcoholic', 'Warm'],
    spiceLevel: 0,
    rating: 4.4,
    category: 'drinks',
  },
  // Sides
  {
    id: '27',
    name: 'Injera',
    amharicName: 'እንጀራ',
    description: 'Spongy sourdough flatbread made from teff flour.',
    emotionalDescription: 'The foundation of every Ethiopian meal, a plate and utensil in one.',
    image: '/dining-hall.jpg',
    tags: ['Bread', 'Essential', 'Fermented'],
    spiceLevel: 0,
    rating: 4.8,
    category: 'sides',
  },
  {
    id: '28',
    name: 'Kocho',
    amharicName: 'ቆጮ',
    description: 'Traditional flatbread made from false banana plant.',
    emotionalDescription: 'A unique Ethiopian staple from the southern highlands.',
    image: '/ethiopian-landscape.jpg',
    tags: ['Bread', 'Traditional', 'Regional'],
    spiceLevel: 0,
    rating: 4.3,
    category: 'sides',
  },
  {
    id: '29',
    name: 'Ambasha',
    amharicName: 'አምባሻ',
    description: 'Slightly sweet, spiced Ethiopian bread perfect for holidays.',
    emotionalDescription: 'A celebratory bread shared with loved ones.',
    image: '/buna-ceremony.jpg',
    tags: ['Bread', 'Sweet', 'Festive'],
    spiceLevel: 0,
    rating: 4.6,
    category: 'sides',
  },
  {
    id: '30',
    name: 'Senafich',
    amharicName: 'ሰናፍጭ',
    description: 'Ethiopian mustard sauce, tangy and flavorful.',
    emotionalDescription: 'The perfect condiment to enhance any dish.',
    image: '/pool-garden.jpg',
    tags: ['Condiment', 'Tangy', 'Traditional'],
    spiceLevel: 1,
    rating: 4.4,
    category: 'sides',
  },
];

const SpiceIndicator = ({ level }: { level: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((i) => (
      <Flame
        key={i}
        className={`w-3 h-3 ${i <= level ? 'text-red-500 fill-red-500' : 'text-muted'}`}
      />
    ))}
  </div>
);

export default function GebetaTab() {
  const [favorites, setFavorites] = useState<string[]>(['emama-1', 'emama-2']);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const categories = [
    { id: 'meat', label: 'Meat', icon: '🥩' },
    { id: 'vegetarian', label: 'Vegetarian', icon: Leaf },
    { id: 'breakfast', label: 'Breakfast', icon: '🍳' },
    { id: 'drinks', label: 'Drinks', icon: '☕' },
    { id: 'sides', label: 'Sides', icon: '🍞' },
  ];

  const filteredFoods = selectedCategory 
    ? allFoods.filter(f => f.category === selectedCategory)
    : allFoods;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <Image
          src="/dining-hall.jpg"
          alt="Ethiopian cuisine"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🍽️</span>
            <span className="text-accent text-sm font-medium">Gebeta</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            What You Would Love
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Emama understands you. Discover dishes curated for your unique taste.
          </p>
        </div>
      </div>

      {/* AI Welcome Message */}
      <div className="px-4 md:px-8 -mt-6 relative z-10">
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Emama knows your taste</h3>
              <p className="text-muted-foreground text-sm">
                Based on your profile, I&apos;ve selected dishes that match your love for{' '}
                <span className="text-accent font-medium">spicy food</span>,{' '}
                <span className="text-accent font-medium">traditional cuisine</span>, and{' '}
                <span className="text-accent font-medium">family sharing</span>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emama's Pick Section */}
      <div className="px-4 md:px-8 py-8">
        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl">👩‍🍳</span>
          <h2 className="font-serif text-xl font-bold text-primary">Emama&apos;s Pick for You</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {emamasPicks.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground group"
            >
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle cx="150" cy="100" r="80" fill="currentColor" />
                </svg>
              </div>
              <div className="relative p-5">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center gap-1 bg-white/20 text-xs px-3 py-1 rounded-full">
                    <Star className="w-3 h-3 fill-current" />
                    Emama&apos;s Choice
                  </span>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                    aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(item.id)
                          ? 'text-red-400 fill-red-400'
                          : 'text-white'
                      }`}
                    />
                  </button>
                </div>
                
                <div className="relative w-full h-32 rounded-xl overflow-hidden mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                <h3 className="font-serif text-xl font-bold mb-1">{item.name}</h3>
                {item.amharicName && (
                  <p className="text-primary-foreground/70 text-sm mb-2">{item.amharicName}</p>
                )}
                <p className="text-primary-foreground/80 text-sm mb-3 line-clamp-2 italic">
                  &quot;{item.emotionalDescription}&quot;
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs opacity-80">Spice:</span>
                    <SpiceIndicator level={item.spiceLevel} />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 md:px-8 pb-4">
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === null
                ? 'bg-primary text-primary-foreground'
                : 'bg-white text-foreground hover:bg-muted border border-border'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-foreground hover:bg-muted border border-border'
                }`}
              >
                {typeof cat.icon === 'string' ? (
                  <span>{cat.icon}</span>
                ) : (
                  <cat.icon className="w-4 h-4" />
                )}
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Want to Try Something New Section */}
      <div className="px-4 md:px-8 pb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary">Want to Try Something New?</h2>
            <p className="text-sm text-muted-foreground">Explore all of Ethiopian cuisine</p>
          </div>
          <Button variant="ghost" className="text-accent text-sm">
            See all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredFoods.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(item.id)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  aria-label={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(item.id)
                        ? 'text-red-500 fill-red-500'
                        : 'text-foreground'
                    }`}
                  />
                </button>

                {/* Tags */}
                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/90 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                    {item.amharicName && (
                      <p className="text-muted-foreground text-xs">{item.amharicName}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-medium text-foreground">{item.rating}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Spice:</span>
                    <SpiceIndicator level={item.spiceLevel} />
                  </div>
                  <span className="text-xs text-muted-foreground capitalize bg-muted px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Taste Profile Summary */}
      <div className="px-4 md:px-8 pb-20">
        <div className="bg-white rounded-2xl p-6 shadow-warm-md">
          <h3 className="font-serif text-lg font-bold text-primary mb-4">Your Taste Profile</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Flame className="w-8 h-8 text-red-500" />
              </div>
              <span className="text-sm font-medium text-foreground">Spice Lover</span>
              <div className="text-xs text-muted-foreground">Level 4/5</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🍖</span>
              </div>
              <span className="text-sm font-medium text-foreground">Meat Dishes</span>
              <div className="text-xs text-muted-foreground">Preferred</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <span className="text-sm font-medium text-foreground">Family Sharing</span>
              <div className="text-xs text-muted-foreground">Often</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🌍</span>
              </div>
              <span className="text-sm font-medium text-foreground">Traditional</span>
              <div className="text-xs text-muted-foreground">Authentic</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
