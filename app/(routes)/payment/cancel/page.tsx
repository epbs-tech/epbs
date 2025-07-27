'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Registration } from "@prisma/client";

// Définition des types nécessaires
type ExtendedRegistration = Registration & {
  session: {
    formationId: string;
    startDate: Date;
    endDate: Date;
    formation: {
      title: string;
    };
  };
};

export default function CancelPage() {
  const [loading, setLoading] = useState(true);
  const [registrationData, setRegistrationData] = useState<ExtendedRegistration | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const registrationId = searchParams.get('registration_id');

  useEffect(() => {
    async function checkRegistration() {
      if (!registrationId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/registrations/${registrationId}`);
        if (res.ok) {
          const data = await res.json();
          setRegistrationData(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    checkRegistration();
  }, [registrationId]);

  const handleRetryPayment = () => {
    if (!registrationData) {
      router.push('/formations');
      return;
    }
    router.push(`/formations/${registrationData.session.formationId}/inscription`);
  };

  return (
    <div className="container max-w-md mx-auto mt-10">
      <Card>
        <CardHeader className="bg-red-50 border-b">
          <CardTitle className="text-red-700">Paiement annulé</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-6">
            Votre paiement a été annulé. Aucun montant n'a été débité de votre compte.
          </p>

          {registrationData && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Détails de la formation</h3>
              <p className="text-sm mb-1">
                <span className="font-medium">Formation :</span> {registrationData.session.formation.title}
              </p>
              <p className="text-sm">
                <span className="font-medium">Session :</span> Du {new Date(registrationData.session.startDate).toLocaleDateString('fr-FR')} au {new Date(registrationData.session.endDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
          )}

          <div className="space-y-4">
            <p className="text-sm">Vous pouvez :</p>
            <div className="flex flex-col gap-3">
              <Button variant="outline" onClick={handleRetryPayment}>
                Réessayer le paiement
              </Button>
              <Link href="/formations" passHref>
                <Button variant="secondary" className="w-full">
                  Parcourir d'autres formations
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}