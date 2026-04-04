# My Ende Bete Home - PWA Dashboard

A beautiful, luxurious Progressive Web App (PWA) dashboard for the **Ende Bete Neuro** Ethiopian resort AI concierge system.

## 🏡 Features

- **5-Tab Navigation**: Home, Today, Comfort, Memories, Messages
- **Progressive Web App**: Works offline with service worker support
- **Responsive Design**: Mobile-first, works on all devices
- **Warm Ethiopian Theme**: Coffee brown, warm green, cream, and gold palette
- **AI-Powered Proactive Suggestions**: Smart, personalized recommendations
- **Chat Interface**: Direct communication with AI host
- **Photo Gallery**: Memory management with past experiences
- **Room Controls**: Temperature, lighting, and quick requests
- **Voice Ready**: Microphone integration for hands-free commands

## 🎨 Design System

### Color Palette
- **Primary**: Coffee Brown (#5C4033)
- **Secondary**: Warm Green (#8A9A5B)
- **Background**: Soft Cream (#F8F1E9)
- **Accent**: Gentle Gold (#D4A017)

### Typography
- **Serif Font**: For headings (elegant, warm feel)
- **Sans Font**: For body text (clean, readable)

## 📱 Responsive Breakpoints

- **Mobile** (< 768px): Single-column, bottom navigation
- **Tablet** (768px - 1024px): Two columns, bottom navigation
- **Desktop** (> 1024px): Full layout with right sidebar navigation

## 🛠️ Customization Guide

### Mock Data
All mock data is in `/lib/mockData.ts`. Replace with your real data:

```typescript
// Guest data
export const mockGuest: Guest = {
  id: '1',
  name: 'Selam', // Change guest name
  email: 'selam@example.com',
  // ... customize as needed
};

// Activities
export const mockActivities: Activity[] = [
  // Add your resort activities here
];

// Memories
export const mockMemories: Memory[] = [
  // Update with real photo gallery
];
```

### Images
Replace images in `/public/`:
- `buna-ceremony.jpg` - Hero image for home screen
- `kuriftu-resort.jpg` - Resort ambiance
- `ethiopian-landscape.jpg` - Cultural/landscape imagery

### Theme Colors
Update in `/app/globals.css` - Modify CSS variables:

```css
:root {
  --background: #F8F1E9;
  --primary: #5C4033;
  --secondary: #8A9A5B;
  --accent: #D4A017;
  /* ... other variables */
}
```

### Resort Information
Customize in `/lib/mockData.ts`:

```typescript
export const mockResort = {
  name: 'Kuriftu African Village',
  location: 'Addis Ababa, Ethiopia',
  // ... update as needed
};
```

### Language Support
The system supports English and Amharic. Add/modify translations in `/lib/mockData.ts`:

```typescript
export const translations = {
  en: { /* English */ },
  am: { /* Amharic */ },
};
```

## 📋 Component Structure

```
components/
├── layout/
│   └── AppLayout.tsx         # Main layout with navigation
├── home/
│   ├── HomeDashboard.tsx     # Home page main
│   ├── MoodButtons.tsx       # Mood-based suggestions
│   ├── ProactiveCard.tsx     # AI proactive offers
│   ├── QuickStats.tsx        # Weather & sunset info
│   └── RoomProgressCard.tsx  # Room preparation status
├── today/
│   ├── TodayTab.tsx          # Daily activities list
│   └── ActivityCard.tsx      # Individual activity card
├── comfort/
│   └── ComfortTab.tsx        # Room controls (temp, lighting)
├── memories/
│   ├── MemoriesTab.tsx       # Photo gallery & profile
│   └── FamilyProfileEditor.tsx # Profile editing
└── messages/
    └── MessagesTab.tsx       # Chat interface
```

## 🔧 Backend Integration

### API Endpoints to Implement

1. **Guest Profile** - GET `/api/guests/{guestId}`
2. **Activities** - GET `/api/activities?date={date}`
3. **Messages** - POST `/api/messages`, GET `/api/chat/{sessionId}`
4. **Proactive Offers** - GET `/api/offers/{guestId}`
5. **Room Status** - GET `/api/rooms/{roomId}/status`, POST `/api/rooms/{roomId}/control`
6. **Memories** - GET `/api/memories/{guestId}`, POST `/api/memories`

### Type Definitions
Use TypeScript interfaces in `/lib/types.ts` for type-safe API integration.

## 📡 PWA Configuration

### Service Worker
Located at `/public/sw.js` - handles:
- Offline support
- Cache management
- Network-first strategy for dynamic content

### Manifest
Located at `/public/manifest.json` - PWA configuration:
- App name & description
- Icons (replace with your branding)
- Theme colors
- Display mode (standalone)

### Installation
To make installable on home screen, ensure:
1. HTTPS is enabled (required for PWA)
2. Manifest.json is valid
3. Icons are provided at correct sizes
4. Service worker is registered

## 🎯 Core Pages

### Home Dashboard (`/`)
- Hero image with welcome message
- Proactive AI suggestions
- Room preparation progress
- Mood buttons for quick help
- Quick stats (weather, sunset time)

### Today (`/today`)
- Personalized daily timeline
- Activity cards with descriptions
- One-tap reservations
- Occupancy information

### Comfort (`/comfort`)
- Temperature slider (16-28°C)
- Lighting mood selector
- Quick action buttons
- Voice input ("Speak to your host")
- Problem reporting

### Memories (`/memories`)
- Photo gallery grid
- Editable family profile
- Previous visit information
- Special moments highlight

### Messages (`/messages`)
- Chat interface with AI host
- Quick reply suggestions
- Full conversation history
- Real-time message updates

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Local Development
```bash
npm install
npm run dev
# or
pnpm install
pnpm dev
```

Visit `http://localhost:3000`

## 📝 Customization Checklist

- [ ] Replace guest name in mockData
- [ ] Update resort information
- [ ] Replace hero images
- [ ] Update color palette (if desired)
- [ ] Add real activities
- [ ] Connect to backend API
- [ ] Generate PWA icons
- [ ] Add Amharic translations (if needed)
- [ ] Configure service worker caching
- [ ] Deploy to production

## 🔐 Security Notes

- All guest data should be encrypted in transit
- Use HTTPS for PWA functionality
- Implement proper authentication
- Validate all user inputs
- Use secure HTTP-only cookies for sessions
- Implement rate limiting for API calls

## 📱 Mobile Considerations

- Minimum touch target size: 44px × 44px
- Bottom navigation fixed for easy thumb access
- Large text for readability
- High contrast for accessibility
- Web Speech API ready for voice input

## 🌟 Performance Optimization

- Lazy load images
- Code splitting by route
- Service worker caching
- Image optimization
- Minified CSS and JavaScript

## 📞 Support

For customization questions or API integration help, refer to individual component files where detailed comments explain:
- Data structure expectations
- Event handlers
- Integration points
- Customization opportunities

---

**Created with ❤️ for Ethiopian luxury hospitality**
