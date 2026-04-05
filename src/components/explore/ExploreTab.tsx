'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { MapPin, Star, Clock, Sparkles, ExternalLink } from 'lucide-react';

// Kuriftu African Village, Bishoftu — verified GPS coordinates
const KURIFTU_LAT = 8.7503;
const KURIFTU_LNG = 38.9775;

interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
  image: string;
  rating: number;
  distance: string;
  openHours: string;
  mapsUrl: string;
  aiReason?: string;
}

// Real places around Kuriftu African Village, Bishoftu (Debre Zeit) — verified Google Maps links
const allLocations: Location[] = [
  {
    id: '1', name: 'Lake Hora', type: 'nature',
    description: 'The iconic crater lake right next to Kuriftu, famous for hippo watching and sunset boat rides.',
    image: '/ethiopian-landscape.jpg', rating: 4.9, distance: '0.5 km', openHours: '6:00 AM – 7:00 PM',
    mapsUrl: 'https://maps.app.goo.gl/fdTmjhBTdMrNZcfu6', aiReason: 'Perfect for your love of nature',
  },
  {
    id: '2', name: 'St Michael Church', type: 'heritage',
    description: 'Historic Orthodox church with stunning murals and ancient religious artifacts, perched on a hilltop overlooking Bishoftu.',
    image: '/culture-hero.jpg', rating: 4.8, distance: '3 km', openHours: '7:00 AM – 5:00 PM',
    mapsUrl: 'https://maps.app.goo.gl/79XiqjXf96FEUuWQ7', aiReason: 'Rich in the history you appreciate',
  },
  {
    id: '3', name: 'Bishoftu Market (Gulit)', type: 'shopping',
    description: 'Open-air market with fresh produce, handwoven shawls, spices, and traditional Ethiopian crafts.',
    image: '/culture-hero.jpg', rating: 4.5, distance: '2.5 km', openHours: '7:00 AM – 5:00 PM',
    mapsUrl: 'https://maps.app.goo.gl/nAUdd3QFryiyH5jr6', aiReason: 'Discover authentic Ethiopian crafts',
  },
  {
    id: '4', name: 'Tej Bet', type: 'restaurant',
    description: 'Local honey wine house serving traditional Ethiopian tej with live azmari music in the evenings.',
    image: '/dining-hall.jpg', rating: 4.6, distance: '1.8 km', openHours: '4:00 PM – 11:00 PM',
    mapsUrl: 'https://maps.app.goo.gl/q4LKePUajEK8gnk5A', aiReason: 'A unique evening experience',
  },
  {
    id: '5', name: 'Lake Bishoftu', type: 'nature',
    description: 'Scenic lakeside walking path around Lake Bishoftu, perfect for morning jogs and bird watching.',
    image: '/ethiopian-landscape.jpg', rating: 4.7, distance: '1.2 km', openHours: '5:00 AM – 7:00 PM',
    mapsUrl: 'https://maps.app.goo.gl/dBex4c3bqz2jHZZWA', aiReason: 'A serene nature experience',
  },
  {
    id: '6', name: 'Bishoftu Town Center', type: 'shopping',
    description: 'Central Bishoftu with cafes, shops, and the weekly local market. A short walk from the resort.',
    image: '/culture-hero.jpg', rating: 4.4, distance: '2 km', openHours: '8:00 AM – 8:00 PM',
    mapsUrl: 'https://www.google.com/maps/search/Bishoftu+Town+Center+Ethiopia', aiReason: 'Explore the local scene',
  },
];

const typeConfig: Record<string, { icon: string; bg: string }> = {
  all: { icon: '✨', bg: 'bg-[#D4A017]' },
  nature: { icon: '🌿', bg: 'bg-green-500' },
  restaurant: { icon: '🍽️', bg: 'bg-red-500' },
  shopping: { icon: '🛍️', bg: 'bg-purple-500' },
  heritage: { icon: '⛪', bg: 'bg-orange-500' },
};

export default function ExploreTab() {
  const { user, isLoaded } = useUser();
  const [activeFilter, setActiveFilter] = useState('all');
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  // Personalize locations based on user preferences from DB
  useEffect(() => {
    if (!isLoaded) return;

    const userId = user?.id;
    if (!userId) {
      setLocations(allLocations);
      setLoading(false);
      return;
    }

    fetch('/api/preferences')
      .then(r => r.json())
      .then(data => {
        const acts = (data.activities || []).map((a: string) => a.toLowerCase());
        const hobbies = (data.hobbies || []).map((h: string) => h.toLowerCase());
        const foods = (data.favorite_foods || []).map((f: string) => f.toLowerCase());
        const personality = (data.personality_type || '').toLowerCase();

        const matched = allLocations.filter(loc => {
          switch (loc.type) {
            case 'restaurant':
              return foods.some(f => ['spicy', 'traditional', 'comfort', 'sharing'].includes(f)) ||
                     personality.includes('adventurer');
            case 'nature':
              return acts.includes('nature') || hobbies.includes('hiking') || hobbies.includes('photography') ||
                     personality.includes('adventurer') || personality.includes('explorer');
            case 'heritage':
              return hobbies.includes('photography') || hobbies.includes('reading') ||
                     personality.includes('explorer');
            case 'shopping':
              return hobbies.includes('art') || hobbies.includes('cooking') ||
                     personality.includes('social');
            default:
              return true;
          }
        });

        setLocations(matched.length > 0 ? matched : allLocations);
        setLoading(false);
      })
      .catch(() => {
        setLocations(allLocations);
        setLoading(false);
      });
  }, [isLoaded, user?.id]);

  const filtered = activeFilter === 'all' ? locations : locations.filter(l => l.type === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-5 md:px-8 border-b border-border bg-white">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#4B3425] mb-1">
          Explore & Discover
        </h1>
        <p className="text-muted-foreground text-sm">
          AI-personalized guide to experiences around Kuriftu African Village
        </p>
      </div>

      {/* Satellite Map */}
      <div className="relative w-full h-[35vh] md:h-[45vh] bg-muted overflow-hidden">
        <iframe
          src={`https://maps.google.com/maps?q=${KURIFTU_LAT},${KURIFTU_LNG}&t=k&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%" height="100%" style={{ border: 0 }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full" title="Kuriftu Resort Satellite View"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md shadow text-xs font-medium text-[#4B3425]">
          📍 Kuriftu African Village, Bishoftu
        </div>
      </div>

      {/* AI Recommendation Card — Compact */}
      <div className="px-4 md:px-8 -mt-4 relative z-10">
        <div className="bg-gradient-to-r from-[#4B3425] to-[#4B3425]/80 rounded-xl p-3.5 flex items-center gap-3 text-white shadow-lg">
          <Sparkles className="w-5 h-5 text-[#D4A017] flex-shrink-0" />
          <p className="text-white/90 text-sm leading-snug">
            {isLoaded && user
              ? `Curated for you, ${user.firstName || user?.username || 'guest'} — based on your interests.`
              : 'Explore real places around Kuriftu. Sign in for personalized picks!'}
          </p>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="px-4 md:px-8 mt-4">
        <div className="flex flex-wrap gap-2">
          {Object.entries(typeConfig).map(([type, cfg]) => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
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

      {/* Locations Grid */}
      <div className="px-4 md:px-8 py-6">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow animate-pulse">
                <div className="h-36 bg-muted" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-8 bg-muted rounded w-full mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <MapPin className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No places match this filter</p>
            <button onClick={() => setActiveFilter('all')} className="mt-2 text-[#D4A017] hover:underline text-sm">
              Show all places
            </button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map(loc => (
              <div key={loc.id} className="bg-white rounded-xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300 group">
                <div className="relative h-36">
                  <Image src={loc.image} alt={loc.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`${typeConfig[loc.type]?.bg || 'bg-gray-500'} text-white text-[11px] px-2 py-0.5 rounded-full font-medium`}>
                      {typeConfig[loc.type]?.icon} {loc.type}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-[#4B3425] text-sm mb-0.5 group-hover:text-[#D4A017] transition-colors">{loc.name}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2.5">{loc.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-[#D4A017] fill-[#D4A017]" />
                      <span className="text-xs font-medium">{loc.rating}</span>
                    </div>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {loc.distance} · {loc.openHours}
                    </span>
                  </div>
                  <a
                    href={loc.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#D4A017] hover:bg-[#D4A017]/90 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Go there
                    <ExternalLink className="w-3 h-3 ml-1 opacity-70" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
