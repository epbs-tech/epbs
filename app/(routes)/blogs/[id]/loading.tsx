import Link from "next/link";

const BlogArticleLoading = () => {
  return (
    <div className="min-h-screen bg-[--color-light]">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white border-b border-[--color-gray-light]">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <Link href="/" className="text-[--color-primary] hover:text-[--color-accent] whitespace-nowrap">
              Accueil
            </Link>
            <span className="text-[--color-text-secondary]">/</span>
            <Link href="/blogs" className="text-[--color-primary] hover:text-[--color-accent] whitespace-nowrap">
              Blog
            </Link>
            <span className="text-[--color-text-secondary]">/</span>
            <div className="h-3 sm:h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          </nav>
        </div>
      </div>

      {/* Hero Article Skeleton */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Métadonnées Skeleton */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse self-start sm:self-auto"></div>
            </div>

            {/* Titre Skeleton */}
            <div className="mb-4 sm:mb-6 space-y-2">
              <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-8 sm:h-10 md:h-12 lg:h-14 w-4/5 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Description Skeleton */}
            <div className="mb-6 sm:mb-8 space-y-2">
              <div className="h-5 sm:h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              <div className="h-5 sm:h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Image Skeleton */}
            <div className="relative w-full h-48 sm:h-64 md:h-96 bg-gray-200 rounded-lg sm:rounded-xl mb-6 sm:mb-8 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Table des matières mobile Skeleton */}
      <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-[--color-gray-light] px-4 py-3">
        <div className="flex items-center justify-between w-full">
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Contenu principal Skeleton */}
      <section className="bg-[--color-light]">
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="max-w-7xl mx-auto flex gap-4 lg:gap-8">

            {/* Table des matières sidebar Skeleton */}
            <aside className="hidden lg:block w-72 xl:w-80 sticky top-8 h-fit">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-[--color-gray-light]">
                <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </aside>

            {/* Contenu de l'article Skeleton */}
            <main className="flex-1 min-w-0">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm border border-[--color-gray-light]">
                {/* Sections Skeleton */}
                {[...Array(3)].map((_, sectionIndex) => (
                  <div key={sectionIndex} className="mb-8 sm:mb-12">
                    {/* Titre de section */}
                    <div className="mb-4 sm:mb-6">
                      <div className="h-6 sm:h-8 md:h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-2 sm:mb-3"></div>
                      <div className="h-0.5 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Contenu de section */}
                    <div className="space-y-4">
                      {/* Paragraphes */}
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                      </div>

                      {/* Liste */}
                      <div className="space-y-2 pl-4">
                        {[...Array(3)].map((_, i) => (
                          <div key={i} className="flex items-center space-x-2">
                            <div className="h-2 w-2 bg-gray-200 rounded-full animate-pulse"></div>
                            <div className="h-4 flex-1 bg-gray-200 rounded animate-pulse"></div>
                          </div>
                        ))}
                      </div>

                      {/* Autre paragraphe */}
                      <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                      </div>

                      {/* Tableau (pour certaines sections) */}
                      {sectionIndex === 1 && (
                        <div className="overflow-x-auto -mx-4 sm:mx-0">
                          <div className="min-w-full px-4 sm:px-0">
                            <div className="border border-[--color-gray-light] rounded">
                              {/* En-têtes de tableau */}
                              <div className="bg-[--color-light] border-b border-[--color-gray-light] p-2 sm:p-4">
                                <div className="grid grid-cols-3 gap-4">
                                  {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                  ))}
                                </div>
                              </div>
                              {/* Lignes de tableau */}
                              {[...Array(4)].map((_, rowIndex) => (
                                <div key={rowIndex} className={`p-2 sm:p-4 ${rowIndex % 2 === 0 ? 'bg-white' : 'bg-[--color-light]'} ${rowIndex < 3 ? 'border-b border-[--color-gray-light]' : ''}`}>
                                  <div className="grid grid-cols-3 gap-4">
                                    {[...Array(3)].map((_, i) => (
                                      <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Section CTA Skeleton */}
      <section className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="font-mont text-xl sm:text-2xl font-bold text-[--color-primary] mb-3 sm:mb-4">
              Vous avez aimé cet article ?
            </h3>
            <p className="text-[--color-text-primary] font-lato mb-6 sm:mb-8 text-sm sm:text-base">
              Découvrez nos formations pour approfondir vos connaissances en développement durable et performance énergétique.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
                <Link
                    href="/formations"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#1D3B2A] text-white font-semibold rounded-lg hover:bg-[#1D3B2A]/90 transition-colors text-base min-h-[48px] sm:min-h-[52px]"
                >
                    Voir nos formations
                </Link>
                <Link
                    href="/blogs"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#1D3B2A] text-[#1D3B2A] font-semibold rounded-lg hover:bg-[#1D3B2A] hover:text-white transition-colors text-base min-h-[48px] sm:min-h-[52px]"
                >
                    Lire d'autres articles
                </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogArticleLoading