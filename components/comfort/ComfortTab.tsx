'use client';

import React, { useState, useEffect } from 'react';
import { mockGuest } from '@/lib/mockData';
import { Mic, AlertCircle, Sparkles, X } from 'lucide-react';
import { analyzeMoodAndIntent, GrokAnalysis } from '@/lib/grok';
import { useToast } from '@/components/ui/use-toast';

type LightingMode = 'soft' | 'cozy' | 'bright' | 'natural';

interface LightingOption {
  mode: LightingMode;
  label: string;
  icon: string;
  description: string;
}

const lightingOptions: LightingOption[] = [
  {
    mode: 'soft',
    label: 'Soft',
    icon: '🌙',
    description: 'Gentle ambient light',
  },
  {
    mode: 'cozy',
    label: 'Cozy',
    icon: '🕯️',
    description: 'Warm and relaxing',
  },
  {
    mode: 'bright',
    label: 'Bright',
    icon: '💡',
    description: 'Full brightness',
  },
  {
    mode: 'natural',
    label: 'Natural',
    icon: '☀️',
    description: 'Daylight tone',
  },
];

export default function ComfortTab() {
  const { toast } = useToast();
  const [temperature, setTemperature] = useState(
    mockGuest.preferences.roomTemperature
  );
  const [lighting, setLighting] = useState<LightingMode>(
    mockGuest.preferences.lightingPreference
  );
  const [isListening, setIsListening] = useState(false);
  const [analysis, setAnalysis] = useState<GrokAnalysis | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognitionInstance = new SpeechRecognition();
        recognitionInstance.continuous = false;
        recognitionInstance.interimResults = false;
        recognitionInstance.lang = 'en-US';

        recognitionInstance.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          
          // Call Grok analysis
          const result = await analyzeMoodAndIntent(
            transcript,
            { ...mockGuest.preferences, roomTemperature: temperature, lightingPreference: lighting },
            {
              setTemperature,
              setLighting,
              showToast: (title, description) => toast({ title, description })
            }
          );
          
          setAnalysis(result);
        };

        recognitionInstance.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setIsListening(false);
          toast({
            title: "Voice Input Error",
            description: "I couldn't hear you clearly. Please try again.",
            variant: "destructive"
          });
        };

        recognitionInstance.onend = () => {
          setIsListening(false);
        };

        setRecognition(recognitionInstance);
      }
    }
  }, [temperature, lighting, toast]);

  const handleVoiceInput = () => {
    if (!recognition) {
      toast({
        title: "Not Supported",
        description: "Voice recognition is not supported in this browser.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setAnalysis(null);
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <div className="w-full md:pr-24">
      <div className="px-4 md:px-6 py-6 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
            Your Comfort
          </h1>
          <p className="text-muted-foreground">
            Personalize your room environment with Grok AI
          </p>
        </div>

        {/* Voice Input Section */}
        <div className="relative">
          <button
            onClick={handleVoiceInput}
            className={`w-full glass p-6 rounded-2xl transition-smooth relative overflow-hidden ${
              isListening ? 'ring-2 ring-accent shadow-warm-md' : 'hover:shadow-warm'
            }`}
          >
            {/* Animated Background for Recording */}
            {isListening && (
              <div className="absolute inset-0 bg-accent/5 animate-pulse" />
            )}

            <div className="flex flex-col items-center gap-3 relative z-10">
              <div
                className={`p-4 rounded-full transition-all duration-500 ${
                  isListening
                    ? 'bg-accent/40 scale-110'
                    : 'bg-accent/10'
                }`}
              >
                <Mic
                  className={`w-8 h-8 ${
                    isListening ? 'text-accent animate-bounce' : 'text-accent'
                  }`}
                />
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-foreground flex items-center justify-center gap-2">
                  {isListening ? 'Grok is listening...' : 'Speak to your host'}
                  {!isListening && <Sparkles className="w-4 h-4 text-accent" />}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {isListening
                    ? 'Say "I am cold", "I am tired", or "Make it bright"'
                    : 'Tap to start voice conversation with Grok'}
                </p>
              </div>
            </div>
          </button>

          {/* Grok Analysis Result */}
          {analysis && (
            <div className="mt-4 glass p-4 rounded-2xl border-accent/30 bg-accent/5 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm">
                    👵
                  </div>
                  <div>
                    <span className="text-xs font-bold text-accent uppercase tracking-wider">Grok Analysis</span>
                    <p className="text-sm font-medium italic text-foreground">&quot;{analysis.transcript}&quot;</p>
                  </div>
                </div>
                <button onClick={() => setAnalysis(null)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3 pt-2 border-t border-accent/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary-foreground font-medium">
                    Mood: {analysis.mood.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">
                  {analysis.message}
                </p>
                
                {analysis.suggestions.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {analysis.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={suggestion.action}
                        className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent/20 hover:bg-accent/30 text-accent-foreground transition-smooth border border-accent/20"
                      >
                        <span>{suggestion.icon}</span>
                        <span>{suggestion.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Temperature Control */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            🌡️ Room Temperature
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Temperature</span>
              <span className="text-2xl font-bold text-accent">{temperature}°C</span>
            </div>

            <input
              type="range"
              min="16"
              max="28"
              value={temperature}
              onChange={(e) => setTemperature(parseInt(e.target.value))}
              className="w-full h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-accent"
            />

            <div className="flex justify-between text-xs text-muted-foreground">
              <span>16°C</span>
              <span>22°C</span>
              <span>28°C</span>
            </div>

            <p className="text-xs text-muted-foreground pt-2">
              Your preference is {mockGuest.preferences.roomTemperature}°C. Adjust
              as needed.
            </p>
          </div>
        </div>

        {/* Lighting Control */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            💡 Lighting Mood
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {lightingOptions.map((option) => (
              <button
                key={option.mode}
                onClick={() => setLighting(option.mode)}
                className={`p-4 rounded-xl transition-smooth text-center ${
                  lighting === option.mode
                    ? 'bg-accent/20 border-2 border-accent'
                    : 'bg-muted/30 border-2 border-transparent hover:bg-muted/50'
                }`}
              >
                <div className="text-3xl mb-2">{option.icon}</div>
                <div className="font-semibold text-sm text-foreground">
                  {option.label}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass p-6 rounded-2xl">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Quick Requests
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { icon: '🛏️', label: 'Extra pillows', action: 'pillow-request' },
              { icon: '🧴', label: 'More towels', action: 'towel-request' },
              {
                icon: '🔇',
                label: 'Quieter room',
                action: 'quiet-request',
              },
              {
                icon: '❄️',
                label: 'Extra blankets',
                action: 'blanket-request',
              },
            ].map((item) => (
              <button
                key={item.action}
                onClick={() => {
                  toast({
                    title: "Request Received",
                    description: `We'll bring ${item.label.toLowerCase()} to your room shortly.`,
                  });
                }}
                className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-smooth border border-secondary/20"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-sm text-foreground">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Problem Report */}
        <button className="w-full glass p-4 rounded-2xl border-2 border-destructive/30 hover:bg-destructive/5 transition-smooth">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive" />
            <div className="text-left">
              <div className="font-semibold text-foreground text-sm">
                Something doesn&apos;t feel right?
              </div>
              <p className="text-xs text-muted-foreground">
                Tell us and we&apos;ll fix it immediately
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
