'use client'

import { useState, useEffect } from 'react'
import { X, Cookie, Check } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [hasConsent, setHasConsent] = useState<string | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [functionalCookies, setFunctionalCookies] = useState(true)
  const [analyticalCookies, setAnalyticalCookies] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem('cookieConsent')
    const savedFunctional = localStorage.getItem('functionalCookies')
    const savedAnalytical = localStorage.getItem('analyticalCookies')

    setHasConsent(cookieConsent)
    if (savedFunctional) setFunctionalCookies(savedFunctional === 'true')
    if (savedAnalytical) setAnalyticalCookies(savedAnalytical === 'true')

    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAllCookies = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    localStorage.setItem('functionalCookies', 'true')
    localStorage.setItem('analyticalCookies', 'true')
    setHasConsent('accepted')
    setFunctionalCookies(true)
    setAnalyticalCookies(true)
    setShowBanner(false)
    setShowSettings(false)
  }

  const savePreferences = () => {
    localStorage.setItem('cookieConsent', 'custom')
    localStorage.setItem('functionalCookies', String(functionalCookies))
    localStorage.setItem('analyticalCookies', String(analyticalCookies))
    setHasConsent('custom')
    setShowBanner(false)
    setShowSettings(false)
  }

  const openCookieSettings = () => {
    setShowBanner(true)
    setShowSettings(true)
  }

  return (
    <>
      {/* Floating Cookie Button - Always visible if consent is given */}
      {hasConsent && (
        <button
          onClick={openCookieSettings}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] shadow-lg shadow-[#22c55e]/30 opacity-60 hover:opacity-100 hover:shadow-xl hover:shadow-[#22c55e]/40 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Cookie Settings"
        >
          <Cookie className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
        </button>
      )}

      {/* Cookie Consent Modal */}
      {showBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative bg-[#1a1a1a] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-white/10 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 flex items-center justify-center">
                  <Cookie className="w-5 h-5 text-[#22c55e]" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  {t('cookie.settings')}
                </h2>
              </div>
              <button
                onClick={() => setShowBanner(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <p className="text-gray-300 leading-relaxed">
                {t('cookie.settingsDescription')}
              </p>

              {/* Necessary Cookies */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-6 h-6 rounded bg-gray-600 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">
                        {t('cookie.necessary')}
                      </h3>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {t('cookie.necessaryDesc')}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-[#22c55e] text-white text-xs font-semibold rounded-full whitespace-nowrap">
                    {t('cookie.required')}
                  </span>
                </div>
              </div>

              {/* Functional Cookies */}
              <div
                className={`rounded-xl p-4 border-2 transition-colors cursor-pointer ${functionalCookies
                    ? 'bg-[#22c55e]/10 border-[#22c55e]/30'
                    : 'bg-white/5 border-white/10'
                  }`}
                onClick={() => setFunctionalCookies(!functionalCookies)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center mt-0.5 transition-colors ${functionalCookies
                        ? 'bg-[#22c55e]'
                        : 'bg-white/10 border-2 border-white/20'
                      }`}
                  >
                    {functionalCookies && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      {t('cookie.functional')}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t('cookie.functionalDesc')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Analytical Cookies */}
              <div
                className={`rounded-xl p-4 border-2 transition-colors cursor-pointer ${analyticalCookies
                    ? 'bg-[#22c55e]/10 border-[#22c55e]/30'
                    : 'bg-white/5 border-white/10'
                  }`}
                onClick={() => setAnalyticalCookies(!analyticalCookies)}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-6 h-6 rounded flex items-center justify-center mt-0.5 transition-colors ${analyticalCookies
                        ? 'bg-[#22c55e]'
                        : 'bg-white/10 border-2 border-white/20'
                      }`}
                  >
                    {analyticalCookies && <Check className="w-4 h-4 text-white" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">
                      {t('cookie.analytical')}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t('cookie.analyticalDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="sticky bottom-0 bg-[#1a1a1a] border-t border-white/10 px-6 py-4 flex flex-col sm:flex-row gap-3 rounded-b-2xl">
              <button
                onClick={savePreferences}
                className="flex-1 px-6 py-3 rounded-lg text-sm font-semibold text-[#22c55e] bg-white/5 border-2 border-[#22c55e] hover:bg-[#22c55e]/10 transition-colors"
              >
                {t('cookie.savePreferences')}
              </button>
              <button
                onClick={acceptAllCookies}
                className="flex-1 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#22c55e] hover:bg-[#16a34a] transition-colors shadow-lg shadow-[#22c55e]/20"
              >
                <Check className="w-4 h-4 inline mr-2" />
                {t('cookie.acceptAll')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
