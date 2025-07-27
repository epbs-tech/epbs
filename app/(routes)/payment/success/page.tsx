'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function SuccessPage() {
  const [loading, setLoading] = useState(true);
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const registrationId = searchParams.get('registration_id');

  useEffect(() => {
    async function checkRegistration() {
      if (!registrationId) {
        setError('Identifiant d\'inscription introuvable');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/registrations/${registrationId}`);
        if (!res.ok) {
          throw new Error('Impossible de récupérer les détails de l\'inscription');
        }

        const data = await res.json();
        setRegistrationData(data);
      } catch (err) {
        setError('Une erreur est survenue lors de la vérification de votre paiement');
      } finally {
        setLoading(false);
      }
    }

    checkRegistration();
  }, [registrationId]);

  if (loading) {
    return (
      <div className="container max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p>Vérification du paiement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
        <p className="mb-4">{error}</p>
        <Link href="/formations" passHref>
          <Button>Retour aux formations</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container max-w-md mx-auto mt-10">
      <Card>
        <CardHeader className="bg-green-50 border-b">
          <CardTitle className="text-green-700 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Paiement réussi !
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4">
            Merci pour votre inscription à la formation.
          </p>

          {registrationData && (
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium mb-2">Récapitulatif</h3>
              <p className="text-sm mb-1">
                <span className="font-medium">Formation :</span> {registrationData.session.formation.title}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium">Session :</span> Du {new Date(registrationData.session.startDate).toLocaleDateString('fr-FR')} au {new Date(registrationData.session.endDate).toLocaleDateString('fr-FR')}
              </p>
              <p className="text-sm">
                <span className="font-medium">Référence :</span> EPBS-{registrationData.quoteNumber}
              </p>
            </div>
          )}

          <p className="text-sm mb-6">
            Une confirmation a été envoyée à votre adresse email. Nous vous contacterons prochainement avec les détails pratiques concernant votre formation.
          </p>

          <div className="flex gap-4">
            <Button variant="outline" onClick={() => router.push('/formations')} className="flex-1">
              Retour aux formations
            </Button>
            <Button onClick={() => router.push('/settings')} className="flex-1 btn-primary">
              Mon espace
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}