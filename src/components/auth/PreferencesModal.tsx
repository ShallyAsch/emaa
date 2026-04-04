'use client';

import React, { useState } from 'react';
import { X, ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Utensils,
  Mountain,
  Book,
  Heart,
  Users,
  Sun,
  Sunset,
  Moon,
  Palette,
  TreePine,
  Dumbbell,
  Music,
  Eye,
  Armchair,
} from 'lucide-react';

const foodPreferences = [
  { id: 'spicy', label: 'Spicy Food' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'comfort', label: 'Comfort Food' },
  { id: 'sharing', label: 'Family Sharing' },
  { id: 'sweets', label: 'Sweet Treats' },
];

const activities = [
  { id: 'cultural', label: 'Cultural', icon: Palette },
  { id: 'nature', label: 'Nature', icon: TreePine },
  { id: 'spa', label: 'Spa', icon: Dumbbell },
  { id: 'music', label: 'Music', icon: Music },
];

const hobbies = [
  { id: 'reading', label: 'Reading' },
  { id: 'art', label: 'Art' },
  { id: 'hiking', label: 'Hiking' },
  { id: 'photography', label: 'Photography' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'cooking', label: 'Cooking' },
];

const personalityTypes = [
  { id: 'adventurer', label: 'Adventurer', description: 'Loves exploring', icon: Mountain },
  { id: 'relaxer', label: 'Relaxer', description: 'Prefers peace', icon: Armchair },
  { id: 'explorer', label: 'Explorer', description: 'Drawn to traditions', icon: Eye },
  { id: 'social', label: 'Social', description: 'Enjoys people', icon: Users },
];

const travelContexts = [
  { id: 'solo', label: 'Solo' },
  { id: 'couple', label: 'Couple' },
  { id: 'family', label: 'Family' },
  { id: 'group', label: 'Group' },
];

const timePreferences = [
  { id: 'morning', label: 'Morning', time: '6-12', icon: Sun },
  { id: 'afternoon', label: 'Afternoon', time: '12-6', icon: Sunset },
  { id: 'evening', label: 'Evening', time: '6-10', icon: Moon },
];

interface PreferencesModalProps {
  onClose: () => void;
}

export default function PreferencesModal({ onClose }: PreferencesModalProps) {
  const [step, setStep] = useState(0);
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [personality, setPersonality] = useState('');
  const [travelContext, setTravelContext] = useState('');
  const [times, setTimes] = useState<string[]>([]);
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const toggle = (id: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/preferences', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          favorite_foods: selectedFoods,
          activities: selectedActivities,
          hobbies: selectedHobbies,
          personality_type: personality,
          travel_context: travelContext,
          time_preferences: times,
          dietary_notes: dietaryNotes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error('Save failed:', data);
        alert('Failed to save preferences: ' + (data.error || 'Unknown error'));
      } else {
        console.log('Preferences saved successfully');
      }
    } catch (err) {
      console.error('Save error:', err);
      alert('Network error saving preferences');
    }
    setSaving(false);
    onClose();
  };

  const steps = [
    <div key="foods" className="space-y-4">
      <div className="text-center">
        <Utensils className="w-10 h-10 mx-auto text-primary mb-2" />
        <h2 className="font-serif text-xl font-bold text-primary">What foods speak to you?</h2>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {foodPreferences.map(pref => (
          <button
            key={pref.id}
            onClick={() => toggle(pref.id, selectedFoods, setSelectedFoods)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedFoods.includes(pref.id)
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
            }`}
          >
            {selectedFoods.includes(pref.id) && <Check className="w-3 h-3 inline mr-1" />}
            {pref.label}
          </button>
        ))}
      </div>
    </div>,
    <div key="activities" className="space-y-4">
      <div className="text-center">
        <Mountain className="w-10 h-10 mx-auto text-green-600 mb-2" />
        <h2 className="font-serif text-xl font-bold text-primary">How do you like to spend your time?</h2>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {activities.map(act => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={() => toggle(act.id, selectedActivities, setSelectedActivities)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedActivities.includes(act.id)
                  ? 'bg-secondary text-secondary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
              }`}
            >
              {selectedActivities.includes(act.id) && <Check className="w-3 h-3" />}
              <Icon className="w-4 h-4" />
              {act.label}
            </button>
          );
        })}
      </div>
    </div>,
    <div key="hobbies" className="space-y-4">
      <div className="text-center">
        <Book className="w-10 h-10 mx-auto text-amber-600 mb-2" />
        <h2 className="font-serif text-xl font-bold text-primary">What are your hobbies?</h2>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {hobbies.map(h => (
          <button
            key={h.id}
            onClick={() => toggle(h.id, selectedHobbies, setSelectedHobbies)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedHobbies.includes(h.id)
                ? 'bg-amber-500 text-white'
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
            }`}
          >
            {selectedHobbies.includes(h.id) && <Check className="w-3 h-3 inline mr-1" />}
            {h.label}
          </button>
        ))}
      </div>
    </div>,
    <div key="personality" className="space-y-4">
      <div className="text-center">
        <Heart className="w-10 h-10 mx-auto text-purple-600 mb-2" />
        <h2 className="font-serif text-xl font-bold text-primary">Which describes you best?</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {personalityTypes.map(type => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setPersonality(type.id)}
              className={`p-3 rounded-xl text-left transition-all ${
                personality === type.id
                  ? 'bg-accent/20 border-2 border-accent'
                  : 'bg-muted/30 border-2 border-transparent hover:bg-muted/50'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                personality === type.id ? 'bg-accent' : 'bg-muted'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-foreground">{type.label}</span>
              <p className="text-xs text-muted-foreground">{type.description}</p>
            </button>
          );
        })}
      </div>
    </div>,
    <div key="travel" className="space-y-4">
      <div className="text-center">
        <Users className="w-10 h-10 mx-auto text-blue-600 mb-2" />
        <h2 className="font-serif text-xl font-bold text-primary">Traveling with?</h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {travelContexts.map(ctx => (
          <button
            key={ctx.id}
            onClick={() => setTravelContext(ctx.id)}
            className={`p-3 rounded-xl text-center transition-all text-sm font-medium ${
              travelContext === ctx.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted/30 text-foreground hover:bg-muted/50 border border-border'
            }`}
          >
            {ctx.label}
          </button>
        ))}
      </div>
    </div>,
    <div key="times" className="space-y-4">
      <div className="text-center">
        <Sparkles className="w-10 h-10 mx-auto text-orange-600 mb-2" />
        <h2 className="font-serif text-xl font-bold text-primary">When for activities?</h2>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {timePreferences.map(t => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => toggle(t.id, times, setTimes)}
              className={`p-3 rounded-xl text-center transition-all ${
                times.includes(t.id)
                  ? 'bg-orange-500 text-white'
                  : 'bg-muted/30 text-foreground hover:bg-muted/50 border border-border'
              }`}
            >
              <Icon className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs font-medium block">{t.label}</span>
              <span className="text-xs opacity-80">{t.time}</span>
            </button>
          );
        })}
      </div>
    </div>,
    <div key="dietary" className="space-y-4">
      <div className="text-center">
        <Sparkles className="w-10 h-10 mx-auto text-teal-600 mb-2" />
        <h2 className="font-serif text-xl font-bold text-primary">Dietary notes?</h2>
        <p className="text-muted-foreground text-xs">Optional</p>
      </div>
      <textarea
        value={dietaryNotes}
        onChange={e => setDietaryNotes(e.target.value)}
        placeholder="e.g., Vegan, no nuts..."
        className="w-full p-3 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-accent resize-none h-20 text-sm"
      />
    </div>,
  ];

  const isLastStep = step === steps.length - 1;
  const canProceed = step === 0 ? selectedFoods.length > 0
    : step === 1 ? selectedActivities.length > 0
    : step === 2 ? selectedHobbies.length > 0
    : step === 3 ? personality !== ''
    : step === 4 ? travelContext !== ''
    : step === 5 ? times.length > 0
    : true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden animate-fadeSlideIn">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
              ☕
            </div>
            <span className="text-xs text-muted-foreground">Step {step + 1} of {steps.length}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-muted/30 h-1 shrink-0">
          <div
            className="bg-primary h-1 transition-all duration-300"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-6">
          {steps[step]}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-border shrink-0">
          {step > 0 ? (
            <Button variant="outline" onClick={() => setStep(s => s - 1)} className="rounded-full px-5 text-sm">
              Back
            </Button>
          ) : (
            <button onClick={onClose} className="text-sm text-muted-foreground hover:text-foreground">
              Skip
            </button>
          )}

          {isLastStep ? (
            <Button
              onClick={handleSave}
              disabled={!canProceed || saving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 text-sm disabled:opacity-60"
            >
              {saving ? 'Saving...' : <><span>Done</span><ArrowRight className="w-3 h-3 ml-1" /></>}
            </Button>
          ) : (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canProceed}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 text-sm disabled:opacity-60"
            >
              <span>Next</span><ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
