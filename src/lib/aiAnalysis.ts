import { GuestPreferences } from './types';

// ===== Types =====

export interface AIAction {
  type: 'set_temperature' | 'set_lighting' | 'request_item' | 'none';
  value?: string | number;
  label: string;
  icon: string;
}

export interface EmamaAnalysis {
  transcript: string;
  mood: 'happy' | 'tired' | 'stressed' | 'cold' | 'hot' | 'relaxed' | 'neutral';
  intent: 'change_temperature' | 'change_lighting' | 'request_item' | 'general_chat';
  confidence: number;
  message: string;
  actions: AIAction[];
  suggestions: {
    label: string;
    action: () => void;
    icon: string;
  }[];
}

interface AnalyzeOptions {
  setTemperature: (t: number) => void;
  setLighting: (l: string) => void;
  showToast: (title: string, description: string) => void;
}

// ===== API-based analysis =====

async function callAIEndpoint(
  text: string,
  preferences: GuestPreferences
): Promise<{
  mood: EmamaAnalysis['mood'];
  intent: EmamaAnalysis['intent'];
  confidence: number;
  message: string;
  actions: AIAction[];
}> {
  const response = await fetch('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: text,
      settings: {
        roomTemperature: preferences.roomTemperature,
        lightingPreference: preferences.lightingPreference,
        language: preferences.language,
        dietaryRestrictions: preferences.dietaryRestrictions,
      },
      context: {
        guestName: 'Selam',
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  return response.json();
}

// ===== Main analysis function =====

export async function analyzeMoodAndIntent(
  text: string,
  currentPreferences: GuestPreferences,
  updateState: AnalyzeOptions
): Promise<EmamaAnalysis> {
  let apiResult: {
    mood: EmamaAnalysis['mood'];
    intent: EmamaAnalysis['intent'];
    confidence: number;
    message: string;
    actions: AIAction[];
  };

  try {
    apiResult = await callAIEndpoint(text, currentPreferences);
  } catch (error) {
    console.error('AI analysis failed:', error);
    apiResult = {
      mood: 'neutral',
      intent: 'general_chat',
      confidence: 0.3,
      message: "I understand. How else can I help you today?",
      actions: [],
    };
  }

  // Convert API actions into interactive suggestions with callbacks
  const suggestions = apiResult.actions
    .filter((a) => a.type !== 'none')
    .map((action) => ({
      label: action.label,
      icon: action.icon,
      action: () => {
        switch (action.type) {
          case 'set_temperature':
            if (typeof action.value === 'number' || !isNaN(Number(action.value))) {
              const newTemp = Number(action.value);
              updateState.setTemperature(newTemp);
              updateState.showToast('Temperature Updated', `Room set to ${newTemp}°C`);
            }
            break;
          case 'set_lighting':
            if (typeof action.value === 'string') {
              const validModes = ['day', 'night', 'ambient'];
              const mode = validModes.includes(action.value) ? action.value : 'ambient';
              updateState.setLighting(mode);
              updateState.showToast('Lighting Updated', `Lighting set to ${mode} mode`);
            }
            break;
          case 'request_item':
            updateState.showToast('Request Received', "We'll bring that to your room shortly.");
            break;
        }
      },
    }));

  // Auto-apply first action if confidence is high enough
  if (apiResult.confidence >= 0.8 && suggestions.length > 0) {
    suggestions[0].action();
  }

  return {
    transcript: text,
    mood: apiResult.mood,
    intent: apiResult.intent,
    confidence: apiResult.confidence,
    message: apiResult.message,
    actions: apiResult.actions,
    suggestions,
  };
}
