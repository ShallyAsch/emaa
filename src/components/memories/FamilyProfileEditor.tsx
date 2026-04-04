'use client';

import React, { useState } from 'react';
import { FamilyProfile } from '@/src/lib/types';

interface FamilyProfileEditorProps {
  profile: FamilyProfile;
  onClose: () => void;
}

export default function FamilyProfileEditor({
  profile,
  onClose,
}: FamilyProfileEditorProps) {
  const [formData, setFormData] = useState(profile);

  const handleChange = (field: keyof FamilyProfile, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to backend here
    console.log('Saving profile:', formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Coffee Preference */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          ☕ Coffee Preference
        </label>
        <textarea
          value={formData.coffeePreference}
          onChange={(e) =>
            handleChange('coffeePreference', e.target.value)
          }
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          rows={2}
          placeholder="How do you like your coffee?"
        />
      </div>

      {/* Dietary Notes */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          🍽️ Dietary Notes
        </label>
        <textarea
          value={formData.dietaryNotes}
          onChange={(e) => handleChange('dietaryNotes', e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          rows={2}
          placeholder="Any allergies or preferences?"
        />
      </div>

      {/* Favorite Seating */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          🪑 Favorite Seating
        </label>
        <input
          type="text"
          value={formData.favoriteSeating}
          onChange={(e) =>
            handleChange('favoriteSeating', e.target.value)
          }
          className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Where do you like to sit?"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-smooth"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-4 py-2 bg-muted text-foreground rounded-lg font-medium text-sm hover:opacity-90 transition-smooth"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
