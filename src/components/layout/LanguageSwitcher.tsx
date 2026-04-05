'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'am', label: 'አማርኛ', flag: '🇪🇹' },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('en');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync active language with Google Translate's cookie state safely
  useEffect(() => {
    const match = document.cookie.match(/(^|;\s*)googtrans=([^;]+)/);
    if (match) {
      // e.g., value might be "/en/am"
      if (match[2].endsWith('/am')) {
        setActiveLang('am');
      } else {
        setActiveLang('en');
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setActiveLang(langCode);
    setIsOpen(false);

    // Trigger Google Translate's select element
    const triggerTranslate = (retries = 0) => {
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
      } else if (retries < 10) {
        setTimeout(() => triggerTranslate(retries + 1), 500);
      } else {
        // Fallback: Set cookie and reload
        document.cookie = `googtrans=/en/${langCode}; path=/`;
        document.cookie = `googtrans=/en/${langCode}; path=/; domain=${window.location.hostname}`;
        window.location.reload();
      }
    };
    triggerTranslate();
  };

  const current = languages.find((l) => l.code === activeLang) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-white hover:bg-accent/10 transition-smooth text-sm font-medium shadow-sm"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4 text-primary" />
        <span className="text-primary hidden md:inline">{current.flag} {current.label}</span>
        <span className="text-primary md:hidden">{current.flag}</span>
        <svg className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 12 12" fill="none">
          <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl border border-border shadow-warm-md overflow-hidden z-50 animate-fadeSlideIn">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                activeLang === lang.code
                  ? 'bg-accent/15 text-primary font-semibold'
                  : 'text-foreground hover:bg-muted/30'
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
              {activeLang === lang.code && (
                <span className="ml-auto w-2 h-2 rounded-full bg-accent" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
