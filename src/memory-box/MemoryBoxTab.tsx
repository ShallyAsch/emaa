'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useUser } from '@clerk/nextjs';
import {
  Heart,
  Share2,
  Plus,
  Grid3X3,
  List,
  Play,
  ChevronRight,
  X,
  Upload,
  Sparkles,
  Download,
  Calendar,
  Users,
  ImageIcon,
  Video,
  Filter,
} from 'lucide-react';
import ExperienceModal from '@/src/components/shared/ExperienceModal';

interface Memory {
  id: string;
  type: 'photo' | 'video';
  title: string;
  caption: string;
  date: string;
  image: string;
  isCultural: boolean;
  culturalContext?: string;
  isFavorited: boolean;
}

interface EventAttended {
  id: string;
  name: string;
  date: string;
  image: string;
  description: string;
}

interface PersonMet {
  id: string;
  name: string;
  country: string;
  note: string;
  avatar: string;
  isFavorited: boolean;
}

const mockMemories: Memory[] = [
  {
    id: '4',
    type: 'photo',
    title: 'Evening Stroll',
    caption: 'Wandering down the flower-lined paths with friends as the city lights twinkle below',
    date: 'April 2, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-04-05_13-26-52-N3jphwGrLwI1ZZX1E28VeOHtUnoqbN.jpg',
    isCultural: false,
    isFavorited: false,
  },
  {
    id: '5',
    type: 'photo',
    title: 'The Art of Buna',
    caption: 'Learning the ancient Ethiopian coffee ceremony - pouring from the jebena surrounded by nature and tradition',
    date: 'April 1, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4bHlzwR1KL4vEltsRGq37zTP8aZYlc.png',
    isCultural: true,
    isFavorited: true,
  },
  {
    id: '6',
    type: 'photo',
    title: 'Our Home Away From Home',
    caption: 'The kids loved the stunning villa with its dramatic Ethiopian artwork and cozy vibes',
    date: 'April 1, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caption%201-XDbLvqlJjksGJ3RI8l53BTDJwUippc.jpg',
    isCultural: false,
    isFavorited: true,
  },
  {
    id: '7',
    type: 'photo',
    title: 'Quiet Moments',
    caption: 'Finding peace with a good book in the luxurious villa lounge surrounded by Ethiopian art',
    date: 'April 3, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-04-05_13-52-29-m71RqdzsTafRYNfauAdYUV2ArXocuj.jpg',
    isCultural: false,
    isFavorited: true,
  },
  {
  id: '8',
  type: 'photo',
  title: 'First Taste of Injera',
  caption: 'Savoring authentic Ethiopian cuisine - the colors, the spices, the tradition on one beautiful plate',
  date: 'April 1, 2026',
  image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_8_2026-04-05_13-26-52-dpXs89GCqGuPgTEesW9QD6iRGGRkEo.jpg',
  isCultural: false,
  isFavorited: true,
  },
  {
    id: '9',
    type: 'photo',
    title: 'Views That Take Your Breath Away',
    caption: 'Standing at the viewpoint, watching the clouds drift over the sprawling city',
    date: 'April 2, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-04-05_13-26-52-wi6iPMD81kC7s3lZqVXLPhv4MTCSYI.jpg',
    isCultural: false,
    isFavorited: false,
  },
  {
    id: '10',
    type: 'photo',
    title: 'Terrace Dining',
    caption: 'An enchanting evening under the thatched roofs with warm heaters and twinkling lights',
    date: 'April 2, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-04-05_13-26-52-M3Op6y8RZNFeQeMxSb2sSzdvqAZhlJ.jpg',
    isCultural: false,
    isFavorited: true,
  },
  {
    id: '11',
    type: 'photo',
    title: 'Sisters in White',
    caption: 'Traditional Ethiopian elegance - wrapped in beautiful netela shawls for dinner',
    date: 'April 3, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2026-04-05_13-26-52-nTN5ap3SSOhqlML9CYqqvfrtcdB5eO.jpg',
    isCultural: false,
    isFavorited: true,
  },
  {
    id: '12',
    type: 'photo',
    title: 'Lounge Elegance',
    caption: 'Relaxing in the stylish lounge wearing traditional white dress with golden accents',
    date: 'April 3, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2026-04-05_13-52-29-R3U8rEkL8ba8wPfSr7tQqJhhUYHRo0.jpg',
    isCultural: false,
    isFavorited: true,
  },
  {
    id: '13',
    type: 'photo',
    title: 'Window to Nature',
    caption: 'Peaceful moments watching the lush greenery through the floor-to-ceiling windows',
    date: 'April 2, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caption-o5iokqFQ444tVi3ff6lM2onR7TdE8z.jpg',
    isCultural: false,
    isFavorited: true,
  },
  {
    id: '14',
    type: 'photo',
    title: 'Community Dinner',
    caption: 'The grand dining hall filled with laughter, stories, and delicious food',
    date: 'April 3, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_10_2026-04-05_13-26-52-npUESQOXAwn5WbMTiof6j16yWIYAqE.jpg',
    isCultural: false,
    isFavorited: false,
  },
  {
    id: '15',
    type: 'photo',
    title: 'Birthday Surprise',
    caption: 'The staff made my birthday so special with a beautiful cake and singing',
    date: 'April 4, 2026',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_13_2026-04-05_13-26-52-bM59ddvSU9Iq8VvqZVJ40fEaAdoG4H.jpg',
    isCultural: false,
    isFavorited: true,
  },
];

const mockEventsAttended: EventAttended[] = [
  {
    id: 'e1',
    name: 'Buna Ceremony',
    date: 'June 15, 2024',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-04-05_14-24-19-RkG1mVM0fQF3JPWeVguWJwMjkA4MfR.jpg',
    description: 'Traditional Ethiopian coffee ceremony experience',
  },
  {
    id: 'e2',
    name: 'Gebeta Game Night',
    date: 'June 18, 2024',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-04-05_14-24-19-zOyeGxaqdYU6ev9q0H0iGGvLUGMtSM.jpg',
    description: 'Ancient strategy game with local experts',
  },
  {
    id: 'e3',
    name: 'Eskista Dance Workshop',
    date: 'June 16, 2024',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-04-05_14-24-19-CnJMuXueKKGm8Vb5aUi89deEJ2bs90.jpg',
    description: 'Traditional shoulder dance lesson',
  },
  {
    id: 'e4',
    name: 'Welcome Feast',
    date: 'June 15, 2024',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-04-05_14-24-19-xBXuE6FIPdsSS5jKLFlNufqfMoI57p.jpg',
    description: 'Traditional Ethiopian cuisine experience',
  },
];

const mockPeopleMet: PersonMet[] = [
  {
  id: 'p1',
  name: 'Maria',
  country: 'Italy',
  note: 'Shared a coffee ceremony together',
  avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_1_2026-04-05_14-33-06-11Y1DPovZlS0L1fQ3xlIzYj1qAtKu8.jpg',
  isFavorited: true,
  },
  {
  id: 'p2',
  name: 'Yuki',
  country: 'Japan',
  note: 'Beat me at Gebeta twice!',
  avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-04-05_14-33-06-2HxKxDFxJNOP7j6TK4pJHSI2V2WXxL.jpg',
  isFavorited: true,
  },
  {
  id: 'p3',
  name: 'James',
  country: 'United Kingdom',
  note: 'Learned Eskista dance together',
  avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-04-05_14-33-06-BtdwyHkU18a2DZMCMPwZytIhqPH8BE.jpg',
  isFavorited: false,
  },
  {
  id: 'p4',
  name: 'Ahmed',
  country: 'Egypt',
  note: 'Morning yoga partner',
  avatar: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_4_2026-04-05_14-33-06-l21K4CXcGMzCuAkHY4H6WXPqNL7rMu.jpg',
  isFavorited: false,
  },
];

// Hero images using memories 4, 5, 6, 9, 12, 11
const heroImages = [
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_3_2026-04-05_13-26-52-N3jphwGrLwI1ZZX1E28VeOHtUnoqbN.jpg', // 4: Evening Stroll
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_8_2026-04-05_13-26-52-dpXs89GCqGuPgTEesW9QD6iRGGRkEo.jpg', // 5: First Taste of Injera
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/caption%201-XDbLvqlJjksGJ3RI8l53BTDJwUippc.jpg', // 6: Our Home Away From Home
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2_2026-04-05_13-26-52-wi6iPMD81kC7s3lZqVXLPhv4MTCSYI.jpg', // 9: Views That Take Your Breath Away
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2026-04-05_13-52-29-R3U8rEkL8ba8wPfSr7tQqJhhUYHRo0.jpg', // 12: Lounge Elegance
  'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_7_2026-04-05_13-26-52-nTN5ap3SSOhqlML9CYqqvfrtcdB5eO.jpg', // 11: Sisters in White
];

type FilterType = 'all' | 'photos' | 'videos' | 'events' | 'people';

export default function MemoryBoxTab() {
  const { user } = useUser();
  const userName = user?.firstName || user?.username || 'Guest';

  const aiStorySummary = {
    title: 'Your Time at Kuriftu in 3 Moments',
    content: `Dear ${userName}, your journey with us was filled with warmth and discovery. From your first buna ceremony where you learned the ancient art of Ethiopian coffee, to the night you danced Eskista under the stars, to the quiet mornings by the garden - each moment became a thread in the tapestry of your story here. You didn't just visit Kuriftu; you became part of our family. We carry these memories with you, always.`,
    signature: '- Emama Zinashe',
  };

  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [memories, setMemories] = useState(mockMemories);
  const [peopleMet, setPeopleMet] = useState(mockPeopleMet);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCaption, setUploadCaption] = useState('');
  const [reliveDayModal, setReliveDayModal] = useState<string | null>(null);
  const [showAddPersonModal, setShowAddPersonModal] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonCountry, setNewPersonCountry] = useState('');
  const [newPersonNote, setNewPersonNote] = useState('');
  const [newPersonAvatar, setNewPersonAvatar] = useState<string | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventAttended | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const personAvatarInputRef = useRef<HTMLInputElement>(null);

  const highlightedMemories = memories.filter((m) => m.isFavorited).slice(0, 4);

  // Load peopleMet from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('peopleMet');
      if (stored) {
        const parsed = JSON.parse(stored) as PersonMet[];
        if (parsed.length > 0) {
          setPeopleMet(parsed);
        }
      }
    } catch {
      // Invalid data, use defaults
    }
  }, []);

  // Save peopleMet to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('peopleMet', JSON.stringify(peopleMet));
  }, [peopleMet]);

  const filteredMemories = memories.filter((m) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'photos') return m.type === 'photo';
    if (activeFilter === 'videos') return m.type === 'video';
    return true;
  });

  const toggleFavorite = (id: string) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isFavorited: !m.isFavorited } : m))
    );
  };

  const togglePersonFavorite = (id: string) => {
    setPeopleMet((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorited: !p.isFavorited } : p))
    );
  };

  const handleShare = (memory: Memory) => {
    if (navigator.share) {
      navigator.share({
        title: memory.title,
        text: memory.caption,
        url: window.location.href,
      });
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveMemory = () => {
    if (uploadPreview && uploadTitle) {
      const newMemory: Memory = {
        id: `new-${Date.now()}`,
        type: 'photo',
        title: uploadTitle,
        caption: uploadCaption,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        image: uploadPreview,
        isCultural: false,
        isFavorited: false,
      };
      setMemories((prev) => [newMemory, ...prev]);
      setShowUploadModal(false);
      setUploadPreview(null);
      setUploadTitle('');
      setUploadCaption('');
    }
  };

  const handleShareAll = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My Memory Box - Ende Bete Home',
          text: `Check out my ${memories.length} beautiful memories from Kuriftu Resort!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch {
      // User cancelled or error
    }
    setIsSharing(false);
  };

  const handleDownloadAlbum = async () => {
    setIsDownloading(true);
    // Simulate download preparation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Create a simple text file with memory details (in production, this would generate a PDF or ZIP)
    const albumContent = memories.map((m) => `${m.title}\n${m.date}\n${m.caption}\n---`).join('\n\n');
    const blob = new Blob([`My Memory Box Album\n\n${albumContent}`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-memory-box-album.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setIsDownloading(false);
  };

  const handlePersonAvatarSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPersonAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePerson = () => {
    if (newPersonName && newPersonCountry) {
      const newPerson: PersonMet = {
        id: `person-${Date.now()}`,
        name: newPersonName,
        country: newPersonCountry,
        note: newPersonNote || 'Met at the resort',
        avatar: newPersonAvatar || '/culture-hero.jpg',
        isFavorited: false,
      };
      setPeopleMet((prev) => [newPerson, ...prev]);
      setShowAddPersonModal(false);
      setNewPersonName('');
      setNewPersonCountry('');
      setNewPersonNote('');
      setNewPersonAvatar(null);
    }
  };

  const filters: { id: FilterType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All', icon: <Filter className="w-4 h-4" /> },
    { id: 'photos', label: 'Photos', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'videos', label: 'Videos', icon: <Video className="w-4 h-4" /> },
    { id: 'events', label: 'Events', icon: <Calendar className="w-4 h-4" /> },
    { id: 'people', label: 'People', icon: <Users className="w-4 h-4" /> },
  ];

  // Group memories by date for timeline
  const groupedByDate = memories.reduce((acc, memory) => {
    if (!acc[memory.date]) {
      acc[memory.date] = [];
    }
    acc[memory.date].push(memory);
    return acc;
  }, {} as Record<string, Memory[]>);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Emotional Photo Collage */}
      <section className="relative w-full h-72 md:h-96 lg:h-[450px] overflow-hidden">
        {/* Photo Collage Background */}
        <div className="absolute inset-0 grid grid-cols-3 gap-1 opacity-60">
          {heroImages.map((image, index) => (
            <div key={index} className="relative overflow-hidden">
              <Image
                src={image}
                alt=""
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 rounded-full border border-accent/40 backdrop-blur-sm">
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm font-semibold text-accent">Your personal collection of moments from home</span>
          </div>
          <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl text-balance">
            Memory Box
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-light drop-shadow-lg max-w-2xl">
            Moments from your home that you&apos;ll never forget
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-12 space-y-12 max-w-7xl mx-auto">
        {/* Section 1: Highlight Reel */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Highlight Reel</h2>
              <p className="text-muted-foreground text-sm">Your favorite moments at a glance</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlightedMemories.map((memory) => (
              <div
                key={memory.id}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-warm-lg hover:shadow-warm-xl transition-all hover:-translate-y-1 cursor-pointer"
                onClick={() => memory.isCultural && setSelectedMemory(memory)}
              >
                <Image
                  src={memory.image}
                  alt={memory.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                {/* Favorite Badge */}
                <div className="absolute top-3 right-3 bg-accent/90 p-2 rounded-full">
                  <Heart className="w-4 h-4 text-primary fill-primary" />
                </div>

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-xs text-white/70 mb-1">{memory.date}</p>
                  <h3 className="font-semibold text-base">{memory.title}</h3>
                  <p className="text-sm text-white/80 line-clamp-2 mt-1">{memory.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Story Summary Card */}
        <section className="glass rounded-3xl p-8 md:p-10 shadow-warm border border-accent/20 bg-gradient-to-br from-accent/5 to-secondary/5">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-7 h-7 text-accent" />
            </div>
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-primary">
                {aiStorySummary.title}
              </h3>
              <p className="text-sm text-muted-foreground">Generated by Emama Zinashe</p>
            </div>
          </div>
          <p className="text-foreground/80 leading-relaxed italic mb-4">
            &ldquo;{aiStorySummary.content}&rdquo;
          </p>
          <p className="text-accent font-semibold text-right">{aiStorySummary.signature}</p>
        </section>

        {/* Filter Bar */}
        <section className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-smooth ${
                  activeFilter === filter.id
                    ? 'bg-accent text-primary shadow-warm'
                    : 'bg-muted/50 text-foreground hover:bg-muted'
                }`}
              >
                {filter.icon}
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* Section 2: Memory Gallery */}
        {(activeFilter === 'all' || activeFilter === 'photos' || activeFilter === 'videos') && (
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Memory Gallery</h2>
                <p className="text-muted-foreground text-sm">{filteredMemories.length} memories captured</p>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Add New Memory Button - Prominent Gold */}
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-lg transition-smooth shadow-warm"
                >
                  <Plus className="w-5 h-5" />
                  Add New Memory
                </button>

                {/* View Toggle */}
                <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-smooth ${
                      viewMode === 'grid'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('timeline')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md font-medium transition-smooth ${
                      viewMode === 'timeline'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Download Album */}
                <button 
                  onClick={handleDownloadAlbum}
                  disabled={isDownloading}
                  className="flex items-center gap-2 px-4 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary font-medium rounded-lg transition-smooth disabled:opacity-50"
                >
                  <Download className={`w-4 h-4 ${isDownloading ? 'animate-pulse' : ''}`} />
                  {isDownloading ? 'Preparing...' : 'Download Album'}
                </button>

                {/* Share All */}
                <button 
                  onClick={handleShareAll}
                  disabled={isSharing}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-lg transition-smooth disabled:opacity-50"
                >
                  <Share2 className={`w-4 h-4 ${isSharing ? 'animate-pulse' : ''}`} />
                  {isSharing ? 'Sharing...' : 'Share All'}
                </button>
              </div>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {filteredMemories.map((memory) => (
                  <div
                    key={memory.id}
                    className="group relative aspect-square rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all hover:-translate-y-1 cursor-pointer"
                    onClick={() => memory.isCultural && setSelectedMemory(memory)}
                  >
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Video Indicator */}
                    {memory.type === 'video' && (
                      <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm p-2 rounded-full">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                    )}

                    {/* Actions */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(memory.id);
                        }}
                        className="p-2 bg-white/80 hover:bg-white rounded-full transition-smooth backdrop-blur-sm"
                        aria-label="Toggle favorite"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            memory.isFavorited ? 'fill-accent text-accent' : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShare(memory);
                        }}
                        className="p-2 bg-white/80 hover:bg-white rounded-full transition-smooth backdrop-blur-sm"
                        aria-label="Share memory"
                      >
                        <Share2 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                      <p className="text-xs text-white/70 mb-1">{memory.date}</p>
                      <h3 className="font-semibold text-sm line-clamp-1">{memory.title}</h3>
                      <p className="text-xs text-white/80 line-clamp-1 mt-1">{memory.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Timeline View */}
            {viewMode === 'timeline' && (
              <div className="space-y-8">
                {Object.entries(groupedByDate).map(([date, dateMemories]) => (
                  <div key={date} className="relative">
                    {/* Date Header with Relive Button */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-accent" />
                        <h3 className="font-semibold text-lg text-primary">{date}</h3>
                      </div>
                      <button
                        onClick={() => setReliveDayModal(date)}
                        className="flex items-center gap-2 px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-lg transition-smooth text-sm"
                      >
                        <Sparkles className="w-4 h-4" />
                        Relive This Day
                      </button>
                    </div>

                    {/* Timeline Line */}
                    <div className="absolute left-[5px] top-8 bottom-0 w-0.5 bg-border" />

                    {/* Memories for this date */}
                    <div className="space-y-4 pl-8">
                      {dateMemories.map((memory) => (
                        <div
                          key={memory.id}
                          className="glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-md transition-all group"
                        >
                          <div className="flex flex-col md:flex-row gap-6 p-6">
                            {/* Image */}
                            <div className="relative w-full md:w-48 h-48 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                              <Image
                                src={memory.image}
                                alt={memory.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                              {memory.type === 'video' && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                  <Play className="w-8 h-8 text-white fill-white" />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-start justify-between gap-4">
                                <h4 className="font-semibold text-lg text-primary">{memory.title}</h4>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => toggleFavorite(memory.id)}
                                    className="p-2 hover:bg-accent/10 rounded-full transition-smooth"
                                    aria-label="Toggle favorite"
                                  >
                                    <Heart
                                      className={`w-5 h-5 ${
                                        memory.isFavorited ? 'fill-accent text-accent' : 'text-muted-foreground'
                                      }`}
                                    />
                                  </button>
                                  <button
                                    onClick={() => handleShare(memory)}
                                    className="p-2 hover:bg-accent/10 rounded-full transition-smooth"
                                    aria-label="Share memory"
                                  >
                                    <Share2 className="w-5 h-5 text-muted-foreground" />
                                  </button>
                                </div>
                              </div>

                              <p className="text-foreground/70">{memory.caption}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Section 3: Events Attended */}
        {(activeFilter === 'all' || activeFilter === 'events') && (
          <section className="space-y-6">
            <div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">Events Attended</h2>
              <p className="text-muted-foreground text-sm">Experiences you participated in</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {mockEventsAttended.map((event) => (
                <div
                  key={event.id}
                  className="glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-md transition-all group"
                >
                  <div className="relative h-32 w-full">
                    <Image
                      src={event.image}
                      alt={event.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4 space-y-2">
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                    <h3 className="font-semibold text-primary">{event.name}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-2">{event.description}</p>
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="text-sm text-accent font-medium hover:underline flex items-center gap-1 transition-colors"
                    >
                      View Memory
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section 4: People I Met */}
        {(activeFilter === 'all' || activeFilter === 'people') && (
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary">People I Met</h2>
                <p className="text-muted-foreground text-sm">New friends from your stay</p>
              </div>
              <button
                onClick={() => setShowAddPersonModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-primary font-semibold rounded-lg transition-smooth shadow-warm"
              >
                <Plus className="w-5 h-5" />
                Add New Person
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {peopleMet.map((person) => (
                <div
                  key={person.id}
                  className="glass rounded-2xl p-5 shadow-warm hover:shadow-warm-md transition-all flex items-center gap-4"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={person.avatar}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-primary">{person.name}</h3>
                      <span className="text-xs text-muted-foreground">from {person.country}</span>
                    </div>
                    <p className="text-sm text-foreground/70 mt-1 truncate">{person.note}</p>
                  </div>
                  <button
                    onClick={() => togglePersonFavorite(person.id)}
                    className="p-2 hover:bg-accent/10 rounded-full transition-smooth flex-shrink-0"
                    aria-label="Toggle favorite"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        person.isFavorited ? 'fill-accent text-accent' : 'text-muted-foreground'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Emama Message */}
        <section className="glass rounded-2xl p-8 text-center shadow-warm border border-accent/20">
          <p className="text-foreground/80 leading-relaxed italic mb-4">
            &ldquo;Would you like me to help you write a caption or story for this memory? Just tap the chat button below.&rdquo;
          </p>
          <p className="text-accent font-semibold">- Emama Zinashe</p>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
            Create New Memories
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Your next visit is waiting. Come back and add more moments to your Memory Box.
          </p>
          <button
            onClick={() => (window.location.href = '/events')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-smooth"
          >
            Explore Upcoming Events
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="glass rounded-3xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur">
              <h2 className="font-serif text-2xl font-bold text-primary">Add New Memory</h2>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadPreview(null);
                  setUploadTitle('');
                  setUploadCaption('');
                }}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              {/* File Upload / Preview */}
              {uploadPreview ? (
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src={uploadPreview}
                    alt="Preview"
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setUploadPreview(null)}
                    className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-smooth"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-accent/50 transition-colors cursor-pointer"
                >
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="font-semibold text-primary mb-2">Upload Photo or Video</p>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to browse
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Give this memory a title..."
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <textarea
                  placeholder="Add a caption or note..."
                  rows={3}
                  value={uploadCaption}
                  onChange={(e) => setUploadCaption(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
              </div>

              <button
                onClick={handleSaveMemory}
                disabled={!uploadPreview || !uploadTitle}
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-3 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save to My Memory Box
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Relive This Day Modal */}
      {reliveDayModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="glass rounded-3xl max-w-lg w-full shadow-2xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-primary">Relive {reliveDayModal}</h2>
              <button
                onClick={() => setReliveDayModal(null)}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary mb-2">Your Day Summary</h3>
                  <p className="text-foreground/80 leading-relaxed italic">
                    &ldquo;On {reliveDayModal}, you experienced the warmth of Ethiopian hospitality through {groupedByDate[reliveDayModal]?.length || 0} beautiful moments. From sunrise to sunset, each experience wove another thread into your story with us.&rdquo;
                  </p>
                  <p className="text-accent font-semibold mt-4">- Emama Zinashe</p>
                </div>
              </div>

              {/* Day's memories preview */}
              <div className="grid grid-cols-3 gap-2">
                {groupedByDate[reliveDayModal]?.slice(0, 3).map((memory) => (
                  <div key={memory.id} className="relative aspect-square rounded-xl overflow-hidden">
                    <Image
                      src={memory.image}
                      alt={memory.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => setReliveDayModal(null)}
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-3 rounded-lg transition-smooth"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Person Modal */}
      {showAddPersonModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="glass rounded-3xl max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur">
              <h2 className="font-serif text-2xl font-bold text-primary">Add New Person</h2>
              <button
                onClick={() => {
                  setShowAddPersonModal(false);
                  setNewPersonName('');
                  setNewPersonCountry('');
                  setNewPersonNote('');
                  setNewPersonAvatar(null);
                }}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-8 space-y-6">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <div
                  onClick={() => personAvatarInputRef.current?.click()}
                  className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-dashed border-border hover:border-accent/50 transition-colors cursor-pointer"
                >
                  {newPersonAvatar ? (
                    <Image
                      src={newPersonAvatar}
                      alt="Avatar preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/50">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Tap to add a photo</p>
              </div>
              <input
                ref={personAvatarInputRef}
                type="file"
                accept="image/*"
                onChange={handlePersonAvatarSelect}
                className="hidden"
              />

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={newPersonCountry}
                  onChange={(e) => setNewPersonCountry(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
                />
                <textarea
                  placeholder="How did you meet? (optional)"
                  rows={3}
                  value={newPersonNote}
                  onChange={(e) => setNewPersonNote(e.target.value)}
                  className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                />
              </div>

              <button
                onClick={handleSavePerson}
                disabled={!newPersonName || !newPersonCountry}
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-3 rounded-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to People I Met
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cultural Context Modal */}
      {selectedMemory && (
        <ExperienceModal
          isOpen={!!selectedMemory}
          onClose={() => setSelectedMemory(null)}
          title={selectedMemory.title}
          description={selectedMemory.caption}
          historicalContext={selectedMemory.culturalContext}
          closingNote="This moment is now part of your story with us."
        />
      )}

      {/* Event Memory Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header with Image */}
            <div className="relative h-48 w-full">
              <Image
                src={selectedEvent.image}
                alt={selectedEvent.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-smooth active:scale-[0.97]"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-white/70 text-xs mb-1">{selectedEvent.date}</p>
                <h2 className="font-serif text-2xl font-bold text-white">{selectedEvent.name}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5">
              <div>
                <p className="text-foreground/80 leading-relaxed">{selectedEvent.description}</p>
              </div>

              {/* AI Memory Note */}
              <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
                <div className="flex items-start gap-3 mb-2">
                  <Sparkles className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-primary text-sm mb-1">Emama&apos;s Note</h4>
                    <p className="text-xs text-foreground/70 leading-relaxed italic">
                      &quot;You experienced {selectedEvent.name.toLowerCase()} on {selectedEvent.date}. 
                      It was one of those moments that reminds you why we do what we do — bringing people together 
                      through authentic cultural experiences. We hope this memory stays with you always.&quot;
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Convert to a regular memory
                    const newMemory: Memory = {
                      id: `event-${selectedEvent.id}-${Date.now()}`,
                      type: 'photo',
                      title: selectedEvent.name,
                      caption: selectedEvent.description,
                      date: selectedEvent.date,
                      image: selectedEvent.image,
                      isCultural: true,
                      culturalContext: `Attended ${selectedEvent.name} on ${selectedEvent.date}`,
                      isFavorited: false,
                    };
                    setMemories((prev) => [newMemory, ...prev]);
                    setSelectedEvent(null);
                  }}
                  className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold py-3 rounded-xl transition-smooth active:scale-[0.97]"
                >
                  Save to Memory Gallery
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-3 border border-border hover:bg-muted rounded-xl font-medium transition-smooth active:scale-[0.97]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );


      {/* Emama Zinashe Floating AI Assistant */}
      <EmamaAssistant page="memory-box" />
    </div>
  );
}