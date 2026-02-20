'use client'

import { BarChart3, Shield, Zap, Wrench, TrendingUp, Users, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { ClientsSection } from './ClientsSection'
import { ServicesSection } from './ServicesSection'

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
  const { t } = useLanguage()

  useEffect(() => {
    // Scroll to top on mount/refresh
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Main Hero Banner */}
      <section className="relative pt-20 pb-16 lg:pt-0 lg:pb-0 text-center min-h-screen flex flex-col justify-center items-center">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#22c55e]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-gray-400 ring-1 ring-white/10">
              <Sparkles className="w-4 h-4 text-[#4ade80]" />
              {t('hero.badge')}
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            {t('hero.headline')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {t('hero.subheadline')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="#services"
              className="px-8 py-4 text-white bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-[#22c55e]/20 hover:-translate-y-0.5"
            >
              {t('hero.ctaPrimary')}
            </Link>
            <Link
              href="/about#contact"
              className="px-8 py-4 text-white bg-white/5 hover:bg-white/10 rounded-full font-semibold transition-colors ring-1 ring-white/10 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5"
            >
              {t('hero.bookConsultation')}
              <span>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTO-as-a-Service Section */}
      <section id="wio" className="relative pb-20 lg:pb-32">
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

      {/* Services Section */}
      <ServicesSection />

      {/* Clients Section */}
      <ClientsSection />
    </>
  )
}
