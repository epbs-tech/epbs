import {motion} from "framer-motion";
import Link from "next/link";

const BlogPageLoading = () => {
  return (
    <div className="min-h-screen bg-[--color-light]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary)]">
        <div className="container mx-auto px-4 text-center">
          <div
            className="max-w-4xl mx-auto mb-8"
          >
            <h1 className="font-mont text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight md:leading-snug">
              Virage durable : déchiffrer l'ESG,<br className="hidden md:block" />
              l'économie verte et les nouveaux leviers d'impact
            </h1>

            <div className="h-1 w-24 bg-white/30 mx-auto mb-8"></div>

            <p className="text-lg md:text-xl text-white/90 font-lato max-w-3xl mx-auto">
              Découvrez nos analyses expertes pour naviguer dans la transition écologique
            </p>
          </div>
        </div>
      </section>

      {/* Section Intro */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div
            className="text-center"
          >
            <h2 className="font-mont text-2xl md:text-3xl font-bold text-[--color-primary] mb-4">
              <span className='text-[var(--color-accent)]'>EPBS</span> Consulting : Découvrez nos analyses stratégiques
            </h2>
            <p className="text-[--color-text-primary] font-lato mb-6">
              Ce blog vous propose de décrypter les évolutions, d'analyser les grands défis et de découvrir les leviers à activer pour réussir la transition vers une économie résiliente, régénérative… et pleinement alignée avec les limites planétaires.
            </p>
          </div>
        </div>
      </section>

      {/* Section Articles Phares Skeleton */}
      <section className="bg-[--color-light] py-12">
        <div className="container mx-auto px-4">
          {/* Titre de section */}
          <div className="mb-8 text-center">
            <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
          </div>

          {/* Articles phares */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[...Array(2)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden border border-[--color-gray-light]">
                <div className="md:flex">
                  {/* Image */}
                  <div className="relative md:w-1/3 h-48 md:h-auto bg-gray-200 animate-pulse">
                  </div>
                  {/* Contenu */}
                  <div className="p-6 md:w-2/3">
                    <div className="h-3 w-20 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-5 w-full bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse mb-3"></div>
                    <div className="space-y-1 mb-4">
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Formations */}
      <section className="bg-[var(--color-primary)] py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl p-8 shadow-lg text-center">
            <h3 className="font-mont text-2xl font-bold text-[--color-primary] mb-3">
              Boostez vos compétences avec nos formations
            </h3>
            <p className="text-[--color-text-primary] font-lato mb-6">
              Découvrez notre catalogue de formations
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-[--color-gray-light] rounded-lg p-6 text-left">
                <h4 className="font-bold text-lg text-[--color-primary] mb-2">
                  Introduction à l'Environnement et au Développement Durable
                </h4>
                <p className="text-sm text-[--color-text-primary] mb-3">
                  Sensibilisation aux enjeux de protection de l'environnement et principes du développement durable.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-[--color-accent-light] text-[--color-primary] px-2 py-1 rounded">
                    2 jours
                  </span>
                  <Link
                    href="/formations"
                    className="text-sm font-bold text-[--color-accent] hover:underline"
                  >
                    En savoir plus →
                  </Link>
                </div>
              </div>

              <div className="border border-[--color-gray-light] rounded-lg p-6 text-left">
                <h4 className="font-bold text-lg text-[--color-primary] mb-2">
                  RSE et conduite du changement
                </h4>
                <p className="text-sm text-[--color-text-primary] mb-3">
                  Maîtrisez les fondamentaux de la RSE et apprenez à élaborer une stratégie efficace.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs bg-[--color-accent-light] text-[--color-primary] px-2 py-1 rounded">
                    2 jours
                  </span>
                  <Link
                    href="/formations"
                    className="text-sm font-bold text-[--color-accent] hover:underline"
                  >
                    En savoir plus →
                  </Link>
                </div>
              </div>
            </div>

            <Link
              href="/formations"
              className="inline-block px-6 py-3 bg-[var(--color-accent)] text-white font-bold rounded-lg hover:bg-[var(--color-accent)]/90 transition-colors"
            >
              Voir toutes nos formations
            </Link>
          </div>
        </div>
      </section>

      {/* Section Grille de blogs Skeleton */}
      <section className="container mx-auto px-4 py-12">
        {/* Titre de section */}
        <div className="mb-12 text-center">
          <div className="h-6 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-2"></div>
          <div className="h-4 w-80 bg-gray-200 rounded animate-pulse mx-auto"></div>
        </div>

        {/* Grille de cartes blog */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-[--color-gray]">
              {/* Image skeleton avec EPBS */}
              <div className="relative h-60 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                <div className="text-6xl font-black text-gray-400/50">
                  EPBS
                </div>
              </div>

              {/* Contenu */}
              <div className="p-6">
                {/* Date et auteur */}
                <div className="flex items-center justify-between mb-2">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Titre */}
                <div className="space-y-2 mb-3">
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Description */}
                <div className="space-y-1 mb-5">
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                </div>

                {/* Lien */}
                <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Formations */}
        <div className="mt-16 text-center">
          <h3 className="font-mont text-2xl font-bold text-[--color-primary] mb-4">
            Prêt à approfondir vos connaissances ?
          </h3>
          <p className="text-[--color-text-primary] font-lato mb-6 max-w-2xl mx-auto">
            Découvrez nos formations certifiantes en performance énergétique et développement durable.
          </p>
          <Link
            href="/formations"
            className="inline-block w-full sm:w-auto gap-2 max-w-md mx-auto border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-accent)]/50 font-medium py-3 px-6 rounded-md transition-all duration-300 text-center"
          >
            Explorer nos formations
          </Link>
        </div>
      </section>
    </div>
  )
}

export default BlogPageLoading