import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {currentRole} from "@/lib/auth";
import {UserRole} from "@prisma/client";


export async function GET() {
  const role = await currentRole();

    if(role !== UserRole.ADMIN){
        return new NextResponse(null,{status: 403});
    }
  try {
    const currentDate = new Date();

    // Find all sessions that are still open but have a start date in the past
    const outdatedSessions = await db.session.updateMany({
      where: {
        startDate: {
          lt: currentDate
        },
        isOpen: true
      },
      data: {
        isOpen: false
      }
    });

    return NextResponse.json({
      message: `Successfully closed ${outdatedSessions.count} past sessions`,
      updatedCount: outdatedSessions.count
    });
  } catch (error) {
    console.error('Error closing past sessions:', error);
    return NextResponse.json(
      { error: 'Error closing past sessions' },
      { status: 500 }
    );
  }
}