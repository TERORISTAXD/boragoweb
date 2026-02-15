'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'
import { LanguageSelector } from './LanguageSelector'
import { useLanguage } from '@/contexts/LanguageContext'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#services', label: 'Services' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAdmin, loading } = useUser()
  const supabase = createSupabaseBrowserClient()
  const { language, setLanguage, t } = useLanguage()

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '/#services') {
      e.preventDefault()
      if (pathname !== '/') {
        router.push('/')
        setTimeout(() => {
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      }
    } else if (href === '/') {
      if (pathname === '/') {
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-lg">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/logo.svg"
              alt="Borago Web Logo"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <span className="text-2xl font-heading font-bold text-gradient">
              Borago Web
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent',
                  pathname === link.href ? 'text-accent' : 'text-foreground-muted'
                )}
              >
                {t(`nav.${link.label.toLowerCase()}`)}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSelector
              currentLanguage={language}
              onLanguageChange={setLanguage}
            />

            {/* User menu */}
            {!loading && (
              <>
                {user && (
                  <div className="hidden md:flex items-center gap-2">
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="text-sm font-medium text-foreground-muted hover:text-accent transition-colors"
                      >
                        {t('nav.admin')}
                      </Link>
                    )}
                    <button
                      onClick={handleSignOut}
                      className="p-2 hover:bg-background-elevated rounded-lg transition-colors"
                      aria-label={t('nav.signout')}
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-background-elevated rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-down">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link.href)
                    setMobileMenuOpen(false)
                  }}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-accent px-2 py-1',
                    pathname === link.href ? 'text-accent' : 'text-foreground-muted'
                  )}
                >
                  {t(`nav.${link.label.toLowerCase()}`)}
                </Link>
              ))}

              {user && (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-sm font-medium text-foreground-muted hover:text-accent transition-colors px-2 py-1"
                    >
                      {t('nav.admin')}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut()
                      setMobileMenuOpen(false)
                    }}
                    className="text-sm font-medium text-foreground-muted hover:text-accent transition-colors px-2 py-1 text-left"
                  >
                    {t('nav.signout')}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
