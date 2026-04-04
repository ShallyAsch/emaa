import { NextResponse } from 'next/server';
import { accommodations } from '@/src/lib/resortData';

export async function GET() {
  return NextResponse.json(accommodations);
}
