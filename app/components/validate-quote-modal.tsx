"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ValidateQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ValidateQuoteModal({ isOpen, onClose }: ValidateQuoteModalProps) {
  const [quoteNumber, setQuoteNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`/api/registrations/validate-quote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quoteNumber }),
      });

      if (!response.ok) {
        throw new Error("Numéro de devis invalide");
      }

      const data = await response.json();
      toast.success("Inscription validée avec succès");
      onClose();
    } catch (error) {
      toast.error("Erreur lors de la validation du devis");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Valider une inscription</DialogTitle>
          <DialogDescription>
            Entrez le numéro de devis pour valider l'inscription
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Numéro de devis"
            value={quoteNumber}
            onChange={(e) => setQuoteNumber(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Validation..." : "Valider"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}