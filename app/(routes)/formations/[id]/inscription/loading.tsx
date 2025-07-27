import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function RegistrationLoading() {
  return (
    <div className="container mx-auto py-8">
      {/* Back link skeleton */}
      <div className="mb-8">
        <Skeleton className="h-5 w-48" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Page title skeleton */}
        <Skeleton className="h-9 w-3/4 mb-6" />

        {/* Progress steps skeleton */}
        <div className="mb-8">
          <div className="flex space-x-2 mb-3">
            <div className="rounded-full h-8 w-8 flex items-center justify-center font-medium bg-primary text-primary-foreground">
              1
            </div>
            <div className="flex-1 border-t-2 border-dashed self-center" />
            <div className="rounded-full h-8 w-8 flex items-center justify-center font-medium bg-primary/20">
              2
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span>Informations personnelles</span>
            <span>Paiement</span>
          </div>
        </div>

        {/* Form card skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-64" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* First row - first & last name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-12" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Second row - email & phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Company field */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Session select field */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>

              {/* Summary box */}
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <Skeleton className="h-5 w-28 mb-2" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/3" />
              </div>

              {/* Submit button */}
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}