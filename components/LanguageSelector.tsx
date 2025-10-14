'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export type Language = 'bg' | 'en'

interface LanguageOption {
  code: Language
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: 'bg', name: 'Български', flag: '/flags/bg.svg' },
  { code: 'en', name: 'English', flag: '/flags/en.svg' },
]

interface LanguageSelectorProps {
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

export function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0]
  const otherLanguages = languages.filter(lang => lang.code !== currentLanguage)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleLanguageSelect = (lang: Language) => {
    onLanguageChange(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Main button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 hover:bg-background-elevated rounded-lg transition-all duration-200"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Image
          src={currentLang.flag}
          alt={currentLang.name}
          width={20}
          height={20}
          className="w-5 h-5 rounded-sm"
        />
        <span className="hidden sm:inline text-sm font-medium text-foreground-muted">
          {currentLang.code.toUpperCase()}
        </span>
        <ChevronDown 
          className={`w-4 h-4 text-foreground-muted transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-background-elevated border border-border rounded-lg shadow-lg overflow-hidden animate-slide-down z-50">
          {otherLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-background-hover transition-colors text-left"
            >
              <Image
                src={lang.flag}
                alt={lang.name}
                width={20}
                height={20}
                className="w-5 h-5 rounded-sm"
              />
              <span className="text-sm font-medium text-foreground">
                {lang.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
