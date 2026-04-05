import { NextResponse } from 'next/server';
import { getHospitalityResponse, getDiscovery, parseIntent } from '@/src/lib/aiService';

export async function POST(req: Request) {
  try {
    const { type, message, userName, prefs } = await req.json();

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
    // Return fallback responses instead of errors
    const { type, message } = await req.json().catch(() => ({}));
    
    if (type === 'discovery') {
      return NextResponse.json({
        reasoning: 'Emama has selected something special for you',
        activity: { id: 1, name: 'Coffee Ceremony', category: 'cultural' },
        meal: { id: 22, name: 'Kuriftu Special Combo', category: 'Ethiopian' },
      });
    }
    
    if (type === 'hospitality') {
      return NextResponse.json({ 
        response: `I hear you, my dear! Let me see how I can make your stay more comfortable. Please tell me more about what you need.` 
      });
    }
    
    return NextResponse.json({ error: 'AI service temporarily unavailable' }, { status: 500 });
  }
}
