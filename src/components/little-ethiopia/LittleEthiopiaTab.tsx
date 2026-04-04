'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Heart, X, Play } from 'lucide-react';
import { mockCultureExperiences } from '@/src/lib/mockData';

const categories = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'ceremony', label: 'Ceremonies', icon: '☕' },
  { id: 'dining', label: 'Dining', icon: '🍽️' },
  { id: 'culinary', label: 'Culinary', icon: '🍲' },
  { id: 'performance', label: 'Performance', icon: '💃' },
  { id: 'artisan', label: 'Artisan', icon: '🧺' },
];

const ethiopianGames = [
  {
    id: 'g1',
    title: 'Mancala / Gebeta',
    subtitle: 'Ancient Strategy Game',
    image: '/culture-hero.jpg',
    description: 'An ancient game of strategy and skill played with stones and wooden board, passed down through Ethiopian generations.',
    historicalContext: 'Gebeta has been played in Ethiopia for over a thousand years. It requires deep strategic thinking and patience, teaching players about balance and foresight.',
    hasVideo: true,
  },
  {
    id: 'g2',
    title: 'Dama',
    subtitle: 'Ethiopian Checkers',
    image: '/pool-garden.jpg',
    description: 'A beloved board game similar to checkers, enjoyed across Ethiopia in coffee ceremonies and family gatherings.',
    historicalContext: 'Dama represents the Ethiopian tradition of intellectual pursuit and friendly competition. Many legendary matches have shaped Ethiopian culture.',
    hasVideo: false,
  },
  {
    id: 'g3',
    title: 'Eskista Dance',
    subtitle: 'Traditional Shoulder Dance',
    image: '/dining-hall.jpg',
    description: 'The iconic Ethiopian dance where shoulders move to the rhythm, expressing joy and celebration.',
    historicalContext: 'Eskista is performed at weddings, holidays, and celebrations. Each movement tells a story of Ethiopian heritage.',
    hasVideo: true,
  },
  {
    id: 'g4',
    title: 'Traditional Weaving',
    subtitle: 'Mesob Basket Making',
    image: '/spa-wellness.jpg',
    description: 'Learn the intricate art of weaving traditional Ethiopian baskets used in daily life and ceremonies.',
    historicalContext: 'Weaving has been passed down through generations, with each pattern holding cultural significance.',
    hasVideo: true,
  },
];

interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  historicalContext?: string;
  hasVideo?: boolean;
  duration?: string;
  maxGuests?: number;
  personalizedRecommendation?: string;
  videoUrl?: string;
  timeSlot?: string;
  includesFood?: boolean;
}

export default function LittleEthiopiaTab() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [savedExperiences, setSavedExperiences] = useState<Set<string>>(new Set());

  const filteredExperiences = activeCategory === 'all' 
    ? mockCultureExperiences 
    : mockCultureExperiences.filter(exp => exp.category === activeCategory);

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedExperiences((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden group">
        <Image
          src="/culture-hero.jpg"
          alt="Little Ethiopia"
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 space-y-4">
          <h1 className="text-white font-serif text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl text-balance">
            Little Ethiopia
          </h1>
          <p className="text-white/95 text-lg md:text-xl font-light drop-shadow-lg max-w-2xl">
            The heart of home, right here in your resort
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-border shadow-sm">
        <div className="px-4 md:px-8 py-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-warm'
                    : 'bg-muted/50 text-foreground hover:bg-muted'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 md:px-8 py-12 space-y-16 max-w-7xl mx-auto">
        {/* Cultural Experiences Section */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/40">
              <span className="text-sm font-semibold text-accent">Personalized for You</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Cultural Experiences
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click on any experience to learn more about its rich history
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((exp) => {
              const isSaved = savedExperiences.has(exp.id);
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExperience(exp)}
                  className="glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all hover:-translate-y-1 group cursor-pointer"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Video indicator */}
                    {exp.videoUrl && (
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        Video
                      </div>
                    )}
                    
                    {/* Save Button */}
                    <button
                      onClick={(e) => toggleSave(exp.id, e)}
                      className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white rounded-full transition-smooth backdrop-blur-sm z-10"
                      aria-label="Save experience"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isSaved ? 'fill-accent text-accent' : 'text-muted-foreground'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{exp.icon}</span>
                      <span className="text-xs text-secondary font-medium uppercase tracking-wide">{exp.category}</span>
                    </div>
                    <h3 className="font-semibold text-lg text-primary">{exp.title}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-2">{exp.description}</p>
                    
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="bg-secondary/10 px-2 py-1 rounded">{exp.duration}</span>
                      <span className="bg-secondary/10 px-2 py-1 rounded">Up to {exp.maxGuests} guests</span>
                    </div>

                    <button
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-2 rounded-lg transition-smooth text-sm flex items-center justify-center gap-2 group/btn"
                    >
                      Tert Tert
                      <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Traditional Games Section */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full border border-secondary/40">
              <span className="text-sm font-semibold text-secondary">Interactive Experiences</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Traditional Games & Activities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click to explore the rich history and watch immersive videos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ethiopianGames.map((game) => (
              <div
                key={game.id}
                onClick={() => setSelectedExperience(game)}
                className="glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all hover:-translate-y-1 cursor-pointer group"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {game.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                        <Play className="w-6 h-6 text-primary ml-1" />
                      </div>
                    </div>
                  )}
                  {game.hasVideo && (
                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      Video
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {game.title}
                    </h3>
                    <p className="text-xs text-secondary font-medium">{game.subtitle}</p>
                  </div>

                  <button
                    className="w-full bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent text-primary font-semibold py-2 rounded-lg transition-smooth text-sm flex items-center justify-center gap-2 group/btn"
                  >
                    Tert Tert
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 text-center border border-primary/20">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary mb-3">
            Want a Personal Guide?
          </h3>
          <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
            Ask <span className="font-semibold text-accent">Emama Zinashe</span> to recommend the perfect experience just for you
          </p>
          <button
            onClick={() => (window.location.href = '/')}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-smooth"
          >
            Ask Emama
            <ChevronRight className="w-4 h-4" />
          </button>
        </section>
      </div>

      {/* Rich Modal with Video Support */}
      {selectedExperience && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header with Image */}
            <div className="relative h-56 w-full">
              <Image
                src={selectedExperience.image}
                alt={selectedExperience.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              <button
                onClick={() => setSelectedExperience(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-smooth"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <h2 className="font-serif text-3xl font-bold text-white mb-1">
                  {selectedExperience.title}
                </h2>
                {'subtitle' in selectedExperience && (
                  <p className="text-white/80 text-sm">{(selectedExperience as typeof ethiopianGames[0]).subtitle}</p>
                )}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">About This Experience</h3>
                <p className="text-foreground/80 leading-relaxed">{selectedExperience.description}</p>
              </div>

              {/* Video Section - for immersive/story-based content */}
              {selectedExperience.hasVideo && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide">
                    Watch & Learn
                  </h4>
                  <div className="relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl overflow-hidden h-64 flex items-center justify-center border border-border">
                    <div className="text-center">
                      <button className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 rounded-full transition-smooth shadow-warm mb-3">
                        <Play className="w-6 h-6" />
                        Play Video
                      </button>
                      <p className="text-sm text-muted-foreground">Immerse yourself in this experience</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Historical Context */}
              {selectedExperience.historicalContext && (
                <div className="bg-accent/5 rounded-xl p-5 border border-accent/20">
                  <h4 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-2">
                    Cultural Heritage
                  </h4>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {selectedExperience.historicalContext}
                  </p>
                </div>
              )}

              {/* Details for Culture Experiences */}
              {'duration' in selectedExperience && selectedExperience.duration && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold text-foreground">{selectedExperience.duration}</p>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-1">Group Size</p>
                    <p className="font-semibold text-foreground">Up to {selectedExperience.maxGuests} guests</p>
                  </div>
                </div>
              )}

              {/* Closing Note */}
              <div className="bg-primary/5 rounded-xl p-5 border-l-4 border-accent">
                <p className="text-sm font-semibold text-primary italic">
                  This is part of your home story
                </p>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedExperience(null)}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 rounded-lg transition-smooth"
              >
                Close & Explore More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
