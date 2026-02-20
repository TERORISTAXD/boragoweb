import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { CookieConsent } from '@/components/CookieConsent'
import { BackToTop } from '@/components/BackToTop'
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
  metadataBase: new URL('https://boragoweb.eu'),
  title: {
    default: 'BoragoWeb – Изработка на уебсайтове, SEO оптимизация и дигитален дизайн',
    template: '%s | BoragoWeb'
  },
  description: 'BoragoWeb предлага професионална изработка на уебсайтове, SEO оптимизация и дигитални решения. Модерен уеб дизайн, бързина и ефективност за вашия бизнес в България и Европа.',
  keywords: [
    'уеб дизайн',
    'изработка на сайт',
    'уеб разработка',
    'SEO оптимизация',
    'уеб агенция',
    'BoragoWeb',
    'уебсайт за бизнес',
    'онлайн магазин',
    'Next.js',
    'React',
    'Tailwind',
    'уеб разработчик',
    'фирмен сайт',
    'уеб студио',
    'дигитална агенция',
    'уеб дизайн България',
    'responsive дизайн',
    'поддръжка на уебсайт',
    'графичен дизайн',
    'лого дизайн',
    'уеб хостинг',
    'SSL сигурност',
    'бърз уебсайт',
    'лендинг страница',
    'оптимизация на скоростта',
    'Google оптимизация',
    'уеб реклама',
    'онлайн маркетинг',
    'SEO агенция България',
    'вебсайт за компании',
    'изработка на онлайн магазин',
    'UX дизайн',
    'UI дизайн',
    'оптимизация за мобилни устройства',
    'уеб консултации',
    'изработка на уеб страници',
    'веб решения за бизнес',
  ],
  authors: [{ name: 'BoragoWeb Team', url: 'https://boragoweb.eu' }],
  category: 'Digital Agency',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'BoragoWeb – Изработка на уебсайтове и SEO оптимизация',
    description: 'Професионален уеб дизайн, SEO оптимизация и дигитални решения за вашия бизнес. BoragoWeb създава бързи, модерни и ефективни сайтове.',
    url: 'https://boragoweb.eu',
    siteName: 'BoragoWeb',
    images: [
      {
        url: 'https://boragoweb.eu/preview.png',
        width: 1200,
        height: 630,
        alt: 'BoragoWeb Уеб Дизайн',
      },
    ],
    locale: 'bg_BG',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BoragoWeb – Уеб дизайн и SEO оптимизация',
    description: 'Изработка на модерни, SEO-оптимизирани и ефективни уебсайтове за бизнеси в България и Европа.',
    images: ['https://boragoweb.eu/preview.png'],
  },
  alternates: {
    canonical: 'https://boragoweb.eu',
    languages: {
      'bg-BG': 'https://boragoweb.eu',
      'en-US': 'https://boragoweb.eu/en',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        <LanguageProvider>
          <Nav />
          <main id="main-content" className="flex-1">
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
          <BackToTop />
        </LanguageProvider>
      </body>
    </html>
  )
}
