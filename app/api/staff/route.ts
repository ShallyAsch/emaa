import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { getServiceRequests, fulfillServiceRequest } from '@/src/lib/db';

export async function GET() {
  // In production, check if user has staff role
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const requests = await getServiceRequests();
    return NextResponse.json(requests);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await req.json();
    await fulfillServiceRequest(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
