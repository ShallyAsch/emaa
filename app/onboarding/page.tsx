'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PreferencesModal from '@/src/components/auth/PreferencesModal';

export default function OnboardingPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // Auto-open modal after brief delay for page render
  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl mx-auto mb-4">
          ☕
        </div>
        <h1 className="font-serif text-2xl font-bold text-primary mb-2">Set Your Preferences</h1>
        <p className="text-muted-foreground">Help us personalize your experience</p>
      </div>

      {showModal && <PreferencesModal onClose={handleClose} />}
    </div>
  );
}
