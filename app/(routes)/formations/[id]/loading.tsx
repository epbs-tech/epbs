import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FormationDetailsLoading() {
  return (
    <div className="py-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4">
        {/* Back button skeleton */}
        <div className="mb-8">
          <Skeleton className="h-6 w-40" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Main content area skeleton */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Hero image skeleton */}
              <div className="relative h-72 sm:h-96 overflow-hidden mb-6">
                <Skeleton className="w-full h-full" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <Skeleton className="h-6 w-32 mb-3" />
                  <Skeleton className="h-10 w-4/5" />
                </div>
              </div>

              <div className="px-6 pb-6">
                {/* Info bar skeleton */}
                <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-36" />
                  <Skeleton className="h-6 w-24" />
                </div>

                {/* Tabs skeleton */}
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="mb-6 w-full grid grid-cols-3 bg-muted/50">
                    <TabsTrigger value="description" className="text-sm sm:text-base">Description</TabsTrigger>
                    <TabsTrigger value="programme" className="text-sm sm:text-base">Programme</TabsTrigger>
                    <TabsTrigger value="infos" className="text-sm sm:text-base">Informations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="description" className="space-y-8">
                    {/* Description section skeleton */}
                    <div className="animate-fadeIn">
                      <Skeleton className="h-8 w-72 mb-4" />
                      <div className="space-y-2 mb-6">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/5" />
                      </div>
                    </div>

                    {/* Objectives skeleton */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 animate-fadeIn">
                      <Skeleton className="h-7 w-32 mb-4" />
                      <div className="space-y-3">
                        {Array(4).fill(0).map((_, i) => (
                          <div key={i} className="flex items-start">
                            <Skeleton className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 rounded-full" />
                            <Skeleton className="h-5 w-full" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prerequisites skeleton */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 animate-fadeIn">
                      <Skeleton className="h-7 w-32 mb-4" />
                      <div className="space-y-3">
                        {Array(3).fill(0).map((_, i) => (
                          <div key={i} className="flex items-start">
                            <Skeleton className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 rounded-full" />
                            <Skeleton className="h-5 w-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="programme" className="space-y-6 animate-fadeIn">
                    {/* Programme skeleton - keep this empty as it won't be visible initially */}
                  </TabsContent>

                  <TabsContent value="infos" className="space-y-6 animate-fadeIn">
                    {/* Info skeleton - keep this empty as it won't be visible initially */}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6">
              <Skeleton className="h-8 w-48 mx-auto mb-6" />

              <div className="space-y-4 mb-6">
                {/* Session skeletons */}
                {Array(2).fill(0).map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 border-b border-gray-200">
                      <div className="flex items-center mb-2">
                        <Skeleton className="h-5 w-5 mr-2 rounded-full" />
                        <Skeleton className="h-5 w-40" />
                      </div>
                      <div className="flex items-center ml-7">
                        <Skeleton className="h-4 w-4 mr-1 rounded-full" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-6 w-16" />
                      </div>

                      <Skeleton className="h-10 w-full" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}