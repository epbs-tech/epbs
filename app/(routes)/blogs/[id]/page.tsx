'use client'

import {useState, useEffect, use} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import Image from "next/image"
import BlogArticleLoading from "@/app/(routes)/blogs/[id]/loading";

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

const BlogArticlePage = ({params}: {params: Promise<{ id: string }>}) => {
  const { id } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState<string>('')
  const [showToc, setShowToc] = useState(false)
  const router = useRouter()
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article non trouvé')
          }
          throw new Error('Erreur lors du chargement de l\'article')
        }
        const data: Blog = await response.json()
        setBlog(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Une erreur est survenue')
      } finally {
        setLoading(false)
      }
    }

    fetchBlog()
  }, [id])

  // Observer pour mettre à jour la section active
  useEffect(() => {
    if (!blog) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    blog.sections.forEach((section) => {
      const element = document.getElementById(`section-${section.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [blog])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const renderContent = (content: Content) => {
    switch (content.type) {
      case 'TEXT':
        return (
          <div
            key={content.id}
            className="prose prose-base sm:prose-lg max-w-none mb-4 sm:mb-6 text-[--color-text-primary] prose-headings:text-[--color-primary] prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base"
            dangerouslySetInnerHTML={{ __html: content.text || '' }}
          />
        )

      case 'NUMBERED_LIST':
        return (
          <ol key={content.id} className="list-decimal list-inside space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-[--color-text-primary] text-sm sm:text-base pl-2 sm:pl-0">
            {content.listItems?.map((item, index) => (
              <li key={index} className="leading-relaxed py-1">{item}</li>
            ))}
          </ol>
        )

      case 'BULLET_LIST':
        return (
          <ul key={content.id} className="list-disc list-inside space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-[--color-text-primary] text-sm sm:text-base pl-2 sm:pl-0">
            {content.listItems?.map((item, index) => (
              <li key={index} className="leading-relaxed py-1">{item}</li>
            ))}
          </ul>
        )

      case 'TABLE':
        if (!content.tableData) return null
        return (
          <div key={content.id} className="overflow-x-auto mb-4 sm:mb-6 -mx-4 sm:mx-0">
            <div className="min-w-full px-4 sm:px-0">
              <table className="min-w-full border-collapse border border-[--color-gray-light] text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[--color-light]">
                    {content.tableData.headers?.map((header: string, index: number) => (
                      <th key={index} className="border border-[--color-gray-light] px-2 sm:px-4 py-2 text-left font-semibold text-[--color-primary]">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {content.tableData.rows?.map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-[--color-light]'}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="border border-[--color-gray-light] px-2 sm:px-4 py-2 text-[--color-text-primary]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return null
    }
  }

    if (loading) {
    return (
      <BlogArticleLoading/>
    )
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[--color-light] flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-[--color-primary] mb-4">
            {error || 'Article non trouvé'}
          </h1>
          <p className="text-[--color-text-primary] mb-6 text-sm sm:text-base">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link
            href="/blogs"
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-[--color-primary] text-white font-bold rounded-lg hover:bg-[--color-primary]/90 transition-colors text-sm sm:text-base"
          >
            Retour aux articles
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[--color-light]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[--color-gray-light]">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <nav className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm overflow-x-auto">
            <Link href="/" className="text-[--color-primary] hover:text-[--color-accent] whitespace-nowrap">
              Accueil
            </Link>
            <span className="text-[--color-text-secondary]">/</span>
            <Link href="/blogs" className="text-[--color-primary] hover:text-[--color-accent] whitespace-nowrap">
              Blog
            </Link>
            <span className="text-[--color-text-secondary]">/</span>
            <span className="text-[--color-text-secondary] truncate">
              {blog.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Article */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Métadonnées */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 text-xs sm:text-sm space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                  <span className="text-[--color-accent] font-semibold">
                    {formatDate(blog.date)}
                  </span>
                  <span className="text-[--color-text-secondary]">
                    Par {blog.author}
                  </span>
                </div>
                <button
                  onClick={() => router.back()}
                  className="flex cursor-pointer items-center text-[--color-primary] hover:text-[--color-accent] transition-colors self-start sm:self-auto"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Retour
                </button>
              </div>

              {/* Titre */}
              <h1 className="font-mont text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[--color-primary] mb-4 sm:mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Description */}
              {blog.description && (
                <p className="text-base sm:text-xl text-[--color-text-primary] font-lato mb-6 sm:mb-8 leading-relaxed">
                  {blog.description}
                </p>
              )}

              {/* Image */}
              {blog.imageUrl && (
                <div className="relative w-full h-48 sm:h-64 md:h-96 rounded-lg sm:rounded-xl overflow-hidden mb-6 sm:mb-8">
                  <Image
                    src={new URL(blog.imageUrl, baseUrl).toString()}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bouton Table des matières mobile */}
      {blog.sections.length > 0 && (
        <div className="lg:hidden sticky top-0 z-50 bg-white border-b border-[--color-gray-light] px-4 py-3">
          <button
            onClick={() => setShowToc(!showToc)}
            className="flex items-center justify-between w-full text-[--color-primary] font-semibold text-sm"
          >
            <span>Table des matières</span>
            <svg
              className={`w-4 h-4 transition-transform ${showToc ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>

          {/* Table des matières mobile */}
          {showToc && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 border-t border-[--color-gray-light] pt-3"
            >
              <nav className="space-y-1">
                {blog.sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#section-${section.id}`}
                    onClick={() => setShowToc(false)}
                    className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                      activeSection === `section-${section.id}`
                        ? 'bg-[--color-accent-light] text-[--color-primary] font-semibold'
                        : 'text-[--color-text-primary] hover:bg-[--color-light] hover:text-[--color-primary]'
                    }`}
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </div>
      )}

      {/* Contenu principal */}
      <section className="bg-[--color-light]">
        <div className="container mx-auto px-4 py-6 sm:py-12">
          <div className="max-w-7xl mx-auto flex gap-4 lg:gap-8">

            {/* Table des matières (sidebar desktop) */}
            {blog.sections.length > 0 && (
              <aside className="hidden lg:block w-72 xl:w-80 sticky top-8 h-fit">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-[--color-gray-light]">
                  <h3 className="font-mont text-lg font-bold text-[--color-primary] mb-4">
                    Table des matières
                  </h3>
                  <nav className="space-y-2">
                    {blog.sections.map((section) => (
                      <a
                        key={section.id}
                        href={`#section-${section.id}`}
                        className={`block py-2 px-3 rounded-lg text-sm transition-colors ${
                          activeSection === `section-${section.id}`
                            ? 'bg-[--color-accent-light] text-[--color-primary] font-semibold'
                            : 'text-[--color-text-primary] hover:bg-[--color-light] hover:text-[--color-primary]'
                        }`}
                      >
                        {section.title}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            )}

            {/* Contenu de l'article */}
            <main className="flex-1 min-w-0">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-sm border border-[--color-gray-light]">
                {blog.sections.length > 0 ? (
                  blog.sections
                    .sort((a, b) => a.order - b.order)
                    .map((section) => (
                      <motion.section
                        key={section.id}
                        id={`section-${section.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="mb-8 sm:mb-12 scroll-mt-20 lg:scroll-mt-8"
                      >
                        <h2 className="font-mont text-xl sm:text-2xl md:text-3xl font-bold text-[--color-primary] mb-4 sm:mb-6 border-b-2 border-[--color-accent] pb-2 sm:pb-3">
                          {section.title}
                        </h2>
                        <div className="space-y-3 sm:space-y-4">
                          {section.contents
                            .sort((a, b) => a.order - b.order)
                            .map(renderContent)}
                        </div>
                      </motion.section>
                    ))
                ) : (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-[--color-text-primary] text-base sm:text-lg">
                      Contenu en cours de rédaction...
                    </p>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Section CTA et articles liés */}
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

export default BlogArticlePage