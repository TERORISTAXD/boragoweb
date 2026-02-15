'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ProjectCard } from './ProjectCard'
import { TestimonialsSection } from './TestimonialsSection'

interface Project {
  id: string
  title: string
  slug: string
  summary: string
  cover_image: string
  tags: string[]
  featured: boolean
}

interface HomePageClientProps {
  projects: Project[] | null
}

export function HomePageClient({ projects }: HomePageClientProps) {
  const { t } = useLanguage()

  return (
    <>
      {/* Featured Projects */}
      {projects && projects.length > 0 && (
        <section className="section">
          <div className="container-custom">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="heading-2 mb-4">{t('home.featuredWork')}</h2>
                <p className="text-foreground-muted max-w-2xl">
                  {t('home.featuredWorkDesc')}
                </p>
              </div>
              <Link
                href="/portfolio"
                className="hidden md:flex items-center gap-2 text-accent hover:gap-3 transition-all"
              >
                {t('home.viewAll')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  title={project.title}
                  slug={project.slug}
                  summary={project.summary}
                  coverImage={project.cover_image}
                  tags={project.tags}
                  featured={project.featured}
                />
              ))}
            </div>

            <div className="md:hidden mt-8 text-center">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all"
              >
                {t('home.viewAllProjects')}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      )}


      {/* Testimonials Section */}
      <TestimonialsSection />


      {/* CTA Section */}
      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="heading-2 mb-6">{t('home.ctaTitle')}</h2>
            <p className="text-xl text-foreground-muted mb-8">
              {t('home.ctaDesc')}
            </p>
            <Link href="/about#contact" className="btn-primary px-8 py-3 text-lg">
              {t('home.getInTouch')}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
