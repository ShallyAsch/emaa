'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CultureExperience } from '@/lib/types';
import { Play } from 'lucide-react';

interface CultureExperienceCardProps {
  experience: CultureExperience;
  onParticipate: (experience: CultureExperience) => void;
}

export default function CultureExperienceCard({
  experience,
  onParticipate,
}: CultureExperienceCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {/* Main Card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="glass rounded-2xl overflow-hidden shadow-warm-md hover:shadow-warm transition-smooth group cursor-pointer h-full flex flex-col"
      >
        {/* Image Container */}
        <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden bg-muted">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className={`object-cover transition-smooth duration-500 ${
              hovered ? 'scale-105' : 'scale-100'
            }`}
          />

          {/* Video Button Overlay */}
          {experience.videoUrl && (
            <button
              onClick={() => setShowVideo(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-smooth"
              aria-label={`Watch ${experience.title} video`}
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/80 hover:bg-accent transition-smooth">
                <Play className="w-6 h-6 text-primary fill-primary" />
              </div>
            </button>
          )}

          {/* Category Badge */}
          <div className="absolute top-4 right-4 bg-accent/90 text-primary px-3 py-1 rounded-full text-xs font-semibold">
            {experience.category}
          </div>

          {/* Icon Badge */}
          <div className="absolute top-4 left-4 text-4xl">{experience.icon}</div>
        </div>

        {/* Content Container */}
        <div className="flex-1 p-5 md:p-6 flex flex-col">
          {/* Title */}
          <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-2 text-balance">
            {experience.title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-foreground/80 mb-4 line-clamp-3 leading-relaxed">
            {experience.description}
          </p>

          {/* Meta Info */}
          <div className="flex flex-wrap gap-3 mb-4 text-xs md:text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>⏱️</span>
              <span>{experience.duration}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>👥</span>
              <span>Max {experience.maxGuests} guests</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <span>🕐</span>
              <span>{experience.timeSlot}</span>
            </div>
            {experience.includesFood && (
              <div className="flex items-center gap-1 text-accent font-semibold">
                <span>🍽️</span>
                <span>Includes food</span>
              </div>
            )}
          </div>

          {/* Personalized Recommendation */}
          <div className="mb-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <p className="text-xs md:text-sm text-secondary font-medium leading-relaxed">
              💡 {experience.personalizedRecommendation}
            </p>
          </div>

          {/* Participate Button */}
          <button
            onClick={() => onParticipate(experience)}
            className="w-full mt-auto bg-accent hover:bg-accent/90 text-primary font-semibold py-3 rounded-lg transition-smooth shadow-warm-md hover:shadow-warm"
          >
            Participate
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && experience.videoUrl && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideo(false)}
        >
          <button
            onClick={() => setShowVideo(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-smooth"
            aria-label="Close video"
          >
            ✕
          </button>
          <div
            className="w-full max-w-2xl rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Placeholder for video - Replace with actual video player */}
            <div className="bg-black aspect-video flex items-center justify-center">
              <div className="text-white text-center">
                <Play className="w-12 h-12 mx-auto mb-2" />
                <p className="text-sm">Video preview: {experience.title}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
