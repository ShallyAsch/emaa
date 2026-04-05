import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getFamilyProfile, saveFamilyProfile, initDb } from '@/src/lib/db';

// Ensure tables exist
let dbReady: Promise<void> | null = null;
function ensureDb() {
  if (!dbReady) dbReady = initDb();
  return dbReady;
}

const defaultProfile = {
  coffee_preference: 'Traditional Ethiopian buna with honey',
  dietary_notes: '',
  favorite_seating: '',
  previous_visits: 0,
  special_moments: [],
};

export async function GET(req: Request) {
  await ensureDb();
  const { userId } = await auth();
  const url = new URL(req.url);
  const guestId = url.searchParams.get('guestId');
  const clerkId = userId || (guestId ? `guest-${guestId}` : null);

  if (!clerkId) return NextResponse.json({ error: 'No identifier' }, { status: 400 });

  try {
    const profile = await getFamilyProfile(clerkId);
    return NextResponse.json(profile || defaultProfile);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await ensureDb();
  const { userId } = await auth();
  const url = new URL(req.url);
  const guestId = url.searchParams.get('guestId');
  const clerkId = userId || (guestId ? `guest-${guestId}` : null);

  if (!clerkId) return NextResponse.json({ error: 'No identifier' }, { status: 400 });

  try {
    const body = await req.json();
    await saveFamilyProfile(clerkId, {
      coffee_preference: body.coffeePreference,
      dietary_notes: body.dietaryNotes,
      favorite_seating: body.favoriteSeating,
      previous_visits: body.previousVisits,
      special_moments: body.specialMoments,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
