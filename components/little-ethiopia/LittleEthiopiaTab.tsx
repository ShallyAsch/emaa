'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronRight, Heart } from 'lucide-react';
import ExperienceModal from '@/components/shared/ExperienceModal';
import { mockCultureExperiences } from '@/lib/mockData';

const ethiopianGames = [
  {
    id: 'g1',
    title: 'Mancala / Gebeta',
    subtitle: 'Ancient Strategy Game',
    image: '/culture-hero.jpg',
    description: 'An ancient game of strategy and skill played with stones and wooden board, passed down through Ethiopian generations.',
    historicalContext: 'Gebeta has been played in Ethiopia for over a thousand years. It requires deep strategic thinking and patience, teaching players about balance and foresight.',
    color: 'from-amber-600 to-amber-400',
  },
  {
    id: 'g2',
    title: 'Dama',
    subtitle: 'Ethiopian Checkers',
    image: '/pool-garden.jpg',
    description: 'A beloved board game similar to checkers, enjoyed across Ethiopia in coffee ceremonies and family gatherings.',
    historicalContext: 'Dama represents the Ethiopian tradition of intellectual pursuit and friendly competition. Many legendary matches have shaped Ethiopian culture.',
    color: 'from-emerald-600 to-emerald-400',
  },
  {
    id: 'g3',
    title: 'Tet Mefetel',
    subtitle: 'Traditional Dice Game',
    image: '/dining-hall.jpg',
    description: 'A thrilling game of chance and luck, traditionally played during celebrations and family gatherings.',
    historicalContext: 'Tet Mefetel brings communities together with excitement and laughter, creating bonds that last lifetimes.',
    color: 'from-rose-600 to-rose-400',
  },
  {
    id: 'g4',
    title: 'Enqera',
    subtitle: 'Ethiopian Wrestling',
    image: '/spa-wellness.jpg',
    description: 'A traditional wrestling sport combining strength, technique, and respect. Often performed at festivals and celebrations.',
    historicalContext: 'Enqera celebrates the warrior spirit of Ethiopia, taught from generation to generation as a symbol of courage and honor.',
    color: 'from-orange-600 to-orange-400',
  },
];

export default function LittleEthiopiaTab() {
  const [selectedExperience, setSelectedExperience] = useState<(typeof mockCultureExperiences)[0] | null>(null);
  const [selectedGame, setSelectedGame] = useState<(typeof ethiopianGames)[0] | null>(null);
  const [savedExperiences, setSavedExperiences] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedExperiences((prev) => {
      const updated = new Set(prev);
      updated.has(id) ? updated.delete(id) : updated.add(id);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section - Visually Rich */}
      <section className="relative w-full h-80 md:h-96 lg:h-[500px] overflow-hidden group">
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
          <p className="text-white/80 text-sm md:text-base drop-shadow">
            Discover traditions, games, and stories that connect us all
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="px-4 md:px-6 py-12 space-y-20 max-w-7xl mx-auto">
        {/* Section A: What We Recommend For You */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-block px-4 py-2 bg-accent/20 rounded-full border border-accent/40">
              <span className="text-sm font-semibold text-accent">✨ Personalized for You</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              What We Recommend
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These experiences match your interests and celebrate the cultures you love
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCultureExperiences.slice(0, 3).map((exp) => {
              const isSaved = savedExperiences.has(exp.id);
              return (
                <div
                  key={exp.id}
                  className="glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all hover:-translate-y-1 group"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={exp.image}
                      alt={exp.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Save Button */}
                    <button
                      onClick={() => toggleSave(exp.id)}
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
                    <h3 className="font-semibold text-lg text-primary">{exp.title}</h3>
                    <p className="text-sm text-foreground/70 line-clamp-2">{exp.description}</p>
                    
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span className="bg-secondary/10 px-2 py-1 rounded">{exp.duration}</span>
                      <span className="bg-secondary/10 px-2 py-1 rounded">Up to {exp.maxGuests} guests</span>
                    </div>

                    <button
                      onClick={() => setSelectedExperience(exp)}
                      className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold py-2 rounded-lg transition-smooth text-sm flex items-center justify-center gap-2 group"
                    >
                      Tert Tert
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Section B: Traditional Games & Activities */}
        <section className="space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full border border-secondary/40">
              <span className="text-sm font-semibold text-secondary">🎮 Try Something New</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-primary">
              Traditional Games & Activities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Timeless games that bring joy, connection, and laughter across generations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ethiopianGames.map((game) => (
              <div
                key={game.id}
                className="glass rounded-2xl overflow-hidden shadow-warm hover:shadow-warm-lg transition-all hover:-translate-y-1 cursor-pointer group"
                onClick={() => setSelectedGame(game)}
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={game.image}
                    alt={game.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-40 transition-opacity mix-blend-overlay`} />
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

      {/* Experience Modal */}
      {selectedExperience && (
        <ExperienceModal
          isOpen={!!selectedExperience}
          onClose={() => setSelectedExperience(null)}
          title={selectedExperience.title}
          description={selectedExperience.description}
          historicalContext={`Join for ${selectedExperience.duration}. Perfect for ${selectedExperience.maxGuests} guests. ${selectedExperience.personalizedRecommendation}`}
          closingNote="This is part of your home story ❤️"
        />
      )}

      {/* Game Modal */}
      {selectedGame && (
        <ExperienceModal
          isOpen={!!selectedGame}
          onClose={() => setSelectedGame(null)}
          title={selectedGame.title}
          description={selectedGame.description}
          historicalContext={selectedGame.historicalContext}
          closingNote="This is part of your home story ❤️"
        />
      )}
    </div>
  );
}
