'use client';
import EmamaAssistant from '@/src/components/shared/EmamaAssistant';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import {
  User, Heart, Utensils, Mountain, Music, Book, Users, Sparkles,
  Edit3, Mail, Phone, Palette, TreePine, Dumbbell,
  Sun, Sunset, Moon, Coffee, Armchair, Eye, Camera
} from 'lucide-react';
import PreferencesModal from '@/src/components/auth/PreferencesModal';

const foodList = [
  { id: 'spicy', label: 'Spicy Food' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'comfort', label: 'Comfort Food' },
  { id: 'sharing', label: 'Family Sharing' },
  { id: 'sweets', label: 'Sweet Treats' },
];

const activityList = [
  { id: 'cultural', label: 'Cultural Experiences', icon: Palette },
  { id: 'nature', label: 'Nature & Outdoors', icon: TreePine },
  { id: 'spa', label: 'Spa & Wellness', icon: Dumbbell },
  { id: 'photography', label: 'Photography', icon: Camera },
  { id: 'music', label: 'Music & Dance', icon: Music },
  { id: 'learning', label: 'Learning & Workshops', icon: Book },
];

const hobbyList = [
  { id: 'reading', label: 'Reading' },
  { id: 'art', label: 'Art & Crafts' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'photography', label: 'Photography' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'cooking', label: 'Cooking' },
];

const personalityList = [
  { id: 'adventurer', label: 'The Adventurer', description: 'Loves exploring new places', icon: Mountain },
  { id: 'relaxer', label: 'The Relaxer', description: 'Prefers peaceful moments', icon: Armchair },
  { id: 'explorer', label: 'The Cultural Explorer', description: 'Drawn to history & traditions', icon: Eye },
  { id: 'social', label: 'The Social Butterfly', description: 'Enjoys meeting people', icon: Users },
];

const travelList = [
  { id: 'solo', label: 'Solo Traveler' },
  { id: 'couple', label: 'Couple' },
  { id: 'family', label: 'Family' },
  { id: 'group', label: 'Group/Friends' },
];

const timeList = [
  { id: 'morning', label: 'Morning', time: '6 AM - 12 PM', icon: Sun },
  { id: 'afternoon', label: 'Afternoon', time: '12 PM - 6 PM', icon: Sunset },
  { id: 'evening', label: 'Evening', time: '6 PM - 10 PM', icon: Moon },
];

interface Prefs {
  favorite_foods: string[];
  activities: string[];
  hobbies: string[];
  personality_type: string;
  travel_context: string;
  time_preferences: string[];
  dietary_notes: string;
  coffee_preference: string;
  favorite_seating: string;
}

const emptyPrefs: Prefs = {
  favorite_foods: [], activities: [], hobbies: [], personality_type: '',
  travel_context: '', time_preferences: [], dietary_notes: '',
  coffee_preference: '', favorite_seating: '',
};

const Tag = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium ${className}`}>{children}</span>
);

const SectionCard = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
    <div className="p-5 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">{icon}</div>
        <h2 className="font-semibold text-foreground">{title}</h2>
      </div>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

export default function ProfileTab() {
  const { user, isLoaded } = useUser();
  const displayName = isLoaded ? (user?.fullName || user?.username || 'User') : 'User';
  const displayEmail = isLoaded ? (user?.primaryEmailAddress?.emailAddress || '') : '';
  const displayImage = isLoaded ? user?.imageUrl : null;

  const [prefs, setPrefs] = useState<Prefs>(emptyPrefs);
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      fetch('/api/preferences')
        .then(r => r.json())
        .then(data => { setPrefs({ ...emptyPrefs, ...data }); setLoaded(true); })
        .catch(() => setLoaded(true));
    }
  }, [isLoaded]);

  const handleModalClose = () => {
    setShowModal(false);
    fetch('/api/preferences')
      .then(r => r.json())
      .then(data => setPrefs({ ...emptyPrefs, ...data }))
      .catch(() => {});
  };

  if (!loaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const label = (id: string, list: { id: string; label: string }[]) =>
    list.find(i => i.id === id)?.label || id;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-4 py-8 md:px-8 bg-white border-b border-border">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-5xl mb-4 overflow-hidden">
            {displayImage ? (
              <img src={displayImage} alt={displayName} className="w-full h-full object-cover" />
            ) : ('👤')}
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary">{displayName}</h1>
          <p className="text-muted-foreground mt-1">
            {user && user.createdAt ? `Guest since ${new Date(user.createdAt).getFullYear()}` : 'Guest'}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium hover:bg-accent/10 transition-smooth"
          >
            <Edit3 className="w-4 h-4" /> Edit Preferences
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 md:px-8 space-y-6 mt-6">
        {/* Basic Info */}
        <SectionCard title="Basic Information" icon={<User className="w-5 h-5 text-primary" />}>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Full Name</label>
              <p className="font-medium text-foreground mt-1">{displayName}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email
              </label>
              <p className="font-medium text-foreground mt-1">{displayEmail || 'Not provided'}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone
              </label>
              <p className="font-medium text-foreground mt-1">{user?.primaryPhoneNumber?.phoneNumber || 'Not provided'}</p>
            </div>
          </div>
        </SectionCard>

        {/* Foods */}
        <SectionCard title="Favorite Foods" icon={<Utensils className="w-5 h-5 text-red-600" />}>
          {prefs.favorite_foods.length === 0 ? (
            <p className="text-sm text-muted-foreground">Not set yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {prefs.favorite_foods.map(id => (
                <Tag key={id} className="bg-red-50 text-red-700">{label(id, foodList)}</Tag>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Activities */}
        <SectionCard title="Activities You Enjoy" icon={<Mountain className="w-5 h-5 text-green-600" />}>
          {prefs.activities.length === 0 ? (
            <p className="text-sm text-muted-foreground">Not set yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {prefs.activities.map(id => {
                const a = activityList.find(x => x.id === id);
                const Icon = a?.icon || Sparkles;
                return (
                  <Tag key={id} className="bg-green-50 text-green-700 gap-1.5">
                    <Icon className="w-3.5 h-3.5" />{a?.label || id}
                  </Tag>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* Hobbies */}
        <SectionCard title="Hobbies" icon={<Book className="w-5 h-5 text-amber-600" />}>
          {prefs.hobbies.length === 0 ? (
            <p className="text-sm text-muted-foreground">Not set yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {prefs.hobbies.map(id => (
                <Tag key={id} className="bg-amber-50 text-amber-700">{label(id, hobbyList)}</Tag>
              ))}
            </div>
          )}
        </SectionCard>

        {/* Personality */}
        <SectionCard title="Personality Type" icon={<Heart className="w-5 h-5 text-purple-600" />}>
          {!prefs.personality_type ? (
            <p className="text-sm text-muted-foreground">Not set yet.</p>
          ) : (() => {
            const p = personalityList.find(x => x.id === prefs.personality_type);
            if (!p) return <p className="text-sm text-foreground">{prefs.personality_type}</p>;
            const Icon = p.icon;
            return (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <span className="font-semibold text-foreground">{p.label}</span>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </div>
              </div>
            );
          })()}
        </SectionCard>

        {/* Travel Context */}
        <SectionCard title="Travel Context" icon={<Users className="w-5 h-5 text-blue-600" />}>
          {!prefs.travel_context ? (
            <p className="text-sm text-muted-foreground">Not set yet.</p>
          ) : (
            <Tag className="bg-blue-50 text-blue-700">{label(prefs.travel_context, travelList)}</Tag>
          )}
        </SectionCard>

        {/* Time Preferences */}
        <SectionCard title="Time Preferences" icon={<Sun className="w-5 h-5 text-orange-600" />}>
          {prefs.time_preferences.length === 0 ? (
            <p className="text-sm text-muted-foreground">Not set yet.</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {prefs.time_preferences.map(id => {
                const t = timeList.find(x => x.id === id);
                if (!t) return null;
                const Icon = t.icon;
                return (
                  <div key={id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
                    <Icon className="w-4 h-4 text-orange-600" />
                    <div>
                      <span className="text-xs font-medium text-foreground">{t.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{t.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </SectionCard>

        {/* Dietary Notes */}
        <SectionCard title="Dietary Notes" icon={<Coffee className="w-5 h-5 text-amber-700" />}>
          {prefs.dietary_notes ? (
            <p className="text-sm text-foreground">{prefs.dietary_notes}</p>
          ) : (
            <p className="text-sm text-muted-foreground">No dietary notes.</p>
          )}
        </SectionCard>
      </div>

      {/* Preferences Modal */}
      {showModal && <PreferencesModal onClose={handleModalClose} />}

      {/* Emama Zinashe Floating AI Assistant */}
      <EmamaAssistant
        page="profile"
        onRecommend={() => setShowModal(true)}
      />
    </div>
  );
}