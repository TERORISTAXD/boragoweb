'use client'

import { BarChart3, Shield, Zap, Wrench, TrendingUp, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ClientsSection } from './ClientsSection'

const benefits = [
  {
    icon: BarChart3,
    titleKey: 'benefit.strategicPlanning',
    descriptionKey: 'benefit.strategicPlanningDesc',
  },
  {
    icon: Shield,
    titleKey: 'benefit.security',
    descriptionKey: 'benefit.securityDesc',
  },
  {
    icon: Wrench,
    titleKey: 'benefit.customSolutions',
    descriptionKey: 'benefit.customSolutionsDesc',
  },
  {
    icon: Zap,
    titleKey: 'benefit.efficiency',
    descriptionKey: 'benefit.efficiencyDesc',
  },
  {
    icon: TrendingUp,
    titleKey: 'benefit.innovation',
    descriptionKey: 'benefit.innovationDesc',
  },
  {
    icon: Users,
    titleKey: 'benefit.leadership',
    descriptionKey: 'benefit.leadershipDesc',
  },
]

export function Hero() {
  const { t, language } = useLanguage()
  const [currentTextKey, setCurrentTextKey] = useState<'hero.aiServices' | 'hero.website'>('hero.aiServices')
  const textKeys: Array<'hero.aiServices' | 'hero.website'> = ['hero.aiServices', 'hero.website']

  useEffect(() => {
    // Scroll to top on mount/refresh
    window.scrollTo(0, 0)

    const interval = setInterval(() => {
      setCurrentTextKey((prev) => {
        const currentIndex = textKeys.indexOf(prev)
        const nextIndex = (currentIndex + 1) % textKeys.length
        return textKeys[nextIndex]
      })
    }, 3000) // Change every 3 seconds

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Main Hero Banner */}
      <section className="relative pt-12 pb-16 lg:pt-16 lg:pb-20 text-center">
        <motion.div 
          className="container-custom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-400 ring-1 ring-white/10">
              <Sparkles className="w-4 h-4 text-[#4ade80]" />
              {t('hero.badge')}
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            {t('hero.mainTitle1')}
            <br />
            {t('hero.mainTitle2')} {language === 'en' && (currentTextKey === 'hero.aiServices' ? t('common.an') : t('common.a'))}{' '}
            <span className="relative inline-block">
              <span className="text-[#4ade80] transition-all duration-500">{t(currentTextKey)}</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C100 2 200 2 298 10"
                  stroke="#4ade80"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            ?
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-400 mb-4 max-w-3xl mx-auto">
            {t('hero.subtitle1')}
          </p>
          <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
            {t('hero.subtitle2')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/about#contact"
              className="px-6 py-3 text-white bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
            >
              {t('hero.getStarted')}
            </Link>
            <Link
              href="/about#contact"
              className="px-6 py-3 text-white bg-[#22c55e] hover:bg-[#16a34a] rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              {t('hero.bookConsultation')}
              <span>→</span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Clients Section */}
      <ClientsSection />

      {/* CTO-as-a-Service Section */}
      <section className="relative pt-16 pb-20 lg:pt-20 lg:pb-32">
        <div className="container-custom">
          {/* Header Section */}
          <motion.div 
            className="mb-16 lg:mb-24"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="text-[#4ade80] text-sm font-semibold uppercase tracking-wider">
                {t('wio.whatIs')}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 max-w-3xl">
              {t('wio.title')}
            </h1>
            <p className="text-lg text-gray-400 max-w-3xl leading-relaxed">
              {t('wio.description')}
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index} 
                className="flex gap-4"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
                    <benefit.icon className="w-5 h-5 text-[#4ade80]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {t(benefit.descriptionKey)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
