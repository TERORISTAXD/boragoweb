'use client'

import { PageBackground } from '@/components/PageBackground'
import { useLanguage } from '@/contexts/LanguageContext'

export default function TermsPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen relative px-6 py-24 sm:py-32 lg:px-8">
      <PageBackground variant="default" />
      
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
            {t('terms.title')}
          </h1>
          <p className="text-lg text-gray-400">
            {t('terms.lastUpdated')}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-12">
            
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section1.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section1.content')}
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section2.title')}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('terms.section2.content')}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>{t('terms.section2.item1')}</li>
                <li>{t('terms.section2.item2')}</li>
                <li>{t('terms.section2.item3')}</li>
                <li>{t('terms.section2.item4')}</li>
                <li>{t('terms.section2.item5')}</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section3.title')}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('terms.section3.content')}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>{t('terms.section3.item1')}</li>
                <li>{t('terms.section3.item2')}</li>
                <li>{t('terms.section3.item3')}</li>
                <li>{t('terms.section3.item4')}</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section4.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section4.content')}
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section5.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section5.content')}
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section6.title')}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('terms.section6.content')}
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                <li>{t('terms.section6.item1')}</li>
                <li>{t('terms.section6.item2')}</li>
                <li>{t('terms.section6.item3')}</li>
                <li>{t('terms.section6.item4')}</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section7.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section7.content')}
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section8.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section8.content')}
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section9.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section9.content')}
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section10.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section10.content')}
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section11.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section11.content')}
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section12.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section12.content')}
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.section13.title')}</h2>
              <p className="text-gray-300 leading-relaxed">
                {t('terms.section13.content')}
              </p>
            </section>

            {/* Contact Section */}
            <section className="border-t border-white/10 pt-12">
              <h2 className="text-2xl font-semibold text-white mb-4">{t('terms.contactUs')}</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                {t('terms.contactDesc')}
              </p>
              <div className="text-gray-300 space-y-2">
                <p>{t('terms.email')} <a href="mailto:contact@borago.com" className="text-[#22c55e] hover:text-[#4ade80] transition-colors">contact@borago.com</a></p>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
