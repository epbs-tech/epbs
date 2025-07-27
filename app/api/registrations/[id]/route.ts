import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {sendQuoteEmail} from "@/lib/mail"

export async function GET(
  request: Request,
  {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  try {
    const registration = await db.registration.findUnique({
      where: { id: id },
      include: {
        session: {
          include: {
            formation: true
          }
        }
      }
    });
    
    if (!registration) {
      return NextResponse.json(
        { error: 'Registration not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(registration);
  } catch  {
    return NextResponse.json(
      { error: 'Error fetching registration' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  {params}: {params: Promise<{ id: string }>}) {
const { id } = await params;
  try {
    const data = await request.json();
    
    const registration = await db.registration.update({
      where: { id: id },
      data: {
        status: data.status,
        paymentStatus: data.paymentStatus,
        quoteNumber: data.quoteNumber,
      },
      include: {
        session: {
          include: {
            formation: true
          }
        },
        user: true,
      }
    });

     if (!registration) {
      throw new Error("Inscription non trouvée");
    }

    // Envoyer l'email avec le devis en pièce jointe
    await sendQuoteEmail(registration, data.quoteNumber);
    return NextResponse.json(registration);
  } catch(error)  {
    console.error("[UPDATE_REGISTRATION]", error);
    return NextResponse.json(
      { error: 'Error updating registration' },
      { status: 500 }
    );
  }
}