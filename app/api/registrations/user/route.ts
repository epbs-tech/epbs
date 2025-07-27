// /api/registrations/user/route.ts
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const registrations = await db.registration.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        session: {
          include: {
            formation: {
              select: {
                title: true,
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedRegistrations = registrations.map(reg => ({
      id: reg.id,
      formationName: reg.session.formation.title,
      status: reg.status,
      paymentStatus: reg.paymentStatus,
      createdAt: reg.createdAt.toISOString(),
      currency: reg.currency,
      amountMAD: reg.session.priceMAD,
      amountEUR: reg.session.priceEUR,
      sessionStartDate: reg.session.startDate,
      sessionEndDate: reg.session.endDate,
      location: reg.session.location
    }));

    return NextResponse.json(formattedRegistrations);
  } catch  {
    return new NextResponse("Erreur interne", { status: 500 });
  }
}