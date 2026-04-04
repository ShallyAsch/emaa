'use client';

import React, { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { analyzeMoodAndIntent } from '@/src/lib/aiAnalysis';

interface UserPrefs {
  favorite_foods?: string[];
  activities?: string[];
  hobbies?: string[];
  personality_type?: string;
  travel_context?: string;
  time_preferences?: string[];
  dietary_notes?: string;
  coffee_preference?: string;
  favorite_seating?: string;
}

export default function EmamaChatWidget() {
  const { user, isLoaded } = useUser();
  const [prefs, setPrefs] = useState<UserPrefs>({});
  const displayName = isLoaded ? (user?.firstName || user?.username || 'User') : 'User';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; id: number }>>([
    {
      role: 'assistant',
      text: 'Selam! I am Emama Zinashe. I know everything about your stay here. How can I help you today, my dear?',
      id: Date.now()
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load user preferences on mount
  useEffect(() => {
    if (isLoaded && user) {
      fetch('/api/preferences')
        .then(r => r.json())
        .then(data => setPrefs(data))
        .catch(() => {});
    }
  }, [isLoaded, user]);

  // Update greeting when auth state changes
  useEffect(() => {
    if (isLoaded) {
      setMessages([{
        role: 'assistant',
        text: user
          ? `Selam, ${user.firstName || user.username || 'my dear'}! I am Emama Zinashe. I know everything about your stay here. How can I help you today?`
          : 'Selam! I am Emama Zinashe. I know everything about your stay here. How can I help you today, my dear?',
        id: Date.now()
      }]);
    }
  }, [isLoaded, user]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = async (overrideText?: string) => {
    const textToSend = overrideText || inputValue.trim();
    if (!textToSend || isTyping) return;

    const messageId = Date.now();
    setMessages((prev) => [...prev, { role: 'user', text: textToSend, id: messageId }]);
    if (!overrideText) setInputValue('');
    setIsTyping(true);

    try {
      // Connect to Gemini AI through our backend endpoint
      const aiAnalysis = await analyzeMoodAndIntent(
        textToSend,
        {
          coffeeType: 'medium',
          roomTemperature: 72,
          lightingPreference: 'ambient',
          language: 'en',
          dietaryRestrictions: prefs.dietary_notes ? [prefs.dietary_notes] : [],
          favoriteSeating: prefs.favorite_seating || '',
        },
        {
          setTemperature: () => {},
          setLighting: () => {},
          showToast: () => {}
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: aiAnalysis.message,
          id: messageId + 1
        },
      ]);
      
    } catch (error) {
      console.error('Chat Widget AI error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "I am having a little trouble hearing you, my dear. Could you try asking again later?",
          id: messageId + 1
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-accent hover:bg-accent/90 text-primary shadow-warm hover:shadow-warm-md transition-smooth flex items-center justify-center md:bottom-8 md:right-8"
        aria-label="Chat with Emama Zinashe"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-48px)] h-[32rem] max-h-[70vh] bg-background rounded-2xl shadow-2xl flex flex-col glass border border-border md:bottom-28 md:right-8 animate-fadeSlideIn overflow-hidden">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-xl shadow-inner">
                👵
              </div>
              <div>
                <h3 className="font-semibold leading-none mb-1">Emama Zinashe</h3>
                <p className="text-xs text-primary-foreground/70">She knows everything ❤️</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-xs mr-2 mt-auto mb-1 shrink-0">
                    👵
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-accent text-primary rounded-2xl rounded-br-sm'
                      : 'bg-white border border-border text-foreground rounded-2xl rounded-bl-sm'
                  }`}
                >
                  <p className="leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start items-end">
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-[10px] mr-2 mb-1">
                  👵
                </div>
                <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1 min-h-[44px]">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-typingBounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-typingBounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-typingBounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {!isTyping && messages.length < 5 && (
            <div className="px-4 pb-3 pt-2 bg-background flex gap-2 overflow-x-auto scrollbar-hide border-t border-border/30 shrink-0">
              {[
                "I'm feeling cold",
                "Tell me a story",
                "Suggest an activity",
                "I need fresh towels"
              ].map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(suggestion)}
                  className="whitespace-nowrap px-3 py-1.5 bg-accent/10 hover:bg-accent/20 text-accent-foreground text-xs font-semibold rounded-full transition-colors border border-accent/20"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-border p-4 bg-white/80 shrink-0 flex gap-2 items-center">
            <input
              type="text"
              placeholder="Tell Emama what you need..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              disabled={isTyping}
              className="flex-1 bg-white border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent shadow-sm disabled:opacity-50"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              className="bg-accent hover:bg-accent/90 text-primary p-2.5 rounded-full transition-smooth shrink-0 shadow-sm disabled:opacity-50 disabled:hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
