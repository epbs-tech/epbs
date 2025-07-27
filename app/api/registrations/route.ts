import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { auth } from "@/auth";

export async function GET() {
  try {
    const registrations = await db.registration.findMany({
      include: {
        session: {
          include: {
            formation: true,
          },
        },
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(registrations);
  } catch {
    return NextResponse.json({ error: 'Error fetching registrations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {data, currency} = await request.json();

    const registration = await db.registration.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        sessionId: data.sessionId,
        userId: session.user.id, // Utilisation de l'ID de l'utilisateur authentifié
        status: 'pending',
        paymentMethod: data.paymentMethod || 'pending',
        paymentStatus: 'pending',
        hasAgreedToTerms: data.hasAgreedToTerms,
        currency: currency || 'MAD',
      },
      include: {
        session: {
          include: {
            formation: true,
          },
        },
        user: true,
      },
    });

    // Update session participante count
    await db.session.update({
      where: { id: data.sessionId },
      data: {
        currentParticipants: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(registration);
  } catch {
    return NextResponse.json({ error: 'Error creating registration' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const registration = await db.registration.update({
      where: {
        id: data.registrationId,
        userId: session.user.id // Vérification que l'inscription appartient bien à l'utilisateur
      },
      data: {
        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentMethod === 'creditCard' ? 'pending' : 'pending',
        paidAt: data.paymentStatus === 'completed' ? new Date() : null,
        stripeCustomerId: data.stripeCustomerId,
        stripePaymentIntentId: data.stripePaymentIntentId,
        stripeCheckoutSessionId: data.stripeCheckoutSessionId,
      },
      include: {
        session: {
          include: {
            formation: true,
          },
        },
        user: true,
      },
    });

    return NextResponse.json(registration);
  } catch {
    return NextResponse.json({ error: 'Error updating registration' }, { status: 500 });
  }
}