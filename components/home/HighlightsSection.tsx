'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Calendar } from 'lucide-react';

export default function HighlightsSection() {
  return (
    <section className="space-y-6 px-4 md:px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Discover the Resort */}
        <Link
          href="#map"
          className="group relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth"
        >
          <Image
            src="/kuriftu-resort.jpg"
            alt="Discover the Resort"
            fill
            className="object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 text-accent mb-3">
              <MapPin className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Explore</span>
            </div>
            <h3 className="text-white font-serif text-3xl font-bold mb-2">
              Discover the Resort
            </h3>
            <p className="text-white/80 text-sm">
              Explore our grounds, amenities, and hidden gems
            </p>
          </div>
        </Link>

        {/* My Schedule */}
        <Link
          href="/today"
          className="group relative h-64 md:h-72 rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth"
        >
          <Image
            src="/pool-garden.jpg"
            alt="My Schedule"
            fill
            className="object-cover group-hover:scale-105 transition-smooth"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute inset-0 flex flex-col justify-end p-8">
            <div className="flex items-center gap-2 text-accent mb-3">
              <Calendar className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Plan</span>
            </div>
            <h3 className="text-white font-serif text-3xl font-bold mb-2">
              My Schedule
            </h3>
            <p className="text-white/80 text-sm">
              View your itinerary and book experiences
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
