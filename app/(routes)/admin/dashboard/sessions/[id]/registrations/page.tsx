"use client";

import {useState, useEffect, use} from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SessionRegistrationsLoading from "@/app/(routes)/admin/dashboard/sessions/[id]/registrations/loading";
import {ValidateQuoteModal} from "@/app/components/validate-quote-modal";

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
}

interface Session {
  id: string;
  startDate: string;
  endDate: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  formation: {
    title: string;
  };
}

export default function SessionRegistrationsPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const [session, setSession] = useState<Session | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionRes, registrationsRes] = await Promise.all([
          fetch(`/api/sessions/${id}`),
          fetch(`/api/sessions/${id}/registrations`)
        ]);

        if (!sessionRes.ok || !registrationsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const sessionData = await sessionRes.json();
        const registrationsData = await registrationsRes.json();

        setSession(sessionData);
        setRegistrations(registrationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error("Impossible de charger les données");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const updateRegistrationStatus = async (registrationId: string, status: string) => {
    try {
      const response = await fetch(`/api/registrations/${registrationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error('Failed to update registration');
      }

      setRegistrations(prevRegistrations =>
        prevRegistrations.map(reg =>
          reg.id === registrationId ? { ...reg, status } : reg
        )
      );

      toast.success("Le statut de l'inscription a été mis à jour avec succès");
    } catch  {
      toast.error("Impossible de mettre à jour le statut");
    }
  };

  const updatePaymentStatus = async (registrationId: string, paymentStatus: string) => {
    try {
      const response = await fetch(`/api/registrations/${registrationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ paymentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update payment status');
      }

      setRegistrations(prevRegistrations =>
        prevRegistrations.map(reg =>
          reg.id === registrationId ? { ...reg, paymentStatus } : reg
        )
      );

      toast.success("Le statut du paiement a été mis à jour avec succès");
    } catch  {
      toast.error("Impossible de mettre à jour le statut du paiement");
    }
  };

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
    return <SessionRegistrationsLoading/>;
  }

  if (!session) {
    return <div>Session non trouvée</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/admin/dashboard/sessions" className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux sessions
        </Link>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Détails de la session</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Formation</h3>
              <p>{session.formation.title}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Dates</h3>
              <p>
                Du {new Date(session.startDate).toLocaleDateString('fr-FR')} au{' '}
                {new Date(session.endDate).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Lieu</h3>
              <p>{session.location}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Participants</h3>
              <p>
                {session.currentParticipants}/{session.maxParticipants} places occupées
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Inscriptions</h1>
            <Button className="btn-primary" onClick={() => setIsQuoteModalOpen(true)}>Valider une inscription</Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Liste des inscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Paiement</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {registrations.map((registration) => (
                  <TableRow key={registration.id}>
                    <TableCell>
                      {new Date(registration.createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {registration.firstName} {registration.lastName}
                        </p>
                        {registration.company && (
                          <p className="text-sm text-muted-foreground">
                            {registration.company}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{registration.email}</p>
                        <p className="text-sm text-muted-foreground">
                          {registration.phone}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={registration.status}
                        onValueChange={(value) => updateRegistrationStatus(registration.id, value)}
                      >
                        <SelectTrigger className="w-[140px]">
                          <SelectValue>
                            {getStatusBadge(registration.status)}
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">En attente</SelectItem>
                          <SelectItem value="confirmed">Confirmée</SelectItem>
                          <SelectItem value="cancelled">Annulée</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>
                          <span className="text-sm text-muted-foreground">
                            {registration.paymentMethod === 'creditCard' ? 'Carte bancaire' : 'Virement'}
                          </span>
                        </div>
                        <Select
                          value={registration.paymentStatus}
                          onValueChange={(value) => updatePaymentStatus(registration.id, value)}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue>
                              {getPaymentStatusBadge(registration.paymentStatus)}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">En attente</SelectItem>
                            <SelectItem value="completed">Payé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link href={`/admin/dashboard/sessions/${id}/registrations/${registration.id}`}>
                          Détails
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      <ValidateQuoteModal
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}