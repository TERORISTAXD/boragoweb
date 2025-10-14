'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import { ReactNode } from 'react'

interface BlogClientProps {
  noPosts?: boolean
  children?: ReactNode
}

export function BlogClient({ noPosts, children }: BlogClientProps) {
  const { t } = useLanguage()

  if (noPosts) {
    return (
      <div className="text-center py-16">
        <p className="text-foreground-muted text-lg">{t('blog.noPosts')}</p>
      </div>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="section">
        <div className="container-custom">
          <h1 className="heading-1 mb-6">{t('blog.title')}</h1>
          <p className="text-xl text-foreground-muted max-w-3xl">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="section">
        <div className="container-custom max-w-4xl">
          {children}
        </div>
      </section>
    </>
  )
}
