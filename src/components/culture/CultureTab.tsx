'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mockCultureExperiences, mockGuest } from '@/src/lib/mockData';
import CultureExperienceCard from './CultureExperienceCard';
import { CultureExperience } from '@/src/lib/types';

export default function CultureTab() {
  const router = useRouter();
  const [selectedExperience, setSelectedExperience] = useState<CultureExperience | null>(null);

  const handleParticipate = (experience: CultureExperience) => {
    // Store the selected experience in sessionStorage to pass to the Today page
    sessionStorage.setItem('selectedCultureExperience', JSON.stringify(experience));
    
    // Navigate to Today tab
    router.push('/today');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
        <Image
          src="/culture-hero.jpg"
          alt="Ethiopian cultural experiences"
          fill
          className="object-cover"
          priority
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />

        {/* Hero Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-balance">
            Experience Ethiopia
          </h1>
          <p className="text-base md:text-xl lg:text-2xl text-white/90 max-w-2xl font-light text-balance">
            Like Home — Discover traditions, stories, and moments made just for you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-1 bg-accent rounded-full" />
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              Cultural Experiences Awaiting You
            </h2>
          </div>
          <p className="text-foreground/70 max-w-3xl leading-relaxed">
            Each experience is personalized based on your preferences and past moments with us.
            From coffee ceremonies to traditional dances, immerse yourself in the heart of
            Ethiopian culture through our curated selection.
          </p>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {mockCultureExperiences.map((experience) => (
            <CultureExperienceCard
              key={experience.id}
              experience={experience}
              onParticipate={handleParticipate}
            />
          ))}
        </div>

        {/* Personalization Info Section */}
        <section className="mt-16 md:mt-20 glass rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left: Text Content */}
            <div>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-4">
                Your Personal Journey
              </h3>
              <p className="text-foreground/80 mb-4 leading-relaxed">
                We remember you, {mockGuest.name}. Your preferences, your dietary needs, your
                past experiences with us. Every recommendation above is tailored specifically to
                make your stay feel truly personal and deeply meaningful.
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground/70">
                    Based on your vegan preferences and love for cultural immersion
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground/70">
                    Curated from {mockGuest.familyProfile.previousVisits} memorable visits
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground/70">
                    Designed to create new moments and stories together
                  </span>
                </li>
              </ul>
            </div>

            {/* Right: Decorative Element */}
            <div className="hidden md:block">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-warm">
                <Image
                  src="/buna-ceremony.jpg"
                  alt="Ethiopian family gathering"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="mt-16 text-center">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-6">
            Ready to Experience Ethiopian Culture?
          </h3>
          <p className="text-foreground/70 max-w-2xl mx-auto mb-8">
            Each experience can be booked directly from the Today tab. Our team will prepare
            everything perfectly, just the way you love it.
          </p>
          <button
            onClick={() => router.push('/today')}
            className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-4 rounded-lg transition-smooth shadow-warm hover:shadow-warm-md text-lg"
          >
            View Your Schedule
          </button>
        </section>
      </div>
    </div>
  );
}
