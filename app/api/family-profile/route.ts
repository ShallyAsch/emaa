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

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const profile = await getFamilyProfile(userId);
    return NextResponse.json(profile || defaultProfile);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await saveFamilyProfile(userId, {
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
