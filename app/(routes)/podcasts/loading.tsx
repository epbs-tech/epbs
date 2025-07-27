export default function Loading() {
  return (
    <div className="bg-white">
      {/* Hero Section Skeleton */}
      <section className="bg-[var(--color-primary)] py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              Nos Podcasts
            </h1>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto">
              Découvrez notre collection de podcasts
            </p>
          </div>
        </div>
      </section>

      {/* Podcasts List Skeletons */}
      {[...Array(3)].map((_, podcastIndex) => (
        <section key={podcastIndex} className="py-10 md:py-14 lg:py-16 border-b border-gray-200 last:border-0">
          <div className="container mx-auto px-4 sm:px-6">
            {/* Podcast Header Skeleton */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mb-8 md:mb-12">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-200 animate-pulse rounded-lg flex-shrink-0 mx-auto sm:mx-0"></div>
              <div className="text-center sm:text-left mt-4 sm:mt-0 flex-grow">
                <div className="h-8 sm:h-9 bg-gray-200 animate-pulse rounded-lg mb-2 sm:mb-4 max-w-md mx-auto sm:mx-0"></div>
                <div className="h-4 sm:h-5 bg-gray-200 animate-pulse rounded-lg mb-2 max-w-2xl mx-auto sm:mx-0"></div>
                <div className="h-4 sm:h-5 bg-gray-200 animate-pulse rounded-lg mb-2 max-w-xl mx-auto sm:mx-0"></div>
                <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded-lg max-w-32 mx-auto sm:mx-0"></div>
              </div>
            </div>

            {/* Episodes Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {[...Array(3)].map((_, episodeIndex) => (
                <div key={episodeIndex} className="bg-white rounded-xl overflow-hidden shadow-md">
                  <div className="p-4 sm:p-6">
                    {/* Episode Meta Skeleton */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded w-20"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded w-16"></div>
                    </div>

                    {/* Season/Episode Info Skeleton */}
                    <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded w-32 mb-2"></div>

                    {/* Episode Title Skeleton */}
                    <div className="h-5 sm:h-6 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-5 sm:h-6 bg-gray-200 animate-pulse rounded mb-4 w-3/4"></div>

                    {/* Episode Description Skeleton */}
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-4 w-5/6"></div>

                    {/* Episode Actions Skeleton */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="h-8 sm:h-10 bg-gray-200 animate-pulse rounded-lg w-20 sm:w-24"></div>
                      <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button Skeleton */}
            <div className="mt-6 sm:mt-8 text-center">
              <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-48 mx-auto"></div>
            </div>
          </div>
        </section>
      ))}

      {/* Testimonials Section Skeleton */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section Header Skeleton */}
          <div className="text-center mb-10 md:mb-16">
            <div className="h-8 sm:h-10 md:h-12 bg-gray-200 animate-pulse rounded-lg mb-3 sm:mb-4 max-w-xs mx-auto"></div>
            <div className="h-4 sm:h-5 bg-gray-200 animate-pulse rounded-lg max-w-2xl mx-auto"></div>
          </div>

          {/* Testimonials Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg">
                {/* Stars Skeleton */}
                <div className="flex items-center mb-4 sm:mb-6 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>

                {/* Quote Skeleton */}
                <div className="mb-4 sm:mb-6">
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                </div>

                {/* Author Skeleton */}
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 animate-pulse mr-3 sm:mr-4"></div>
                  <div className="h-4 sm:h-5 bg-gray-200 animate-pulse rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section Skeleton */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-200 animate-pulse">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Section Title Skeleton */}
            <div className="h-8 sm:h-10 md:h-12 bg-gray-300 rounded-lg mb-4 sm:mb-6 max-w-md mx-auto"></div>

            {/* Section Description Skeleton */}
            <div className="h-5 sm:h-6 bg-gray-300 rounded-lg mb-6 sm:mb-8 max-w-2xl mx-auto"></div>

            {/* Form Skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto mb-6 sm:mb-8">
              <div className="flex-grow h-12 sm:h-14 bg-gray-300 rounded-lg"></div>
              <div className="h-12 sm:h-14 bg-gray-300 rounded-lg w-full sm:w-32"></div>
            </div>

            {/* Platforms Skeleton */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="h-4 bg-gray-300 animate-pulse rounded w-20"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <div className="h-8 sm:h-10 md:h-12 bg-gray-200 animate-pulse rounded-lg mb-4 sm:mb-6 max-w-lg mx-auto"></div>
            <div className="h-5 sm:h-6 bg-gray-200 animate-pulse rounded-lg mb-6 sm:mb-8 max-w-2xl mx-auto"></div>
            <div className="h-12 sm:h-14 bg-gray-200 animate-pulse rounded-lg max-w-xs mx-auto"></div>
          </div>
        </div>
      </section>
    </div>
  );
}