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
    return NextResponse.json(
      { error: 'AI service error', details: String(err) },
      { status: 500 }
    );
  }
}
