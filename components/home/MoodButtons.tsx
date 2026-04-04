'use client';

import React, { useState } from 'react';

interface Suggestion {
  mood: string;
  icon: string;
  suggestions: string[];
}

const moodSuggestions: Suggestion[] = [
  {
    mood: "I'm Tired",
    icon: '😴',
    suggestions: [
      'Prepare a relaxation tea',
      'Dim your room lighting',
      'Book a massage appointment',
      'Set up quiet time in the garden',
    ],
  },
  {
    mood: "I'm Hungry",
    icon: '🍴',
    suggestions: [
      'Quick local snacks ready now',
      'Book a private dining experience',
      'Join our community meal at 5:30 PM',
      'Visit the restaurant',
    ],
  },
  {
    mood: 'I want Culture',
    icon: '🎭',
    suggestions: [
      'Buna ceremony in 30 minutes',
      'Cultural evening performance at 7 PM',
      'Traditional craft workshop',
      'Local market tour',
    ],
  },
  {
    mood: 'I need Help',
    icon: '🤝',
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

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-foreground">How can we help you?</h2>

      <div className="grid grid-cols-2 gap-3">
        {moodSuggestions.map((item) => (
          <button
            key={item.mood}
            onClick={() =>
              setSelectedMood(selectedMood === item.mood ? null : item.mood)
            }
            className={`glass p-4 rounded-2xl text-center transition-smooth transform hover:scale-105 ${
              selectedMood === item.mood
                ? 'ring-2 ring-accent bg-accent/5'
                : 'hover:shadow-warm-md'
            }`}
          >
            <div className="text-4xl mb-2">{item.icon}</div>
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
                className="w-full text-left px-3 py-2 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-smooth text-sm font-medium text-foreground border border-secondary/20"
              >
                {suggestion}
              </button>
            ))}
        </div>
      )}
    </section>
  );
}
