'use client';
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaUniversity, FaDownload } from "react-icons/fa";
import jsPDF from "jspdf";
import { toast } from "sonner";
import { generateQuoteNumber } from "@/lib/generate-quote-pdf";

// Taux de TVA standard au Maroc (20%)
const VAT_RATE = parseFloat(process.env.VAT_RATE || "0.2");

interface PaymentMethodsProps {
  onSelectPaymentMethod: (method: 'creditCard' | 'bankTransfer') => void;
  registrationId: string;
  sessionId: string;
  price: number;
  currency: string;
  formationTitle: string;
  formationDates: string;
  customerName: string;
  customerEmail: string;
}

export function PaymentMethods({
  onSelectPaymentMethod,
  registrationId,
  sessionId,
  price,
  currency,
  formationTitle,
  formationDates,
  customerName,
  customerEmail,
}: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<'bankTransfer' | null>(null);
  const [quoteNumber, setQuoteNumber] = useState('');

  // Calculer la TVA et le prix total
  const vatAmount = price * VAT_RATE;
  const totalWithVat = price + vatAmount;

  // Générer un numéro de devis unique
  useEffect(() => {
    const fetchQuoteNumber = async () => {
      const number = await generateQuoteNumber();
      setQuoteNumber(number);
    };
    fetchQuoteNumber();
  }, []);

  const handleBankTransfer = async () => {
    setSelectedMethod('bankTransfer');
    onSelectPaymentMethod('bankTransfer');
    try {
      const response = await fetch(`/api/registrations/${registrationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quoteNumber }),
      });
      if (!response.ok) {
        throw new Error('Failed to update registration');
      }
      toast.success("Le statut de l'inscription a été mis à jour avec succès");
    } catch {
      toast.error("Impossible de mettre à jour le statut");
    }
  };

  const generateQuotePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    doc.addImage("/epbs_logo.svg", 'PNG', margin, margin, 50, 15);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("DEVIS", pageWidth / 2, margin + 30, { align: "center" });
    const currentDate = new Date().toLocaleDateString("fr-FR");
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`N° ${quoteNumber}`, margin, margin + 40);
    doc.text(`Date: ${currentDate}`, margin, margin + 48);
    doc.setFont("helvetica", "bold");
    doc.text("Client:", pageWidth - margin - 70, margin + 40);
    doc.setFont("helvetica", "normal");
    doc.text(customerName, pageWidth - margin - 70, margin + 48);
    if (customerEmail) {
      doc.text(customerEmail, pageWidth - margin - 70, margin + 56);
    }
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Détails de la formation", margin, margin + 70);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Formation: ${formationTitle}`, margin, margin + 80);
    doc.text(`Dates: ${formationDates}`, margin, margin + 88);
    doc.setFont("helvetica", "bold");
    // Tableau des prix
    doc.rect(margin, margin + 100, pageWidth - margin * 2, 10);
    doc.text("Montant HT", margin + 5, margin + 107);
    doc.text(`${price.toFixed(2)} ${currency}`, pageWidth - margin - 60, margin + 107);
    doc.rect(margin, margin + 110, pageWidth - margin * 2, 10);
    doc.text("TVA (20%)", margin + 5, margin + 117);
    doc.text(`${vatAmount.toFixed(2)} ${currency}`, pageWidth - margin - 60, margin + 117);
    doc.rect(margin, margin + 120, pageWidth - margin * 2, 10);
    doc.text("Total TTC", margin + 5, margin + 127);
    doc.text(`${totalWithVat.toFixed(2)} ${currency}`, pageWidth - margin - 60, margin + 127);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Coordonnées bancaires", margin, margin + 140);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Titulaire: EPBSEA SARL", margin, margin + 150);
    doc.text("Banque: CFG Bank", margin, margin + 158);
    doc.text("Domiciliation: Agence Arribat Center", margin, margin + 166);
    doc.text("RIB: 050 810 025 0113792272002 29", margin, margin + 174);
    doc.text("SWIFT/BIC: CAFGMAMC", margin, margin + 182);
    doc.setFont("helvetica", "italic");
    doc.text("Pour tout virement depuis l'étranger, utiliser un paiement SWIFT de type MT103", margin, margin + 195);
    const footerText = "EPBSEA SARL - Merci pour votre confiance";
    doc.setFontSize(10);
    doc.text(footerText, pageWidth / 2, doc.internal.pageSize.getHeight() - 20, { align: "center" });
    doc.save(`Devis_${quoteNumber}_${formationTitle.replace(/\s+/g, "_")}.pdf`);
    // All tableTop and tableWidth references removed. PDF generation uses only margin and pageWidth as above.
  };

  return (
    <div className="space-y-6">
      {!selectedMethod && (
        <>
          <p className="text-sm mb-4">
            Veuillez effectuer le paiement par virement bancaire. Votre inscription sera en attente de paiement.
          </p>
          <Card className="p-4 cursor-pointer border-2 hover:border-primary transition-colors" onClick={handleBankTransfer}>
            <div className="flex flex-col items-center space-y-3">
              <FaUniversity size={30} className="text-primary" />
              <div className="text-center">
                <h3 className="font-medium">Virement bancaire</h3>
                <p className="text-sm text-muted-foreground">Recevez un devis et nos coordonnées bancaires</p>
              </div>
              <Button variant="outline" className="w-full">
                Choisir cette méthode
              </Button>
            </div>
          </Card>
        </>
      )}
      {selectedMethod === 'bankTransfer' && (
        <div className="bg-muted p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Paiement par virement bancaire</h3>
          <div className="space-y-4">
            <div>
              <p className="font-medium">Formation:</p>
              <p>{formationTitle}</p>
            </div>
            <div>
              <p className="font-medium">Dates:</p>
              <p>{formationDates}</p>
            </div>
            <div>
              <p className="font-medium">Montant HT:</p>
              <p>{price.toFixed(2)} {currency}</p>
            </div>
            <div>
              <p className="font-medium">TVA (20%):</p>
              <p>{vatAmount.toFixed(2)} {currency}</p>
            </div>
            <div>
              <p className="font-medium">Montant total TTC:</p>
              <p className="text-lg font-bold">{totalWithVat.toFixed(2)} {currency}</p>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-medium mb-2">Coordonnées bancaires:</h4>
              <ul className="space-y-1 text-sm">
                <li><span className="font-medium">Titulaire:</span> EPBSEA SARL</li>
                <li><span className="font-medium">Banque:</span> CFG Bank</li>
                <li><span className="font-medium">Domiciliation:</span> Agence Arribat Center</li>
                <li><span className="font-medium">RIB:</span> 050 810 025 0113792272002 29</li>
                <li><span className="font-medium">SWIFT/BIC:</span> CAFGMAMC</li>
              </ul>
            </div>
            <Button
              onClick={generateQuotePDF}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              <FaDownload /> Télécharger le devis au format PDF
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Statut du paiement : <span className="font-bold">En attente de paiement</span>.<br />
              Veuillez effectuer votre virement en indiquant le numéro de devis {quoteNumber} en référence.
              Une fois le paiement effectué, votre inscription sera validée après vérification de la réception du paiement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
