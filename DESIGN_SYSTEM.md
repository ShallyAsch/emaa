# Ende Bete Neuro Dashboard - Design System & Components Overview

## 🎨 Design System

### Color Palette

| Color | Hex | Usage | RGB |
|-------|-----|-------|-----|
| **Primary (Coffee Brown)** | #5C4033 | Headings, main text, buttons | 92, 64, 51 |
| **Secondary (Warm Green)** | #8A9A5B | Accents, badges, highlights | 138, 154, 91 |
| **Accent (Gold)** | #D4A017 | Call-to-action, important elements | 212, 160, 23 |
| **Background (Cream)** | #F8F1E9 | Main background | 248, 241, 233 |
| **Foreground (Dark)** | #2C1810 | Body text | 44, 24, 16 |
| **Muted (Light Gray)** | #D4D0C8 | Secondary text, borders | 212, 208, 200 |

### Typography

- **Headings**: Serif font (elegant, premium)
- **Body**: Sans-serif (clean, readable)
- **Monospace**: Code/data display

### Spacing Scale

```
- xs: 2px (small gaps)
- sm: 4px (tight spacing)
- base: 8px (standard spacing)
- md: 12px (relaxed spacing)
- lg: 16px (generous spacing)
- xl: 24px (section spacing)
- 2xl: 32px (large gaps)
```

### Border Radius

- Small: 4px
- Medium: 8px
- Large: 12px
- Extra Large: 16px+ (cards, containers)

### Shadows

```
- shadow-warm-sm: Subtle shadow for small elements
- shadow-warm-md: Medium shadow for cards
- shadow-warm: Large shadow for hover states
```

## 🧩 Component Library

### Page Layouts

#### Home Dashboard
- **Location**: `/components/home/HomeDashboard.tsx`
- **Features**: Hero section, proactive offers, room status, mood buttons
- **Responsive**: Mobile-first, adapts to tablet/desktop
- **Key Elements**:
  - Large hero image with overlay
  - Multiple card sections
  - Call-to-action to Culture tab

#### Culture & Stories
- **Location**: `/components/culture/CultureTab.tsx`
- **Features**: Experience cards grid, personalization, video previews
- **Responsive**: 1-3 column grid based on screen size
- **Key Elements**:
  - Full-width hero section
  - Card grid with hover effects
  - Personalized recommendations
  - CTA buttons

#### Today Tab
- **Location**: `/components/today/TodayTab.tsx`
- **Features**: Daily timeline of activities
- **Responsive**: Mobile optimized
- **Key Elements**:
  - Time-based activity cards
  - Reserve buttons
  - Activity descriptions

#### Comfort Tab
- **Location**: `/components/comfort/ComfortTab.tsx`
- **Features**: Room controls, quick actions, voice input
- **Responsive**: Mobile-first controls
- **Key Elements**:
  - Temperature slider
  - Lighting mood selector
  - Quick action buttons
  - Voice input ready

#### Memories Tab
- **Location**: `/components/memories/MemoriesTab.tsx`
- **Features**: Photo gallery, family profile editor
- **Responsive**: Grid layout
- **Key Elements**:
  - Photo gallery grid
  - Profile editor
  - Booking similar experiences

#### Messages Tab
- **Location**: `/components/messages/MessagesTab.tsx`
- **Features**: AI host chat, quick replies
- **Responsive**: Chat interface
- **Key Elements**:
  - Message history
  - Quick reply chips
  - AI host avatar

### Card Components

#### CultureExperienceCard
```tsx
<CultureExperienceCard
  experience={experience}
  onParticipate={(exp) => handleParticipate(exp)}
/>
```

**Props**:
- `experience: CultureExperience` - Experience data
- `onParticipate: (exp) => void` - Callback for participate button

**Features**:
- Image with hover zoom
- Category badge
- Personalized recommendation
- Meta information
- Video preview modal

#### ProactiveCard
```tsx
<ProactiveCard
  offer={offer}
  isActive={isActive}
  onToggle={() => toggleOffer()}
/>
```

**Features**:
- AI-generated suggestion
- Accept/Decline actions
- Smooth transitions

#### ActivityCard
```tsx
<ActivityCard activity={activity} />
```

**Features**:
- Time display
- Activity details
- Reserve button
- Duration info

### Layout Component

#### AppLayout
- **Location**: `/components/layout/AppLayout.tsx`
- **Provides**: Navigation, routing structure
- **Features**:
  - Top header with guest name
  - Bottom mobile nav
  - Right desktop sidebar
  - PWA service worker registration

## 📱 Responsive Breakpoints

```
- Mobile: < 640px (sm)
- Small: 640px - 768px (md)
- Medium: 768px - 1024px (lg)
- Large: 1024px - 1280px (xl)
- Extra Large: > 1280px (2xl)
```

## ✨ Glassmorphism Effect

Applied to cards for premium aesthetic:

```css
.glass {
  @apply bg-card backdrop-blur-xl border border-white/20 shadow-xl;
}

.glass-subtle {
  @apply bg-white/5 backdrop-blur-md border border-white/10;
}
```

## 🎯 Button Styles

### Primary Button (Accent)
```tsx
<button className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-3 rounded-lg transition-smooth">
  Action
</button>
```

### Secondary Button (Muted)
```tsx
<button className="bg-muted hover:bg-muted/90 text-foreground font-semibold px-8 py-3 rounded-lg transition-smooth">
  Action
</button>
```

## 📊 Layout Patterns

### Hero Section Pattern
```tsx
<section className="relative h-96 md:h-[500px] w-full overflow-hidden">
  <Image src="..." alt="..." fill className="object-cover" />
  <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
  <div className="absolute inset-0 flex items-center justify-center">
    {/* Content */}
  </div>
</section>
```

### Card Grid Pattern
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Cards */}
</div>
```

### Section Header Pattern
```tsx
<div>
  <div className="flex items-center gap-4 mb-6">
    <div className="w-12 h-1 bg-accent rounded-full" />
    <h2 className="font-serif text-2xl md:text-3xl font-bold">Title</h2>
  </div>
  <p className="text-foreground/70">Description</p>
</div>
```

## 🎬 Animation System

### Hover Effects
```tsx
className="transition-smooth hover:shadow-warm hover:scale-105"
```

### Fade Transitions
```tsx
className="transition-smooth duration-300 ease-out"
```

### Scale Animations
- Card hover: `scale-105` (5% increase)
- Button hover: subtle shadow change
- Image zoom: `scale-105` on hover

## 🔤 Typography Scale

| Size | Class | Usage |
|------|-------|-------|
| Extra Large | `text-4xl md:text-5xl lg:text-6xl` | Page titles |
| Large | `text-2xl md:text-3xl` | Section headers |
| Medium | `text-lg md:text-xl` | Card titles |
| Base | `text-base` | Body text |
| Small | `text-sm` | Secondary info |
| Extra Small | `text-xs` | Meta info |

## 🎭 State Management Patterns

### Tab Navigation
```tsx
const pathname = usePathname();
const isActive = pathname === path || pathname.startsWith(`${path}/`);
```

### Modal/Dialog Pattern
```tsx
const [showVideo, setShowVideo] = useState(false);
{showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
```

## 🌐 Internationalization Setup

Language support structure:
```tsx
const translations = {
  en: { /* English */ },
  am: { /* Amharic */ }
}
```

Access translation:
```tsx
const lang = mockGuest.preferences.language;
const text = translations[lang].key;
```

## 📈 Performance Optimizations

- **Image**: `next/image` with `fill` prop and `object-cover`
- **Animations**: CSS transitions (hardware accelerated)
- **Code Splitting**: Route-based splitting via Next.js
- **Lazy Loading**: Images load on viewport intersection
- **Caching**: Service worker for PWA offline support

## ♿ Accessibility Features

- Semantic HTML (`<main>`, `<section>`, `<nav>`)
- ARIA labels on interactive elements
- Alt text on all images
- Focus states on buttons
- Color contrast ratios > 4.5:1
- Touch targets > 44px x 44px

---

**This design system ensures consistency, scalability, and a premium user experience across the entire Ende Bete dashboard.**
