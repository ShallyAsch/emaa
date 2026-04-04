'use client';

import React from 'react';
import AppLayout from '@/src/components/layout/AppLayout';
import ProfileTab from '@/src/components/profile/ProfileTab';

export default function ProfilePage() {
  return (
    <AppLayout>
      <ProfileTab />
    </AppLayout>
  );
}
