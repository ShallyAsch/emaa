'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { mockMemories, mockGuest } from '@/lib/mockData';
import FamilyProfileEditor from './FamilyProfileEditor';

export default function MemoriesTab() {
  const [showProfileEditor, setShowProfileEditor] = useState(false);

  return (
    <div className="w-full md:pr-24">
      <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Your Memories
          </h1>
          <p className="text-muted-foreground">
            Moments from your stays with us
          </p>
        </div>

        {/* Photo Gallery Grid */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Gallery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockMemories.map((memory) => (
              <div
                key={memory.id}
                className="group relative overflow-hidden rounded-2xl h-48 md:h-56"
              >
                <Image
                  src={memory.imageUrl}
                  alt={memory.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-smooth duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex flex-col justify-end p-4">
                  <h3 className="font-semibold text-white text-sm">
                    {memory.title}
                  </h3>
                  <p className="text-xs text-white/80">{memory.date}</p>

                  {/* Action Button */}
                  <button className="mt-3 px-3 py-1 bg-accent/20 text-accent rounded-lg text-xs font-medium hover:bg-accent/30 transition-smooth">
                    Book similar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Family Profile Section */}
        <div className="border-t border-border pt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Your Family Profile
            </h2>
            <button
              onClick={() => setShowProfileEditor(!showProfileEditor)}
              className="px-3 py-1 text-xs font-medium bg-accent/10 text-accent rounded-lg hover:bg-accent/20 transition-smooth"
            >
              {showProfileEditor ? 'Close' : 'Edit'}
            </button>
          </div>

          {showProfileEditor ? (
            <FamilyProfileEditor
              profile={mockGuest.familyProfile}
              onClose={() => setShowProfileEditor(false)}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Coffee Preference */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                  ☕ Coffee Preference
                </h3>
                <p className="text-sm text-muted-foreground">
                  {mockGuest.familyProfile.coffeePreference}
                </p>
              </div>

              {/* Dietary Notes */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                  🍽️ Dietary Notes
                </h3>
                <p className="text-sm text-muted-foreground">
                  {mockGuest.familyProfile.dietaryNotes}
                </p>
              </div>

              {/* Favorite Seating */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                  🪑 Favorite Seating
                </h3>
                <p className="text-sm text-muted-foreground">
                  {mockGuest.familyProfile.favoriteSeating}
                </p>
              </div>

              {/* Visit Count */}
              <div className="glass p-6 rounded-2xl">
                <h3 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                  🏠 Previous Visits
                </h3>
                <p className="text-sm text-muted-foreground">
                  You have stayed with us {mockGuest.familyProfile.previousVisits}{' '}
                  {mockGuest.familyProfile.previousVisits === 1 ? 'time' : 'times'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Special Moments */}
        {mockGuest.familyProfile.specialMoments.length > 0 && (
          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold text-foreground mb-4">
              ✨ Special Moments
            </h3>
            <ul className="space-y-2">
              {mockGuest.familyProfile.specialMoments.map((moment, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <span className="text-accent">•</span>
                  {moment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
