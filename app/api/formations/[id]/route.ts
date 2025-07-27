import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { getFormationById } from "@/lib/data";
import {currentRole} from "@/lib/auth";
import {Syllabus, UserRole} from "@prisma/client";

export async function GET(request: NextRequest, {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  try {
    const formation = await getFormationById(id);

    if (!formation) {
      return NextResponse.json({ error: 'Formation not found' }, { status: 404 });
    }

    return NextResponse.json(formation);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json({ error: 'Error fetching formation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }
  try {
    await db.formation.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: 'Formation deleted successfully' });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json({ error: 'Error deleting formation' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }
  try {
    const data = await request.json();
    const { syllabus, ...formationData } = data;

    // D'abord, nous récupérons les ids existants du syllabus
    const existingFormation = await db.formation.findUnique({
      where: { id: id },
      include: { syllabus: true }
    });

    if (!existingFormation) {
      return NextResponse.json({ error: 'Formation not found' }, { status: 404 });
    }

    // Pour une mise à jour complète, nous allons supprimer tous les anciens syllabus
    // et en créer de nouveaux
    await db.syllabus.deleteMany({
      where: { formationId: id }
    });

    // Maintenant, on met à jour la formation avec ses données de base
    const updated = await db.formation.update({
      where: { id: id },
      data: {
        ...formationData,
        // Et on crée les nouveaux syllabus associés
        syllabus: {
          create: syllabus.map((item: Syllabus) => ({
            title: item.title,
            content: item.content
          }))
        }
      },
      include: {
        syllabus: true,
        sessions: true,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH error:", error);
    return NextResponse.json({ error: `Error updating formation: ${error}` }, { status: 500 });
  }
}