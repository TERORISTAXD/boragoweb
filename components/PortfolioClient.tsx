'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { ReactNode } from 'react'

interface PortfolioClientProps {
  tag?: string
  noProjects?: boolean
  children?: ReactNode
}

export function PortfolioClient({ tag, noProjects, children }: PortfolioClientProps) {
  const { t } = useLanguage()

  if (noProjects) {
    return (
      <div className="text-center py-16">
        <p className="text-foreground-muted text-lg">{t('portfolio.noProjects')}</p>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="section">
        <div className="container-custom">
          <h1 className="heading-1 mb-6">{t('portfolio.title')}</h1>
          <p className="text-xl text-foreground-muted max-w-3xl">
            {t('portfolio.subtitle')}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section">
        <div className="container-custom">
          {tag && (
            <div className="mb-8">
              <span className="text-foreground-muted">{t('portfolio.filteredBy')} </span>
              <span className="text-accent font-semibold">{tag}</span>
            </div>
          )}
          {children}
        </div>
      </section>
    </>
  )
}
