import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(
  request: Request,
  {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  try {
    const registrations = await db.registration.findMany({
      where: {
        sessionId: id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json(registrations);
  } catch  {
    return NextResponse.json(
      { error: 'Error fetching registrations' },
      { status: 500 }
    );
  }
}