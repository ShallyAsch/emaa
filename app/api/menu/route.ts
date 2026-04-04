import { NextResponse } from 'next/server';
import { menu } from '@/src/lib/resortData';

export async function GET() {
  return NextResponse.json(menu);
}
