'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { MapPin, Star, Sparkles, ChevronRight, Clock, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  rating: number;
  distance: string;
  openHours: string;
  phone?: string;
  lat: number;
  lng: number;
  aiReason?: string;
}

// Kuriftu African Village, Bishoftu coordinates
const KURIFTU_LAT = 8.75;
const KURIFTU_LNG = 38.97;

const allLocations: Location[] = [
  {
    id: '1', name: 'Lake Hora (Abijata)', type: 'nature',
    description: 'Scenic lake surrounded by flamingos, ideal for boat rides and sunset views.',
    image: '/ethiopian-landscape.jpg', rating: 4.9, distance: '3 km', openHours: '6:00 AM - 7:00 PM',
    lat: 8.76, lng: 38.98, aiReason: 'Perfect for your love of nature',
  },
  {
    id: '2', name: 'Traditional Coffee Ceremony Pavilion', type: 'cultural',
    description: 'Experience the ancient Ethiopian coffee ritual with freshly roasted beans and traditional music.',
    image: '/buna-ceremony.jpg', rating: 4.9, distance: 'On-site', openHours: '9:00 AM - 6:00 PM', phone: '+251 11 234 5678',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'Based on your cultural interests',
  },
  {
    id: '3', name: 'Kuriftu African Village Spa', type: 'spa',
    description: 'Rejuvenate with traditional Ethiopian honey treatments and aromatherapy.',
    image: '/spa-wellness.jpg', rating: 4.8, distance: 'On-site', openHours: '8:00 AM - 8:00 PM', phone: '+251 11 234 5679',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'You mentioned wanting relaxation',
  },
  {
    id: '4', name: 'Buna Restaurant', type: 'restaurant',
    description: 'Authentic Ethiopian cuisine featuring fresh injera, doro wat, and kitfo.',
    image: '/dining-hall.jpg', rating: 4.7, distance: 'On-site', openHours: '11:00 AM - 10:00 PM', phone: '+251 11 234 5680',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'Perfect for your love of spicy food',
  },
  {
    id: '5', name: 'Sunset Garden Viewpoint', type: 'nature',
    description: 'Breathtaking sunset views over the Ethiopian highlands from the resort terrace.',
    image: '/sunset-view.jpg', rating: 5.0, distance: 'On-site', openHours: 'Always open',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'Ideal for your evening relaxation',
  },
  {
    id: '6', name: 'Artisan Craft Village', type: 'shopping',
    description: 'Local artisans creating traditional Ethiopian crafts, textiles, and souvenirs.',
    image: '/culture-hero.jpg', rating: 4.6, distance: '1.2 km', openHours: '10:00 AM - 5:00 PM', phone: '+251 11 234 5681',
    lat: 8.74, lng: 38.96, aiReason: 'Great for your cultural curiosity',
  },
  {
    id: '7', name: 'Debre Zeyit (Bishoftu) Churches', type: 'heritage',
    description: 'Historic Orthodox churches with stunning murals and ancient religious artifacts.',
    image: '/culture-hero.jpg', rating: 4.8, distance: '4 km', openHours: '7:00 AM - 5:00 PM',
    lat: 8.73, lng: 38.98, aiReason: 'Rich in the history you appreciate',
  },
  {
    id: '8', name: 'Habesha Tej House', type: 'restaurant',
    description: 'Traditional honey wine bar serving authentic tej with local appetizers and live music.',
    image: '/dining-hall.jpg', rating: 4.5, distance: '2 km', openHours: '4:00 PM - 11:00 PM', phone: '+251 11 234 5682',
    lat: 8.75, lng: 38.95, aiReason: 'A unique evening experience',
  },
  {
    id: '9', name: 'Bishoftu Local Market', type: 'shopping',
    description: 'Vibrant market with handwoven textiles, spices, and traditional Ethiopian clothing.',
    image: '/culture-hero.jpg', rating: 4.7, distance: '3 km', openHours: '8:00 AM - 6:00 PM',
    lat: 8.75, lng: 38.94, aiReason: 'Discover authentic Ethiopian crafts',
  },
  {
    id: '10', name: 'Kuriftu Meditation Garden', type: 'spa',
    description: 'Tranquil garden space for yoga, meditation, and peaceful reflection.',
    image: '/pool-garden.jpg', rating: 4.9, distance: 'On-site', openHours: '6:00 AM - 8:00 PM',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'For your moments of tranquility',
  },
  {
    id: '11', name: 'Bird Watching Trail', type: 'nature',
    description: 'Observe endemic Ethiopian birds including the Abyssinian longclaw and black-winged lovebird.',
    image: '/ethiopian-landscape.jpg', rating: 4.6, distance: 'On-site', openHours: 'Best at dawn',
    lat: KURIFTU_LAT + 0.01, lng: KURIFTU_LNG + 0.02, aiReason: 'A serene nature experience',
  },
  {
    id: '12', name: 'Azmari Music Hall', type: 'cultural',
    description: 'Live performances of traditional azmari music with masinko and krar instruments.',
    image: '/culture-hero.jpg', rating: 4.8, distance: 'On-site', openHours: '7:00 PM - 11:00 PM', phone: '+251 11 234 5683',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'Experience the soul of Ethiopian music',
  },
];

const typeConfig: Record<string, { icon: string; color: string; bg: string }> = {
  all: { icon: '✨', color: 'text-[#D4A017]', bg: 'bg-[#D4A017]' },
  cultural: { icon: '🏛️', color: 'text-amber-600', bg: 'bg-amber-500' },
  restaurant: { icon: '🍽️', color: 'text-red-600', bg: 'bg-red-500' },
  spa: { icon: '💆', color: 'text-teal-600', bg: 'bg-teal-500' },
  nature: { icon: '🌿', color: 'text-green-600', bg: 'bg-green-500' },
  shopping: { icon: '🛍️', color: 'text-purple-600', bg: 'bg-purple-500' },
  heritage: { icon: '⛪', color: 'text-orange-600', bg: 'bg-orange-500' },
};

export default function ExploreTab() {
  const { user, isLoaded } = useUser();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [suggestions, setSuggestions] = useState<Location[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(true);

  // Fetch personalized suggestions based on user prefs
  useEffect(() => {
    if (!isLoaded) return;

    const userId = user?.id;
    const url = userId ? '/api/preferences' : null;

    if (!url) {
      // Not logged in — show all locations
      setSuggestions(allLocations);
      setLoadingSuggestions(false);
      return;
    }

    fetch(url)
      .then(r => r.json())
      .then(data => {
        const matched = allLocations.filter(loc => {
          const acts = (data.activities || []).map((a: string) => a.toLowerCase());
          const hobbies = (data.hobbies || []).map((h: string) => h.toLowerCase());
          const foods = (data.favorite_foods || []).map((f: string) => f.toLowerCase());

          // Match types to preferences
          if (loc.type === 'restaurant' && (foods.includes('spicy') || foods.includes('traditional') || foods.includes('comfort'))) return true;
          if (loc.type === 'spa' && (acts.includes('spa') || hobbies.includes('meditation') || hobbies.includes('reading'))) return true;
          if (loc.type === 'nature' && (acts.includes('nature') || hobbies.includes('hiking') || hobbies.includes('photography'))) return true;
          if (loc.type === 'cultural' && (acts.includes('cultural') || hobbies.includes('art'))) return true;
          if (loc.type === 'heritage' && (hobbies.includes('photography') || hobbies.includes('reading'))) return true;
          if (loc.type === 'shopping' && hobbies.includes('art')) return true;
          return false;
        });

        setSuggestions(matched.length > 0 ? matched : allLocations);
        setLoadingSuggestions(false);
      })
      .catch(() => {
        setSuggestions(allLocations);
        setLoadingSuggestions(false);
      });
  }, [isLoaded, user?.id]);

  const filteredLocations = activeFilter === 'all'
    ? suggestions
    : suggestions.filter(l => l.type === activeFilter);

  const mapLocation = selectedLocation || { name: 'Kuriftu African Village Bishoftu, Ethiopia', lat: KURIFTU_LAT, lng: KURIFTU_LNG };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-6 md:px-8 border-b border-border bg-white">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#4B3425] mb-2">
          Explore & Discover
        </h1>
        <p className="text-muted-foreground">
          AI-personalized guide to experiences around Kuriftu African Village
        </p>
      </div>

      {/* Map Section */}
      <div className="relative w-full h-[45vh] md:h-[55vh] bg-muted overflow-hidden">
        <iframe
          src={`https://maps.google.com/maps?q=${mapLocation.lat},${mapLocation.lng}&t=m&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%" height="100%" style={{ border: 0 }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full" title="Kuriftu Resort Map"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow text-sm font-medium text-[#4B3425]">
          📍 {selectedLocation?.name || 'Kuriftu African Village, Bishoftu'}
        </div>
        {selectedLocation && (
          <button
            onClick={() => setSelectedLocation(null)}
            className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow text-sm text-muted-foreground hover:text-foreground"
          >
            Reset view
          </button>
        )}
      </div>

      {/* AI Suggestion Card */}
      <div className="mx-4 md:mx-8 -mt-8 relative z-10">
        <div className="bg-gradient-to-r from-[#4B3425] to-[#4B3425]/80 rounded-2xl p-5 text-white shadow-2xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">Emama recommends</h3>
              <p className="text-white/80 text-sm">
                {isLoaded && user
                  ? `Based on your preferences, I've curated experiences just for you, ${user.firstName || 'guest'}!`
                  : 'Discover the best experiences around Kuriftu. Sign in for personalized picks!'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 md:px-8 mt-6">
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === type
                  ? `${cfg.bg} text-white shadow`
                  : 'bg-white text-foreground hover:bg-muted border border-border'
              }`}
            >
              {cfg.icon} {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestions Grid */}
      <div className="px-4 md:px-8 py-8">
        {loadingSuggestions ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
                <div className="h-36 bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-8 bg-muted rounded w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No suggestions match this filter. Try a different type.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredLocations.map((location) => (
              <div key={location.id} className="bg-white rounded-xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300 text-left group">
                <div className="relative h-36">
                  <Image src={location.image} alt={location.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3">
                    <span className={`${typeConfig[location.type]?.bg || 'bg-gray-500'} text-white text-xs px-2 py-1 rounded-full`}>
                      {typeConfig[location.type]?.icon} {location.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#4B3425] mb-1 group-hover:text-[#D4A017] transition-colors">{location.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{location.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-[#D4A017] fill-[#D4A017]" />
                      <span className="font-medium">{location.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{location.distance} · {location.openHours}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setSelectedLocation(location)}
                      className="flex-1 bg-[#D4A017] hover:bg-[#D4A017]/90 text-white"
                      size="sm"
                    >
                      <MapPin className="w-4 h-4 mr-1" /> Go there
                    </Button>
                    <a
                      href={`https://www.google.com/maps/dir/${KURIFTU_LAT},${KURIFTU_LNG}/${location.lat},${location.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:bg-muted transition-colors"
                      aria-label="Get directions"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
