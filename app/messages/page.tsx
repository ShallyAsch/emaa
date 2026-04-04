'use client';

import React from 'react';
import AppLayout from '@/src/components/layout/AppLayout';
import MessagesTab from '@/src/components/messages/MessagesTab';

export default function MessagesPage() {
  return (
    <AppLayout>
      <MessagesTab />
    </AppLayout>
  );
}
