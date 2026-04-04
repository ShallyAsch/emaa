'use client';

import React, { useState } from 'react';
import { mockActivities } from '@/src/lib/mockData';
import ActivityCard from './ActivityCard';

export default function TodayTab() {
  const [reservations, setReservations] = useState<Set<string>>(new Set());

  const toggleReservation = (activityId: string) => {
    const newReservations = new Set(reservations);
    if (newReservations.has(activityId)) {
      newReservations.delete(activityId);
    } else {
      newReservations.add(activityId);
    }
    setReservations(newReservations);
  };

  return (
    <div className="w-full md:pr-24">
      <div className="px-4 md:px-6 py-6 max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Today&apos;s Experiences
          </h1>
          <p className="text-muted-foreground">
            Discover what&apos;s happening during your stay
          </p>
        </div>

        {/* Timeline of Activities */}
        <div className="space-y-3">
          {mockActivities.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              isReserved={reservations.has(activity.id)}
              onReserve={() => toggleReservation(activity.id)}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="glass p-6 rounded-2xl mt-8">
          <h3 className="font-semibold text-foreground mb-3">💡 Tip</h3>
          <p className="text-sm text-muted-foreground">
            All experiences can be modified or cancelled up to 30 minutes before
            the scheduled time. Simply speak to your host or use the messages
            tab to reach us.
          </p>
        </div>
      </div>
    </div>
  );
}
