'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HighlightsSection() {
  return (
    <section className="space-y-8 px-4 md:px-6 py-8">
      {/* Wanna Explore Section */}
      <div className="space-y-4">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Wanna Explore?
        </h2>
        <p className="text-muted-foreground">
          You can visit and explore places in this village. Discover hidden gems, beautiful spots, and cultural landmarks.
        </p>
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-warm">
          <Image
            src="/explore-map.jpg"
            alt="Explore the village map"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <Link
          href="/explore"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-lg transition-smooth shadow-warm"
        >
          Explore
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Events You've Registered To Section */}
      <div className="space-y-4">
        <p className="text-muted-foreground font-medium">The Events You&apos;ve Registered To:</p>
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-warm">
          <Image
            src="/schedule-hero.jpg"
            alt="My Schedule"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <Link
          href="/schedule"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-lg transition-smooth shadow-warm"
        >
          View My Schedule
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Gebeta Section */}
      <div className="space-y-4">
        <p className="text-muted-foreground font-medium">
          Need Assistance On Your Meal? Emama knows everything.....
        </p>
        <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden shadow-warm">
          <Image
            src="/gebeta-hero.jpg"
            alt="Gebeta - Ethiopian cuisine"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        <Link
          href="/gebeta"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-lg transition-smooth shadow-warm"
        >
          Go to Gebeta
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
