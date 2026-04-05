'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, Check } from 'lucide-react';

interface Suggestion {
  id: string;
  message: string;
  image: string;
  action: string;
}

export default function SuggestionsForYou() {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [accepted, setAccepted] = useState<Set<string>>(new Set());
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/suggestions')
      .then(r => r.json())
      .then(data => {
        if (data.suggestions) setSuggestions(data.suggestions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const acceptSuggestion = useCallback((id: string) => {
    setAccepted(prev => new Set(prev).add(id));
    // Optionally send to DB: fetch('/api/suggestions/accept', { method: 'POST', body: JSON.stringify({ id }) })
  }, []);

  const dismissSuggestion = useCallback((id: string) => {
    setDismissed(prev => new Set(prev).add(id));
  }, []);

  if (loading) {
    return (
      <section className="space-y-4 px-4 md:px-6 py-8">
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
          Emama&apos;s Suggestions For You
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="glass rounded-2xl p-6 animate-pulse">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-muted" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-8 bg-muted rounded w-40 mt-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4 px-4 md:px-6 py-8">
      <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">
        Emama&apos;s Suggestions For You
      </h2>

      <div className="space-y-4">
        {suggestions.map(suggestion => {
          if (dismissed.has(suggestion.id)) return null;

          const isAccepted = accepted.has(suggestion.id);

          return (
            <div
              key={suggestion.id}
              className={`glass rounded-2xl p-6 shadow-warm hover:shadow-warm-md transition-smooth border transition-colors ${
                isAccepted ? 'border-green-300 bg-green-50/50' : 'border-accent/20'
              }`}
            >
              <div className="flex gap-4">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={suggestion.image}
                    alt="Suggestion"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <p className="text-sm md:text-base text-foreground leading-relaxed">
                    {suggestion.message}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => acceptSuggestion(suggestion.id)}
                      disabled={isAccepted}
                      className={`flex-1 font-semibold py-2 px-4 rounded-lg transition-smooth ${
                        isAccepted
                          ? 'bg-green-100 text-green-700'
                          : 'bg-accent hover:bg-accent/90 text-primary'
                      }`}
                    >
                      {isAccepted ? (
                        <span className="flex items-center justify-center gap-2">
                          <Check className="w-4 h-4" /> Accepted
                        </span>
                      ) : (
                        suggestion.action || "Yes, I'd love this"
                      )}
                    </button>
                    <button
                      onClick={() => dismissSuggestion(suggestion.id)}
                      className="px-4 py-2 rounded-lg hover:bg-muted transition-smooth"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {suggestions.length === 0 && !loading && (
          <p className="text-sm text-muted-foreground">No suggestions right now. Try setting your preferences!</p>
        )}
      </div>
    </section>
  );
}
