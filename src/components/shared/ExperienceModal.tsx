'use client';

import React from 'react';
import { X, Play } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  historicalContext?: string;
  videoUrl?: string;
  closingNote?: string;
}

export default function ExperienceModal({
  isOpen,
  onClose,
  title,
  description,
  historicalContext,
  videoUrl,
  closingNote = "This is part of your home story ❤️",
}: ExperienceModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-warm">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background/95 backdrop-blur">
          <h2 className="font-serif text-2xl font-bold text-primary">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-3">About This Experience</h3>
            <p className="text-foreground/80 leading-relaxed">{description}</p>
          </div>

          {/* Historical Context */}
          {historicalContext && (
            <div className="bg-accent/5 rounded-xl p-5 border border-accent/20">
              <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                Cultural Heritage
              </h4>
              <p className="text-sm text-foreground/70 leading-relaxed">{historicalContext}</p>
            </div>
          )}

          {/* Video Placeholder */}
          {videoUrl && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide">
                Watch & Learn
              </h4>
              <div className="relative bg-muted rounded-xl overflow-hidden h-64 flex items-center justify-center">
                <button className="flex items-center gap-3 bg-accent hover:bg-accent/90 text-primary font-semibold px-6 py-3 rounded-full transition-smooth">
                  <Play className="w-5 h-5" />
                  Play Video
                </button>
              </div>
            </div>
          )}

          {/* Closing Note */}
          <div className="bg-primary/5 rounded-xl p-5 border-l-4 border-accent">
            <p className="text-sm font-semibold text-primary italic">{closingNote}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-smooth"
          >
            Close & Return Home
          </button>
        </div>
      </div>
    </div>
  );
}
