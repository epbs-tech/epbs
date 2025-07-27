import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { registrationId, sessionId, formationTitle, formationDates, price, currency } = body;

    // Récupérer les informations de l'inscription
    const registration = await db.registration.findUnique({
      where: { id: registrationId },
      include: {
        session: {
          include: {
            formation: true
          }
        }
      }
    });

    if (!registration) {
      return NextResponse.json({ error: 'Inscription non trouvée' }, { status: 404 });
    }

    // Mettre à jour la méthode de paiement
    await db.registration.update({
      where: { id: registrationId },
      data: {
        paymentMethod: 'creditCard',
        paymentStatus: 'pending'
      }
    });

    // Créer une session de checkout Stripe
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency === 'EUR'? 'eur' : 'mad',
            product_data: {
              name: formationTitle || registration.session.formation.title,
              description: formationDates || `Du ${new Date(registration.session.startDate).toLocaleDateString('fr-FR')} au ${new Date(registration.session.endDate).toLocaleDateString('fr-FR')}`,
            },
            unit_amount: price ? price * 100 : (currency === 'EUR' ? registration.session.priceEUR * 100 : registration.session.priceMAD * 100), // Stripe utilise les centimes
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/success?registration_id=${registrationId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment/cancel?registration_id=${registrationId}`,
      client_reference_id: registrationId,
      customer_email: registration.email,
      metadata: {
        registrationId: registrationId,
        sessionId: registration.sessionId
      }
    });

    // Mettre à jour l'inscription avec l'ID de la session Stripe
    await db.registration.update({
      where: { id: registrationId },
      data: {
        stripeCheckoutSessionId: stripeSession.id,
        stripePaymentIntentId: typeof stripeSession.payment_intent === 'string' ? stripeSession.payment_intent : stripeSession.payment_intent?.id || null,
      }
    });
    
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
  }
}
