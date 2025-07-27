import { NextRequest, NextResponse } from 'next/server';
import { sendContactNotificationEmail, sendContactConfirmationEmail } from '@/lib/contact-mail';

interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}

export async function POST(req: NextRequest) {
  const data: ContactFormData = await req.json();

  if (!data.fullName || !data.email || !data.message) {
    return NextResponse.json({ success: false, message: 'Champs requis manquants' }, { status: 400 });
  }

  try {
    // Envoyer la notification à l'équipe
      await sendContactNotificationEmail(data);

      // Envoyer la confirmation au client
      await sendContactConfirmationEmail(data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur envoi mail:', error);
    return NextResponse.json({ success: false, message: 'Erreur lors de l\'envoi du message' }, { status: 500 });
  }
}
