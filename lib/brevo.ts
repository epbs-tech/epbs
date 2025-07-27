import axios from 'axios';

const API_KEY = process.env.BREVO_API_KEY as string;
const domain = process.env.NEXT_PUBLIC_APP_URL;

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

const sendEmail = async ({
  to,
  subject,
  htmlContent,
}: {
  to: string;
  subject: string;
  htmlContent: string;
}) => {
  return await axios.post(
    'https://api.brevo.com/v3/smtp/email',
    {
      sender: {
        name: 'EPBS Consulting',
        email: 'koteseydou8@gmail.com', // remplacer par votre email vérifié chez Brevo
      },
      to: [{ email: to }],
      subject,
      htmlContent: createEmailTemplate(htmlContent),
    },
    {
      headers: {
        'api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    }
  );
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await sendEmail({
    to: email,
    subject: 'EPBS Consulting - Votre code d\'authentification',
    htmlContent: `
      <h2>Authentification à deux facteurs</h2>
      <p>Bonjour,</p>
      <p>Voici votre code d'authentification à deux facteurs :</p>
      <p style="font-size: 24px; font-weight: bold; text-align: center; padding: 10px; background-color: #f0f0f0; border-radius: 4px;">${token}</p>
      <p>Ce code est valable pendant 10 minutes.</p>
      <p>Si vous n'avez pas demandé ce code, veuillez ignorer cet email ou nous contacter immédiatement.</p>
      <p>Cordialement,<br>L'équipe EPBS Consulting</p>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'EPBS Consulting - Confirmation de votre adresse email',
    htmlContent: `
      <h2>Bienvenue chez EPBS Consulting</h2>
      <p>Bonjour,</p>
      <p>Merci de confirmer votre adresse email en cliquant sur le bouton ci-dessous :</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${confirmLink}" class="button">Confirmer mon email</a>
      </p>
      <p>Si le bouton ne fonctionne pas, vous pouvez également cliquer sur ce lien ou le copier dans votre navigateur :</p>
      <p><a href="${confirmLink}">${confirmLink}</a></p>
      <p>Ce lien expire dans 24 heures.</p>
      <p>Cordialement,<br>L'équipe EPBS Consulting</p>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'EPBS Consulting - Réinitialisation de votre mot de passe',
    htmlContent: `
      <h2>Réinitialisation de mot de passe</h2>
      <p>Bonjour,</p>
      <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
      <p style="text-align: center; margin: 30px 0;">
        <a href="${resetLink}" class="button">Réinitialiser mon mot de passe</a>
      </p>
      <p>Si le bouton ne fonctionne pas, vous pouvez également cliquer sur ce lien ou le copier dans votre navigateur :</p>
      <p><a href="${resetLink}">${resetLink}</a></p>
      <p>Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
      <p>Cordialement,<br>L'équipe EPBS Consulting</p>
    `,
  });
};

export const sendWelcomeEmail = async (email: string, name: string) => {
  await sendEmail({
    to: email,
    subject: '🎉 Bienvenue chez EPBS Consulting',
    htmlContent: `
      <h2 style="color: #2C5282;">Bienvenue dans l'univers EPBS Consulting</h2>
      <p>Bonjour ${name},</p>

      <p>Nous sommes heureux de vous compter parmi les membres de notre communauté.</p>
      <p>EPBS Consulting, c’est bien plus qu’un cabinet de conseil. C’est une expertise dédiée à la transformation digitale, à l’innovation technologique et à l'accompagnement sur-mesure de nos clients.</p>

      <p>Voici ce que vous pouvez faire dès maintenant :</p>
      <ul>
        <li>🔍 Explorer notre <strong>catalogue de formations</strong></li>
        <li>📅 <strong>Planifier un échange</strong> avec l’un de nos experts</li>
        <li>🚀 Découvrir nos <strong>solutions digitales</strong> adaptées à vos besoins</li>
      </ul>

      <p style="text-align: center; margin: 30px 0;">
        <a href="${domain}/dashboard" class="button">Accéder à mon espace</a>
      </p>

      <p>Besoin d’aide ou de plus d’informations ? Notre équipe est à votre écoute à tout moment.</p>
      <p>Encore une fois, bienvenue chez EPBS Consulting !</p>

      <p style="margin-top: 30px;">Bien à vous,<br>L’équipe EPBS Consulting</p>
    `,
  });
};
