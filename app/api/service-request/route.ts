import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createServiceRequest } from '@/src/lib/db';

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
    await createServiceRequest(userId, label);
    console.log(`[service-request] Created: ${label} for ${userId}`);
    return NextResponse.json({ success: true, message: `${label} requested` });
  } catch (err) {
    console.error('[service-request] Error:', err);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
