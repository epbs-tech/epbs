import { NextResponse} from 'next/server';
import { db } from '@/lib/db';
import {UserRole} from "@prisma/client";
import {currentRole} from "@/lib/auth";

export async function GET() {
  try {
    const formations = await db.formation.findMany({
      include: {
        syllabus: true,
        sessions: true,
      },
    });
    return NextResponse.json(formations);
  } catch  {
    return NextResponse.json({ error: 'Error fetching formations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }

  try {
    const data = await request.json();
    
    const formation = await db.formation.create({
      data: {
        ...data,
        syllabus: {
          create: data.syllabus,
        },
      },
      include: {
        syllabus: true,
      },
    });
    
    return NextResponse.json(formation);
  } catch  {
    return NextResponse.json({ error: 'Error creating formation' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }
  try {
    const data = await request.json();
    
    // First, delete existing syllabus
    await db.syllabus.deleteMany({
      where: { formationId: data.id },
    });

    // Then update formation with new data
    const formation = await db.formation.update({
      where: { id: data.id },
      data: {
        ...data,
        syllabus: {
          create: data.syllabus,
        },
      },
      include: {
        syllabus: true,
      },
    });
    
    return NextResponse.json(formation);
  } catch  {
    return NextResponse.json({ error: 'Error updating formation' }, { status: 500 });
  }
}