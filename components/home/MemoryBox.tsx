'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

interface Memory {
  id: string;
  title: string;
  date: string;
  image: string;
  emoji: string;
}

const memories: Memory[] = [
  {
    id: '1',
    title: 'Coffee Ceremony with Family',
    date: 'Last Visit - June 2024',
    image: '/buna-ceremony.jpg',
    emoji: '☕',
  },
  {
    id: '2',
    title: 'Sunset at the Garden',
    date: 'Last Visit - June 2024',
    image: '/sunset-view.jpg',
    emoji: '🌅',
  },
  {
    id: '3',
    title: 'Dancing Under the Stars',
    date: 'Last Visit - June 2024',
    image: '/culture-hero.jpg',
    emoji: '💃',
  },
  {
    id: '4',
    title: 'Dining with Locals',
    date: 'Last Visit - June 2024',
    image: '/dining-hall.jpg',
    emoji: '🍽️',
  },
];

export default function MemoryBox() {
  return (
    <section className="space-y-6 px-4 md:px-6 py-8">
      <div className="text-center mb-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-2">
          Your Memory Box
        </h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Moments we've cherished together
        </p>
      </div>

      {/* Memory Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {memories.map((memory) => (
          <div
            key={memory.id}
            className="group relative h-40 md:h-48 rounded-xl overflow-hidden shadow-warm hover:shadow-warm-md transition-smooth"
          >
            <Image
              src={memory.image}
              alt={memory.title}
              fill
              className="object-cover group-hover:scale-105 transition-smooth"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
              <div className="text-2xl mb-2">{memory.emoji}</div>
              <h3 className="font-semibold text-sm line-clamp-2">{memory.title}</h3>
              <p className="text-xs text-white/70">{memory.date}</p>
            </div>

            {/* Hover Heart */}
            <button className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Heart className="w-4 h-4 text-white" />
            </button>
          </div>
        ))}
      </div>

      {/* View Full Memory Box Button */}
      <div className="pt-4 text-center">
        <Link
          href="/memories"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-lg transition-smooth shadow-warm"
        >
          View Full Memory Box
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
