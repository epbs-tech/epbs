'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Image from "next/image";
import BlogPageLoading from "@/app/(routes)/blogs/loading";

interface Content {
  id: string;
  type: 'TEXT' | 'NUMBERED_LIST' | 'BULLET_LIST' | 'TABLE';
  order: number;
  text?: string;
  listItems?: string[];
  listType?: 'NUMBERED' | 'BULLET';
  tableData?: any;
}

interface Section {
  id: string;
  title: string;
  order: number;
  contents: Content[];
}

interface Blog {
  id: string;
  title: string;
  author: string;
  date: string;
  description?: string;
  imageUrl?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  sections: Section[];
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  // Récupérer les blogs depuis l'API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs/published')
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des blogs')
        }
        const data: Blog[] = await response.json()
        setBlogs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Featured articles (les 2 premiers blogs)
  const featuredBlogs = blogs.slice(0, 2)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <BlogPageLoading />
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[--color-light] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">Erreur: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-[--color-primary] text-white rounded hover:bg-[--color-primary]/90"
          >
            Réessayer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[--color-light]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-[var(--color-primary-dark)] to-[var(--color-primary)]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
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
          </motion.div>
        </div>
      </section>

      {/* Section Intro */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="font-mont text-2xl md:text-3xl font-bold text-[--color-primary] mb-4">
              <span className='text-[var(--color-accent)]'>EPBS</span> Consulting : Découvrez nos analyses stratégiques
            </h2>
            <p className="text-[--color-text-primary] font-lato mb-6">
              Ce blog vous propose de décrypter les évolutions, d'analyser les grands défis et de découvrir les leviers à activer pour réussir la transition vers une économie résiliente, régénérative… et pleinement alignée avec les limites planétaires.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Articles Phares */}
      {featuredBlogs.length > 0 && (
        <section className="bg-[--color-light] py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 text-center">
              <h3 className="font-mont text-2xl font-bold text-[--color-primary] mb-2">
                Nos analyses phares
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-[--color-gray-light]"
                >
                  <div className="md:flex">
                    <div className="relative md:w-1/3 h-48 md:h-auto overflow-hidden">
                      {blog.imageUrl ? (
                        <Image
                          src={new URL(blog.imageUrl, baseUrl).toString()}
                          alt={blog.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center">
                          <span className="text-white text-4xl font-bold">EPBS</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 md:w-2/3">
                      <span className="text-xs text-[var(--color-accent)] font-semibold">
                        {formatDate(blog.date)}
                      </span>
                      <h3 className="text-xl font-bold text-[--color-dark] mt-1 mb-3">{blog.title}</h3>
                      <p className="text-[--color-text-primary] mb-4 line-clamp-3">
                        {blog.description || 'Découvrez cet article passionnant...'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[--color-text-secondary]">Par {blog.author}</span>
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="inline-flex items-center font-bold text-[--color-primary] hover:text-[--color-accent] transition-colors"
                        >
                          Lire l'étude de cas
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

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

      {/* Grille de blogs */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <h3 className="font-mont text-2xl font-bold text-[--color-primary] mb-2">
            Nos dernières publications
          </h3>
          <p className="text-[--color-text-primary] font-lato">
            Découvrez nos analyses approfondies et conseils pratiques
          </p>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[--color-text-primary] text-lg">
              Aucun article publié pour le moment.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <motion.div
                  key={blog.id}
                  layout
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  className="relative group"
                  onHoverStart={() => setHoveredCard(blog.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <div className="relative h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-[--color-gray]">
                    {/* Image avec animation */}
                    {blog.imageUrl ? (
                        <div className="relative h-60 overflow-hidden">
                          <motion.img
                              src={new URL(blog.imageUrl, baseUrl).toString()}
                              alt={blog.title}
                              className="w-full h-full object-cover"
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                          />

                          {/* Overlay animé */}
                          <div className="absolute inset-0 bg-[var(--color-primary)]/80 group-hover:translate-y-full transition-transform duration-500 z-0" />

                          {/* Texte EPBS */}
                          <h2 className="absolute inset-0 flex items-center justify-center text-[5rem] font-black text-white/90 group-hover:text-white transition duration-500 z-10">
                            EPBS
                          </h2>
                        </div>
                    ):(
                        <div className="relative h-60 overflow-hidden">
                          <motion.div
                              className="w-full h-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] flex items-center justify-center"
                              initial={{ scale: 1 }}
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.5 }}
                          >
                            {/* Overlay animé */}
                            <div className="absolute inset-0 bg-[var(--color-primary)]/80 group-hover:translate-y-full transition-transform duration-500 z-0" />

                            {/* Texte EPBS */}
                            <h2 className="relative text-[5rem] font-black text-white/90 group-hover:text-white transition duration-500 z-10">
                              EPBS
                            </h2>
                          </motion.div>
                        </div>
                    )}

                    {/* Contenu */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[var(--color-accent)] font-semibold tracking-wider">
                          {formatDate(blog.date)}
                        </span>
                        <span className="text-xs text-[--color-text-secondary]">
                          Par {blog.author}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-[--color-dark] mt-2 mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-[var(--color-text-primary)] mb-5 clamp-3 line-clamp-3">
                        {blog.description || 'Découvrez cet article passionnant...'}
                      </p>

                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="inline-flex items-center font-bold text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors"
                        >
                          Lire l'article
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                          </svg>
                        </Link>
                      </motion.div>
                    </div>
                  </div>

                  {/* Effet de survol */}
                  {hoveredCard === blog.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-[--color-accent] rounded-lg pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}

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

export default BlogPage