// Type definitions for the Ende Bete application
// Customize these as needed for your backend integration

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  preferences: GuestPreferences;
  familyProfile: FamilyProfile;
}

export interface GuestPreferences {
  coffeeType: 'light' | 'medium' | 'dark' | 'espresso';
  roomTemperature: number;
  lightingPreference: 'soft' | 'cozy' | 'bright' | 'natural';
  language: 'en' | 'am'; // English or Amharic
  dietaryRestrictions: string[];
  favoriteSeating: string;
}

export interface FamilyProfile {
  coffeePreference: string;
  dietaryNotes: string;
  favoriteSeating: string;
  previousVisits: number;
  specialMoments: string[];
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'ceremony' | 'meal' | 'activity' | 'wellness' | 'cultural';
  image?: string;
  duration: string;
  maxGuests?: number;
  currentGuests?: number;
  reservationDeadline?: string;
}

export interface Message {
  id: string;
  sender: 'guest' | 'host';
  content: string;
  timestamp: Date;
  avatar?: string;
}

export interface ChatSession {
  id: string;
  guestId: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Memory {
  id: string;
  guestId: string;
  imageUrl: string;
  title: string;
  date: string;
  visit: string;
}

export interface ProactiveOffer {
  id: string;
  title: string;
  description: string;
  icon: string;
  suggestedTime: string;
  acceptText: string;
  declineText: string;
  onAccept: () => void;
  onDecline: () => void;
}

export interface RoomStatus {
  id: string;
  task: string;
  completed: boolean;
  icon: string;
}

export interface CultureExperience {
  id: string;
  title: string;
  image: string;
  description: string;
  category: 'ceremony' | 'dining' | 'culinary' | 'performance' | 'artisan';
  duration: string;
  maxGuests: number;
  icon: string;
  personalizedRecommendation: string;
  videoUrl?: string;
  timeSlot: string;
  includesFood: boolean;
}
