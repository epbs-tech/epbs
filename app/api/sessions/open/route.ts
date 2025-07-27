import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    // Find all sessions where isOpen is true
    const openSessions = await db.session.findMany({
      where: {
        isOpen: true
      },
      include: {
        formation: true,
        registrations: true
      },
      orderBy: {
        startDate: 'asc'
      }
    });

    return NextResponse.json({
      sessions: openSessions,
      count: openSessions.length
    });
  } catch (error) {
    console.error('Error fetching open sessions:', error);
    return NextResponse.json(
      { error: 'Error fetching open sessions' },
      { status: 500 }
    );
  }
}