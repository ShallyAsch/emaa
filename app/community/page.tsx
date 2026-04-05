'use client';

import React from 'react';
import AppLayout from '@/src/components/layout/AppLayout';
import CommunityTab from '@/src/components/community/CommunityTab';

export default function CommunityPage() {
  return (
    <AppLayout>
      <CommunityTab />
    </AppLayout>
  );
}

