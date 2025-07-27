"use client";

import { useEffect, useState } from "react";
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
import InscriptionsLoading from "@/app/(routes)/admin/dashboard/inscriptions/loading";
import {ValidateQuoteModal} from "@/app/components/validate-quote-modal"

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
  session: {
    id: string;
    startDate: string;
    endDate: string;
    location: string;
    formation: {
      id: string;
      title: string;
    };
  };
}

export default function InscriptionsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/registrations');
        const data = await response.json();
        setRegistrations(data);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        toast.error("Impossible de charger les inscriptions");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

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
    } catch {
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
    } catch {
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
    return <InscriptionsLoading/>;
  }

  return (
    <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Inscriptions</h1>
          <Button className="btn-primary" onClick={() => setIsQuoteModalOpen(true)}>Valider une inscription</Button>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion des inscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Participant</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Formation</TableHead>
                  <TableHead>Session</TableHead>
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
                        <p className="font-medium">{registration.firstName} {registration.lastName}</p>
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
                        <p className="text-sm text-muted-foreground">{registration.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{registration.session.formation.title}</TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">
                          Du {new Date(registration.session.startDate).toLocaleDateString('fr-FR')} au{' '}
                          {new Date(registration.session.endDate).toLocaleDateString('fr-FR')}
                        </p>
                        <p className="text-sm text-muted-foreground">{registration.session.location}</p>
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
                        <Link href={`/admin/dashboard/sessions/${registration.session.id}/registrations/${registration.id}`}>
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