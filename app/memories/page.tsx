'use client';

import React from 'react';
import AppLayout from '@/src/components/layout/AppLayout';
import MemoriesTab from '@/src/components/memories/MemoriesTab';

export default function MemoriesPage() {
  return (
    <AppLayout>
      <MemoriesTab />
    </AppLayout>
  );
}
