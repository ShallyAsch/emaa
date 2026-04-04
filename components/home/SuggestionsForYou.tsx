'use client';

import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';

interface Suggestion {
  id: string;
  message: string;
  emoji: string;
}

const suggestions: Suggestion[] = [
  {
    id: '1',
    emoji: '🧊',
    message:
      'We noticed you\'ve been in your room for 3 hours after your long journey. The weather is warm today (30°C). Would you like a cold hibiscus tea and a 15-minute foot massage at 5 PM?',
  },
  {
    id: '2',
    emoji: '☕',
    message:
      'Based on your preferences, we\'ve prepared your favorite Ethiopian coffee. It\'s ready in the lobby. Come enjoy it with our family.',
  },
  {
    id: '3',
    emoji: '🌅',
    message:
      'The sunset is beautiful tonight from our garden terrace. Perfect time for a walk before dinner at 6:30 PM.',
  },
];

export default function SuggestionsForYou() {
  const [visibleSuggestions, setVisibleSuggestions] = useState<Set<string>>(
    new Set(suggestions.map((s) => s.id))
  );

  const hideSuggestion = (id: string) => {
    setVisibleSuggestions((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <section className="space-y-4 px-4 md:px-6 py-8">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
        Suggestions For You
      </h2>

      <div className="space-y-4">
        {suggestions.map(
          (suggestion) =>
            visibleSuggestions.has(suggestion.id) && (
              <div
                key={suggestion.id}
                className="glass rounded-2xl p-6 shadow-warm hover:shadow-warm-md transition-smooth border border-accent/20"
              >
                <div className="flex gap-4">
                  <div className="text-4xl flex-shrink-0">{suggestion.emoji}</div>
                  <div className="flex-1 space-y-4">
                    <p className="text-sm md:text-base text-foreground leading-relaxed">
                      {suggestion.message}
                    </p>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-accent hover:bg-accent/90 text-primary font-semibold py-2 px-4 rounded-lg transition-smooth">
                        Yes, I'd love this
                      </button>
                      <button
                        onClick={() => hideSuggestion(suggestion.id)}
                        className="px-4 py-2 rounded-lg hover:bg-muted transition-smooth"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </section>
  );
}
