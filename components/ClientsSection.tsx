'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'

const clients = [
  {
    name: 'BORAGO',
    logo: '/clients/borago.svg',
    colorLogo: '/clients/borago-color.svg',
    featured: true, // Makes it bigger
    website: 'https://boragocafe.eu',
  },
  {
    name: 'MEDTRANS',
    logo: '/clients/medtrans.svg',
    colorLogo: '/clients/medtrans-color.svg',
    featured: true, // Makes it bigger
    website: 'https://medtrans1.netlify.app',
  },
  {
    name: 'ICN.Bg',
    logo: '/clients/icn.svg',
    colorLogo: '/clients/icn-color.svg',
  },
  {
    name: 'TRAFICOM',
    logo: '/clients/traficom.svg',
    colorLogo: '/clients/traficom-color.svg',
  },
  {
    name: 'UniComs',
    logo: '/clients/unicoms.svg',
    colorLogo: '/clients/unicoms-color.svg',
  },
  {
    name: 'skillplate',
    logo: '/clients/skillplate.svg',
    colorLogo: '/clients/skillplate-color.svg',
  },
]

export function ClientsSection() {
  const { t } = useLanguage()

  return (
    <section className="relative py-16 lg:py-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#4ade80] mb-4">
            {t('clients.title')}
          </h2>
          <p className="text-gray-400 text-lg">
            {t('clients.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clients.map((client, index) => {
            const content = (
              <>
                {/* White rounded background - appears on hover */}
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -m-4" />
                
                {/* Logo container */}
                <div className={`relative w-full flex items-center justify-center px-4 ${client.featured ? 'h-32' : 'h-16'}`}>
                  {/* Grayscale logo - default state */}
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={client.featured ? 280 : 120}
                    height={client.featured ? 120 : 40}
                    className={`object-contain grayscale opacity-50 group-hover:opacity-0 transition-opacity duration-300 ${client.featured ? 'max-h-24' : 'max-h-10'}`}
                  />
                  
                  {/* Color logo - appears on hover */}
                  <Image
                    src={client.colorLogo}
                    alt={client.name}
                    width={client.featured ? 280 : 120}
                    height={client.featured ? 120 : 40}
                    className={`object-contain absolute inset-0 m-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${client.featured ? 'max-h-24' : 'max-h-10'}`}
                  />
                </div>
              </>
            )

            return (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative flex items-center justify-center"
              >
                {client.website ? (
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center w-full cursor-pointer"
                    aria-label={`Visit ${client.name} website`}
                  >
                    {content}
                  </a>
                ) : (
                  content
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
