import { NextResponse } from 'next/server';
import { getServiceRequests, fulfillServiceRequest } from '@/src/lib/db';

export async function GET() {
  try {
    const requests = await getServiceRequests();
    return NextResponse.json(requests);
  } catch (err) {
    console.error('[staff] GET error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    await fulfillServiceRequest(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[staff] POST error:', err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
