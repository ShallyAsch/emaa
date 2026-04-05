'use client';

import React from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import EmamaAssistant from '@/src/components/shared/EmamaAssistant';

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
      <div className="relative w-full h-[35vh] md:h-[45vh] overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943.435790406834!2d38.99808387588147!3d8.78241519126938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8cba17a8c725%3A0x24fb2798676731e7!2sKuriftu%20Resort%20%26%20Spa%20Bishoftu!5e0!3m2!1sen!2set!4v1712350000000!5m2!1sen!2set"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
          title="Kuriftu Resort Map"
        />
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-md shadow text-xs font-medium text-[#4B3425]">
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


      {/* Emama Zinashe Floating AI Assistant */}
      <EmamaAssistant page="explore" />
    </div>
  );
}