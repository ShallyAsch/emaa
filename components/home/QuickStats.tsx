'use client';

import React from 'react';

interface QuickStatsProps {
  weather: string;
  sunsetTime: string;
}

export default function QuickStats({ weather, sunsetTime }: QuickStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Weather Card */}
      <div className="glass p-4 rounded-2xl flex items-center gap-4 shadow-warm-md">
        <div className="text-3xl">☀️</div>
        <div>
          <div className="text-xs text-muted-foreground">Now</div>
          <div className="text-sm font-semibold text-foreground">{weather}</div>
        </div>
      </div>

      {/* Sunset Card */}
      <div className="glass p-4 rounded-2xl flex items-center gap-4 shadow-warm-md">
        <div className="text-3xl">🌅</div>
        <div>
          <div className="text-xs text-muted-foreground">Sunset in</div>
          <div className="text-sm font-semibold text-foreground">{sunsetTime}</div>
        </div>
      </div>
    </div>
  );
}
