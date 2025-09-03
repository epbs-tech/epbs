import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Registration, Session, Formation, User } from '@prisma/client';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import path from 'path';
import fs from 'fs';

// Type étendu pour inclure les relations
type RegistrationWithRelations = Registration & {
  session: Session & {
    formation: Formation;
  };
  user: User;
};

/**
 * Génère un reçu de paiement au format PDF avec une mise en page améliorée
 * @param registration Les données d'inscription avec les relations
 * @returns Le document PDF sous forme de Buffer
 */
export const generatePaymentReceipt = async (
  registration: RegistrationWithRelations
): Promise<Buffer> => {
  // Création du document PDF au format A4
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  // Ajout de l'extension jspdf-autotable au document
  autoTable(doc, {});

  // Définition des marges
  const margin = {
    left: 20,
    right: 20,
    top: 20,
  };

  // Largeur utile (en tenant compte des marges)
  const usableWidth = 210 - margin.left - margin.right;

  // Informations sur l'entreprise
  const companyInfo = {
    name: 'EPBS Consulting',
    address: 'Paris, France & Casablanca, Maroc',
    phone: 'FR +33 6 45 91 81 92   MA +212 6 67 18 51 85',
    email: 'contact@epbsconsulting.com',
    website: process.env.NEXT_PUBLIC_APP_URL,
  };

  // Informations sur la facture
  const receiptInfo = {
    number: `EPBS-${registration.quoteNumber || 'DEV-' + format(new Date(), 'yyyyMMdd') + '-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    date: format(registration.paidAt || registration.updatedAt, 'dd MMMM yyyy', { locale: fr }),
    paymentMethod: registration.paymentMethod === 'creditCard' ? 'Carte de crédit' : 'Virement bancaire',
    paymentStatus: registration.paymentStatus === 'completed' ? 'Payé' : 'En attente',
  };

  // Informations sur le client
  const clientInfo = {
    name: `${registration.firstName} ${registration.lastName}`,
    email: registration.email,
    phone: registration.phone || 'Non spécifié',
    company: registration.company || 'Particulier',
  };

  // Informations sur la formation
  const formationInfo = {
    title: registration.session.formation.title,
    startDate: format(registration.session.startDate, 'dd MMMM yyyy', { locale: fr }),
    endDate: format(registration.session.endDate, 'dd MMMM yyyy', { locale: fr }),
    location: registration.session.location,
    price: registration.currency === 'EUR' ? registration.session.priceEUR : registration.session.priceMAD, 
  };

  // Calcul des taxes (TVA 20%)
  const priceHT = (formationInfo.price / 1.2).toFixed(2);
  const tva = (formationInfo.price - parseFloat(priceHT)).toFixed(2);
  const priceTTC = formationInfo.price.toFixed(2);

  // Position verticale courante
  let currentY = margin.top;

  try {
    // Récupération du chemin du logo
    const logoPath = path.join(process.cwd(), 'public', 'epbs_logo.svg');

    // Vérification si le fichier existe
    if (fs.existsSync(logoPath)) {
      // Conversion du logo en base64
      const logoData = fs.readFileSync(logoPath);
      const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

      // Ajout du logo au document
      const logoWidth = 40;
      const logoHeight = 16;
      doc.addImage(logoBase64, 'PNG', margin.left, currentY, logoWidth, logoHeight);
    } else {
      // Si le logo n'est pas trouvé, ajout d'un texte à la place
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('EPBS CONSULTING', margin.left, currentY + 10);
      doc.setFont('helvetica', 'normal');
    }
  } catch (error) {
    console.error('Erreur lors du chargement du logo:', error);
    // En cas d'erreur, on continue sans logo
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('EPBS CONSULTING', margin.left, currentY + 10);
    doc.setFont('helvetica', 'normal');
  }

  // Titre du document
  doc.setFontSize(22);
  doc.setTextColor(44, 82, 130); // Couleur bleue (#2C5282)
  doc.text('REÇU DE PAIEMENT', 105, currentY + 10, { align: 'center' });
  currentY += 20; // Espace après le titre

  // Section informations de l'entreprise (colonne gauche)
  doc.setFontSize(10);
  doc.setTextColor(0, 0, 0);
  doc.text(companyInfo.name, margin.left, currentY + 5);
  doc.text(companyInfo.address, margin.left, currentY + 10);
  doc.text(`Tél: ${companyInfo.phone}`, margin.left, currentY + 15);
  doc.text(`Email: ${companyInfo.email}`, margin.left, currentY + 20);
  doc.text(`Site web: ${companyInfo.website}`, margin.left, currentY + 25);

  // Section informations de facture (colonne droite)
  const receiptInfoX = 130;
  doc.setFontSize(10);
  doc.text('Reçu n°:', receiptInfoX, currentY + 5);
  doc.text('Date:', receiptInfoX, currentY + 10);
  doc.text('Moyen de paiement:', receiptInfoX, currentY + 15);
  doc.text('Statut:', receiptInfoX, currentY + 20);

  doc.setFont('helvetica', 'bold');
  doc.text(receiptInfo.number, receiptInfoX + 30, currentY + 5);
  doc.text(receiptInfo.date, receiptInfoX + 30, currentY + 10);
  doc.text(receiptInfo.paymentMethod, receiptInfoX + 30, currentY + 15);
  doc.text(receiptInfo.paymentStatus, receiptInfoX + 30, currentY + 20);
  doc.setFont('helvetica', 'normal');

  currentY += 35; // Déplacement après les informations d'en-tête

  // Section informations du client
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('FACTURÉ À', margin.left, currentY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  currentY += 7;
  doc.text(clientInfo.name, margin.left, currentY);
  currentY += 5;
  doc.text(clientInfo.company, margin.left, currentY);
  currentY += 5;
  doc.text(`Email: ${clientInfo.email}`, margin.left, currentY);
  currentY += 5;
  doc.text(`Tél: ${clientInfo.phone}`, margin.left, currentY);
  currentY += 15; // Espace avant le tableau

  // Tableau des détails de formation avec autoTable
  autoTable(doc, {
    startY: currentY,
    margin: { left: margin.left, right: margin.right },
    head: [['Description', 'Dates', 'Lieu', 'Prix HT', 'TVA (20%)', 'Prix TTC']],
    body: [
      [
        formationInfo.title,
        `${formationInfo.startDate} au ${formationInfo.endDate}`,
        formationInfo.location,
        `${priceHT} ${registration.currency === 'EUR' ? '€' : 'MAD'}`,
        `${tva} ${registration.currency === 'EUR' ? '€' : 'MAD'}`,
        `${priceTTC} ${registration.currency === 'EUR' ? '€' : 'MAD'}`,
      ],
    ],
    styles: { fontSize: 9, cellPadding: 5 },
    headStyles: { fillColor: [44, 82, 130], textColor: [255, 255, 255] },
    columnStyles: {
      0: { cellWidth: 55 },    // Description
      1: { cellWidth: 45 },    // Dates
      2: { cellWidth: 20 },    // Lieu
      3: { cellWidth: 20 },    // Prix HT
      4: { cellWidth: 20 },    // TVA
      5: { cellWidth: 20 },    // Prix TTC
    },
    didDrawPage: (data) => {
      currentY = (data.cursor?.y ?? 0) + 10;
    }

  });

  // Total
  const totalX = 130;

  doc.setFontSize(10);
  doc.text('Total HT:', totalX, currentY);
  doc.text('TVA (20%):', totalX, currentY + 5);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL TTC:', totalX, currentY + 15);
  doc.setFont('helvetica', 'normal');

  // Alignement des montants à droite
  const amountX = 170;
  doc.setFontSize(10);
  doc.text(`${priceHT} ${registration.currency === 'EUR' ? '€' : 'MAD'}`, amountX, currentY);
  doc.text(`${tva} ${registration.currency === 'EUR' ? '€' : 'MAD'}`, amountX, currentY + 5);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`${priceTTC} ${registration.currency === 'EUR' ? '€' : 'MAD'}`, amountX, currentY + 15);

  // Pied de page
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100);
  const footerText = 'EPBS Consulting - Accompagnement en solutions digitales et formation professionnelle';
  doc.text(footerText, 105, 280, { align: 'center' });

  // Convertir le PDF en buffer
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  return pdfBuffer;
};