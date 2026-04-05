'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';
import { Heart, Eye, EyeOff, Sparkles, Calendar, Users, MessageCircle, ChevronRight, X, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Guest {
  id: string;
  name: string;
  location: string;
  interests: string[];
  avatar: string;
  isVisible: boolean;
  personality?: string;
}

interface SharedMoment {
  id: string;
  image: string;
  caption: string;
  likes: number;
  guestName: string;
  timestamp: string;
}

interface GroupActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  participants: number;
  maxParticipants: number;
  image: string;
  whatToExpect?: string[];
}

// Mock data - expanded to 3 rows
const currentGuests: Guest[] = [
  {
    id: '1',
    name: 'Guest',
    location: 'Addis Ababa',
    interests: ['Coffee', 'Traditional Games', 'Music'],
    avatar: '/guest-1.jpg',
    isVisible: true,
    personality: 'Warm, culturally curious, loves sharing stories',
  },
  {
    id: '2',
    name: 'Marcus',
    location: 'London, UK',
    interests: ['Photography', 'Hiking', 'Culture'],
    avatar: '/guest-2.jpg',
    isVisible: true,
    personality: 'Adventurous, creative, open-minded',
  },
  {
    id: '3',
    name: 'Hirut',
    location: 'Bahir Dar',
    interests: ['Storytelling', 'Art', 'Coffee'],
    avatar: '/guest-1.jpg',
    isVisible: true,
    personality: 'Artistic, thoughtful, great listener',
  },
  {
    id: '4',
    name: 'Chen',
    location: 'Shanghai, China',
    interests: ['Traditional Games', 'Food', 'Wellness'],
    avatar: '/guest-2.jpg',
    isVisible: true,
    personality: 'Curious, mindful, appreciates traditions',
  },
  {
    id: '5',
    name: 'Ayana',
    location: 'Dire Dawa',
    interests: ['Music', 'Dance', 'Coffee'],
    avatar: '/guest-1.jpg',
    isVisible: true,
    personality: 'Energetic, musical, loves celebrations',
  },
  {
    id: '6',
    name: 'James',
    location: 'New York, USA',
    interests: ['History', 'Photography', 'Hiking'],
    avatar: '/guest-2.jpg',
    isVisible: true,
    personality: 'Intellectual, curious, loves learning',
  },
  {
    id: '7',
    name: 'Tigist',
    location: 'Gondar',
    interests: ['Weaving', 'Art', 'Traditional Games'],
    avatar: '/guest-1.jpg',
    isVisible: true,
    personality: 'Creative, patient, skilled artisan',
  },
  {
    id: '8',
    name: 'Emma',
    location: 'Berlin, Germany',
    interests: ['Wellness', 'Food', 'Culture'],
    avatar: '/guest-2.jpg',
    isVisible: true,
    personality: 'Mindful, health-conscious, appreciates quality',
  },
  {
    id: '9',
    name: 'Dawit',
    location: 'Hawassa',
    interests: ['Coffee', 'Music', 'Storytelling'],
    avatar: '/guest-1.jpg',
    isVisible: true,
    personality: 'Charismatic, musical, great conversationalist',
  },
  {
    id: '10',
    name: 'Sophie',
    location: 'Paris, France',
    interests: ['Art', 'Food', 'Photography'],
    avatar: '/guest-2.jpg',
    isVisible: true,
    personality: 'Elegant, artistic, appreciates beauty',
  },
  {
    id: '11',
    name: 'Yonas',
    location: 'Mekelle',
    interests: ['History', 'Traditional Games', 'Hiking'],
    avatar: '/guest-1.jpg',
    isVisible: true,
    personality: 'Knowledgeable, adventurous, great guide',
  },
  {
    id: '12',
    name: 'Mia',
    location: 'Sydney, Australia',
    interests: ['Wellness', 'Dance', 'Culture'],
    avatar: '/guest-2.jpg',
    isVisible: true,
    personality: 'Vibrant, active, loves new experiences',
  },
];

const sharedMoments: SharedMoment[] = [
  {
    id: '1',
    image: '/buna-ceremony.jpg',
    caption: 'Morning coffee ceremony with new friends',
    likes: 12,
    guestName: 'Guest',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    image: '/ethiopian-landscape.jpg',
    caption: 'Sunset from the viewpoint',
    likes: 8,
    guestName: 'Marcus',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    image: '/pool-garden.jpg',
    caption: 'Perfect morning by the pool',
    likes: 15,
    guestName: 'Hirut',
    timestamp: 'Yesterday',
  },
  {
    id: '4',
    image: '/culture-hero.jpg',
    caption: 'Learning traditional weaving',
    likes: 10,
    guestName: 'Chen',
    timestamp: 'Yesterday',
  },
];

const groupActivities: GroupActivity[] = [
  {
    id: '1',
    title: 'Gebeta Game Session',
    description: 'Join us for a traditional Ethiopian board game! All skill levels welcome.',
    time: 'Today, 4:00 PM',
    participants: 3,
    maxParticipants: 6,
    image: '/culture-hero.jpg',
    whatToExpect: [
      'Learn the rules of Gebeta (Mancala)',
      'Play friendly matches with other guests',
      'Enjoy light refreshments',
      'Make new friends over a timeless game',
    ],
  },
  {
    id: '2',
    title: 'Sunset Coffee Ceremony',
    description: 'Experience the traditional buna ceremony while watching the sunset.',
    time: 'Today, 5:30 PM',
    participants: 5,
    maxParticipants: 8,
    image: '/buna-ceremony.jpg',
    whatToExpect: [
      'Traditional coffee roasting demonstration',
      'Learn the cultural significance of buna',
      'Three rounds of coffee as per tradition',
      'Scenic sunset views',
    ],
  },
  {
    id: '3',
    title: 'Morning Yoga by the Lake',
    description: 'Start your day with peaceful yoga overlooking the beautiful lake.',
    time: 'Tomorrow, 7:00 AM',
    participants: 4,
    maxParticipants: 10,
    image: '/spa-wellness.jpg',
    whatToExpect: [
      'Guided yoga session for all levels',
      'Meditation and breathing exercises',
      'Peaceful lakeside atmosphere',
      'Light healthy breakfast afterwards',
    ],
  },
  {
    id: '4',
    title: 'Storytelling Night',
    description: 'Share and listen to stories from around the world by the fire.',
    time: 'Tomorrow, 8:00 PM',
    participants: 6,
    maxParticipants: 12,
    image: '/ethiopian-landscape.jpg',
    whatToExpect: [
      'Share your own stories or just listen',
      'Ethiopian folktales from local storytellers',
      'Warm fire and cozy atmosphere',
      'Traditional snacks and drinks',
    ],
  },
];

export default function CommunityTab() {
  const { user, isLoaded } = useUser();
  const currentUserName = isLoaded ? (user?.firstName || user?.username || 'Guest') : 'Guest';

  // Override the first mock guest with the real user's name
  const guests = currentGuests.map((g, i) => i === 0 ? { ...g, name: currentUserName } : g);

  const [isVisible, setIsVisible] = useState(true);
  const [likedMoments, setLikedMoments] = useState<string[]>([]);
  const [joinedActivities, setJoinedActivities] = useState<string[]>([]);
  const [showEmamaMessage, setShowEmamaMessage] = useState(true);
  const [showJoinPopup, setShowJoinPopup] = useState<GroupActivity | null>(null);
  const [showIntroducePopup, setShowIntroducePopup] = useState(false);
  const [invitedGuests, setInvitedGuests] = useState<Set<string>>(new Set());

  const toggleLike = (momentId: string) => {
    setLikedMoments((prev) =>
      prev.includes(momentId) ? prev.filter((id) => id !== momentId) : [...prev, momentId]
    );
  };

  const handleJoinClick = (activity: GroupActivity) => {
    if (!joinedActivities.includes(activity.id)) {
      setShowJoinPopup(activity);
    }
  };

  const confirmJoin = (activityId: string) => {
    setJoinedActivities((prev) => [...prev, activityId]);
    setShowJoinPopup(null);
  };

  const handleInvite = (guestId: string) => {
    setInvitedGuests((prev) => {
      const updated = new Set(prev);
      updated.add(guestId);
      return updated;
    });
  };

  // Find guests with shared interests
  const sharedInterestGuests = guests.filter(
    (g) => g.interests.includes('Traditional Games') && g.id !== '1'
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="/culture-hero.jpg"
          alt="Our Home Circle"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-6 h-6 text-accent" />
            <span className="text-accent text-sm font-medium">Community</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
            Our Home Circle
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl">
            Moments we share, memories we make — together in your home
          </p>
        </div>
      </div>

      {/* Privacy Toggle */}
      <div className="px-4 md:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl p-4 shadow-warm-md flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isVisible ? (
              <Eye className="w-5 h-5 text-primary" />
            ) : (
              <EyeOff className="w-5 h-5 text-muted-foreground" />
            )}
            <div>
              <p className="font-medium text-foreground text-sm">
                {isVisible ? 'You are visible to others' : 'You are hidden from others'}
              </p>
              <p className="text-xs text-muted-foreground">
                {isVisible ? 'Guests can see your name and interests' : 'Your presence is private'}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsVisible(!isVisible)}
            className="text-sm"
          >
            {isVisible ? 'Hide me' : 'Show me'}
          </Button>
        </div>
      </div>

      {/* AI Match Suggestion */}
      {showEmamaMessage && sharedInterestGuests.length > 0 && (
        <div className="px-4 md:px-8 mt-6">
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 border border-accent/30 rounded-2xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Emama Zinashe noticed something</h3>
                <p className="text-muted-foreground text-sm mb-3">
                  You and {sharedInterestGuests.length} other guests both love traditional games — 
                  would you like to join a Gebeta game at 4 PM today?
                </p>
                <div className="flex gap-3">
                  <Link href="/schedule">
                    <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                      Yes, add to schedule
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => setShowEmamaMessage(false)}
                    className="text-muted-foreground hover:bg-accent/10"
                  >
                    Maybe later
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Who's Here Tonight - 3 rows grid */}
      <section className="px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
              <Users className="w-5 h-5" />
              Who&apos;s Here Tonight
            </h2>
            <p className="text-sm text-muted-foreground">Guests who chose to be visible</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {guests.filter(g => g.isVisible).map((guest) => (
            <div
              key={guest.id}
              className="bg-white rounded-2xl p-4 shadow-warm-md hover:shadow-warm transition-all duration-300 text-center"
            >
              <div className="relative w-16 h-16 rounded-full mx-auto mb-3 overflow-hidden">
                <Image
                  src={guest.avatar}
                  alt={guest.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-semibold text-foreground">{guest.name}</h3>
              <p className="text-xs text-muted-foreground mb-2">{guest.location}</p>
              <div className="flex flex-wrap justify-center gap-1">
                {guest.interests.slice(0, 2).map((interest) => (
                  <span
                    key={interest}
                    className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Emama Introduce Button */}
      <div className="px-4 md:px-8">
        <Button 
          onClick={() => setShowIntroducePopup(true)}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl shadow-warm"
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          Ask Emama Zinashe to introduce me
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-2 italic">
          &quot;Would you like me to connect you with someone who also loves storytelling?&quot;
        </p>
      </div>

      {/* Shared Moments */}
      <section className="px-4 md:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary">Shared Moments</h2>
            <p className="text-sm text-muted-foreground">Recent memories from our guests</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sharedMoments.map((moment) => (
            <div
              key={moment.id}
              className="relative group rounded-xl overflow-hidden shadow-warm-md"
            >
              <div className="relative aspect-square">
                <Image
                  src={moment.image}
                  alt={moment.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white text-xs font-medium line-clamp-2 mb-1">
                  {moment.caption}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-xs">{moment.guestName}</span>
                  <button
                    onClick={() => toggleLike(moment.id)}
                    className="flex items-center gap-1 text-white"
                    aria-label={likedMoments.includes(moment.id) ? 'Unlike' : 'Like'}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedMoments.includes(moment.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                    <span className="text-xs">
                      {moment.likes + (likedMoments.includes(moment.id) ? 1 : 0)}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join the Circle */}
      <section className="px-4 md:px-8 py-8 bg-primary/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-serif text-xl font-bold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Join the Circle
            </h2>
            <p className="text-sm text-muted-foreground">Activities happening soon</p>
          </div>
          <Link href="/schedule">
            <Button variant="ghost" className="text-accent text-sm">
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {groupActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm transition-all duration-300"
            >
              <div className="flex">
                <div className="relative w-28 h-28 md:w-36 md:h-36 flex-shrink-0">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{activity.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="text-accent font-medium">{activity.time}</span>
                      <span>
                        {activity.participants}/{activity.maxParticipants} joined
                      </span>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleJoinClick(activity)}
                    className={`mt-3 w-full ${
                      joinedActivities.includes(activity.id)
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-accent hover:bg-accent/90 text-accent-foreground'
                    }`}
                    size="sm"
                  >
                    {joinedActivities.includes(activity.id) ? 'Joined' : "I'd love to join"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Padding */}
      <div className="h-20" />

      {/* Join Activity Popup */}
      {showJoinPopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden">
            {/* Header with Image */}
            <div className="relative h-40 w-full">
              <Image
                src={showJoinPopup.image}
                alt={showJoinPopup.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setShowJoinPopup(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-smooth"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <h2 className="font-serif text-2xl font-bold text-white">{showJoinPopup.title}</h2>
                <p className="text-white/80 text-sm">{showJoinPopup.time}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-foreground/80 mb-4">{showJoinPopup.description}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{showJoinPopup.participants} people already joined</span>
                </div>
              </div>

              {/* What to Expect */}
              {showJoinPopup.whatToExpect && (
                <div className="bg-accent/10 rounded-xl p-4">
                  <h4 className="font-semibold text-primary mb-3">What to Expect</h4>
                  <ul className="space-y-2">
                    {showJoinPopup.whatToExpect.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-foreground/80">
                        <span className="text-accent mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Join Button */}
              <button
                onClick={() => confirmJoin(showJoinPopup.id)}
                className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-3 rounded-xl transition-smooth"
              >
                Join Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ask Emama to Introduce Me Popup */}
      {showIntroducePopup && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="bg-primary text-primary-foreground p-6 rounded-t-3xl relative">
              <button
                onClick={() => setShowIntroducePopup(false)}
                className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-smooth"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-6 h-6 text-accent" />
                <h2 className="font-serif text-xl font-bold">Personality Matches</h2>
              </div>
              <p className="text-primary-foreground/80 text-sm">
                Emama found guests who share your interests and personality
              </p>
            </div>

            {/* Matches List */}
            <div className="p-6 space-y-4">
              {guests.filter(g => g.id === '1' || g.id === '5' || g.id === '9').map((guest) => (
                <div
                  key={guest.id}
                  className="bg-muted/30 rounded-2xl p-4 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={guest.avatar}
                        alt={guest.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{guest.name}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{guest.location}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {guest.interests.map((interest) => (
                          <span
                            key={interest}
                            className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-foreground/70 italic mb-3">
                        &quot;{guest.personality}&quot;
                      </p>
                      <div className="bg-secondary/10 rounded-lg p-3 mb-3">
                        <p className="text-xs text-secondary font-medium mb-1">Why you match:</p>
                        <p className="text-xs text-foreground/70">
                          You both love {guest.interests[0].toLowerCase()} and have similar warm, curious personalities. 
                          Emama thinks you&apos;d have great conversations!
                        </p>
                      </div>
                      <Button
                        onClick={() => handleInvite(guest.id)}
                        disabled={invitedGuests.has(guest.id)}
                        className={`w-full ${
                          invitedGuests.has(guest.id)
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-accent hover:bg-accent/90 text-primary'
                        }`}
                        size="sm"
                      >
                        {invitedGuests.has(guest.id) ? (
                          'Invitation Sent'
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Invite to Connect
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <p className="text-center text-xs text-muted-foreground">
                Emama will facilitate introductions at a comfortable time
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
