import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  const formationId = id;

  try {
    const sessions = await db.session.findMany({
      where: {
        formationId: formationId,
        isOpen: true,
        startDate: {
          gte: new Date(),
        },
      },
      include: {
        formation: true,
        registrations: true,
      },
      orderBy: {
        startDate: 'asc',
      },
    });

    return NextResponse.json(sessions);
  } catch  {
    return NextResponse.json({ error: 'Error fetching sessions by formation ID' }, { status: 500 });
  }
}
