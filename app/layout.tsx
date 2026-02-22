import type { Metadata } from 'next'
import Script from 'next/script'
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
    default: 'Borago Web – Уеб услуги и дигитални решения за вашия бизнес',
    template: '%s | Borago Web'
  },
  description: 'Borago Web предлага професионални уеб услуги, изработка на сайтове и ефективни дигитални решения за вашия бизнес.',
  keywords: [
    // Bulgarian Keywords (Existing + New)
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
    // English Keywords (Targeting International footprint)
    'web design bulgaria',
    'custom web development',
    'SEO optimization agency',
    'Next.js developer',
    'React web agency',
    'e-commerce development',
    'business websites',
    'digital agency europe',
    'frontend development',
    'website maintenance',
    'fast responsive websites',
    'landing page creation',
    'UI UX design agency',
    'SEO services',
    'modern web applications'
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
  verification: {
    google: 'your-google-site-verification-id',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const schemaOrg = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Borago Web",
      "url": "https://boragoweb.eu",
      "description": "Borago Web предлага професионални уеб услуги, изработка на сайтове и ефективни дигитални решения за вашия бизнес.",
      "publisher": {
        "@id": "https://boragoweb.eu/#organization"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://boragoweb.eu/#organization",
      "name": "Borago Web",
      "url": "https://boragoweb.eu",
      "logo": "https://boragoweb.eu/favicon.svg",
      "image": "https://boragoweb.eu/preview.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "hello@boragoweb.eu"
      },
      "sameAs": [
        "https://boragoweb.eu"
      ]
    }
  ];

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-foreground">
        {/* Google Analytics (Replace G-XXXXXXXXXX with your actual Measurement ID) */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-R2PV3CVCZQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-R2PV3CVCZQ', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

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
