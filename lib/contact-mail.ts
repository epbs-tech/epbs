import axios from 'axios';

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || '587');
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  tls: { rejectUnauthorized: false, }
});
const domain = process.env.NEXT_PUBLIC_APP_URL;

// Interface pour les données du formulaire de contact
interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
}

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
        .contact-info {
          background-color: #fff;
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
        }
        .urgent-badge {
          background-color: #dc3545;
          color: white;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <img src="${domain}/epbs_logo.svg" alt="EPBS Consulting" height="50" />
        </div>

        <div class="content">
          ${content}
        </div>

        <div class="signature">
          <div class="signature-logo">
            <img src="${domain}/epbs_logo.svg" alt="EPBS Consulting" height="40" />
          </div>
          <p>
            <strong>EPBS Consulting</strong><br>
            Expert en solutions digitales<br>
            Tél: FR +33 6 45 91 81 92   MA +212 6 67 18 51 85<br>
            Email: contact@epbsconsulting.com<br>
            Site web: <a href="${domain}">${domain?.replace('https://', '')}</a>
          </p>

          <div class="social-links">
            <a href="https://www.facebook.com/share/19a6ynoddQ/"><img src="${domain}/facebook.png" alt="Facebook" height="25" /></a>
            <a href="https://x.com/epbsconsulting?t=91iEDxWVOdDhLj8LK0rIbA&s=09"><img src="${domain}/x.png" alt="Twitter" height="25" /></a>
          </div>
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
}: {
  to: string;
  subject: string;
  htmlContent: string;
}) => {
  const payload = {
    sender: {
      name: 'EPBS Consulting - Site Web',
      email: 'koteseydou8@gmail.com',
    },
    to: [{ email: to }],
    subject,
    htmlContent: createEmailTemplate(htmlContent),
  };

  const mailOptions: any = {
    from: `EPBS Consulting <${SMTP_USER}>`,
    to: payload.to[0].email,
    subject: payload.subject,
    html: payload.htmlContent,
  };
  if ((payload as any).attachment) {
    mailOptions.attachments = (payload as any).attachment;
  }
  await transporter.sendMail(mailOptions);
};

/**
 * Envoie un email de notification pour un nouveau message de contact
 * @param contactData Les données du formulaire de contact
 */
export const sendContactNotificationEmail = async (contactData: ContactFormData) => {
  const { fullName, email, phone, message } = contactData;

  // Email de notification pour l'équipe EPBS Consulting
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  await sendEmail({
    to: 'koteseydou8@gmail.com', //contact@epbsconsulting.com', // Email de destination pour l'équipe
    subject: `🔔 Nouveau message de contact - ${fullName}`,
    htmlContent: `
      <div style="text-align: center; margin-bottom: 20px;">
        <span class="urgent-badge">NOUVEAU CONTACT</span>
      </div>

      <h2 style="color: #2C5282; text-align: center;">Nouveau message de contact reçu</h2>

      <p style="text-align: center; color: #666; margin-bottom: 30px;">
        Reçu le ${currentDate}
      </p>

      <div class="contact-info">
        <h3 style="color: #2C5282; margin-bottom: 15px; border-bottom: 2px solid #2C5282; padding-bottom: 5px;">
          📋 Informations du contact
        </h3>

        <p><strong>👤 Nom complet :</strong> <span class="highlight">${fullName}</span></p>
        <p><strong>📧 Email :</strong> <a href="mailto:${email}" style="color: #2C5282;">${email}</a></p>
        ${phone ? `<p><strong>📱 Téléphone :</strong> <a href="tel:${phone}" style="color: #2C5282;">${phone}</a></p>` : ''}
      </div>

      <div class="info-box">
        <h3 style="color: #2C5282; margin-bottom: 15px;">💬 Message :</h3>
        <p style="font-style: italic; white-space: pre-line; background-color: #fff; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
          "${message}"
        </p>
      </div>

      <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-top: 30px;">
        <h3 style="color: #1976d2; margin-bottom: 10px;">⚡ Actions recommandées :</h3>
        <ul style="color: #1976d2; margin: 0; padding-left: 20px;">
          <li>Répondre dans les 2 heures pour maintenir un excellent service client</li>
          <li>Ajouter ce contact à votre CRM si ce n'est pas déjà fait</li>
          <li>Programmer un suivi si nécessaire</li>
        </ul>
      </div>

      <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <p style="margin: 0; color: #666;">
          <strong>Réponse rapide :</strong>
          <a href="mailto:${email}?subject=Re: Votre message sur EPBS Consulting"
             style="color: #2C5282; text-decoration: none; font-weight: bold;">
            Répondre directement à ${fullName}
          </a>
        </p>
      </div>
    `,
  });
};

/**
 * Envoie un email de confirmation automatique au client
 * @param contactData Les données du formulaire de contact
 */
export const sendContactConfirmationEmail = async (contactData: ContactFormData) => {
  const { fullName, email } = contactData;

  await sendEmail({
    to: email,
    subject: 'EPBS Consulting - Nous avons bien reçu votre message',
    htmlContent: `
      <h2 style="color: #2C5282;">Merci pour votre message !</h2>

      <p>Bonjour ${fullName},</p>

      <p>Nous vous remercions de nous avoir contactés via notre site web. Votre message a bien été reçu et transmis à notre équipe.</p>

      <div class="info-box">
        <h3 style="color: #2C5282; margin-bottom: 10px;">⏰ Que se passe-t-il maintenant ?</h3>
        <ul style="margin: 0; padding-left: 20px;">
          <li><strong>Délai de réponse :</strong> Nous nous engageons à vous répondre dans les <span class="highlight">24 heures</span></li>
          <li><strong>Analyse de votre demande :</strong> Notre équipe étudie attentivement vos besoins</li>
          <li><strong>Proposition personnalisée :</strong> Nous vous proposerons une solution adaptée à votre projet</li>
        </ul>
      </div>

      <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 25px 0;">
        <h3 style="color: #2e7d32; margin-bottom: 10px;">🎯 Notre expertise à votre service</h3>
        <p style="margin: 0; color: #2e7d32;">
          Depuis notre création, nous accompagnons nos clients dans leur transformation digitale
          avec des solutions sur mesure et un accompagnement personnalisé.
        </p>
      </div>

      <p>En attendant notre réponse, n'hésitez pas à :</p>
      <ul>
        <li>Consulter nos <a href="${domain}/formations" style="color: #2C5282;">formations disponibles</a></li>
        <li>Découvrir nos <a href="${domain}/blogs" style="color: #2C5282;">services de consulting</a>
        <li>Découvrir nos <a href="${domain}/podcasts" style="color: #2C5282;">podcasts</a></li>
        <li>Suivre notre actualité sur nos <a href="${domain}/contact" style="color: #2C5282;">réseaux sociaux</a></li>
      </ul>

      <div style="text-align: center; margin: 30px 0; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <p style="margin-bottom: 10px;"><strong>Une question urgente ?</strong></p>
        <p style="margin: 0;">
          📞 <strong>France :</strong> +33 6 45 91 81 92<br>
          📞 <strong>Maroc :</strong> +212 6 67 18 51 85
        </p>
      </div>

      <p>Nous sommes impatients d'échanger avec vous sur votre projet !</p>

      <p>Cordialement,<br><strong>L'équipe EPBS Consulting</strong></p>
    `,
  });
};