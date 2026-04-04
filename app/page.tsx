'use client';

import React from 'react';
import AppLayout from '@/src/components/layout/AppLayout';
import HomeDashboard from '@/src/components/home/HomeDashboard';

export default function HomePage() {
  return (
    <AppLayout>
      <HomeDashboard />
    </AppLayout>
  );
}
