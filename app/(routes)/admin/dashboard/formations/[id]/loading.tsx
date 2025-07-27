"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function FormationDetailLoading() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Link href="/admin/dashboard/formations" className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux formations
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modifier la formation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Titre */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Description courte */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-24 w-full" />
            </div>

            {/* Durée et Catégorie */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            {/* Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-48" />
                <div className="flex flex-col space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-[120px] w-full rounded-md" />
                </div>
              </div>
            </div>

            {/* Formation active */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-12 rounded-full" />
            </div>

            {/* Description détaillée */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-[150px] w-full" />
            </div>

            {/* Objectifs */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-24" />
                </div>
              ))}
              <Skeleton className="h-10 w-40" />
            </div>

            {/* Prérequis */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              {[1, 2].map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 w-24" />
                </div>
              ))}
              <Skeleton className="h-10 w-40" />
            </div>

            {/* Programme */}
            <div className="space-y-6">
              <Skeleton className="h-6 w-24" />
              {[1, 2].map((_, dayIndex) => (
                <div key={dayIndex} className="border p-4 rounded-lg space-y-4">
                  <div className="flex gap-2">
                    <Skeleton className="h-10 flex-1" />
                    <Skeleton className="h-10 w-36" />
                  </div>

                  <div className="space-y-2">
                    {[1, 2, 3].map((_, contentIndex) => (
                      <div key={contentIndex} className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-24" />
                      </div>
                    ))}
                    <Skeleton className="h-10 w-36" />
                  </div>
                </div>
              ))}
              <Skeleton className="h-10 w-32" />
            </div>

            {/* Boutons */}
            <div className="flex justify-end space-x-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-48" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}