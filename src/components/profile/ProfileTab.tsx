'use client';

import React, { useState } from 'react';
import { 
  User, 
  Heart, 
  Utensils, 
  Mountain, 
  Music, 
  Book, 
  Users, 
  Sparkles,
  Edit3,
  Check,
  ChevronRight,
  Mail,
  Phone,
  Globe,
  Camera,
  Palette,
  TreePine,
  Dumbbell,
  Sun,
  Sunset,
  Moon,
  Coffee,
  Armchair,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfileTab() {
  const [selectedFoods, setSelectedFoods] = useState<string[]>(['spicy', 'traditional', 'comfort', 'sharing']);
  const [selectedActivities, setSelectedActivities] = useState<string[]>(['cultural', 'nature', 'spa', 'music']);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(['reading', 'hiking', 'photography', 'meditation']);
  const [selectedPersonality, setSelectedPersonality] = useState<string>('adventurer');
  const [selectedTravelContext, setSelectedTravelContext] = useState<string>('family');
  const [selectedTimePreferences, setSelectedTimePreferences] = useState<string[]>(['morning', 'evening']);

  const foodPreferences = [
    { id: 'spicy', label: 'Spicy Food' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'comfort', label: 'Comfort Food' },
    { id: 'sharing', label: 'Family Sharing' },
    { id: 'sweets', label: 'Sweet Treats' },
  ];

  const activities = [
    { id: 'cultural', label: 'Cultural Experiences', icon: Palette },
    { id: 'nature', label: 'Nature & Outdoors', icon: TreePine },
    { id: 'spa', label: 'Spa & Wellness', icon: Dumbbell },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'music', label: 'Music & Dance', icon: Music },
    { id: 'learning', label: 'Learning & Workshops', icon: Book },
  ];

  const hobbies = [
    { id: 'reading', label: 'Reading' },
    { id: 'art', label: 'Art & Crafts' },
    { id: 'hiking', label: 'Hiking' },
    { id: 'photography', label: 'Photography' },
    { id: 'meditation', label: 'Meditation' },
    { id: 'cooking', label: 'Cooking' },
  ];

  const personalityTypes = [
    { id: 'adventurer', label: 'The Adventurer', description: 'Loves exploring new places and trying new things', icon: Mountain },
    { id: 'relaxer', label: 'The Relaxer', description: 'Prefers peaceful moments and comfortable settings', icon: Armchair },
    { id: 'explorer', label: 'The Cultural Explorer', description: 'Drawn to history, traditions, and local experiences', icon: Eye },
    { id: 'social', label: 'The Social Butterfly', description: 'Enjoys meeting people and group activities', icon: Users },
  ];

  const travelContexts = [
    { id: 'solo', label: 'Solo Traveler' },
    { id: 'couple', label: 'Couple' },
    { id: 'family', label: 'Family' },
    { id: 'group', label: 'Group/Friends' },
  ];

  const timePreferences = [
    { id: 'morning', label: 'Morning', time: '6 AM - 12 PM', icon: Sun },
    { id: 'afternoon', label: 'Afternoon', time: '12 PM - 6 PM', icon: Sunset },
    { id: 'evening', label: 'Evening', time: '6 PM - 10 PM', icon: Moon },
  ];

  const specialMoments = [
    'Sunset ceremony in the garden',
    'Traditional cooking class',
    'Mountain trek',
  ];

  const toggleSelection = (id: string, current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Profile Header */}
      <div className="px-4 py-8 md:px-8 bg-white border-b border-border">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-5xl mb-4">
            👩‍🦱
          </div>
          <h1 className="font-serif text-3xl font-bold text-primary">Selam</h1>
          <p className="text-muted-foreground mt-1">Guest since 2022 - 3 visits</p>
          <Button variant="outline" className="mt-4 rounded-full" size="sm">
            <Edit3 className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
      </div>

      {/* AI Personalization Note */}
      <div className="px-4 md:px-8 py-6">
        <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Your preferences power our AI</h3>
              <p className="text-muted-foreground text-sm">
                The information you share helps Emama provide personalized recommendations for food, 
                activities, and experiences tailored just for you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Sections */}
      <div className="px-4 md:px-8 space-y-6">
        {/* Basic Information Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h2 className="font-semibold text-foreground">Basic Information</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Full Name</label>
              <p className="font-medium text-foreground mt-1">Selam</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email
              </label>
              <p className="font-medium text-foreground mt-1">selam@example.com</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone
              </label>
              <p className="font-medium text-foreground mt-1">+251911123456</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Globe className="w-3 h-3" /> Preferred Language
              </label>
              <p className="font-medium text-foreground mt-1">English</p>
            </div>
          </div>
        </div>

        {/* Favorite Foods Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Utensils className="w-5 h-5 text-red-600" />
              </div>
              <h2 className="font-semibold text-foreground">Favorite Foods</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {foodPreferences.map((pref) => (
                <button
                  key={pref.id}
                  onClick={() => toggleSelection(pref.id, selectedFoods, setSelectedFoods)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedFoods.includes(pref.id)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {selectedFoods.includes(pref.id) && <Check className="w-4 h-4 inline mr-1" />}
                  {pref.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Activities You Enjoy Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Mountain className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="font-semibold text-foreground">Activities You Enjoy</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {activities.map((activity) => (
                <button
                  key={activity.id}
                  onClick={() => toggleSelection(activity.id, selectedActivities, setSelectedActivities)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedActivities.includes(activity.id)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {selectedActivities.includes(activity.id) && <Check className="w-4 h-4" />}
                  {activity.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <Book className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="font-semibold text-foreground">Hobbies</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="flex flex-wrap gap-2">
              {hobbies.map((hobby) => (
                <button
                  key={hobby.id}
                  onClick={() => toggleSelection(hobby.id, selectedHobbies, setSelectedHobbies)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedHobbies.includes(hobby.id)
                      ? 'bg-amber-500 text-white'
                      : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-border'
                  }`}
                >
                  {selectedHobbies.includes(hobby.id) && <Check className="w-4 h-4 inline mr-1" />}
                  {hobby.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Personality Type Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="font-semibold text-foreground">Personality Type</h2>
            </div>
          </div>
          <div className="p-5">
            <div className="grid gap-3">
              {personalityTypes.map((type) => {
                const IconComponent = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedPersonality(type.id)}
                    className={`p-4 rounded-xl text-left transition-all flex items-start gap-4 ${
                      selectedPersonality === type.id
                        ? 'bg-accent/20 border-2 border-accent'
                        : 'bg-muted/30 border-2 border-transparent hover:bg-muted/50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      selectedPersonality === type.id ? 'bg-accent' : 'bg-muted'
                    }`}>
                      <IconComponent className={`w-5 h-5 ${selectedPersonality === type.id ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{type.label}</span>
                        {selectedPersonality === type.id && (
                          <Check className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Travel Context Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="font-semibold text-foreground">Travel Context</h2>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground mb-4">Who are you traveling with?</p>
            <div className="grid grid-cols-2 gap-3">
              {travelContexts.map((context) => (
                <button
                  key={context.id}
                  onClick={() => setSelectedTravelContext(context.id)}
                  className={`p-4 rounded-xl text-center transition-all ${
                    selectedTravelContext === context.id
                      ? 'bg-primary text-primary-foreground shadow-warm'
                      : 'bg-muted/30 text-foreground hover:bg-muted/50 border border-border'
                  }`}
                >
                  <span className="text-sm font-medium">{context.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Time Preferences Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Sun className="w-5 h-5 text-orange-600" />
              </div>
              <h2 className="font-semibold text-foreground">Time Preferences</h2>
            </div>
          </div>
          <div className="p-5">
            <p className="text-sm text-muted-foreground mb-4">When do you prefer to do activities?</p>
            <div className="grid grid-cols-3 gap-3">
              {timePreferences.map((time) => {
                const IconComponent = time.icon;
                return (
                  <button
                    key={time.id}
                    onClick={() => toggleSelection(time.id, selectedTimePreferences, setSelectedTimePreferences)}
                    className={`p-4 rounded-xl text-center transition-all ${
                      selectedTimePreferences.includes(time.id)
                        ? 'bg-orange-500 text-white shadow-warm'
                        : 'bg-muted/30 text-foreground hover:bg-muted/50 border border-border'
                    }`}
                  >
                    <IconComponent className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm font-medium block">{time.label}</span>
                    <span className="text-xs opacity-80">{time.time}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Special Notes Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
                <Edit3 className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="font-semibold text-foreground">Special Notes</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            <div className="p-4 bg-muted/30 rounded-xl">
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Dietary Notes</label>
              <p className="font-medium text-foreground mt-1">Vegan, no nuts</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl">
              <label className="text-xs text-muted-foreground uppercase tracking-wide">Favorite Seating</label>
              <p className="font-medium text-foreground mt-1">Window overlooking the garden</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl flex items-center gap-3">
              <Coffee className="w-5 h-5 text-amber-700" />
              <div>
                <label className="text-xs text-muted-foreground uppercase tracking-wide">Coffee Preference</label>
                <p className="font-medium text-foreground mt-1">Traditional Ethiopian buna with honey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Moments Card */}
        <div className="bg-white rounded-2xl shadow-warm-md overflow-hidden">
          <div className="p-5 border-b border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-100 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-pink-600" />
                </div>
                <h2 className="font-semibold text-foreground">Special Moments</h2>
              </div>
              <button className="text-sm text-accent font-medium">View all</button>
            </div>
          </div>
          <div className="p-5">
            <div className="space-y-3">
              {specialMoments.map((moment, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-amber-50 rounded-xl border border-pink-100"
                >
                  <div className="w-8 h-8 bg-pink-200 rounded-full flex items-center justify-center">
                    <Heart className="w-4 h-4 text-pink-600" />
                  </div>
                  <span className="text-sm text-foreground">{moment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="pt-4 pb-8">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg font-semibold rounded-xl shadow-warm">
            Save Profile Changes
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
