import { NextResponse } from 'next/server';
import { offerings } from '@/src/lib/resortData';

export async function GET() {
  return NextResponse.json(offerings);
}
