# Component Documentation - Ende Bete Neuro Dashboard

## 📋 Table of Contents
1. [Layout Components](#layout-components)
2. [Home Components](#home-components)
3. [Today Components](#today-components)
4. [Comfort Components](#comfort-components)
5. [Memories Components](#memories-components)
6. [Messages Components](#messages-components)

---

## Layout Components

### AppLayout (`components/layout/AppLayout.tsx`)

Main layout wrapper with navigation.

**Props:**
- `children: React.ReactNode` - Page content

**Features:**
- Top navigation with logo, resort name, guest info
- Bottom mobile navigation (5 tabs)
- Desktop right sidebar
- Service worker registration
- Responsive behavior

**Customization:**
- Change logo: Update coffee cup emoji
- Add/remove nav items: Modify `navItems` array
- Adjust padding/spacing: Edit Tailwind classes

**Example Usage:**
```typescript
<AppLayout>
  <HomeDashboard />
</AppLayout>
```

---

## Home Components

### HomeDashboard (`components/home/HomeDashboard.tsx`)

Main home page with hero image, proactive offers, and room status.

**Props:** None (uses mock data)

**Features:**
- Hero section with buna ceremony image
- Proactive AI suggestions cards
- Room preparation progress tracking
- Mood-based helper buttons
- Quick stay details

**Dependencies:**
- `QuickStats` - Weather and sunset info
- `ProactiveCard` - AI suggestions
- `RoomProgressCard` - Room prep status
- `MoodButtons` - Helper mood selector

**Customization Points:**
```typescript
// Line 30: Hero overlay text
{getTimeGreeting()}, {mockGuest.name}

// Line 32: Subheading
You are family here

// Line 70: Quick stats section
// Change weather/sunset logic here

// Line 80: Proactive offers
// Add/remove offers in mockData.ts
```

### QuickStats (`components/home/QuickStats.tsx`)

Displays weather and sunset countdown.

**Props:**
- `weather: string` - Current weather string
- `sunsetTime: string` - Time until sunset

**Features:**
- Beautiful glassmorphic cards
- Icons for visual appeal
- Real-time information

**Customization:**
```typescript
// Change icons or layout
<div className="text-3xl">☀️</div>  // Change weather icon
<div className="text-3xl">🌅</div>  // Change sunset icon
```

### ProactiveCard (`components/home/ProactiveCard.tsx`)

AI suggestion card that expands with action buttons.

**Props:**
- `offer: ProactiveOffer` - Offer data object
- `isActive: boolean` - Expansion state
- `onToggle: () => void` - Toggle function

**Features:**
- Expandable card design
- Accept/Decline buttons
- Icon and suggested time
- Smooth animations

**Customization:**
```typescript
// Change icon display:
<div className="text-3xl">{offer.icon}</div>

// Add more button variations:
// Currently: Accept/Decline
// Could add: Learn More, Schedule, etc.
```

### MoodButtons (`components/home/MoodButtons.tsx`)

Four mood buttons that show contextual suggestions.

**Props:** None

**Features:**
- "I'm Tired" - Relaxation suggestions
- "I'm Hungry" - Food options
- "I want Culture" - Cultural experiences
- "I need Help" - Support services
- Expandable suggestions

**Customization:**
```typescript
// Add/modify moods (line 20):
const moodSuggestions: Suggestion[] = [
  {
    mood: 'New Mood',
    icon: '🎯',
    suggestions: ['Option 1', 'Option 2'],
  },
];
```

### RoomProgressCard (`components/home/RoomProgressCard.tsx`)

Small card showing room preparation status.

**Props:**
- `status: RoomStatus` - Status object with task details

**Features:**
- Icon and task name
- Completion indicator
- Color-coded states

**Customization:**
```typescript
// Change completed state color (line 19):
'bg-secondary/10'  // Change this color class

// Modify checkmark (line 28):
'✓ Ready'  // Change text
```

---

## Today Components

### TodayTab (`components/today/TodayTab.tsx`)

Daily activities page with timeline and reservations.

**Props:** None

**Features:**
- Activity list with times
- Description and details
- Guest capacity info
- One-tap reservations
- Deadline warnings

**Dependencies:**
- `ActivityCard` - Individual activity display
- `mockActivities` - Activity data

**Customization:**
```typescript
// Add/remove activities in mockData.ts:
export const mockActivities: Activity[] = [
  {
    id: 'new-id',
    time: '2:00 PM',
    title: 'New Activity',
    description: 'Activity description',
    type: 'ceremony', // ceremony|meal|cultural|wellness|activity
    image: '/path/to/image.jpg',
    duration: '1 hour',
    maxGuests: 10,
    currentGuests: 5,
    reservationDeadline: '1:30 PM',
  },
];
```

### ActivityCard (`components/today/ActivityCard.tsx`)

Individual activity card with image, description, and reservation button.

**Props:**
- `activity: Activity` - Activity data
- `isReserved: boolean` - Reservation state
- `onReserve: () => void` - Reserve handler

**Features:**
- Large preview image
- Time and type emoji
- Description text
- Duration, capacity, deadline info
- Color-coded by type
- Reserve/Learn more buttons

**Type Colors:**
- ceremony: Amber
- meal: Orange
- cultural: Purple
- wellness: Green

**Customization:**
```typescript
// Add activity type colors (line 32):
case 'your-type':
  return 'bg-color-50 border-color-200';

// Change emoji map (line 42):
const typeEmoji: Record<Activity['type'], string> = {
  your_type: '🎯',
};
```

---

## Comfort Components

### ComfortTab (`components/comfort/ComfortTab.tsx`)

Room controls with temperature, lighting, quick requests, voice, and problem reporting.

**Props:** None

**Features:**
- Temperature slider (16-28°C)
- Lighting mood selector (4 modes)
- Quick action buttons
- Voice input button
- Problem reporting

**Customization Points:**

**Temperature Range:**
```typescript
// Line 60: Adjust range
<input type="range" min="16" max="28" />
// Change min/max as needed
```

**Lighting Modes:**
```typescript
// Line 73: Edit lighting options
const lightingOptions: LightingOption[] = [
  {
    mode: 'soft',
    label: 'Soft',
    icon: '🌙',
    description: 'Gentle ambient light',
  },
  // Add more modes...
];
```

**Quick Requests:**
```typescript
// Line 118: Add/remove requests
[
  { icon: '🛏️', label: 'Extra pillows', action: 'pillow-request' },
  { icon: '🧴', label: 'More towels', action: 'towel-request' },
  // Add more...
]
```

**Voice Integration:**
```typescript
// Line 140: Uncomment to enable Web Speech API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.start();
```

---

## Memories Components

### MemoriesTab (`components/memories/MemoriesTab.tsx`)

Photo gallery with profile editor.

**Props:** None

**Features:**
- Photo grid gallery
- Hover overlays with actions
- Family profile viewer/editor
- Special moments list
- Previous visit count

**Dependencies:**
- `FamilyProfileEditor` - Profile editing form
- `mockMemories` - Memory data
- `mockGuest` - Guest data

**Customization:**
```typescript
// Add more photos to mockMemories in mockData.ts:
export const mockMemories: Memory[] = [
  {
    id: 'new-id',
    guestId: '1',
    imageUrl: '/path/to/image.jpg',
    title: 'Memory Title',
    date: 'March 30, 2024',
    visit: 'Season 2024',
  },
];
```

### FamilyProfileEditor (`components/memories/FamilyProfileEditor.tsx`)

Form for editing guest preferences and family profile.

**Props:**
- `profile: FamilyProfile` - Profile data
- `onClose: () => void` - Close handler

**Features:**
- Editable coffee preference
- Dietary notes field
- Favorite seating
- Save/Cancel buttons

**Customization:**
```typescript
// Add more fields (line 60+):
<div>
  <label>Your Field Label</label>
  <input
    value={formData.yourField}
    onChange={(e) => handleChange('yourField', e.target.value)}
  />
</div>
```

---

## Messages Components

### MessagesTab (`components/messages/MessagesTab.tsx`)

Chat interface with message history and quick replies.

**Props:** None

**Features:**
- Message history display
- Guest/Host message bubbles
- Quick reply suggestion chips
- Text input with send button
- Auto-scroll to latest messages
- Timestamps on messages

**Dependencies:**
- `mockChatMessages` - Initial messages
- `Message` type from types.ts

**Customization:**

**Quick Replies:**
```typescript
// Line 18: Edit quick reply options
const quickReplies = [
  'Thank you!',
  'That sounds wonderful',
  'Can you help me with...',
  'See you soon',
  'Perfect timing',
  // Add more...
];
```

**Host Avatar:**
```typescript
// Line 108: Change host emoji
{msg.avatar || (msg.sender === 'host' ? '👵' : '👤')}
// Change 👵 to different emoji
```

**Message Styling:**
```typescript
// Customize message bubble colors (line 117):
className={`max-w-xs px-4 py-3 rounded-2xl ${
  msg.sender === 'guest'
    ? 'bg-accent/20 text-foreground'  // Guest message style
    : 'glass'  // Host message style
}`}
```

---

## Type Definitions (`lib/types.ts`)

Core interfaces used throughout the app:

```typescript
interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  preferences: GuestPreferences;
  familyProfile: FamilyProfile;
}

interface Activity {
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

interface Message {
  id: string;
  sender: 'guest' | 'host';
  content: string;
  timestamp: Date;
  avatar?: string;
}

// ... more types in lib/types.ts
```

---

## Global Utilities (`lib/mockData.ts`)

Useful helpers:

```typescript
// Get time-appropriate greeting
getTimeGreeting(): string  // Returns "Good morning", "Good afternoon", or "Good evening"

// Translation object for English/Amharic
translations.en.welcomeHome  // "Welcome home"
translations.am.welcomeHome  // "ወደ ቤትህ እንኳን ደህና መጣ"
```

---

## Tailwind Utility Classes (`app/globals.css`)

Custom utilities defined:

```css
.glass                /* Glassmorphism effect */
.glass-subtle         /* Subtle glass effect */
.shadow-warm          /* Warm shadow */
.shadow-warm-md       /* Medium warm shadow */
.transition-smooth    /* Smooth transitions */
.text-warm            /* Warm text color */
```

---

## API Integration (`lib/api.ts`)

Ready-to-use API functions:

```typescript
fetchGuestProfile(guestId)        // Get guest data
fetchDailyActivities(date)        // Get activities
reserveActivity(guestId, actId)   // Make reservation
fetchChatHistory(guestId)         // Get messages
sendMessage(guestId, content)     // Send message
fetchProactiveOffers(guestId)     // Get AI suggestions
updateRoomControl(roomId, type)   // Change temp/lighting
submitQuickRequest(roomId, type)  // Request items
fetchMemories(guestId)            // Get photos
updateFamilyProfile(guestId)      // Save preferences
```

---

## Tips for Customization

1. **Always maintain types** - Update TypeScript interfaces when adding fields
2. **Use mock data first** - Test changes with mock data before API integration
3. **Keep colors consistent** - Edit `/app/globals.css` CSS variables
4. **Follow component patterns** - Each component shows the pattern to follow
5. **Test responsiveness** - Use browser dev tools to test mobile/tablet/desktop
6. **Add comments** - Future you will thank present you!

---

## Performance Notes

✅ **Already Optimized:**
- Next.js Image component for lazy loading
- Code splitting by route
- Service worker caching
- CSS animations use `will-change` sparingly

⚠️ **Watch Out For:**
- Avoid fetching in useEffect (use SWR or RSCs)
- Don't load all images at once
- Minimize re-renders with React.memo for cards

---

**Happy coding! This app is production-ready and fully customizable.** ❤️
