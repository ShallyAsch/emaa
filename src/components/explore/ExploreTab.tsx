'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { MapPin, Star, Clock, Sparkles } from 'lucide-react';

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
  lat: number;
  lng: number;
  aiReason?: string;
}

// Real places around Kuriftu African Village, Bishoftu (Debre Zeit)
const allLocations: Location[] = [
  {
    id: '1', name: 'Lake Hora', type: 'nature',
    description: 'The iconic crater lake right next to Kuriftu, famous for hippo watching and sunset boat rides.',
    image: '/ethiopian-landscape.jpg', rating: 4.9, distance: '0.5 km', openHours: '6:00 AM – 7:00 PM',
    lat: 8.7520, lng: 38.9800, aiReason: 'Perfect for your love of nature',
  },
  {
    id: '2', name: 'Kuriftu Coffee Ceremony', type: 'cultural',
    description: 'Daily traditional Ethiopian coffee roasting and serving at the resort pavilion.',
    image: '/buna-ceremony.jpg', rating: 4.9, distance: 'On-site', openHours: '9:00 AM – 6:00 PM',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'Based on your cultural interests',
  },
  {
    id: '3', name: 'Kuriftu Spa & Wellness', type: 'spa',
    description: 'Full-service spa with Ethiopian honey treatments, massage, and aromatherapy.',
    image: '/spa-wellness.jpg', rating: 4.8, distance: 'On-site', openHours: '8:00 AM – 8:00 PM',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'You mentioned wanting relaxation',
  },
  {
    id: '4', name: 'Kuriftu Restaurant', type: 'restaurant',
    description: 'Main dining hall serving authentic Ethiopian cuisine — injera, doro wat, kitfo, and more.',
    image: '/dining-hall.jpg', rating: 4.7, distance: 'On-site', openHours: '7:00 AM – 10:00 PM',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'Perfect for your love of traditional food',
  },
  {
    id: '5', name: 'Kuriftu Garden Terrace', type: 'nature',
    description: 'Manicured garden paths with panoramic views of Lake Hora and the surrounding highlands.',
    image: '/pool-garden.jpg', rating: 5.0, distance: 'On-site', openHours: 'Always open',
    lat: KURIFTU_LAT + 0.001, lng: KURIFTU_LNG + 0.001, aiReason: 'Ideal for your evening relaxation',
  },
  {
    id: '6', name: 'Bishoftu Market (Gulit)', type: 'shopping',
    description: 'Open-air market with fresh produce, handwoven shawls, spices, and traditional crafts.',
    image: '/culture-hero.jpg', rating: 4.5, distance: '2.5 km', openHours: '7:00 AM – 5:00 PM',
    lat: 8.7510, lng: 38.9720, aiReason: 'Discover authentic Ethiopian crafts',
  },
  {
    id: '7', name: 'Debre Sina Michael Church', type: 'heritage',
    description: 'Historic rock-hewn Orthodox church dating back centuries, perched on a hilltop overlooking Bishoftu.',
    image: '/culture-hero.jpg', rating: 4.8, distance: '3 km', openHours: '7:00 AM – 5:00 PM',
    lat: 8.7480, lng: 38.9810, aiReason: 'Rich in the history you appreciate',
  },
  {
    id: '8', name: 'Tej Bet (Honey Wine House)', type: 'restaurant',
    description: 'Local tej house serving traditional Ethiopian honey wine with live azmari music in the evenings.',
    image: '/dining-hall.jpg', rating: 4.6, distance: '1.8 km', openHours: '4:00 PM – 11:00 PM',
    lat: 8.7490, lng: 38.9700, aiReason: 'A unique evening experience',
  },
  {
    id: '9', name: 'Lake Bishoftu Walking Trail', type: 'nature',
    description: 'Scenic lakeside walking path around Lake Bishoftu, perfect for morning jogs and bird watching.',
    image: '/ethiopian-landscape.jpg', rating: 4.7, distance: '1.2 km', openHours: '5:00 AM – 7:00 PM',
    lat: 8.7560, lng: 38.9750, aiReason: 'A serene nature experience',
  },
  {
    id: '10', name: 'Kuriftu Pool & Lounge', type: 'spa',
    description: 'Resort swimming pool with sun loungers, poolside bar, and Lake Hora views.',
    image: '/pool-garden.jpg', rating: 4.9, distance: 'On-site', openHours: '6:00 AM – 9:00 PM',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'For your moments of tranquility',
  },
  {
    id: '11', name: 'Azmari Music Night', type: 'cultural',
    description: 'Live traditional Ethiopian music with masinko and krar performances at the resort lounge.',
    image: '/culture-hero.jpg', rating: 4.8, distance: 'On-site', openHours: '7:00 PM – 11:00 PM',
    lat: KURIFTU_LAT, lng: KURIFTU_LNG, aiReason: 'Experience the soul of Ethiopian music',
  },
  {
    id: '12', name: 'Bishoftu Town Center', type: 'shopping',
    description: 'Central Bishoftu with cafes, shops, and the weekly local market. A short walk from the resort.',
    image: '/culture-hero.jpg', rating: 4.4, distance: '2 km', openHours: '8:00 AM – 8:00 PM',
    lat: 8.7515, lng: 38.9700, aiReason: 'Explore the local scene',
  },
];

const typeConfig: Record<string, { icon: string; bg: string }> = {
  all: { icon: '✨', bg: 'bg-[#D4A017]' },
  cultural: { icon: '🏛️', bg: 'bg-amber-500' },
  restaurant: { icon: '🍽️', bg: 'bg-red-500' },
  spa: { icon: '💆', bg: 'bg-teal-500' },
  nature: { icon: '🌿', bg: 'bg-green-500' },
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
            case 'spa':
              return acts.includes('spa') || hobbies.includes('meditation') || hobbies.includes('reading') ||
                     personality.includes('relaxer');
            case 'nature':
              return acts.includes('nature') || hobbies.includes('hiking') || hobbies.includes('photography') ||
                     personality.includes('adventurer') || personality.includes('explorer');
            case 'cultural':
              return acts.includes('cultural') || hobbies.includes('art') ||
                     personality.includes('explorer') || personality.includes('social');
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
                    href={`https://www.google.com/maps/search/?api=1&query=${loc.lat},${loc.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#D4A017] hover:bg-[#D4A017]/90 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" /> Go there
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
