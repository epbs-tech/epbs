import axios from 'axios';
import { Registration, Session, Formation, User } from '@prisma/client';
import { generatePaymentReceipt } from './generate-receipt';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { generateQuotePDF } from '@/lib/generate-quote-pdf';

const API_KEY = process.env.BREVO_API_KEY as string;
const domain = process.env.NEXT_PUBLIC_APP_URL;

// Type étendu pour inclure les relations
type RegistrationWithRelations = Registration & {
  session: Session & {
    formation: Formation;
  };
  user: User;
};

// Fonction utilitaire pour obtenir le prix selon la devise
const getPriceByCurrency = (session: Session, currency: string): number => {
  return currency === 'EUR' ? session.priceEUR : session.priceMAD;
};

// Fonction pour formater le prix avec la devise
const formatPrice = (price: number, currency: string): string => {
  const symbol = currency === 'EUR' ? '€' : 'MAD';
  return `${price} ${symbol}`;
};

// Template HTML avec signature pour tous les emails EPBS Consulting
const createEmailTemplate = (content: string): string => {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>EPBS Consulting</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .logo { margin-bottom: 20px; }
        .content { margin-bottom: 30px; }
        .signature { border-top: 1px solid #ddd; padding-top: 20px; }
        .signature-logo { margin-bottom: 10px; }
        .social-links { margin-top: 15px; }
        .social-links a { margin-right: 10px; }
        .button {
          display: inline-block;
          background-color: #2C5282;
          color: white !important;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .info-box {
          background-color: #f8f9fa;
          border-left: 4px solid #2C5282;
          padding: 15px;
          margin: 20px 0;
        }
        .highlight {
          color: #2C5282;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${domain}/LOGO_EPBS.png" alt="EPBS Consulting" height="50" />
        </div>
        
        <div class="content">
          ${content}
        </div>
        
        <div class="signature">
          <div class="signature-logo">
            <img src="${domain}/LOGO_EPBS.png" alt="EPBS Consulting" height="40" />
          </div>
          <p>
            <strong>EPBS Consulting</strong><br>
            Expert en solutions digitales<br>
            Tél: FR +33 6 45 91 81 92   MA +212 6 67 18 51 85<br>
            Email: contact@epbsconsulting.com<br>
            Site web: <a href="${domain}">${domain?.replace('https://', '')}</a>
          </p>
          
          <div class="social-links">
            <a href="https://www.facebook.com/share/19a6ynoddQ/"><img src="${domain}/facebook.png" alt="LinkedIn" height="25" /></a>
            <a href="https://x.com/epbsconsulting?t=91iEDxWVOdDhLj8LK0rIbA&s=09"><img src="${domain}/x.png" alt="Twitter" height="25" /></a>
          </div>
          
          <p style="font-size: 12px; color: #666; margin-top: 20px;">
            Ce message est confidentiel et peut contenir des informations privilégiées. Si vous n'êtes pas le destinataire prévu, veuillez nous en informer immédiatement et supprimer ce message.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Fonction de base pour envoyer un email
const sendEmail = async ({
  to,
  subject,
  htmlContent,
  attachments = [],
}: {
  to: string;
  subject: string;
  htmlContent: string;
  attachments?: Array<{
    content: string;
    name: string;
  }>;
}) => {
  const payload: any = {
    sender: {
      name: 'EPBS Consulting',
      email: 'koteseydou8@gmail.com',
    },
    to: [{ email: to }],
    subject,
    htmlContent: createEmailTemplate(htmlContent),
  };

  if (attachments.length > 0) {
    payload.attachment = attachments.map(att => ({
      content: att.content,
      name: att.name,
      contentType: 'application/pdf',
    }));
  }

  return await axios.post('https://api.brevo.com/v3/smtp/email', payload, {
    headers: {
      'api-key': API_KEY,
      'Content-Type': 'application/json',
    },
  });
};

/**
 * Envoie un email de confirmation d'inscription à une formation
 * @param registration Les informations d'inscription avec les relations
 */
export const sendRegistrationConfirmationEmail = async (registration: RegistrationWithRelations) => {
  const {
    firstName,
    lastName,
    email,
    session,
    status,
    paymentMethod,
    paymentStatus,
    currency,
  } = registration;

  const formation = session.formation;
  const startDate = format(session.startDate, 'dd MMMM yyyy', { locale: fr });
  const endDate = format(session.endDate, 'dd MMMM yyyy', { locale: fr });
  const formattedStartTime = format(session.startDate, 'HH:mm', { locale: fr });
  const dashboardLink = `${domain}/dashboard/formations`;

  // Obtenir le prix selon la devise de l'enregistrement
  const price = getPriceByCurrency(session, currency);
  const formattedPrice = formatPrice(price, currency);

  // Texte spécifique selon le statut de paiement
  const paymentInfo = paymentStatus === 'completed'
    ? `<p>Votre paiement de <span class="highlight">${formattedPrice}</span> a été reçu avec succès.</p>`
    : paymentMethod === 'bankTransfer'
      ? `<p>Veuillez procéder au paiement de <span class="highlight">${formattedPrice}</span> par virement bancaire aux coordonnées suivantes :</p>
         <div class="info-box">
           <p><strong>Titulaire :</strong> EPBS Consulting<br>
           <strong>RIB :</strong> 050 810 025 0113792272002 29<br>
           <strong>SWIFT/BIC :</strong> CAFGMAMC<br>
           <strong>Référence à indiquer :</strong> ${firstName} ${lastName} - ${formation.title}</p>
         </div>`
      : `<p>Votre paiement de <span class="highlight">${formattedPrice}</span> est en cours de traitement.</p>`;

  await sendEmail({
    to: email,
    subject: `EPBS Consulting - Confirmation d'inscription à la formation ${formation.title}`,
    htmlContent: `
      <h2 style="color: #2C5282;">Confirmation d'inscription à la formation</h2>
      <p>Bonjour ${firstName},</p>
      
      <p>Nous avons bien enregistré votre inscription à la formation <span class="highlight">"${formation.title}"</span>.</p>
      
      <div class="info-box">
        <p><strong>Détails de la formation :</strong></p>
        <p>📅 <strong>Date :</strong> du ${startDate} au ${endDate}<br>
        📍 <strong>Lieu :</strong> ${session.location}<br>
        👥 <strong>Places restantes :</strong> ${session.maxParticipants - session.currentParticipants} sur ${session.maxParticipants}<br>
        💰 <strong>Prix :</strong> ${formattedPrice}</p>
      </div>
      
      ${paymentInfo}
      
      <p>Votre inscription est actuellement <span class="highlight">${
        status === 'confirmed' ? 'confirmée' : 
        status === 'pending' ? 'en attente de confirmation' : 
        'annulée'
      }</span>.</p>
      
      <p>Vous pouvez suivre l'état de votre inscription et accéder aux détails de la formation depuis votre espace personnel :</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${dashboardLink}" class="button">Accéder à mon espace</a>
      </p>
      
      <p>Si vous avez des questions ou besoin d'informations complémentaires, n'hésitez pas à nous contacter.</p>
      
      <p>Nous nous réjouissons de vous accueillir prochainement pour cette formation.</p>
      
      <p>Cordialement,<br>L'équipe EPBS Consulting</p>
    `,
  });
};

/**
 * Envoie un email de confirmation de paiement avec le reçu en pièce jointe
 * @param registration Les informations d'inscription avec les relations
 */
export const sendPaymentConfirmationEmail = async (registration: RegistrationWithRelations) => {
  const {
    firstName,
    lastName,
    email,
    session,
    paymentMethod,
    quoteNumber,
    currency,
  } = registration;

  const formation = session.formation;
  const startDate = format(session.startDate, 'dd MMMM yyyy', { locale: fr });
  const dashboardLink = `${domain}/dashboard/formations`;

  // Obtenir le prix selon la devise de l'enregistrement
  const price = getPriceByCurrency(session, currency);
  const formattedPrice = formatPrice(price, currency);

  // Génération du reçu de paiement PDF
  const pdfBuffer = await generatePaymentReceipt(registration);

  // Conversion du buffer en base64 pour l'API d'email
  const pdfBase64 = pdfBuffer.toString('base64');

  // Référence du reçu
  const receiptNumber = quoteNumber || registration.id.substring(0, 8).toUpperCase();

  await sendEmail({
    to: email,
    subject: `EPBS Consulting - Confirmation de paiement pour la formation ${formation.title}`,
    htmlContent: `
      <h2 style="color: #2C5282;">Confirmation de paiement</h2>
      <p>Bonjour ${firstName},</p>
      
      <p>Nous vous confirmons la bonne réception de votre paiement pour la formation <span class="highlight">"${formation.title}"</span>
      qui débutera le ${startDate}.</p>
      
      <div class="info-box">
        <p><strong>Détails du paiement :</strong></p>
        <p>💰 <strong>Montant :</strong> ${formattedPrice}<br>
        💳 <strong>Moyen de paiement :</strong> ${
          paymentMethod === 'creditCard' ? 'Carte de crédit' : 'Virement bancaire'
        }<br>
        🧾 <strong>Référence :</strong> EPBS-${receiptNumber}</p>
      </div>
      
      <p>Vous trouverez ci-joint votre reçu de paiement au format PDF.</p>
      
      <p>Votre inscription est désormais <span class="highlight">confirmée</span>.</p>
      
      <p>Vous pouvez accéder à tout moment aux détails de votre formation et au matériel pédagogique depuis votre espace personnel :</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${dashboardLink}" class="button">Accéder à mon espace</a>
      </p>
      
      <p>Nous vous remercions pour votre confiance et nous nous réjouissons de vous accueillir prochainement.</p>
      
      <p>Cordialement,<br>L'équipe EPBS Consulting</p>
    `,
    attachments: [
      {
        content: pdfBase64,
        name: `EPBS_Recu_${receiptNumber}.pdf`,
      },
    ],
  });
};

export const sendQuoteEmail = async (registration: RegistrationWithRelations, quoteNumber: string) => {
  const {
    firstName,
    lastName,
    email,
    session,
    currency,
  } = registration;

  const formation = session.formation;
  const startDate = format(session.startDate, 'dd MMMM yyyy', { locale: fr });
  const endDate = format(session.endDate, 'dd MMMM yyyy', { locale: fr });
  const formattedDates = `${startDate} au ${endDate}`;
  const dashboardLink = `${domain}/settings`;

  // Obtenir le prix selon la devise de l'enregistrement
  const price = getPriceByCurrency(session, currency);

  // Calculer la TVA et le prix total
  const vatRate = parseFloat(process.env.VAT_RATE || '0.2');
  const vatAmount = price * vatRate;
  const totalWithVat = price + vatAmount;

  // Formater les prix avec la devise
  const formattedPrice = formatPrice(price, currency);
  const formattedVatAmount = formatPrice(vatAmount, currency);
  const formattedTotalWithVat = formatPrice(totalWithVat, currency);

  // Générer le PDF du devis
  const quoteData = {
    quoteNumber,
    customerName: `${firstName} ${lastName}`,
    customerEmail: email,
    formationTitle: formation.title,
    formationDates: formattedDates,
    price: price,
    vatRate,
    currency,
  };

  const doc = await generateQuotePDF(quoteData);

  // Convertir le PDF en base64
  const pdfBase64 = doc.output('datauristring').split(',')[1];

  await sendEmail({
    to: email,
    subject: `EPBS Consulting - Devis pour la formation "${formation.title}"`,
    htmlContent: `
      <h2 style="color: #2C5282;">Devis pour votre inscription</h2>
      <p>Bonjour ${firstName},</p>
      
      <p>Suite à votre demande d'inscription à la formation <span class="highlight">"${formation.title}"</span>, 
      vous trouverez ci-joint un devis pour le paiement par virement bancaire.</p>
      
      <div class="info-box">
        <p><strong>Détails de la formation :</strong></p>
        <p>📅 <strong>Date :</strong> du ${startDate} au ${endDate}<br>
        📍 <strong>Lieu :</strong> ${session.location}<br>
        💰 <strong>Montant HT :</strong> ${formattedPrice}<br>
        🧾 <strong>TVA (20%) :</strong> ${formattedVatAmount}<br>
        💵 <strong>Montant total TTC :</strong> <span class="highlight">${formattedTotalWithVat}</span><br>
        📝 <strong>Référence devis :</strong> ${quoteNumber}</p>
      </div>
      
      <p>Pour finaliser votre inscription, nous vous invitons à effectuer un virement bancaire en utilisant les coordonnées bancaires indiquées sur le devis ci-joint.</p>
      
      <p><strong>Important :</strong> Veuillez indiquer le numéro de devis <span class="highlight">${quoteNumber}</span> dans la référence de votre virement pour nous permettre d'identifier rapidement votre paiement.</p>
      
      <p>Une fois le paiement reçu, nous vous enverrons une confirmation d'inscription ainsi qu'un reçu de paiement.</p>
      
      <p>Vous pouvez suivre l'état de votre inscription depuis votre espace personnel :</p>
      
      <p style="text-align: center; margin: 30px 0;">
        <a href="${dashboardLink}" class="button">Accéder à mon espace</a>
      </p>
      
      <p>Si vous avez des questions concernant ce devis ou la procédure de paiement, n'hésitez pas à nous contacter.</p>
      
      <p>Cordialement,<br>L'équipe EPBS Consulting</p>
    `,
    attachments: [
      {
        content: pdfBase64,
        name: `Devis_${quoteNumber}_${formation.title.replace(/\s+/g, '_')}.pdf`,
      },
    ],
  });
};