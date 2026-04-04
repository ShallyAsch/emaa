'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Clock, MapPin, CheckCircle2, Heart, ChevronRight, AlertCircle } from 'lucide-react';
import ExperienceModal from '@/components/shared/ExperienceModal';
import { mockGuest } from '@/lib/mockData';

interface ScheduledActivity {
  id: string;
  time: string;
  title: string;
  location: string;
  description: string;
  whatToWear: string[];
  preparation: string[];
  image?: string;
  completed?: boolean;
}

const mockScheduledActivities: ScheduledActivity[] = [
  {
    id: '1',
    time: '10:00 AM',
    title: 'Buna Ceremony',
    location: 'Garden Pavilion',
    description: 'Traditional Ethiopian coffee ceremony',
    whatToWear: ['Light, breathable clothing', 'Comfortable shoes', 'Layers for outdoor setting'],
    preparation: [
      'Drink plenty of water beforehand',
      'Arrive 10 minutes early',
      'Remove any strong perfumes (respect the aroma)',
    ],
    image: '/buna-ceremony.jpg',
    completed: true,
  },
  {
    id: '2',
    time: '2:00 PM',
    title: 'Traditional Weaving Workshop',
    location: 'Artisan Studio',
    description: 'Learn to weave a traditional mesob basket',
    whatToWear: [
      'Casual, comfortable clothing',
      'Closed-toe shoes',
      'Avoid loose sleeves',
    ],
    preparation: [
      'Bring water bottle',
      'Trim nails for safety',
      'Come with an open mind and patience',
    ],
    image: '/culture-hero.jpg',
    completed: true,
  },
  {
    id: '3',
    time: '5:30 PM',
    title: 'Welcome Feast',
    location: 'Main Dining Hall',
    description: 'Authentic Ethiopian cuisine experience',
    whatToWear: ['Smart casual', 'Comfortable but elegant'],
    preparation: [
      'Come with appetite!',
      'Traditional eating from shared platter experience',
      'Arrive on time for warm food',
    ],
    image: '/dining-hall.jpg',
    completed: false,
  },
];

const upcomingIn30Minutes = mockScheduledActivities[2];

export default function MyScheduleTab() {
  const [selectedActivity, setSelectedActivity] = useState<ScheduledActivity | null>(null);
  const [showPreparation, setShowPreparation] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(28);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const completedCount = mockScheduledActivities.filter((a) => a.completed).length;
  const totalCount = mockScheduledActivities.length;
  const progressPercentage = (completedCount / totalCount) * 100;

  const PreparationModal = ({
    activity,
    onClose,
  }: {
    activity: ScheduledActivity;
    onClose: () => void;
  }) => {
    if (!activity) return null;

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="glass rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header with Image */}
          <div className="relative h-48 w-full">
            {activity.image && (
              <Image
                src={activity.image}
                alt={activity.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-smooth"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          <div className="p-8 space-y-8">
            {/* Title & Time */}
            <div>
              <h2 className="font-serif text-3xl font-bold text-primary mb-2">
                {activity.title}
              </h2>
              <div className="flex items-center gap-4 text-foreground/70">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{activity.location}</span>
                </div>
              </div>
            </div>

            {/* What to Wear */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <span>👔</span> What to Wear
              </h3>
              <ul className="space-y-3">
                {activity.whatToWear.map((item, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-accent font-bold">•</span>
                    <span className="text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Preparation Tips */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <span>✓</span> Preparation Tips
              </h3>
              <ul className="space-y-3">
                {activity.preparation.map((tip, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learn More Link */}
            <div className="bg-primary/5 rounded-xl p-5 border border-primary/20 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-smooth">
              <div>
                <p className="text-sm font-semibold text-primary mb-1">Want to learn more?</p>
                <p className="text-xs text-muted-foreground">Explore traditions & cultural context</p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Close */}
            <button
              onClick={onClose}
              className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-3 rounded-lg transition-smooth"
            >
              Ready to Go! ❤️
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* No Hero - Start with Content */}
      <div className="px-4 md:px-6 py-8 md:py-12 space-y-12 max-w-5xl mx-auto">
        {/* Personal Greeting */}
        <div className="space-y-4">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-primary">
            My Schedule
          </h1>
          <p className="text-lg text-foreground/70">
            Here&apos;s what&apos;s waiting for you today, {mockGuest.name} ❤️
          </p>
          <p className="text-sm text-muted-foreground">
            These moments are waiting just for you
          </p>
        </div>

        {/* Daily Progress Indicator */}
        <div className="glass rounded-2xl p-6 shadow-warm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-primary">Today&apos;s Progress</span>
              <span className="text-sm text-accent font-bold">
                {completedCount} of {totalCount} completed
              </span>
            </div>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-secondary rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scheduled Activities Timeline */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Chronological Timeline</h2>

          {mockScheduledActivities.map((activity, idx) => (
            <div
              key={activity.id}
              className={`glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all group ${
                activity.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Time Card */}
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl px-5 py-4 text-center border border-accent/30">
                      <div className="font-bold text-2xl text-accent">
                        {activity.time.split(' ')[0]}
                      </div>
                      <div className="text-xs text-primary uppercase font-semibold tracking-wide">
                        {activity.time.split(' ')[1]}
                      </div>
                    </div>
                  </div>

                  {/* Activity Details */}
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      {activity.completed && (
                        <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <h3 className={`font-semibold text-xl mb-2 ${
                          activity.completed ? 'line-through text-muted-foreground' : 'text-primary'
                        }`}>
                          {activity.title}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-foreground/70">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-foreground/70 mb-4 line-clamp-2">
                      {activity.description}
                    </p>

                    {!activity.completed && (
                      <button
                        onClick={() => setShowPreparation(activity.id)}
                        className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-semibold px-5 py-2 rounded-lg transition-smooth group/btn"
                      >
                        Help Me Prepare
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>

                  {/* Image */}
                  {activity.image && (
                    <div className="relative h-32 w-full md:w-32 rounded-xl overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Image
                        src={activity.image}
                        alt={activity.title}
                        fill
                        className="object-cover"
                      />
                      {activity.completed && (
                        <div className="absolute inset-0 bg-black/30" />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Upcoming in 30 Minutes - Prominent Section */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-accent" />
            Upcoming in {timeRemaining} Minutes
          </h2>

          <div className="glass rounded-3xl p-8 md:p-10 border-l-4 border-accent shadow-warm-lg hover:shadow-warm-xl transition-all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Image */}
              {upcomingIn30Minutes.image && (
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src={upcomingIn30Minutes.image}
                    alt={upcomingIn30Minutes.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                </div>
              )}

              {/* Details */}
              <div className="md:col-span-2 space-y-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                    {upcomingIn30Minutes.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-foreground/70">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent" />
                      <span>Starting at {upcomingIn30Minutes.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{upcomingIn30Minutes.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Time until start</div>
                    <div className="text-5xl font-bold text-accent">{timeRemaining}m</div>
                  </div>
                  <button
                    onClick={() => setShowPreparation(upcomingIn30Minutes.id)}
                    className="flex-1 bg-accent hover:bg-accent/90 text-primary font-bold px-6 py-3 rounded-xl transition-smooth text-lg flex items-center justify-center gap-2 group"
                  >
                    Help Me Prepare!
                    <Heart className="w-5 h-5 group-hover:fill-primary transition-smooth" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Add More Activities CTA */}
        <section className="glass rounded-2xl p-8 text-center shadow-warm border border-accent/20">
          <h3 className="font-serif text-2xl font-bold text-primary mb-3">
            Want to Add More Activities?
          </h3>
          <p className="text-foreground/70 mb-6">
            <span className="font-semibold text-accent">Emama Zinashe</span> can help you explore more experiences tailored to your interests
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-smooth"
          >
            Ask Emama
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>

        {/* Emotional Closing Message */}
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 rounded-2xl p-8 text-center border border-secondary/20">
          <p className="text-foreground/80 leading-relaxed italic">
            Every moment on your schedule has been thoughtfully curated. These are not just activities—they&apos;re invitations into our culture, our family, and your home away from home. Enjoy every second. ❤️
          </p>
        </div>
      </div>

      {/* Preparation Modal */}
      {showPreparation && (
        <PreparationModal
          activity={
            mockScheduledActivities.find((a) => a.id === showPreparation)!
          }
          onClose={() => setShowPreparation(null)}
        />
      )}
    </div>
  );
}
