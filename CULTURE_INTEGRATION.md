# Culture & Stories Feature Integration Guide

## Overview

The new Culture & Stories feature has been added to the Ende Bete PWA dashboard. This page showcases personalized Ethiopian cultural experiences with a luxurious, hotel-style aesthetic inspired by the Monalisa hotel website design.

## New Files Added

### Components
- `/components/culture/CultureTab.tsx` - Main culture page component with hero section and grid
- `/components/culture/CultureExperienceCard.tsx` - Individual experience card component with hover effects

### Data & Types
- Mock data in `/lib/mockData.ts` - `mockCultureExperiences` array with 5 cultural experiences
- Type definition in `/lib/types.ts` - `CultureExperience` interface

### Routes
- `/app/culture/page.tsx` - Culture page route

### Assets
- `/public/culture-hero.jpg` - Hero section background image

## Design Highlights

### Monalisa Aesthetic Integration

1. **Hero Section**
   - Large, high-quality background image with elegant overlay
   - Centered typography with premium serif font
   - Similar to Monalisa hotel hero structure

2. **Card Grid Layout**
   - 3-column responsive grid (desktop)
   - Glassmorphism effect with soft shadows
   - Hover animations that scale and enhance shadows

3. **Color Palette**
   - Primary: Deep coffee brown (#5C4033)
   - Accent: Gentle gold (#D4A017)
   - Secondary: Warm green (#8A9A5B)
   - Neutrals: Cream backgrounds (#F8F1E9)

4. **Typography**
   - Serif fonts for headings (elegant, premium feel)
   - Clear hierarchy similar to luxury hotel designs
   - Proper spacing and line heights for readability

## Cultural Experiences

The dashboard includes 5 curated experiences:

### 1. Ethiopian Coffee Ceremony (Buna)
- **Duration:** 1.5 hours
- **Max Guests:** 8
- **Personalization:** "Because you enjoy warm drinks and cultural experiences..."
- **Includes:** Food and beverage

### 2. Gursha Experience
- **Duration:** 2 hours
- **Max Guests:** 12
- **Personalization:** "Since you've visited us before and loved family-style dining..."
- **Includes:** Food

### 3. Injera & Doro Wot Night
- **Duration:** 2.5 hours
- **Max Guests:** 10
- **Personalization:** "Your vegan preferences mentioned - special vegan wot experience..."
- **Includes:** Food (with vegan options)

### 4. Eskista Dance Session
- **Duration:** 1 hour
- **Max Guests:** 20
- **Personalization:** "Based on your social preferences from previous visits..."
- **Includes:** No food

### 5. Traditional Mesob Weaving Workshop
- **Duration:** 1.5 hours
- **Max Guests:** 6
- **Personalization:** "You have an appreciation for handcrafted items..."
- **Includes:** No food

## Personalization Logic

Each experience includes a `personalizedRecommendation` field that displays:
- AI-driven suggestions based on guest preferences
- References to previous visits (when applicable)
- Dietary and lifestyle considerations
- Social preference matching

### How to Extend Personalization

1. **Update Guest Preferences** in `/lib/mockData.ts`:
```typescript
export const mockGuest: Guest = {
  preferences: {
    // Add new preference fields
    culturalInterests: ['music', 'food', 'crafts'],
    activityStyle: 'social', // or 'relaxing'
    // ... other preferences
  }
}
```

2. **Create Recommendation Generator** in `/lib/api.ts`:
```typescript
export const generateCultureRecommendation = (
  experience: CultureExperience,
  guestData: Guest
): string => {
  // Implement AI/logic to match preferences
  // Return personalized recommendation text
}
```

3. **Pass Generated Recommendation** to cards:
```typescript
const recommendation = generateCultureRecommendation(
  experience,
  mockGuest
);
```

## Integration Points

### Navigation
- Added to main navigation in `/components/layout/AppLayout.tsx`
- New tab: "Culture" with Palette icon
- Mobile-responsive bottom navigation includes the new tab

### Routing
- New route: `/culture`
- Integrated into tab-based navigation system
- Uses same AppLayout wrapper as other tabs

### Data Flow
1. Culture experiences stored in mock data
2. Passed to CultureExperienceCard components
3. Cards handle interaction (video preview, participate)
4. "Participate" button passes experience to Today tab via sessionStorage

## Customization Guide

### Changing Experiences

1. **Edit in `/lib/mockData.ts`:**
```typescript
export const mockCultureExperiences: CultureExperience[] = [
  {
    id: '1',
    title: 'Your Experience Title',
    image: '/your-image.jpg',
    description: 'Detailed description...',
    // ... other fields
  },
  // Add more experiences
];
```

2. **Fields you can modify:**
   - `title` - Experience name
   - `description` - Long-form storytelling text
   - `image` - Hero image path
   - `duration`, `maxGuests` - Logistics
   - `personalizedRecommendation` - AI/personalized text
   - `timeSlot` - When it's offered
   - `includesFood` - Food indicator

### Styling Customization

#### Card Styling
- Edit in `/components/culture/CultureExperienceCard.tsx`
- Modify hover effects: `scale-105` to `scale-110`
- Change shadow: `shadow-warm` to `shadow-lg`
- Update button colors: change `bg-accent` class

#### Hero Section
- Edit in `/components/culture/CultureTab.tsx`
- Gradient overlay: `bg-gradient-to-b from-black/40...`
- Text sizing: `text-4xl md:text-5xl lg:text-6xl`
- Spacing: adjust `py-12` to `py-16` etc.

### Adding Video Previews

1. **Add video URL to experience:**
```typescript
{
  id: '1',
  // ... other fields
  videoUrl: 'https://your-video-url.com/video.mp4',
}
```

2. **Video player opens in modal** - Already implemented
3. **Replace placeholder** in `/components/culture/CultureExperienceCard.tsx`:
```tsx
// Replace this section with your video player
<div className="bg-black aspect-video flex items-center justify-center">
  <video src={experience.videoUrl} controls className="w-full h-full" />
</div>
```

### Connecting to Backend API

1. **Create API route** `/app/api/experiences/route.ts`:
```typescript
export async function GET() {
  // Fetch from your backend
  const experiences = await fetch('YOUR_API_ENDPOINT');
  return Response.json(experiences);
}
```

2. **Update CultureTab.tsx** to fetch:
```typescript
const [experiences, setExperiences] = useState([]);

useEffect(() => {
  const fetchExperiences = async () => {
    const res = await fetch('/api/experiences');
    const data = await res.json();
    setExperiences(data);
  };
  fetchExperiences();
}, []);
```

3. **Replace mock data usage:**
```typescript
// Change from:
{mockCultureExperiences.map(...)}
// To:
{experiences.map(...)}
```

## Features

### Current Implementation
✅ Responsive grid layout (1-3 columns)
✅ Glassmorphism cards with hover effects
✅ High-quality hero section with overlay
✅ Personalized recommendation badges
✅ Video preview modals (ready for implementation)
✅ "Participate" buttons with routing
✅ Meta information (duration, guests, time, food)
✅ Monalisa-inspired premium design

### Future Enhancements
- Video player integration (embed real videos)
- Guest booking/availability system
- Real-time availability updates
- User review/rating system for experiences
- Photo gallery from past participants
- Integration with guest profiles for better personalization
- Multi-language support (Amharic translations)
- Experience cancellation/modification flow

## Translation Support

### Amharic Translations
Add to `/lib/mockData.ts` translations:
```typescript
export const translations = {
  am: {
    cultureExperiences: 'ባህላዊ ሌላ ያሉ ልምምዶች',
    participate: 'ተሳትፋ',
    // ... add more
  }
}
```

### Update Components
Use translation system in components:
```typescript
const lang = mockGuest.preferences.language;
const title = lang === 'am' ? translations.am.participate : translations.en.participate;
```

## Performance Notes

- Images are optimized with Next.js Image component
- Glassmorphism effects use CSS (hardware accelerated)
- Hover animations use CSS transitions
- Cards are lazy-loadable if needed (implement virtual scrolling for 100+ experiences)

## Accessibility

- All images have alt text
- Buttons are properly labeled
- Video modal has close button with aria-label
- Card content has semantic HTML structure
- Color contrast meets WCAG standards
- Touch targets are 44px minimum (mobile-friendly)

## Browser Compatibility

- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-responsive design tested on iOS and Android
- Glassmorphism supported in modern browsers
- Graceful degradation for older browsers (cards still visible, effects simplified)
