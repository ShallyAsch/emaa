'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { MapPin, Star, Clock, Sparkles, ExternalLink } from 'lucide-react';

// Kuriftu African Village, Bishoftu — verified GPS coordinates
const KURIFTU_LAT = 8.7503;
const KURIFTU_LNG = 38.9775;

interface Facility {
  id: string;
  title: string;
  description: string;
  image: string;
}

const facilities: Facility[] = [
  { id: '1', title: 'Dining & Restaurants', description: 'Includes 1963 Restaurant and Summit Grill, offering Pan-African and international cuisine with scenic views.', image: '/dining-hall.jpg' },
  { id: '2', title: 'Lounge & Bar', description: '1963 Lounge provides a relaxed atmosphere for drinks, music, and socializing.', image: '/coffee-detail.jpg' },
  { id: '3', title: 'Spa & Wellness', description: 'Kuriftu Spa, Moroccan Hammam, sauna, and steam rooms focused on relaxation and rejuvenation.', image: '/spa-wellness.jpg' },
  { id: '4', title: 'Fitness & Pool', description: 'Modern gym facilities alongside a calm indoor swimming pool for wellness and leisure.', image: '/pool-garden.jpg' },
  { id: '5', title: 'African Village Villas', description: '54 culturally themed tukul-style villas, each representing a different African country.', image: '/culture-hero.jpg' },
  { id: '6', title: 'Events & Conference Spaces', description: 'Open-air event areas and indoor meeting rooms for weddings, celebrations, and business functions.', image: '/ethiopian-landscape.jpg' },
];

// Leaflet map component (client-only)
function ResortMap() {
  const [Loaded, setLoaded] = useState(false);
  const [LeafletMap, setLeafletMap] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
    ]).then(([mod, L]) => {
      // Fix default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });
      setLeafletMap(mod);
      setLoaded(true);
    });
  }, []);

  if (!Loaded || !LeafletMap) {
    return <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">Loading map...</div>;
  }

  const { MapContainer, TileLayer, Marker, Popup } = LeafletMap;

  return (
    <MapContainer
      center={[KURIFTU_LAT, KURIFTU_LNG]}
      zoom={20}
      scrollWheelZoom={true}
      className="w-full h-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      />
      <Marker position={[KURIFTU_LAT, KURIFTU_LNG]}>
        <Popup>
          <strong>Kuriftu African Village</strong><br />
          Bishoftu (Debre Zeit), Ethiopia
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default function ExploreTab() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="px-4 py-5 md:px-8 border-b border-border bg-white">
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-[#4B3425] mb-1">
          Explore & Discover
        </h1>
        <p className="text-muted-foreground text-sm">
          Discover everything Kuriftu African Village has to offer
        </p>
      </div>

      {/* Satellite Map */}
      <div className="relative w-full h-[35vh] md:h-[45vh] overflow-hidden border-b border-border">
        <ResortMap />
        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur px-2.5 py-1 rounded-md shadow text-xs font-medium text-[#4B3425] z-[1000]">
          📍 Kuriftu African Village, Bishoftu
        </div>
      </div>

      {/* AI Recommendation Card */}
      <div className="px-4 md:px-8 mt-4">
        <div className="bg-gradient-to-r from-[#4B3425] to-[#4B3425]/80 rounded-xl p-3.5 flex items-center gap-3 text-white shadow-lg">
          <Sparkles className="w-5 h-5 text-[#D4A017] flex-shrink-0" />
          <p className="text-white/90 text-sm leading-snug">
            Explore the resort&apos;s world-class facilities — from Pan-African dining to serene spa retreats.
          </p>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="px-4 md:px-8 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {facilities.map(facility => (
            <div key={facility.id} className="bg-white rounded-xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300 group">
              <div className="relative h-44">
                <Image src={facility.image} alt={facility.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[#4B3425] text-base mb-2 group-hover:text-[#D4A017] transition-colors">{facility.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{facility.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
