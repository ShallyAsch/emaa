'use client';

import AppLayout from '@/src/components/layout/AppLayout';
import EventsTab from '@/src/components/events/EventsTab';

export default function EventsPage() {
  return (
    <AppLayout>
      <EventsTab />
    </AppLayout>
  );
}
