"use client";

import {useState, useEffect, use} from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import RegistrationDetailsLoading
  from "@/app/(routes)/admin/dashboard/sessions/[id]/registrations/[registrationId]/loading";

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  createdAt: string;
  quoteNumber: string;
  currency: string;
  session: {
    id: string;
    startDate: string;
    endDate: string;
    location: string;
    priceEUR: number;
    priceMAD: number;
    formation: {
      id: string;
      title: string;
    };
  };
}

export default function RegistrationDetailsPage(
{params}: {params: Promise<{ id: string; registrationId: string }>}
) {
  const {id, registrationId} = use(params);
  const [registration, setRegistration] = useState<Registration | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRegistration = async () => {
      try {
        const response = await fetch(`/api/registrations/${registrationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch registration');
        }
        const data = await response.json();
        setRegistration(data);
      } catch (error) {
        console.error('Error fetching registration:', error);
        toast.error("Impossible de charger les détails de l'inscription");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistration();
  }, [registrationId]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">En attente</Badge>;
      case 'confirmed':
        return <Badge variant="success">Confirmée</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Annulée</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">En attente</Badge>;
      case 'completed':
        return <Badge variant="success">Payé</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return <RegistrationDetailsLoading/>;
  }

  if (!registration) {
    return <div>Inscription non trouvée</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href={`/admin/dashboard/sessions/${id}/registrations`} className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux inscriptions
        </Link>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Détails de l'inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Formation</h3>
                <p>{registration.session.formation.title}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Session</h3>
                <p>
                  Du {new Date(registration.session.startDate).toLocaleDateString('fr-FR')} au{' '}
                  {new Date(registration.session.endDate).toLocaleDateString('fr-FR')}
                </p>
                <p className="text-muted-foreground">{registration.session.location}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations du participant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Nom complet</h3>
                <p>{registration.firstName} {registration.lastName}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Entreprise</h3>
                <p>{registration.company || "Non renseigné"}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Email</h3>
                <p>{registration.email}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Téléphone</h3>
                <p>{registration.phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Statut et paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Date d'inscription</h3>
                <p>{new Date(registration.createdAt).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Montant</h3>
                <p>
                  {registration.currency === 'EUR'
                      ? `${registration.session.priceEUR} €`
                      : `${registration.session.priceMAD} MAD`}
                </p>

              </div>
              <div>
                <h3 className="font-medium mb-2">Statut de l'inscription</h3>
                <div>{getStatusBadge(registration.status)}</div>
              </div>
              <div>
                <h3 className="font-medium mb-2">Statut du paiement</h3>
                <div className="space-y-1">
                  <div>{getPaymentStatusBadge(registration.paymentStatus)}</div>
                  {registration.paymentStatus === 'completed' && (
                    <p className="text-sm text-muted-foreground">
                      Numéro de facture : {registration.quoteNumber}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {registration.paymentMethod === 'creditCard' ? 'Carte bancaire' : 'Virement bancaire'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}