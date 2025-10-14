import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { CookieConsent } from '@/components/CookieConsent'
import { LanguageProvider } from '@/contexts/LanguageContext'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Borago Web - Web Development Agency and AI services',
  description: 'Showcasing exceptional work and offering premium digital products for creators and businesses.',
  keywords: ['portfolio', 'creative', 'digital products', 'design', 'development'],
  authors: [{ name: 'BoragoWeb' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://borago.com',
    siteName: 'Borago Web',
    title: 'Borago Web - Web Development Agency and AI services',
    description: 'Showcasing exceptional work and offering premium digital products for creators and businesses.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borago Web - Web Development Agency and AI services',
    description: 'Showcasing exceptional work and offering premium digital products for creators and businesses.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#0A0A0A]">
        <LanguageProvider>
          <Nav />
          <main id="main-content" className="flex-1 bg-[#0A0A0A]">
            {children}
          </main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#1A1A1A',
                color: '#E6E6E6',
                border: '1px solid #2A2A2A',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#0A0A0A',
                },
              },
            }}
          />
          <CookieConsent />
        </LanguageProvider>
      </body>
    </html>
  )
}
