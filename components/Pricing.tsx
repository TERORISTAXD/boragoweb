'use client'

import { Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'

const tiers = [
  {
    nameKey: 'tier.consultation',
    id: '550e8400-e29b-41d4-a716-446655440001', // UUID from database (consultation)
    slug: 'consultation',
    priceMonthly: '0 €',
    priceCents: 0,
    descriptionKey: 'pricing.consultationDesc',
    featureKeys: [
      'feature.individualConsultation',
      'feature.businessStrategies',
      'feature.salesTips',
      'feature.businessAdvice',
    ],
    featured: false,
  },
  {
    nameKey: 'tier.onlineStore',
    id: '550e8400-e29b-41d4-a716-446655440002', // UUID from database (Store)
    slug: 'online-store',
    priceMonthly: '650 €',
    priceCents: 65000,
    descriptionKey: 'pricing.onlineStoreDesc',
    featureKeys: [
      'feature.unlimitedProducts',
      'feature.unlimitedSubscribers',
      'feature.advancedAnalytics',
      'feature.dedicatedSupport',
      'feature.marketingAutomations',
      'feature.customIntegrations',
    ],
    featured: true,
  },
  {
    nameKey: 'tier.staticWebsite',
    id: '550e8400-e29b-41d4-a716-446655440003', // UUID from database (static website)
    slug: 'static-website',
    priceMonthly: '350 €',
    priceCents: 35000,
    descriptionKey: 'pricing.staticWebsiteDesc',
    featureKeys: [
      'feature.uniqueDesign',
      'feature.shortDeadlines',
      'feature.websiteSpeed',
      'feature.basicSEO',
      'feature.support247',
    ],
    featured: false,
  },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Pricing() {
  const { t } = useLanguage()
  const router = useRouter()

  const handleMakeRequest = () => {
    // Redirect to contact page for all plans
    router.push('/about#contact')
  }

  return (
    <div className="relative isolate bg-[#0a0a0a] px-6 py-24 sm:py-32 lg:px-8">
      <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="mx-auto aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#4ade80] to-[#22c55e] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base/7 font-semibold text-[#4ade80]">{t('pricing.title')}</h2>
        <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl">
          {t('pricing.subtitle')}
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
        {t('pricing.description')}
      </p>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-6 sm:mt-20 lg:max-w-7xl lg:grid-cols-3">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={classNames(
              tier.featured ? 'relative bg-gradient-to-br from-gray-900/60 via-emerald-950/40 to-gray-900/60 backdrop-blur-xl ring-2 ring-[#4ade80]/20' : 'bg-white/5 backdrop-blur-xl',
              'rounded-3xl p-8 ring-1 ring-white/10 sm:p-10',
            )}
          >
            <h3
              id={tier.id}
              className={classNames(tier.featured ? 'text-[#4ade80]' : 'text-[#4ade80]', 'text-base/7 font-semibold')}
            >
              {t(tier.nameKey)}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={classNames(
                  tier.featured ? 'text-white' : 'text-white',
                  'text-5xl font-semibold tracking-tight',
                )}
              >
                {tier.priceMonthly}
              </span>
              <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-400', 'text-base')}>{t('pricing.oneTime')}</span>
            </p>
            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-300', 'mt-6 text-base/7')}>
              {t(tier.descriptionKey)}
            </p>
            <ul
              role="list"
              className={classNames(
                tier.featured ? 'text-gray-300' : 'text-gray-300',
                'mt-8 space-y-3 text-sm/6 sm:mt-10',
              )}
            >
              {tier.featureKeys.map((featureKey) => (
                <li key={featureKey} className="flex gap-x-3">
                  <Check
                    aria-hidden="true"
                    className={classNames(tier.featured ? 'text-[#4ade80]' : 'text-[#4ade80]', 'h-6 w-5 flex-none')}
                  />
                  {t(featureKey)}
                </li>
              ))}
            </ul>
            <button
              onClick={handleMakeRequest}
              aria-describedby={tier.id}
              className={classNames(
                tier.featured
                  ? 'bg-[#22c55e] text-white hover:bg-[#16a34a] focus-visible:outline-[#22c55e]'
                  : 'bg-white/10 text-white ring-1 ring-inset ring-white/10 hover:bg-white/20 focus-visible:outline-white',
                'mt-8 block w-full rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10 transition-colors',
              )}
            >
              {t('pricing.makeRequest')}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
