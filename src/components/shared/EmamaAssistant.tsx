'use client';

import { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface EmamaAssistantProps {
  message?: string;
  onRecommend?: () => void;
}

export default function EmamaAssistant({ message, onRecommend }: EmamaAssistantProps) {
  const [showChat, setShowChat] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-6 left-6 md:left-28 z-40">
      {showChat && (
        <div className="absolute bottom-16 left-0 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-5 space-y-4 border border-border">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              👵
            </div>
            <div>
              <p className="text-sm font-semibold text-primary">Emama Zinashe</p>
              <p className="text-sm text-foreground/80 mt-1">
                {message || 'Would you like me to recommend the perfect experience for you today?'}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {onRecommend && (
              <button
                onClick={onRecommend}
                className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg text-sm transition-all active:scale-[0.97]"
              >
                Yes please
              </button>
            )}
            <button
              onClick={() => setShowChat(false)}
              className="px-4 py-2 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-lg text-sm transition-all active:scale-[0.97]"
            >
              Later
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setShowChat(!showChat)}
        className="w-14 h-14 bg-accent hover:bg-accent/90 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-[0.97]"
      >
        <span className="text-2xl">👵</span>
      </button>
    </div>
  );
}
