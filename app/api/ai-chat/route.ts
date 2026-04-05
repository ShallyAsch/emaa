import { NextResponse } from 'next/server';
import { getHospitalityResponse, getDiscovery, parseIntent, groqJSON } from '@/src/lib/aiService';

interface VoiceAnalysis {
  transcript: string;
  mood: string;
  message: string;
  confidence: number;
  suggestions: { icon: string; label: string; action: string }[];
}

const voiceAnalysisPrompt = (transcript: string) => `You are Emama Zinashe, an AI concierge at a luxury Ethiopian resort.

A guest just said: "${transcript}"

Analyze their message and return:
1. Their mood/emotional state
2. A warm, empathetic response message (2-3 sentences)
3. 1-3 specific suggestions you can offer

RESPONSE FORMAT (JSON ONLY):
{
  "transcript": "${transcript}",
  "mood": "calm|stressed|cold|tired|hungry|excited|romantic|adventurous",
  "confidence": 0.9,
  "message": "Your warm response to the guest",
  "suggestions": [
    { "icon": "🌡️", "label": "Adjust temperature to 24°C", "action": "temperature:24" },
    { "icon": "🌙", "label": "Switch to Night Mode", "action": "lighting:night" }
  ]
}

Available lighting actions: day, night, ambient
Available temperature actions: temperature:16 through temperature:28`;

export async function POST(req: Request) {
  try {
    const { type, message, userName, prefs } = await req.json();

    if (type === 'voice') {
      const result = await groqJSON<VoiceAnalysis>(voiceAnalysisPrompt(message), 'Analyze this guest voice input.');
      return NextResponse.json(result);
    }

    if (type === 'hospitality') {
      const response = await getHospitalityResponse(message, userName, prefs);
      return NextResponse.json({ response });
    }

    if (type === 'discovery') {
      const result = await getDiscovery(message);
      return NextResponse.json(result);
    }

    if (type === 'intent') {
      const result = await parseIntent(message);
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (err) {
    console.error('AI API error:', err);
    return NextResponse.json(
      { error: 'AI service error', details: String(err) },
      { status: 500 }
    );
  }
}
