'use client';

import React from 'react';
import AppLayout from '@/src/components/layout/AppLayout';
import TodayTab from '@/src/components/today/TodayTab';

export default function TodayPage() {
  return (
    <AppLayout>
      <TodayTab />
    </AppLayout>
  );
}
