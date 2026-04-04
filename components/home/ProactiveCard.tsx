'use client';

import React from 'react';
import { ProactiveOffer } from '@/lib/types';
import { ChevronDown } from 'lucide-react';

interface ProactiveCardProps {
  offer: ProactiveOffer;
  isActive: boolean;
  onToggle: () => void;
}

export default function ProactiveCard({
  offer,
  isActive,
  onToggle,
}: ProactiveCardProps) {
  return (
    <div
      className="glass p-4 rounded-2xl shadow-warm-md transition-smooth cursor-pointer hover:shadow-warm border border-border/50"
      onClick={onToggle}
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{offer.icon}</div>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-sm mb-1">
            {offer.title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {offer.description}
          </p>

          {isActive && (
            <div className="flex gap-2 mt-3 pt-3 border-t border-border/30">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  offer.onAccept();
                  onToggle();
                }}
                className="flex-1 px-3 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-xs transition-smooth hover:opacity-90"
              >
                {offer.acceptText}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  offer.onDecline();
                  onToggle();
                }}
                className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg font-medium text-xs transition-smooth hover:opacity-90"
              >
                {offer.declineText}
              </button>
            </div>
          )}
        </div>

        <ChevronDown
          className={`w-4 h-4 text-accent transition-transform mt-1 ${
            isActive ? 'rotate-180' : ''
          }`}
        />
      </div>

      <div className="text-xs text-accent mt-3 font-medium">
        Suggested: {offer.suggestedTime}
      </div>
    </div>
  );
}
