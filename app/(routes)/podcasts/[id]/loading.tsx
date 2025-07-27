export default function Loading() {
  return (
    <div className="bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative h-screen min-h-[500px] max-h-[800px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse"></div>

        <div className="container h-full mx-auto px-4 sm:px-6 flex flex-col justify-center relative z-10">
          <div className="max-w-2xl">
            {/* Badge skeleton */}
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="h-px w-8 sm:w-12 bg-gray-400 mr-3 sm:mr-4"></div>
              <div className="h-3 w-48 bg-gray-400 rounded animate-pulse"></div>
            </div>

            {/* Title skeleton */}
            <div className="space-y-3 mb-4 sm:mb-6">
              <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-gray-400 rounded animate-pulse"></div>
              <div className="h-8 sm:h-10 md:h-12 lg:h-14 bg-gray-400 rounded w-3/4 animate-pulse"></div>
            </div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-6 sm:mb-8">
              <div className="h-4 sm:h-5 bg-gray-400 rounded animate-pulse"></div>
              <div className="h-4 sm:h-5 bg-gray-400 rounded w-2/3 animate-pulse"></div>
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <div className="h-12 sm:h-14 md:h-16 w-40 sm:w-48 bg-gray-400 rounded-lg animate-pulse"></div>
              <div className="h-12 sm:h-14 md:h-16 w-32 sm:w-36 bg-gray-400/50 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Scroll indicator skeleton */}
        <div className="absolute bottom-4 sm:bottom-8 left-0 right-0 flex justify-center">
          <div className="w-6 h-6 bg-gray-400 rounded animate-pulse"></div>
        </div>
      </section>

      {/* Podcast Host Section Skeleton */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            {/* Image skeleton */}
            <div className="lg:w-1/2 relative">
              <div className="relative aspect-[4/5] w-full max-w-sm sm:max-w-md mx-auto rounded-2xl bg-gray-300 animate-pulse">
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
                  <div className="bg-gray-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full w-24 h-6 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Content skeleton */}
            <div className="lg:w-1/2 mt-8 lg:mt-0">
              {/* Title skeleton */}
              <div className="space-y-3 mb-6 sm:mb-8">
                <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-6 sm:h-8 md:h-10 bg-gray-300 rounded w-2/3 animate-pulse"></div>
              </div>

              {/* Content paragraphs skeleton */}
              <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-4/5 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-xl p-3 sm:p-4">
                    <div className="h-6 sm:h-8 w-12 bg-gray-300 rounded animate-pulse mb-1"></div>
                    <div className="h-3 sm:h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes List Skeleton */}
      <section className="py-10 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section title skeleton */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="h-8 sm:h-10 md:h-12 w-64 bg-gray-300 rounded mx-auto mb-3 sm:mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-5 w-80 bg-gray-300 rounded mx-auto animate-pulse"></div>
          </div>

          {/* Episodes grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md p-4 sm:p-6"
              >
                {/* Episode header */}
                <div className="flex justify-between items-center mb-2 sm:mb-3">
                  <div className="h-3 w-20 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Season/Episode info */}
                <div className="h-3 w-24 bg-gray-300 rounded mb-1.5 sm:mb-2 animate-pulse"></div>

                {/* Title */}
                <div className="space-y-2 mb-2">
                  <div className="h-5 sm:h-6 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>

                {/* Description */}
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <div className="h-8 w-20 bg-gray-300 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more button skeleton */}
          <div className="mt-10 sm:mt-16 text-center">
            <div className="h-10 sm:h-12 w-48 bg-gray-300 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Section title skeleton */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="h-8 sm:h-10 md:h-12 w-48 bg-gray-300 rounded mx-auto mb-3 sm:mb-4 animate-pulse"></div>
            <div className="h-4 sm:h-5 w-64 bg-gray-300 rounded mx-auto animate-pulse"></div>
          </div>

          {/* Testimonials grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg"
              >
                {/* Stars skeleton */}
                <div className="flex gap-1 mb-4 sm:mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-3 h-3 sm:w-4 sm:h-4 bg-gray-300 rounded animate-pulse"></div>
                  ))}
                </div>

                {/* Quote skeleton */}
                <div className="space-y-2 mb-4 sm:mb-6">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>

                {/* Author skeleton */}
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 mr-3 sm:mr-4 animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription Section Skeleton */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-400">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Title skeleton */}
            <div className="h-8 sm:h-10 md:h-12 w-80 bg-gray-500 rounded mx-auto mb-4 sm:mb-6 animate-pulse"></div>

            {/* Description skeleton */}
            <div className="space-y-2 mb-6 sm:mb-8">
              <div className="h-5 sm:h-6 bg-gray-500 rounded mx-auto w-96 animate-pulse"></div>
              <div className="h-5 sm:h-6 bg-gray-500 rounded mx-auto w-80 animate-pulse"></div>
            </div>

            {/* Form skeleton */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto mb-6 sm:mb-8">
              <div className="flex-grow h-12 sm:h-14 bg-gray-500 rounded-lg animate-pulse"></div>
              <div className="h-12 sm:h-14 w-full sm:w-32 bg-gray-500 rounded-lg animate-pulse"></div>
            </div>

            {/* Platforms skeleton */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-4 w-16 bg-gray-500 rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-12 sm:py-16 md:py-20 bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-8 sm:h-10 md:h-12 w-64 bg-gray-300 rounded mx-auto mb-4 sm:mb-6 animate-pulse"></div>
            <div className="h-5 sm:h-6 w-80 bg-gray-300 rounded mx-auto mb-6 sm:mb-8 animate-pulse"></div>
            <div className="h-12 sm:h-14 w-40 bg-gray-300 rounded-lg mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
}