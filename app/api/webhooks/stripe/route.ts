import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import Stripe from 'stripe';
import { sendRegistrationConfirmationEmail, sendPaymentConfirmationEmail } from "@/lib/mail";
import {generateQuoteNumber} from "@/lib/generate-quote-pdf";


export const config = {
  api: {
    bodyParser: false, // Indispensable !
  },
}; // attention 

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Signature Stripe manquante');
      return new NextResponse(JSON.stringify({ error: 'Signature manquante' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log('Type d\'événement reçu:', event.type);

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Session de paiement complétée:', session.id);

        const quoteNumber = await generateQuoteNumber();


        // Renommé la variable pour éviter le conflit
        const sessionPaymentIntent = session.payment_intent as string;

        const updatedRegistration= await db.registration.update({
          where: {
            stripeCheckoutSessionId: session.id
          },
          data: {
            paymentStatus: 'completed',
            status: 'confirmed',
            stripeCustomerId: session.customer as string,
            stripePaymentIntentId: sessionPaymentIntent,
            paidAt: new Date(),
            quoteNumber: quoteNumber
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

        try {
          // Envoi de l'email de confirmation d'inscription
          await sendRegistrationConfirmationEmail(updatedRegistration);

          // Envoi de l'email de confirmation de paiement avec le reçu
          await sendPaymentConfirmationEmail(updatedRegistration);

          console.log(`Emails de confirmation envoyés pour l'inscription ${updatedRegistration.id}`);
        } catch (emailError) {
          // Log l'erreur mais ne pas empêcher la validation du devis
          console.error("[EMAIL_SENDING_ERROR]", emailError);
        }

        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object as Stripe.Checkout.Session;
        console.log('Session de paiement expirée:', expiredSession.id);

        await db.registration.update({
          where: {
            stripeCheckoutSessionId: expiredSession.id
          },
          data: {
            paymentStatus: 'cancelled',
            status: 'cancelled',
            stripePaymentIntentId: null
          }
        });
        break;

      case 'payment_intent.canceled':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log('Paiement annulé:', paymentIntent.id);

        await db.registration.update({
          where: {
            stripePaymentIntentId: paymentIntent.id
          },
          data: {
            paymentStatus: 'cancelled',
            status: 'cancelled'
          }
        });
        break;
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Erreur webhook:', error);
    return new NextResponse(JSON.stringify({
      error: 'Erreur webhook',
      message: error.message
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
