import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {currentRole} from "@/lib/auth";
import {UserRole} from "@prisma/client";

export async function GET() {
  try {
    const sessions = await db.session.findMany({
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
    return NextResponse.json({ error: 'Error fetching sessions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }
  try {
    const data = await request.json();
    
    const session = await db.session.create({
      data: {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location,
        priceEUR: parseFloat(data.priceEUR),
        priceMAD: parseFloat(data.priceMAD),
        maxParticipants: parseInt(data.maxParticipants),
        formationId: data.formationId,
        isOpen: true,
        currentParticipants: 0,
      },
      include: {
        formation: true,
      },
    });
    
    return NextResponse.json(session);
  } catch  {
    return NextResponse.json({ error: 'Error creating session' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }
  try {
    const data = await request.json();
    
    const session = await db.session.update({
      where: { id: data.id },
      data: {
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        location: data.location,
        priceEUR: parseFloat(data.priceEUR),
        priceMAD: parseFloat(data.priceMAD),
        maxParticipants: parseInt(data.maxParticipants),
        formationId: data.formationId,
        isOpen: data.isOpen,
      },
      include: {
        formation: true,
      },
    });
    
    return NextResponse.json(session);
  } catch  {
    return NextResponse.json({ error: 'Error updating session' }, { status: 500 });
  }
}