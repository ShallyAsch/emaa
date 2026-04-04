'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  time: string;
  description: string;
  color: string;
  image: string;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Buna Ceremony',
    time: '3:00 PM',
    description: 'Join us for traditional coffee',
    color: 'bg-amber-100',
    image: '/icons/coffee-ceremony.jpg',
  },
  {
    id: '2',
    title: 'Dinner Service',
    time: '6:30 PM',
    description: 'Family-style dining',
    color: 'bg-orange-100',
    image: '/icons/dinner-service.jpg',
  },
  {
    id: '3',
    title: 'Evening Music',
    time: '8:00 PM',
    description: 'Traditional performances',
    color: 'bg-rose-100',
    image: '/icons/evening-music.jpg',
  },
  {
    id: '4',
    title: 'Spa Session',
    time: '2:00 PM',
    description: 'Relaxation & wellness',
    color: 'bg-green-100',
    image: '/icons/spa-session.jpg',
  },
];

export default function ScrollableEvents() {
  return (
    <section className="space-y-4 px-4 md:px-6 py-8">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          What&apos;s Happening Now
        </h2>
      </div>

      {/* Scrollable Events Container */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {mockEvents.map((event) => (
            <div
              key={event.id}
              className={`flex-shrink-0 w-72 ${event.color} rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth snap-start`}
            >
              {/* Event Image */}
              <div className="relative h-32 w-full">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-lg text-primary">{event.title}</h3>
                  <span className="text-xs font-bold bg-white/50 px-3 py-1 rounded-full">
                    {event.time}
                  </span>
                </div>
                <p className="text-sm text-foreground/70">{event.description}</p>
                <button className="w-full mt-2 bg-white/80 hover:bg-white text-primary font-semibold py-2 rounded-lg transition-smooth">
                  Learn More
                </button>
              </div>
            </div>
          ))}

          {/* Explore More Button */}
          <Link
            href="/today"
            className="flex-shrink-0 w-72 glass rounded-2xl p-6 shadow-warm hover:shadow-warm-md transition-smooth snap-start flex flex-col items-center justify-center gap-4"
          >
            <h3 className="font-serif text-lg font-bold text-primary text-center">
              Explore More Events
            </h3>
            <ChevronRight className="w-8 h-8 text-accent" />
          </Link>
        </div>
      </div>
    </section>
  );
}
