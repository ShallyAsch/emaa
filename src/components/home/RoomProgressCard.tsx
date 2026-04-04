'use client';

import React from 'react';
import { RoomStatus } from '@/src/lib/types';

interface RoomProgressCardProps {
  status: RoomStatus;
}

export default function RoomProgressCard({ status }: RoomProgressCardProps) {
  return (
    <div
      className={`glass p-4 rounded-xl text-center transition-smooth ${
        status.completed
          ? 'bg-secondary/10 border-secondary/30'
          : 'bg-background/50 border-border/50'
      }`}
    >
      <div className="text-2xl mb-2">{status.icon}</div>
      <p className="text-xs font-medium text-foreground leading-tight">
        {status.task}
      </p>
      {status.completed && (
        <div className="mt-2 text-accent text-xs font-semibold">✓ Ready</div>
      )}
    </div>
  );
}
