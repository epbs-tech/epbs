import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function POST(
  req: Request,
  {params}: {params: Promise<{ id: string }>}) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = await params;
    const registrationId = id;

    // Récupérer l'inscription
    const registration = await db.registration.findUnique({
      where: {
        id: registrationId,
        userId: session.user.id
      },
      include: {
        session: true
      }
    });

    if (!registration) {
      return NextResponse.json({ error: 'Inscription non trouvée' }, { status: 404 });
    }

    // Gestion du remboursement selon la méthode de paiement
    if (registration.paymentStatus === 'completed') {
      if (registration.paymentMethod === 'creditCard') {
        try {
          if (registration.stripePaymentIntentId) {
            await stripe.refunds.create({
              payment_intent: registration.stripePaymentIntentId,
            });
          }
        } catch (stripeError) {
          console.error('Erreur Stripe lors du remboursement:', stripeError);
          return NextResponse.json({ error: 'Erreur lors du remboursement' }, { status: 500 });
        }
      } else if (registration.paymentMethod === 'bankTransfer') {
        // TODO: Gérer le remboursement par virement bancaire
        // 1. Notifier le service comptable
        // 2. Envoyer un email au client avec les instructions pour le remboursement
        // 3. Enregistrer la demande de remboursement dans un système de suivi
        console.log('Remboursement par virement bancaire à traiter manuellement pour l\'inscription:', registrationId);
      }
    }

    // Mise à jour de l'inscription
    const updatedRegistration = await db.registration.update({
      where: { id: registrationId },
      data: {
        status: 'cancelled',
        paymentStatus: registration.paymentStatus === 'completed' ? 'refunded' : 'cancelled'
      }
    });

    // Décrémenter le nombre de participants dans la session
    await db.session.update({
      where: { id: registration.sessionId },
      data: {
        currentParticipants: {
          decrement: 1
        }
      }
    });

    return NextResponse.json(updatedRegistration);
  } catch (error) {
    console.error('Erreur lors de l\'annulation:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'annulation de l\'inscription' },
      { status: 500 }
    );
  }
}