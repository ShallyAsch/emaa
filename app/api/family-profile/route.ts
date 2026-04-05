import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getFamilyProfile, saveFamilyProfile } from '@/src/lib/db';

const defaultProfile = {
  coffee_preference: 'Traditional Ethiopian buna with honey',
  dietary_notes: '',
  favorite_seating: '',
  previous_visits: 0,
  special_moments: [],
};

export async function GET(req: Request) {
  const { userId } = await auth();
  // Use userId if authenticated, or URL param for guest
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
