// Mock data for Ende Bete Neuro dashboard
// Replace with real API calls to your backend

import {
  Guest,
  Activity,
  Memory,
  Message,
  ProactiveOffer,
  RoomStatus,
  CultureExperience,
} from './types';

// Mock guest data
export const mockGuest: Guest = {
  id: '1',
  name: 'Selam',
  email: 'selam@example.com',
  phone: '+251911123456',
  avatar: '👩‍🦱',
  preferences: {
    coffeeType: 'dark',
    roomTemperature: 22,
    lightingPreference: 'cozy',
    language: 'en',
    dietaryRestrictions: ['vegan'],
    favoriteSeating: 'window overlooking the garden',
  },
  familyProfile: {
    coffeePreference: 'Traditional Ethiopian buna with honey',
    dietaryNotes: 'Vegan, no nuts',
    favoriteSeating: 'window overlooking the garden',
    previousVisits: 3,
    specialMoments: [
      'Sunset ceremony in the garden',
      'Traditional cooking class',
      'Mountain trek',
    ],
  },
};

// Mock resort data
export const mockResort = {
  name: 'Kuriftu African Village',
  location: 'Addis Ababa, Ethiopia',
  currentWeather: '24°C, Sunny',
  timeUntilSunset: '3 hours 45 minutes',
  checkinDate: 'March 28, 2024',
  checkoutDate: 'April 2, 2024',
  roomNumber: '12',
};

// Mock daily activities
export const mockActivities: Activity[] = [
  {
    id: '1',
    time: '3:00 PM',
    title: 'Buna Ceremony',
    description:
      'Join us in the garden for a traditional Ethiopian coffee ceremony. Learn the ancient art of roasting, grinding, and brewing coffee while enjoying the company of our hosts.',
    type: 'ceremony',
    image: '/buna-ceremony.jpg',
    duration: '1.5 hours',
    maxGuests: 8,
    currentGuests: 5,
    reservationDeadline: '2:30 PM',
  },
  {
    id: '2',
    time: '5:30 PM',
    title: 'Welcome Feast',
    description:
      'Experience authentic Ethiopian cuisine prepared by our award-winning chefs. Dishes include injera with various wot preparations, tibs, and traditional sides.',
    type: 'meal',
    duration: '2 hours',
    maxGuests: 20,
    currentGuests: 15,
  },
  {
    id: '3',
    time: '7:30 PM',
    title: 'Cultural Evening',
    description:
      'Enjoy traditional Ethiopian music and dance performances. Our performers will share stories of Ethiopian heritage through artistic expression.',
    type: 'cultural',
    duration: '1 hour',
    maxGuests: 30,
    currentGuests: 12,
  },
  {
    id: '4',
    time: '9:00 PM',
    title: 'Stargazing & Meditation',
    description:
      'Wind down your day with a guided meditation session under the stars. Our wellness guide will help you reconnect with yourself in this peaceful setting.',
    type: 'wellness',
    duration: '45 minutes',
    maxGuests: 12,
    currentGuests: 3,
  },
];

// Mock memories (photo gallery)
export const mockMemories: Memory[] = [
  {
    id: '1',
    guestId: '1',
    imageUrl: '/buna-ceremony.jpg',
    title: 'Last Buna Ceremony',
    date: 'March 30, 2024',
    visit: 'Spring 2024',
  },
  {
    id: '2',
    guestId: '1',
    imageUrl: '/kuriftu-resort.jpg',
    title: 'Garden Sunset',
    date: 'March 29, 2024',
    visit: 'Spring 2024',
  },
  {
    id: '3',
    guestId: '1',
    imageUrl: '/ethiopian-landscape.jpg',
    title: 'Mountain Trek',
    date: 'March 28, 2024',
    visit: 'Spring 2024',
  },
];

// Mock proactive offers
export const mockProactiveOffers: ProactiveOffer[] = [
  {
    id: '1',
    title: 'Cold Hibiscus Tea + Foot Massage',
    description:
      'We noticed your long journey and the warm weather. Would you like a refreshing cold hibiscus tea followed by a 15-minute traditional foot massage?',
    icon: '🍵',
    suggestedTime: '5:00 PM',
    acceptText: 'Yes, please',
    declineText: 'Not now',
    onAccept: () => console.log('Accepted foot massage offer'),
    onDecline: () => console.log('Declined foot massage offer'),
  },
  {
    id: '2',
    title: 'Sunset Preparation',
    description:
      'Perfect timing for sunset. Would you like us to arrange a quiet spot in the garden with comfortable seating and light refreshments?',
    icon: '🌅',
    suggestedTime: '5:45 PM',
    acceptText: 'Prepare the spot',
    declineText: 'Skip',
    onAccept: () => console.log('Accepted sunset setup'),
    onDecline: () => console.log('Declined sunset setup'),
  },
];

// Mock room preparation status
export const mockRoomStatus: RoomStatus[] = [
  {
    id: '1',
    task: 'Room cleaned and prepared',
    completed: true,
    icon: '🧹',
  },
  {
    id: '2',
    task: 'Coffee stocked and ready',
    completed: true,
    icon: '☕',
  },
  {
    id: '3',
    task: 'Welcome flowers arranged',
    completed: true,
    icon: '🌸',
  },
  {
    id: '4',
    task: 'Toiletries restocked',
    completed: true,
    icon: '🧴',
  },
  {
    id: '5',
    task: 'Room temperature optimized',
    completed: false,
    icon: '🌡️',
  },
];

// Mock chat messages
export const mockChatMessages: Message[] = [
  {
    id: '1',
    sender: 'host',
    content:
      'Welcome home, Selam! We are so happy to have you back. How was your journey?',
    timestamp: new Date(Date.now() - 3600000),
    avatar: '👵',
  },
  {
    id: '2',
    sender: 'guest',
    content: 'Hello! The journey was long but I am so happy to be here.',
    timestamp: new Date(Date.now() - 3400000),
    avatar: '👩‍🦱',
  },
  {
    id: '3',
    sender: 'host',
    content:
      'Let me prepare something special for you. Your favorite buna ceremony perhaps?',
    timestamp: new Date(Date.now() - 3200000),
    avatar: '👵',
  },
  {
    id: '4',
    sender: 'guest',
    content: 'That would be wonderful! Can we do it at 3 PM in the garden?',
    timestamp: new Date(Date.now() - 3000000),
    avatar: '👩‍🦱',
  },
  {
    id: '5',
    sender: 'host',
    content:
      'Absolutely! I will prepare everything. See you at 3 PM. Rest well until then.',
    timestamp: new Date(Date.now() - 2800000),
    avatar: '👵',
  },
];

// Helper function to get greeting based on time of day
export const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

// Helper function to translate common phrases to Amharic
export const translations = {
  en: {
    welcomeHome: 'Welcome home',
    youAreFamily: 'You are family here',
    speakToYourHost: 'Speak to your host',
    myHome: 'My Ende Bete Home',
    today: 'Today',
    comfort: 'Comfort',
    memories: 'Memories',
    messages: 'Messages',
    home: 'Home',
    isTired: "I'm Tired",
    isHungry: "I'm Hungry",
    wantCulture: 'I want Culture',
    needHelp: 'I need Help',
  },
  am: {
    welcomeHome: 'ወደ ቤትህ እንኳን ደህና መጣ',
    youAreFamily: 'አንተ ቤተሰብ ነህ',
    speakToYourHost: 'ከአስተናጋጁ ጋር ተነጋገር',
    myHome: 'ቤቴ ብዩእ በተ',
    today: 'ዛሬ',
    comfort: 'ምቾት',
    memories: 'ትዝታዎች',
    messages: 'መልዕክቶች',
    home: 'ቤት',
    isTired: ' устал ብዬ ነኝ',
    isHungry: 'ስቃት ብዬ ነኝ',
    wantCulture: 'ባህልን ወድጃለሁ',
    needHelp: 'ረዳታ ያስፈልጋል',
  },
};

// Cultural experiences with personalization
export const mockCultureExperiences: CultureExperience[] = [
  {
    id: '1',
    title: 'Ethiopian Coffee Ceremony (Buna)',
    image: '/buna-ceremony.jpg',
    description:
      'In Ethiopia, coffee is not just a drink — it\'s a ritual of connection, patience, and warmth. The aroma fills the room as stories are shared and time slows down. Learn the ancient art of roasting, grinding, and brewing while joining our family in this sacred tradition.',
    category: 'ceremony',
    duration: '1.5 hours',
    maxGuests: 8,
    icon: '☕',
    personalizedRecommendation:
      'Because you enjoy warm drinks and cultural experiences, this ceremony is perfect for your evenings. It pairs beautifully with your vegan preferences.',
    videoUrl: 'https://example.com/buna-video',
    timeSlot: '3:00 PM - 4:30 PM',
    includesFood: true,
  },
  {
    id: '2',
    title: 'Gursha Experience',
    image: '/ethiopian-landscape.jpg',
    description:
      'Gursha is the Ethiopian tradition of hand-feeding loved ones as a sign of respect, affection, and celebration. Experience this intimate gesture around our family table, a moment of genuine human connection that transcends language.',
    category: 'dining',
    duration: '2 hours',
    maxGuests: 12,
    icon: '🤝',
    personalizedRecommendation:
      'Since you\'ve visited us before and loved our family-style dining, this traditional experience will resonate deeply with you.',
    videoUrl: 'https://example.com/gursha-video',
    timeSlot: '5:30 PM - 7:30 PM',
    includesFood: true,
  },
  {
    id: '3',
    title: 'Injera & Doro Wot Night',
    image: '/kuriftu-resort.jpg',
    description:
      'Join our head chef in discovering the soul of Ethiopian cuisine. Learn to prepare injera from scratch and explore the complex spices in our signature doro wot. This is not just cooking — it\'s storytelling through flavors, passed down through generations.',
    category: 'culinary',
    duration: '2.5 hours',
    maxGuests: 10,
    icon: '🍲',
    personalizedRecommendation:
      'Your dietary notes mention vegan preferences. We offer a special vegan wot experience using traditional spices and vegetables.',
    videoUrl: 'https://example.com/cooking-video',
    timeSlot: '4:00 PM - 6:30 PM',
    includesFood: true,
  },
  {
    id: '4',
    title: 'Eskista Dance Session',
    image: '/ethiopian-landscape.jpg',
    description:
      'Eskista is the vibrant, joyful dance of Ethiopia — a celebration of life where shoulders shimmy and hearts soar. No experience necessary, just bring your spirit and willingness to celebrate with us in movement and music.',
    category: 'performance',
    duration: '1 hour',
    maxGuests: 20,
    icon: '💃',
    personalizedRecommendation:
      'Based on your social preferences from previous visits, you\'ll love the communal and celebratory nature of this traditional dance.',
    videoUrl: 'https://example.com/dance-video',
    timeSlot: '6:00 PM - 7:00 PM',
    includesFood: false,
  },
  {
    id: '5',
    title: 'Traditional Mesob Weaving Workshop',
    image: '/buna-ceremony.jpg',
    description:
      'Mesob baskets are woven into the fabric of Ethiopian life. Sit with our master artisan and learn to weave your own basket, each knot a meditation, each pattern a story of your journey with us.',
    category: 'artisan',
    duration: '1.5 hours',
    maxGuests: 6,
    icon: '🧺',
    personalizedRecommendation:
      'You have an appreciation for handcrafted items. This intimate workshop will give you a piece of Ethiopia to take home.',
    videoUrl: 'https://example.com/weaving-video',
    timeSlot: '2:00 PM - 3:30 PM',
    includesFood: false,
  },
];

// Helper function to generate AI personalization
export const generateCultureRecommendation = (
  experience: CultureExperience,
  guestPreferences: typeof mockGuest.preferences
): string => {
  return experience.personalizedRecommendation;
};
