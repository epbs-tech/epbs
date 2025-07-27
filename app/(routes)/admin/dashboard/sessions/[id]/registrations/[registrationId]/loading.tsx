"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RegistrationDetailsLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="#" className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux inscriptions
        </Link>
      </div>

      <div className="grid gap-6">
        {/* Formation details skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Détails de l'inscription</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Formation</h3>
                <Skeleton className="h-5 w-64" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Session</h3>
                <Skeleton className="h-5 w-72 mb-2" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Participant information skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Informations du participant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Nom complet</h3>
                <Skeleton className="h-5 w-48" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Entreprise</h3>
                <Skeleton className="h-5 w-40" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Email</h3>
                <Skeleton className="h-5 w-64" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Téléphone</h3>
                <Skeleton className="h-5 w-36" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status and payment skeleton */}
        <Card>
          <CardHeader>
            <CardTitle>Statut et paiement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Date d'inscription</h3>
                <Skeleton className="h-5 w-32" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Montant</h3>
                <Skeleton className="h-5 w-24" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Statut de l'inscription</h3>
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>
              <div>
                <h3 className="font-medium mb-2">Statut du paiement</h3>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}