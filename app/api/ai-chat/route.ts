import { NextResponse } from 'next/server';
import { getHospitalityResponse, getDiscovery, parseIntent } from '@/src/lib/aiService';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { type, message, userName, prefs } = body;

    if (type === 'discovery') {
      try {
        const result = await getDiscovery(message || 'Suggest something');
        return NextResponse.json(result);
      } catch {
        return NextResponse.json({
          reasoning: 'Emama has curated something special just for you',
          activity: { id: 2, name: 'Gebeta - Ancient Strategy Game', category: 'cultural' },
          meal: { id: 22, name: 'Kuriftu Special Combo', category: 'Ethiopian' },
        });
      }
    }

    if (type === 'hospitality') {
      try {
        const response = await getHospitalityResponse(message || 'Hello', userName);
        return NextResponse.json({ response });
      } catch {
        return NextResponse.json({ 
          response: `I hear you, my dear! Let me see how I can make your stay more comfortable. Please tell me more about what you need.` 
        });
      }
    }

    if (type === 'intent') {
      try {
        const result = await parseIntent(message || '');
        return NextResponse.json(result);
      } catch {
        return NextResponse.json({ intent: 'general_inquiry', action: 'General question', entities: {} });
      }
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (err) {
    console.error('AI API error:', err);
    return NextResponse.json({ error: 'Service temporarily unavailable' }, { status: 500 });
  }
}
