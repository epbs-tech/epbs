import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

function FormationCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col h-full">
      {/* Image skeleton */}
      <Skeleton className="w-full h-48" />

      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-3">
          {/* Category badge skeleton */}
          <Skeleton className="h-5 w-24 mb-2" />
          {/* Duration skeleton */}
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Title skeleton */}
        <Skeleton className="h-7 w-4/5 mb-3" />

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Sessions heading skeleton */}
        <Skeleton className="h-5 w-40 mb-2" />

        {/* Sessions list skeleton */}
        <div className="space-y-4 mb-4">
          {/* Session 1 */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Session 2 */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="w-full flex justify-between items-center">
          {/* Price skeleton */}
          <Skeleton className="h-6 w-32" />

          {/* Buttons skeleton */}
          <div className="space-x-2 flex">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function Loading() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-6">Formations ouvertes</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Découvrez nos formations professionnelles disponibles à l'inscription.
            Ces formations sont validées et ouvertes à la préinscription pour des dates spécifiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Render 6 formation card skeletons */}
          {Array(6).fill(0).map((_, index) => (
            <FormationCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}