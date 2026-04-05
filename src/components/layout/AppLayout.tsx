'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/nextjs';
import {
  Home,
  Calendar,
  Wind,
  Images,
  Palette,
  Menu,
  X,
  Map,
  UtensilsCrossed,
  User,
  LogIn,
  UserPlus,
  Users,
} from 'lucide-react';
import { mockResort } from '@/src/lib/mockData';
import EmamaChatWidget from '@/src/components/home/EmamaChatWidget';
import BackToTopButton from '@/src/components/home/BackToTopButton';
import LanguageSwitcher from '@/src/components/layout/LanguageSwitcher';
import PreferencesModal from '@/src/components/auth/PreferencesModal';
import { useUser } from '@clerk/nextjs';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showPrefsModal, setShowPrefsModal] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  // Only prompt once: if user already completed prefs, never show again
  useEffect(() => {
    if (!isSignedIn || !isLoaded) return;
    const promptedKey = `emama-prompted-${user?.id}`;
    if (typeof window !== 'undefined' && sessionStorage.getItem(promptedKey)) return;

    fetch('/api/preferences')
      .then(r => r.json())
      .then(data => {
        if (!data.favorite_foods || data.favorite_foods.length === 0) {
          setShowPrefsModal(true);
        }
        if (typeof window !== 'undefined') {
          sessionStorage.setItem(promptedKey, 'true');
        }
      })
      .catch(() => {});
  }, [isSignedIn, isLoaded, user?.id]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Service worker registration is optional
      });
    }
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  const isActive = (path: string) => pathname === path || pathname.startsWith(`${path}/`);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/explore', label: 'Explore', icon: Map },
    { href: '/gebeta', label: 'Gebeta', icon: UtensilsCrossed },
    { href: '/schedule', label: 'My Schedule', icon: Calendar },
    { href: '/comfort', label: 'Comfort', icon: Wind },
    { href: '/little-ethiopia', label: 'Little Ethiopia', icon: Palette },
    { href: '/events', label: 'Events', icon: Images },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* TOP NAVBAR - Clean White Style */}
      <header className="flex-none z-40 bg-white border-b border-border shadow-sm relative">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground font-bold text-lg group-hover:scale-105 transition-smooth">
              ☕
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-serif text-sm font-semibold text-primary leading-none">
                My Ende Bete
              </span>
              <span className="text-xs text-muted-foreground">Home</span>
            </div>
          </Link>

          {/* Center: Resort Info (Desktop Only) */}
          <div className="hidden md:flex flex-col items-center">
            <div className="font-serif text-lg font-semibold text-primary">{mockResort.name}</div>
            <div className="text-xs text-muted-foreground">{mockResort.location}</div>
          </div>

          {/* Right: Guest Info + Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            {/* Auth Section */}
            <div className="flex items-center gap-2">
              {/* Authenticated: Show UserButton */}
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-9 h-9',
                  },
                }}
              />

              {/* Unauthenticated: Show Login/Signup icons */}
              <SignInButton mode="modal">
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-white hover:bg-accent/10 transition-smooth shadow-sm"
                  aria-label="Sign in"
                >
                  <LogIn className="w-4 h-4 text-primary" />
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-border bg-white hover:bg-accent/10 transition-smooth shadow-sm"
                  aria-label="Sign up"
                >
                  <UserPlus className="w-4 h-4 text-primary" />
                </button>
              </SignUpButton>
            </div>

            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent/10 rounded-lg transition-smooth"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-primary" />
              ) : (
                <Menu className="w-6 h-6 text-primary" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* DESKTOP LEFT SIDEBAR */}
      <aside className="hidden md:flex flex-col w-20 bg-primary border-r border-border shadow-warm-md py-6 px-2 fixed left-0 top-[73px] h-[calc(100vh-73px)] z-30 overflow-y-auto overflow-x-hidden scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {/* Nav Items */}
        <nav className="flex-1 flex flex-col gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-2 px-3 py-3 rounded-lg transition-smooth relative group ${
                  active
                    ? 'bg-accent text-primary shadow-warm'
                    : 'text-primary-foreground hover:bg-primary-foreground/10'
                }`}
                title={item.label}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon className="w-6 h-6" />
                {/* Tooltip */}
                <span className="absolute left-20 bg-primary px-3 py-1 rounded text-xs text-primary-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/30 z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl z-20 md:hidden max-h-[70vh] overflow-y-auto">
            <div className="p-6 space-y-2">
              <div className="text-center mb-6">
                <h2 className="font-serif text-xl font-bold text-primary">Navigate</h2>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-smooth ${
                      active
                        ? 'bg-accent/20 text-primary font-semibold'
                        : 'text-foreground hover:bg-accent/10'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-6 h-6" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Main Content Flex Container */}
      <div className="flex-1 flex md:ml-20 overflow-hidden">
        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          {children}
        </main>
      </div>

      {/* Floating AI Chat Widget */}
      <EmamaChatWidget />

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Preferences Modal (shown after login/signup if no prefs) */}
      {showPrefsModal && (
        <PreferencesModal onClose={() => setShowPrefsModal(false)} />
      )}
    </div>
  );
}
