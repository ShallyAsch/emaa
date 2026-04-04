'use client';

import React from 'react';
import Image from 'next/image';
import { Activity } from '@/src/lib/types';
import { Users, Clock, AlertCircle } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  isReserved: boolean;
  onReserve: () => void;
}

export default function ActivityCard({
  activity,
  isReserved,
  onReserve,
}: ActivityCardProps) {
  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'ceremony':
        return 'bg-amber-50 border-amber-200';
      case 'meal':
        return 'bg-orange-50 border-orange-200';
      case 'cultural':
        return 'bg-purple-50 border-purple-200';
      case 'wellness':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-card border-border';
    }
  };

  const typeEmoji: Record<Activity['type'], string> = {
    ceremony: '☕',
    meal: '🍽️',
    cultural: '🎭',
    wellness: '🧘',
    activity: '🎯',
  };

  return (
    <div className={`glass border rounded-2xl overflow-hidden transition-smooth hover:shadow-warm ${getActivityColor(activity.type)}`}>
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        {activity.image && (
          <div className="relative w-full md:w-40 h-40 flex-shrink-0">
            <Image
              src={activity.image}
              alt={activity.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
          <div>
            {/* Header with time and type */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-baseline gap-3">
                <div className="text-2xl font-serif font-bold text-primary">
                  {activity.time}
                </div>
                <div className="text-2xl">{typeEmoji[activity.type]}</div>
              </div>
              {isReserved && (
                <div className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                  Reserved
                </div>
              )}
            </div>

            {/* Title and description */}
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {activity.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {activity.description}
            </p>

            {/* Meta info */}
            <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
              {activity.duration && (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activity.duration}
                </div>
              )}
              {activity.maxGuests && (
                <div className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {activity.currentGuests || 0}/{activity.maxGuests} guests
                </div>
              )}
              {activity.reservationDeadline && (
                <div className="flex items-center gap-1 text-amber-600">
                  <AlertCircle className="w-3 h-3" />
                  Reserve by {activity.reservationDeadline}
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button
              onClick={onReserve}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-smooth ${
                isReserved
                  ? 'bg-secondary text-secondary-foreground hover:opacity-90'
                  : 'bg-accent/20 text-accent hover:bg-accent/30'
              }`}
            >
              {isReserved ? 'Reserved ✓' : 'Reserve'}
            </button>
            <button className="px-4 py-2 rounded-lg font-medium text-sm bg-muted text-foreground hover:bg-muted/80 transition-smooth">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
