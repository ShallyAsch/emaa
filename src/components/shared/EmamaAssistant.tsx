'use client';

import { useState, useEffect } from 'react';

interface EmamaAssistantProps {
  page: string;
  onRecommend?: () => void;
}

const pageMessages: Record<string, string> = {
  gebeta: 'Hungry, my dear? I know exactly which dish will warm your heart today. Shall I recommend something special?',
  events: 'Looking for something magical to experience tonight? I know just the event that will make your evening unforgettable!',
  schedule: 'I see you have a busy day! Would you like me to suggest the perfect timing for your activities?',
  comfort: 'Feeling a bit chilly or too warm? Let me adjust your room for the perfect comfort, my dear.',
  explore: 'There is so much beauty around Kuriftu! Shall I show you the hidden gems most guests miss?',
  community: 'I noticed you have so much in common with other guests! Want me to introduce you to someone special?',
  'memory-box': 'Would you like me to create a beautiful story from all your wonderful moments here?',
  profile: 'Your profile tells me so much about you! Want me to personalize your entire experience?',
  'little-ethiopia': 'The traditions here are so rich! Shall I guide you through a cultural experience you will never forget?',
};

export default function EmamaAssistant({ page, onRecommend }: EmamaAssistantProps) {
  const [showChat, setShowChat] = useState(true);
  const [dismissed, setDismissed] = useState(false);
  const [showing, setShowing] = useState(false);

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' && localStorage.getItem(`emama-dismissed-${page}`);
    if (dismissed) setDismissed(true);
    else setTimeout(() => setShowing(true), 2000);
  }, [page]);

  const handleRecommend = () => {
    setShowChat(false);
    onRecommend?.();
  };

  const handleDismiss = () => {
    setDismissed(true);
    setShowChat(false);
    if (typeof window !== 'undefined') localStorage.setItem(`emama-dismissed-${page}`, 'true');
  };

  if (dismissed || !showing) return null;

  return (
    <div className="fixed bottom-6 left-6 md:left-28 z-40">
      {showChat && (
        <div className="absolute bottom-16 left-0 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 space-y-4 border border-border animate-in slide-in-from-bottom-2 fade-in">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-xl flex-shrink-0">👵</div>
            <div>
              <p className="text-sm font-semibold text-primary">Emama Zinashe</p>
              <p className="text-sm text-foreground/80 mt-1">{pageMessages[page] || 'How can I make your stay more wonderful today?'}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {onRecommend && (
              <button onClick={handleRecommend} className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg text-sm transition-all active:scale-[0.97]">Yes please</button>
            )}
            <button onClick={handleDismiss} className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg text-sm transition-all active:scale-[0.97]">Later</button>
          </div>
        </div>
      )}
      <button
        onClick={() => { setShowChat(true); setDismissed(false); }}
        className="w-14 h-14 bg-accent hover:bg-accent/90 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-[0.97]"
      >
        <span className="text-2xl">👵</span>
      </button>
    </div>
  );
}
