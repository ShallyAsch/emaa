'use client';

import React from 'react';
import Image from 'next/image';
import { mockGuest, mockResort } from '@/lib/mockData';
import MoodButtons from './MoodButtons';
import ScrollableEvents from './ScrollableEvents';
import SuggestionsForYou from './SuggestionsForYou';
import MemoryBox from './MemoryBox';
import HighlightsSection from './HighlightsSection';
import QuickStats from './QuickStats';

export default function HomeDashboard() {
  const roomStatus = [
    { id: '1', task: 'Room Cleaned', completed: true, icon: '✓' },
    { id: '2', task: 'Coffee Ready', completed: true, icon: '☕' },
    { id: '3', task: 'Amenities Set', completed: false, icon: '🎁' },
    { id: '4', task: 'Welcome Call', completed: false, icon: '📞' },
  ];

  return (
    <div className="w-full min-h-screen bg-background">
      {/* ===== HERO SECTION ===== */}
      <section className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden">
        <Image
          src="/buna-ceremony.jpg"
          alt="Welcome home"
          fill
          className="object-cover"
          priority
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-2">
          <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl">
            Welcome home, {mockGuest.name} ❤️
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light drop-shadow-lg">
            You are family here at {mockResort.name}
          </p>
          <p className="text-white/70 text-sm md:text-base drop-shadow">
            ምርቱ ላንተ • The Best for You
          </p>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <div className="px-4 md:px-6 py-8 space-y-12 max-w-7xl mx-auto pb-32">
        {/* Quick Stats */}
        <QuickStats
          weather={mockResort.currentWeather}
          sunsetTime={mockResort.timeUntilSunset}
        />

        {/* Scrollable Events */}
        <ScrollableEvents />

        {/* Suggestions For You */}
        <SuggestionsForYou />

        {/* Room Preparation Summary */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              We&apos;re Preparing Your Home
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
              Everything is ready for your comfort
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {roomStatus.map((status) => (
              <div
                key={status.id}
                className={`glass rounded-xl p-4 text-center shadow-warm hover:shadow-warm-md transition-smooth cursor-pointer ${
                  status.completed ? 'border border-green-400/30' : ''
                }`}
              >
                <div className="text-3xl mb-2">{status.icon}</div>
                <p className="text-xs font-semibold text-foreground">{status.task}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {status.completed ? 'Ready ✓' : 'In Progress'}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => (window.location.href = '/comfort')}
              className="text-sm text-accent hover:text-accent/80 font-semibold underline"
            >
              View Full Details →
            </button>
          </div>
        </section>

        {/* Mood Buttons */}
        <MoodButtons />

        {/* Full-Width Kuriftu Photo */}
        <section className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-warm">
          <Image
            src="/kuriftu-resort.jpg"
            alt="Kuriftu African Village"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-8">
            <h3 className="text-white font-serif text-3xl md:text-4xl font-bold">
              Kuriftu African Village
            </h3>
            <p className="text-white/80 text-base">Your sanctuary of warmth and culture</p>
          </div>
        </section>

        {/* Memory Box */}
        <MemoryBox />

        {/* Highlights Section */}
        <HighlightsSection />

        {/* Need Help Section */}
        <section className="glass rounded-2xl p-8 md:p-10 text-center shadow-warm">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
            Need Help?
          </h3>
          <p className="text-foreground/70 mb-6">
            Ask <span className="font-semibold">Emama Zinashe</span>. She knows everything. ❤️
          </p>
          <p className="text-sm text-muted-foreground">
            Tap the chat button in the corner to ask any questions
          </p>
        </section>

        {/* Testimonials */}
        <section className="space-y-8 pt-4">
          <div className="text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
              What Our Guests Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-8 shadow-warm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">😊</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Returning Guest</p>
                  <p className="text-xs text-muted-foreground">5th visit</p>
                </div>
              </div>
              <p className="text-foreground/70 italic text-sm leading-relaxed">
                "Every return feels like coming home. The warmth, the culture, the hospitality—this is exactly what I need."
              </p>
            </div>

            <div className="glass rounded-2xl p-8 shadow-warm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">❤️</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">New Visitor</p>
                  <p className="text-xs text-muted-foreground">First time</p>
                </div>
              </div>
              <p className="text-foreground/70 italic text-sm leading-relaxed">
                "No login, no hassle – just instant magic. This is how hospitality should feel in 2025."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
