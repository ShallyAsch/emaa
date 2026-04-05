import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const serviceLabels: Record<string, string> = {
  pillows: 'Extra Pillows',
  towels: 'More Towels',
  quiet: 'Quiet Room',
  blankets: 'Extra Blankets',
};

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { type } = await req.json();
    const label = serviceLabels[type] || type;
    // TODO: Store in DB (add service_requests table) or send to staff system
    console.log(`Service request from ${userId}: ${label}`);
    return NextResponse.json({ success: true, message: `${label} requested` });
  } catch (err) {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
