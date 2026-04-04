import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { savePreferences, getPreferences } from '@/src/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const prefs = await getPreferences(userId);
    return NextResponse.json(prefs || {});
  } catch (err) {
    console.error('GET /api/preferences error:', err);
    return NextResponse.json({ error: 'DB error', details: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await savePreferences(userId, body);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('POST /api/preferences error:', err);
    return NextResponse.json({ error: 'DB error', details: String(err) }, { status: 500 });
  }
}
