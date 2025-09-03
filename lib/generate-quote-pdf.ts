"use server"
import jsPDF from 'jspdf';
import fs from "fs";
import path from "path";
interface generateQuotePDFProps {
    quoteNumber: string;
    customerName: string;
    customerEmail?: string;
    formationTitle: string;
    formationDates: string;
    price: number;
    currency: string;
    vatRate?: number; // Taux de TVA (par défaut 20%)
    logoPath?: string; // Chemin vers le logo
    bankDetails?: {
        accountHolder: string;
        bank: string;
        branch: string;
        rib: string;
        swift: string;
    };
}

export const generateQuotePDF = async ({
  quoteNumber,
  customerName,
  customerEmail,
  formationTitle,
  formationDates,
  price,
  currency,
  vatRate = 0.20,
  logoPath = "/epbs_logo.svg",
  bankDetails = {
    accountHolder: "EPBSEA SARL",
    bank: "CFG Bank",
    branch: "Agence Arribat Center",
    rib: "050 810 025 0113792272002 29",
    swift: "CAFGMAMC"
  }
} :generateQuotePDFProps) => {
  // Créer un nouveau document PDF
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;

  // Calculer la TVA et le prix total
  const vatAmount = price * vatRate;
  const totalWithVat = price + vatAmount;


  // Ajouter le logo si un chemin est fourni
  if (fs.existsSync(logoPath)) {
      // Conversion du logo en base64
      const logoData = fs.readFileSync(logoPath);
      const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

      // Ajout du logo au document
      const logoWidth = 50;
      const logoHeight = 15;
      doc.addImage(logoBase64, 'PNG', margin, margin, logoWidth, logoHeight);
    }
  const logoPath2 = path.join(process.cwd(), 'public', 'epbs_logo.svg');

    // Vérification si le fichier existe
    if (fs.existsSync(logoPath2)) {
      // Conversion du logo en base64
      const logoData = fs.readFileSync(logoPath2);
      const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

      // Ajout du logo au document
      const logoWidth = 40;
      const logoHeight = 16;
      doc.addImage(logoBase64, 'PNG', margin, margin, logoWidth, logoHeight);
    } else {
      // Si le logo n'est pas trouvé, ajout d'un texte à la place
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('EPBS CONSULTING', margin, margin + 10);
      doc.setFont('helvetica', 'normal');
    }

  // Titre du document
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("DEVIS", pageWidth / 2, margin + 30, { align: "center" });

  // Numéro de devis et date
  const currentDate = new Date().toLocaleDateString('fr-FR');
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`N° ${quoteNumber}`, margin, margin + 40);
  doc.text(`Date: ${currentDate}`, margin, margin + 48);

  // Informations client
  doc.setFont("helvetica", "bold");
  doc.text("Client:", pageWidth - margin - 70, margin + 40);
  doc.setFont("helvetica", "normal");
  doc.text(customerName, pageWidth - margin - 70, margin + 48);
  if (customerEmail) {
    doc.text(customerEmail, pageWidth - margin - 70, margin + 56);
  }

  // Détails de la formation
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Détails de la formation", margin, margin + 70);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Formation: ${formationTitle}`, margin, margin + 80);
  doc.text(`Dates: ${formationDates}`, margin, margin + 88);

  // Tableau des prix
  const tableTop = margin + 100;
  const tableWidth = pageWidth - (margin * 2);

  // En-tête du tableau
  doc.setFont("helvetica", "bold");
  doc.rect(margin, tableTop, tableWidth, 10);
  doc.text("Désignation", margin + 5, tableTop + 7);
  doc.text(`Montant HT ${currency === 'EUR'? '€' : 'MAD'}`, pageWidth - margin - 60, tableTop + 7);

  // Ligne du tableau
  doc.setFont("helvetica", "normal");
  doc.rect(margin, tableTop + 10, tableWidth, 10);
  doc.text(formationTitle, margin + 5, tableTop + 17);
  doc.text(`${price.toFixed(2)}`, pageWidth - margin - 60, tableTop + 17);

  // Ligne TVA
  doc.rect(margin, tableTop + 20, tableWidth, 10);
  doc.text(`TVA (${(vatRate * 100).toFixed(0)}%)`, margin + 5, tableTop + 27);
  doc.text(`${vatAmount.toFixed(2)}`, pageWidth - margin - 60, tableTop + 27);

  // Total TTC
  doc.setFont("helvetica", "bold");
  doc.rect(margin, tableTop + 30, tableWidth, 10);
  doc.text("Total TTC", margin + 5, tableTop + 37);
  doc.text(`${totalWithVat.toFixed(2)}`, pageWidth - margin - 60, tableTop + 37);

  // Coordonnées bancaires
  if (bankDetails) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Coordonnées bancaires", margin, tableTop + 60);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Titulaire: ${bankDetails.accountHolder}`, margin, tableTop + 70);
    doc.text(`Banque: ${bankDetails.bank}`, margin, tableTop + 78);
    doc.text(`Domiciliation: ${bankDetails.branch}`, margin, tableTop + 86);

    // Références bancaires
    doc.text(`RIB: ${bankDetails.rib}`, margin, tableTop + 94);
    doc.text(`SWIFT/BIC: ${bankDetails.swift}`, margin, tableTop + 102);

    // Instructions pour le paiement international
    doc.setFont("helvetica", "italic");
    doc.text("Pour tout virement depuis l'étranger, utiliser un paiement SWIFT de type MT103", margin, tableTop + 115);
  }

  // Pied de page
  const footerText = `${bankDetails?.accountHolder || 'EPBSEA SARL'} - Merci pour votre confiance`;
  doc.setFontSize(10);
  doc.text(footerText, pageWidth / 2, doc.internal.pageSize.getHeight() - 20, { align: "center" });

  return doc;
}


export const downloadQuotePDF= async (quoteData: generateQuotePDFProps, filename = null) =>{
  const doc = generateQuotePDF(quoteData);

  // Construire le nom du fichier si non spécifié
  const safeFilename = filename ||
    `Devis_${quoteData.quoteNumber}_${quoteData.formationTitle.replace(/\s+/g, '_')}`;

  // Télécharger le PDF
  //doc.save(`${safeFilename}.pdf`);

  return doc;
}


export const generateQuoteNumber = async() =>{
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

  return `DEV-${year}${month}${day}-${random}`;
}