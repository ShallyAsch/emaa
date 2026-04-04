'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Suggestion {
  mood: string;
  image: string;
  suggestions: string[];
}

const moodSuggestions: Suggestion[] = [
  {
    mood: "I'm Tired",
    image: '/icons/tired-mood.jpg',
    suggestions: [
      'Prepare a relaxation tea',
      'Dim your room lighting',
      'Book a massage appointment',
      'Set up quiet time in the garden',
    ],
  },
  {
    mood: "I'm Hungry",
    image: '/icons/hungry-mood.jpg',
    suggestions: [
      'Quick local snacks ready now',
      'Book a private dining experience',
      'Join our community meal at 5:30 PM',
      'Visit the restaurant',
    ],
  },
  {
    mood: 'I want Culture',
    image: '/icons/culture-mood.jpg',
    suggestions: [
      'Buna ceremony in 30 minutes',
      'Cultural evening performance at 7 PM',
      'Traditional craft workshop',
      'Local market tour',
    ],
  },
  {
    mood: 'I need Help',
    image: '/icons/help-mood.jpg',
    suggestions: [
      'Connect with your host immediately',
      'Request maintenance support',
      'Medical assistance available',
      'Concierge services',
    ],
  },
];

export default function MoodButtons() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [messageSent, setMessageSent] = useState<string | null>(null);

  const handleSuggestionClick = (suggestion: string) => {
    setMessageSent(suggestion);
    setTimeout(() => setMessageSent(null), 3000);
  };

  return (
    <section className="space-y-4">
      {/* Hero Image */}
      <div className="relative h-48 md:h-56 rounded-2xl overflow-hidden">
        <Image
          src="/friendly-staff.jpg"
          alt="Our friendly staff"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-white">How can we help you?</h2>
          <p className="text-white/80 text-sm mt-1">Our team is always here for you</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {moodSuggestions.map((item) => (
          <button
            key={item.mood}
            onClick={() =>
              setSelectedMood(selectedMood === item.mood ? null : item.mood)
            }
            className={`glass p-3 rounded-2xl text-center transition-smooth transform hover:scale-105 ${
              selectedMood === item.mood
                ? 'ring-2 ring-accent bg-accent/5'
                : 'hover:shadow-warm-md'
            }`}
          >
            <div className="relative w-12 h-12 mx-auto mb-2 rounded-xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.mood}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-sm font-semibold text-foreground">
              {item.mood}
            </div>
          </button>
        ))}
      </div>

      {/* Show suggestions for selected mood */}
      {selectedMood && (
        <div className="glass p-4 rounded-2xl space-y-2 mt-4 animate-in fade-in slide-in-from-top-2">
          {moodSuggestions
            .find((s) => s.mood === selectedMood)
            ?.suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full text-left px-3 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-smooth text-sm font-medium text-foreground border border-secondary/20"
              >
                {suggestion}
              </button>
            ))}
        </div>
      )}

      {/* Message sent feedback */}
      {messageSent && (
        <div className="text-center py-2 text-green-600 font-medium text-sm animate-in fade-in">
          Message sent
        </div>
      )}

      {/* Tell Us How You Are Feeling Button */}
      <Link
        href="/comfort"
        className="block w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-4 px-6 rounded-xl transition-smooth text-center shadow-warm mt-4"
      >
        Tell Us How You Are Feeling
      </Link>
    </section>
  );
}
