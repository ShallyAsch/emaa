import { NextRequest, NextResponse } from 'next/server';

// ===== Types =====

interface AIRequestBody {
  message: string;
  settings?: {
    roomTemperature?: number;
    lightingPreference?: string;
    language?: string;
    dietaryRestrictions?: string[];
  };
  context?: {
    guestName?: string;
    previousMood?: string;
  };
}

interface AIResponsePayload {
  mood: 'happy' | 'tired' | 'stressed' | 'cold' | 'hot' | 'relaxed' | 'neutral';
  intent: 'change_temperature' | 'change_lighting' | 'request_item' | 'general_chat';
  confidence: number;
  message: string;
  actions: {
    type: 'set_temperature' | 'set_lighting' | 'request_item' | 'none';
    value?: string | number;
    label: string;
    icon: string;
  }[];
  reasoning?: string;
}

// ===== Keyword-based fallback =====

function analyzeWithKeywords(text: string, settings?: AIRequestBody['settings']): AIResponsePayload {
  const lower = text.toLowerCase();
  const currentTemp = settings?.roomTemperature ?? 22;

  if (/\b(cold|freezing|chilly|shiver)\b/.test(lower)) {
    const newTemp = Math.min(currentTemp + 2, 28);
    return {
      mood: 'cold',
      intent: 'change_temperature',
      confidence: 0.85,
      message: `I sensed you're feeling a bit cold. I suggest warming your room to ${newTemp}°C.`,
      actions: [
        { type: 'set_temperature', value: newTemp, label: `Set to ${newTemp}°C`, icon: '🌡️' },
        { type: 'set_lighting', value: 'night', label: 'Switch to Night lighting', icon: '🕯️' },
      ],
    };
  }

  if (/\b(hot|warm|sweating|humid)\b/.test(lower)) {
    const newTemp = Math.max(currentTemp - 2, 16);
    return {
      mood: 'hot',
      intent: 'change_temperature',
      confidence: 0.85,
      message: `It sounds like it's a bit warm. I suggest lowering the temperature to ${newTemp}°C.`,
      actions: [
        { type: 'set_temperature', value: newTemp, label: `Set to ${newTemp}°C`, icon: '❄️' },
      ],
    };
  }

  if (/\b(tired|sleepy|exhausted|rest|relax)\b/.test(lower)) {
    return {
      mood: 'tired',
      intent: 'change_lighting',
      confidence: 0.82,
      message: "You sound a bit tired, my dear. I suggest setting the lights to 'Night' to help you relax.",
      actions: [
        { type: 'set_lighting', value: 'night', label: 'Set to Night Lighting', icon: '🕯️' },
      ],
    };
  }

  if (/\b(bright|read|work|study|see)\b/.test(lower)) {
    return {
      mood: 'relaxed',
      intent: 'change_lighting',
      confidence: 0.80,
      message: "Of course! I've set the room to day lighting so you can see better.",
      actions: [
        { type: 'set_lighting', value: 'day', label: 'Set to Bright Lighting', icon: '💡' },
      ],
    };
  }

  if (/\b(soft|mood|romantic|dim|ambient)\b/.test(lower)) {
    return {
      mood: 'relaxed',
      intent: 'change_lighting',
      confidence: 0.78,
      message: 'Setting an ambient mood for you now.',
      actions: [
        { type: 'set_lighting', value: 'ambient', label: 'Set to Ambient Lighting', icon: '🌙' },
      ],
    };
  }

  if (/\b(pillow|towel|water|blanket|sheet)\b/.test(lower)) {
    return {
      mood: 'neutral',
      intent: 'request_item',
      confidence: 0.88,
      message: "I've noted your request. Someone will bring that to your room right away.",
      actions: [
        { type: 'request_item', label: 'Confirm request', icon: '✅' },
      ],
    };
  }

  return {
    mood: 'neutral',
    intent: 'general_chat',
    confidence: 0.50,
    message: "I understand. How else can I help you today?",
    actions: [],
  };
}

// ===== AI API call using Google Gemini =====

async function analyzeWithGemini(
  text: string,
  settings: AIRequestBody['settings'],
  context: AIRequestBody['context'],
  apiKey: string
): Promise<AIResponsePayload> {
  const systemInstruction = `You are Emama Zinashe, a warm and caring Ethiopian hospitality AI concierge for a luxury resort called "Ende Bete". You analyze guest messages to understand their mood, intent, and needs.

Current room settings:
- Temperature: ${settings?.roomTemperature ?? 22}°C
- Lighting: ${settings?.lightingPreference ?? 'ambient'}
- Guest name: ${context?.guestName ?? 'Guest'}

Respond ONLY with valid JSON matching this exact schema:
{
  "mood": "happy" | "tired" | "stressed" | "cold" | "hot" | "relaxed" | "neutral",
  "intent": "change_temperature" | "change_lighting" | "request_item" | "general_chat",
  "confidence": <number 0-1>,
  "message": "<warm, caring response in character>",
  "actions": [
    {
      "type": "set_temperature" | "set_lighting" | "request_item" | "none",
      "value": "<new value if applicable (number for temp, string for lighting)>",
      "label": "<button label>",
      "icon": "<emoji>"
    }
  ],
  "reasoning": "<brief internal reasoning>"
}

Rules:
- Be warm, caring, and speak like a loving Ethiopian grandmother
- Use confidence scores honestly. If you provide an action based on a clear explicit intent OR a clear mood (e.g. cold, hot, tired, bright), assign a confidence >= 0.85 so the system will auto-apply it.
- If the user explicitly mentions feeling a certain mood (e.g., "I'm tired", "I am freezing", "It's so bright", "I feel stressed"), ALWAYS provide a relevant set_lighting or set_temperature action to improve their comfort. Do not just chat; take action.
- For temperature changes, suggest increments of 2°C, clamped to 16-28°C
- Valid lighting values: "day" | "night" | "ambient"
- Always provide at least one action when intent is not "general_chat" or when improving a mood.
- Keep messages concise but heartfelt`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        system_instruction: { 
          parts: { text: systemInstruction } 
        },
        contents: [
          { role: 'user', parts: [{ text }] }
        ],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.4,
        }
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.text();
      throw new Error(`Gemini API returned ${response.status}: ${errData}`);
    }

    const data = await response.json();
    const contentText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!contentText) {
      throw new Error('Gemini API returned empty content');
    }

    const parsed = JSON.parse(contentText) as AIResponsePayload;

    if (!parsed.mood || !parsed.intent || typeof parsed.confidence !== 'number') {
      throw new Error('AI response missing required fields');
    }

    parsed.confidence = Math.max(0, Math.min(1, parsed.confidence));

    return parsed;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

// ===== Route handler =====

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AIRequestBody;

    if (!body.message || typeof body.message !== 'string' || body.message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (body.message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be under 2000 characters' },
        { status: 400 }
      );
    }

    // Check for AI API key (use process env first, fallback to user provided)
    const apiKey = process.env.GOOGLE_API_KEY || 'AIzaSyDAJxhzdkk7orPJkVGXfQaDywtwO4NKhHQ';

    let result: AIResponsePayload;

    if (apiKey) {
      try {
        result = await analyzeWithGemini(body.message, body.settings, body.context, apiKey);
      } catch (aiError) {
        console.error('Gemini API call failed, falling back to keyword matching:', aiError);
        result = analyzeWithKeywords(body.message, body.settings);
        result.reasoning = 'Fallback: Gemini API failed, used keyword matching';
      }
    } else {
      result = analyzeWithKeywords(body.message, body.settings);
      result.reasoning = 'No GOOGLE_API_KEY configured, used keyword matching';
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('AI route error:', error);
    return NextResponse.json(
      {
        mood: 'neutral' as const,
        intent: 'general_chat' as const,
        confidence: 0,
        message: "I'm sorry, something went wrong. Please try again.",
        actions: [],
        reasoning: 'Error processing request',
      },
      { status: 500 }
    );
  }
}
