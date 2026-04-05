import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getBookedEvents, bookEvent, getScheduleProgress, toggleScheduleProgress } from '@/src/lib/db';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const events = await getBookedEvents(userId);
    const progress = await getScheduleProgress(userId);
    return NextResponse.json({ events, completedActivities: [...progress] });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();

    if (body.action === 'book') {
      await bookEvent(userId, body.event);
      return NextResponse.json({ success: true });
    }

    if (body.action === 'progress') {
      await toggleScheduleProgress(userId, body.activityId, body.completed);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
