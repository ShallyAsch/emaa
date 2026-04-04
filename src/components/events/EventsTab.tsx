'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Share2, Bell, Heart, Zap } from 'lucide-react';
import ExperienceModal from '@/src/components/shared/ExperienceModal';
import { mockActivities } from '@/src/lib/mockData';

export default function EventsTab() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof mockActivities)[0] | null>(null);
  const [selectedModal, setSelectedModal] = useState<'event' | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [savedEvents, setSavedEvents] = useState<Set<string>>(new Set());
  const [notificationEnabled, setNotificationEnabled] = useState<Set<string>>(new Set());

  // Filter cultural events and other events
  const allEvents = mockActivities;
  const categories = [
    { id: 'all', label: 'All Events', icon: '✨' },
    { id: 'cultural', label: 'Cultural', icon: '🎭' },
    { id: 'wellness', label: 'Wellness', icon: '🧘' },
    { id: 'evening', label: 'Evening', icon: '🌙' },
    { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  ];

  const filteredEvents =
    activeFilter === 'all'
      ? allEvents
      : allEvents.filter((e) => e.type.toLowerCase().includes(activeFilter.toLowerCase()));

  const toggleSave = (id: string) => {
    setSavedEvents((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const toggleNotification = (id: string) => {
    setNotificationEnabled((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  const handleTertTert = (event: typeof mockActivities[0]) => {
    setSelectedEvent(event);
    setSelectedModal('event');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Visually Exciting */}
      <section className="relative w-full h-72 md:h-96 lg:h-[450px] overflow-hidden group">
        <Image
          src="/dining-hall.jpg"
          alt="Events at Your Home"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/40 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Your Home Awaits</span>
          </div>
          <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl text-balance">
            Events at Your Home
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light drop-shadow-lg max-w-2xl">
            Everything happening during your stay, curated just for you
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-12 space-y-12 max-w-7xl mx-auto">
        {/* Category Filters */}
        <section className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-2xl font-bold text-primary">Filter by Interest</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-5 py-2 rounded-full font-medium transition-smooth flex items-center gap-2 ${
                  activeFilter === cat.id
                    ? 'bg-accent text-primary shadow-warm'
                    : 'bg-muted/50 text-foreground hover:bg-muted'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* All Events Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
                {activeFilter === 'all' ? 'All Experiences' : categories.find((c) => c.id === activeFilter)?.label}
              </h2>
              <p className="text-muted-foreground mt-1">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'experience' : 'experiences'} available
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const isSaved = savedEvents.has(event.id);
              const isNotified = notificationEnabled.has(event.id);
              const isCultural = event.type === 'cultural' || event.type === 'ceremony';
              const isSoon = parseInt(event.time.split(':')[0]) === new Date().getHours() + 1;

              return (
                <div
                  key={event.id}
                  className="glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={event.image || '/culture-hero.jpg'}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                      {event.type}
                    </div>

                    {/* Time Badge */}
                    {isSoon && (
                      <div className="absolute top-3 right-3 bg-red-500/80 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm flex items-center gap-1 animate-pulse">
                        ⏰ Soon
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => toggleSave(event.id)}
                        className="p-2 bg-white/80 hover:bg-white rounded-full transition-smooth backdrop-blur-sm"
                        aria-label="Save event"
                      >
                        <Heart
                          className={`w-5 h-5 ${
                            isSaved ? 'fill-accent text-accent' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                      <button
                        className="p-2 bg-white/80 hover:bg-white rounded-full transition-smooth backdrop-blur-sm"
                        aria-label="Share event"
                      >
                        <Share2 className="w-5 h-5 text-muted-foreground" />
                      </button>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-lg text-primary flex-1">{event.title}</h3>
                      <span className="text-accent font-bold text-sm whitespace-nowrap">{event.time}</span>
                    </div>

                    <p className="text-sm text-foreground/70 line-clamp-2">{event.description}</p>

                    <div className="flex gap-2 text-xs text-muted-foreground flex-wrap">
                      <span className="bg-secondary/10 px-2 py-1 rounded">{event.duration}</span>
                      <span className="bg-secondary/10 px-2 py-1 rounded">
                        {event.currentGuests}/{event.maxGuests} guests
                      </span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {isCultural ? (
                        <button
                          onClick={() => handleTertTert(event)}
                          className="flex-1 bg-accent hover:bg-accent/90 text-primary font-semibold py-2 rounded-lg transition-smooth text-sm flex items-center justify-center gap-2 group/btn"
                        >
                          Tert Tert
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 rounded-lg transition-smooth text-sm flex items-center justify-center gap-2 group/btn">
                          Join
                          <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      )}
                      <button
                        onClick={() => toggleNotification(event.id)}
                        className={`px-4 py-2 rounded-lg transition-smooth flex items-center justify-center ${
                          isNotified
                            ? 'bg-accent/20 text-accent'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted'
                        }`}
                        aria-label="Notify me"
                      >
                        <Bell className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No events match this filter</p>
              <button
                onClick={() => setActiveFilter('all')}
                className="mt-4 text-accent font-semibold hover:underline"
              >
                View all events
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
            Need Help Choosing?
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            <span className="font-semibold text-accent">Emama Zinashe</span> can recommend the perfect experience tailored just for you
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-smooth"
          >
            Ask Emama for Recommendations
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>
      </div>

      {/* Event Modal */}
      {selectedEvent && selectedModal === 'event' && (
        <ExperienceModal
          isOpen={true}
          onClose={() => {
            setSelectedEvent(null);
            setSelectedModal(null);
          }}
          title={selectedEvent.title}
          description={selectedEvent.description}
          historicalContext={`${selectedEvent.duration} • ${selectedEvent.currentGuests}/${selectedEvent.maxGuests} guests • Starts at ${selectedEvent.time}`}
          closingNote="This is part of your home story ❤️"
        />
      )}
    </div>
  );
}
