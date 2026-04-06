'use client';

import { useState } from 'react';
import { X, Check } from 'lucide-react';

interface EmamaResultDisplayProps {
  title: string;
  items: { icon: string; label: string; description?: string }[];
  message?: string;
  onClose: () => void;
}

export default function EmamaResultDisplay({ title, items, message, onClose }: EmamaResultDisplayProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in-95 fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center text-xl">👵🏾</div>
            <div>
              <p className="text-sm font-semibold text-primary">Emama recommends</p>
              <p className="text-xs text-muted-foreground">{title}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-full transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {message && (
          <div className="bg-accent/10 rounded-lg p-3 mb-4">
            <p className="text-sm text-foreground/80 italic">&quot;{message}&quot;</p>
          </div>
        )}

        <div className="space-y-3">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-medium text-foreground text-sm">{item.label}</p>
                {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
              </div>
              <Check className="w-4 h-4 text-green-600 ml-auto" />
            </div>
          ))}
        </div>

        <button onClick={onClose} className="w-full mt-4 py-2.5 bg-accent hover:bg-accent/90 text-primary font-medium rounded-lg text-sm transition-all">
          Got it, thank you!
        </button>
      </div>
    </div>
  );
}
