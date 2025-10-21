import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Sign in or sign up to access your BoragoWeb account.',
  keywords: ['sign in', 'sign up', 'authentication', 'BoragoWeb account'],
  openGraph: {
    title: 'Authentication – BoragoWeb',
    description: 'Sign in or sign up to access your BoragoWeb account.',
    url: 'https://boragoweb.eu/auth',
    siteName: 'BoragoWeb',
    images: [
      {
        url: 'https://boragoweb.eu/preview.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_EU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Authentication – BoragoWeb',
    description: 'Sign in or sign up to access your BoragoWeb account.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
