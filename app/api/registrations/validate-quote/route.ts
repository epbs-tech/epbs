import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { sendRegistrationConfirmationEmail, sendPaymentConfirmationEmail } from "@/lib/mail";

export async function POST(req: Request) {
  try {
    const { quoteNumber } = await req.json();

    // Récupération de l'inscription avec toutes les relations nécessaires pour les emails
    const registration = await db.registration.findUnique({
      where: {
        quoteNumber: quoteNumber,
      },
    });

    if (!registration) {
      return new NextResponse("Devis non trouvé", { status: 404 });
    }

    // Mise à jour du statut de l'inscription
    const updatedRegistration = await db.registration.update({
      where: {
        id: registration.id,
      },
      data: {
        status: "confirmed",
        paymentStatus: "completed",
        paidAt: new Date(),
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

    // Envoi des emails de confirmation
    try {
      // Envoi de l'email de confirmation d'inscription
      await sendRegistrationConfirmationEmail(updatedRegistration);

      // Envoi de l'email de confirmation de paiement avec le reçu
      await sendPaymentConfirmationEmail(updatedRegistration);

      console.log(`Emails de confirmation envoyés pour l'inscription ${registration.id}`);
    } catch (emailError) {
      // Log l'erreur mais ne pas empêcher la validation du devis
      console.error("[EMAIL_SENDING_ERROR]", emailError);
    }

    return NextResponse.json({
      ...updatedRegistration,
      emailsSent: true,
    });
  } catch (error) {
    console.error("[VALIDATE_QUOTE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}