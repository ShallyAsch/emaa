'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { MapPin, Navigation, Star, ChevronRight, Sparkles, X, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  id: string;
  name: string;
  type: 'cultural' | 'restaurant' | 'spa' | 'activity' | 'nature' | 'shopping' | 'heritage';
  description: string;
  image: string;
  rating: number;
  distance: string;
  openHours: string;
  phone?: string;
  coordinates: { x: number; y: number };
  aiReason?: string;
}

const locations: Location[] = [
  {
    id: '1',
    name: 'Traditional Coffee Ceremony',
    type: 'cultural',
    description: 'Experience the ancient Ethiopian coffee ritual with freshly roasted beans and traditional music.',
    image: '/buna-ceremony.jpg',
    rating: 4.9,
    distance: '2 min walk',
    openHours: '9:00 AM - 6:00 PM',
    phone: '+251 11 234 5678',
    coordinates: { x: 25, y: 30 },
    aiReason: 'Based on your love for cultural experiences',
  },
  {
    id: '2',
    name: 'Lakeside Spa Retreat',
    type: 'spa',
    description: 'Rejuvenate with traditional Ethiopian honey treatments overlooking the serene lake.',
    image: '/spa-wellness.jpg',
    rating: 4.8,
    distance: '5 min walk',
    openHours: '8:00 AM - 8:00 PM',
    phone: '+251 11 234 5679',
    coordinates: { x: 65, y: 45 },
    aiReason: 'You mentioned wanting relaxation today',
  },
  {
    id: '3',
    name: 'Injera House Restaurant',
    type: 'restaurant',
    description: 'Authentic Ethiopian cuisine featuring fresh injera and spicy doro wat.',
    image: '/dining-hall.jpg',
    rating: 4.7,
    distance: '3 min walk',
    openHours: '11:00 AM - 10:00 PM',
    phone: '+251 11 234 5680',
    coordinates: { x: 45, y: 60 },
    aiReason: 'Perfect for your preference for spicy food',
  },
  {
    id: '4',
    name: 'Sunset Viewpoint',
    type: 'nature',
    description: 'The most breathtaking sunset views over the Ethiopian highlands.',
    image: '/ethiopian-landscape.jpg',
    rating: 5.0,
    distance: '10 min walk',
    openHours: 'Always open',
    coordinates: { x: 80, y: 25 },
    aiReason: 'Ideal for your evening plans',
  },
  {
    id: '5',
    name: 'Artisan Craft Village',
    type: 'activity',
    description: 'Watch local artisans create traditional Ethiopian crafts and take home a unique souvenir.',
    image: '/culture-hero.jpg',
    rating: 4.6,
    distance: '7 min walk',
    openHours: '10:00 AM - 5:00 PM',
    phone: '+251 11 234 5681',
    coordinates: { x: 35, y: 75 },
    aiReason: 'Great for family activities you enjoy',
  },
  {
    id: '6',
    name: 'Tis Abay Waterfall Trek',
    type: 'nature',
    description: 'A scenic hiking trail leading to the magnificent Blue Nile Falls, one of Ethiopia\'s natural wonders.',
    image: '/ethiopian-landscape.jpg',
    rating: 4.9,
    distance: '25 min walk',
    openHours: '6:00 AM - 6:00 PM',
    coordinates: { x: 15, y: 55 },
    aiReason: 'Perfect for your adventurous spirit',
  },
  {
    id: '7',
    name: 'Ethiopian Orthodox Church',
    type: 'heritage',
    description: 'A centuries-old church with stunning murals and ancient religious artifacts.',
    image: '/culture-hero.jpg',
    rating: 4.8,
    distance: '12 min walk',
    openHours: '7:00 AM - 5:00 PM',
    coordinates: { x: 72, y: 70 },
    aiReason: 'Rich in the history you appreciate',
  },
  {
    id: '8',
    name: 'Habesha Tej House',
    type: 'restaurant',
    description: 'Traditional honey wine bar serving authentic tej with local appetizers and live music.',
    image: '/dining-hall.jpg',
    rating: 4.5,
    distance: '6 min walk',
    openHours: '4:00 PM - 11:00 PM',
    phone: '+251 11 234 5682',
    coordinates: { x: 55, y: 35 },
    aiReason: 'A unique evening experience for you',
  },
  {
    id: '9',
    name: 'Shiro Meda Market',
    type: 'shopping',
    description: 'Vibrant local market with handwoven textiles, spices, and traditional Ethiopian clothing.',
    image: '/culture-hero.jpg',
    rating: 4.7,
    distance: '15 min walk',
    openHours: '8:00 AM - 6:00 PM',
    coordinates: { x: 20, y: 70 },
    aiReason: 'Discover authentic Ethiopian crafts',
  },
  {
    id: '10',
    name: 'Meditation Garden',
    type: 'spa',
    description: 'A tranquil garden space for yoga, meditation, and peaceful reflection amidst nature.',
    image: '/pool-garden.jpg',
    rating: 4.9,
    distance: '4 min walk',
    openHours: '6:00 AM - 8:00 PM',
    coordinates: { x: 38, y: 42 },
    aiReason: 'For your moments of tranquility',
  },
  {
    id: '11',
    name: 'Bird Watching Point',
    type: 'nature',
    description: 'Observe over 50 species of endemic Ethiopian birds in their natural habitat.',
    image: '/ethiopian-landscape.jpg',
    rating: 4.6,
    distance: '20 min walk',
    openHours: 'Best at dawn',
    coordinates: { x: 85, y: 60 },
    aiReason: 'A serene experience with nature',
  },
  {
    id: '12',
    name: 'Traditional Music Hall',
    type: 'cultural',
    description: 'Live performances of azmari music with traditional instruments like the masinko and krar.',
    image: '/culture-hero.jpg',
    rating: 4.8,
    distance: '8 min walk',
    openHours: '7:00 PM - 11:00 PM',
    phone: '+251 11 234 5683',
    coordinates: { x: 60, y: 20 },
    aiReason: 'Experience the soul of Ethiopian music',
  },
];

const typeColors: Record<string, { bg: string; text: string; icon: string }> = {
  cultural: { bg: 'bg-amber-500', text: 'text-amber-600', icon: '🏛️' },
  restaurant: { bg: 'bg-red-500', text: 'text-red-600', icon: '🍽️' },
  spa: { bg: 'bg-teal-500', text: 'text-teal-600', icon: '💆' },
  activity: { bg: 'bg-blue-500', text: 'text-blue-600', icon: '🎨' },
  nature: { bg: 'bg-green-500', text: 'text-green-600', icon: '🌿' },
  shopping: { bg: 'bg-purple-500', text: 'text-purple-600', icon: '🛍️' },
  heritage: { bg: 'bg-orange-500', text: 'text-orange-600', icon: '⛪' },
};

export default function ExploreTab() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [showAiSuggestion, setShowAiSuggestion] = useState(true);
  const [highlightedRoute, setHighlightedRoute] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleExploreNearby = () => {
    setHighlightedRoute('cultural');
    setShowAiSuggestion(false);
  };

  const handleGoThere = (location: Location) => {
    setSelectedLocation(location);
    // Scroll to map
    mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Suggestions for the cards section - curated selection
  const suggestionLocations = [
    locations[0], // Coffee Ceremony
    locations[3], // Sunset Viewpoint
    locations[5], // Waterfall Trek
    locations[7], // Tej House
    locations[11], // Music Hall
    locations[9], // Meditation Garden
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-6 md:px-8 border-b border-border bg-white">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
          Explore & Discover
        </h1>
        <p className="text-muted-foreground">
          Your AI guide to the best experiences around you
        </p>
      </div>

      {/* Interactive Map Section */}
      <div className="relative pt-8 md:pt-12" ref={mapRef}>
        {/* Map Container */}
        <div className="relative w-full h-[50vh] md:h-[60vh] bg-muted overflow-hidden shadow-inner border-y border-border">
          <iframe 
            src={`https://maps.google.com/maps?q=${encodeURIComponent((selectedLocation?.name || 'Kuriftu Resort Bishoftu') + ', Ethiopia')}&t=k&z=18&ie=UTF8&iwloc=&output=embed`}
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Interactive Google Map"
          />
          
          {/* Map Overlay HUD (Optional fallback UI) */}
          {!selectedLocation && (
            <div className="absolute top-4 left-4 right-4 pointer-events-none flex justify-between items-start">
               <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-border/50 text-sm font-semibold text-primary">
                 📍 Bishoftu, Ethiopia
               </div>
            </div>
          )}
        </div>
      </div>

      {/* AI Suggestion Card */}
      {showAiSuggestion && (
        <div className="mx-4 md:mx-8 mt-24 md:mt-32 relative z-30">
          <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 text-primary-foreground shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Emama suggests</h3>
                <p className="text-primary-foreground/80 text-sm mb-4">
                  Would you like to explore nearby cultural spots? I noticed you enjoyed the coffee
                  ceremony yesterday.
                </p>
                <div className="flex gap-3">
                  <Button
                    onClick={handleExploreNearby}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Yes, show me
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setShowAiSuggestion(false)}
                    className="text-primary-foreground hover:bg-white/10"
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggestions For You Section */}
      <div className="px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary">Suggestions For You</h2>
            <p className="text-sm text-muted-foreground">Personalized by your AI guide</p>
          </div>
          <Button variant="ghost" className="text-accent">
            View all
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {suggestionLocations.map((location) => (
            <div
              key={location.id}
              className="bg-white rounded-xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300 text-left group"
            >
              <div className="relative h-36">
                <Image
                  src={location.image}
                  alt={location.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`${typeColors[location.type]?.bg || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}
                  >
                    {typeColors[location.type]?.icon || '📍'} {location.type}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {location.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {location.description}
                </p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span className="font-medium text-foreground">{location.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{location.distance}</span>
                </div>
                <Button 
                  onClick={() => handleGoThere(location)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="sm"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Go there
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Filter Pills */}
      <div className="px-4 md:px-8 pb-20">
        <h3 className="font-semibold text-foreground mb-4">Filter by type</h3>
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeColors).map(([type, colors]) => (
            <button
              key={type}
              onClick={() => setHighlightedRoute(highlightedRoute === type ? null : type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                highlightedRoute === type
                  ? `${colors.bg} text-white`
                  : 'bg-white text-foreground hover:bg-muted'
              }`}
            >
              {colors.icon} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
