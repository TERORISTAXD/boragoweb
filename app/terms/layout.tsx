import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Privacy Policy',
  description: 'Terms of service and privacy policy for BoragoWeb – web design and development agency.',
  keywords: ['terms of service', 'privacy policy', 'BoragoWeb terms', 'legal'],
  openGraph: {
    title: 'Terms & Privacy Policy – BoragoWeb',
    description: 'Terms of service and privacy policy for BoragoWeb – web design and development agency.',
    url: 'https://boragoweb.eu/terms',
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
    title: 'Terms & Privacy Policy – BoragoWeb',
    description: 'Terms of service and privacy policy for BoragoWeb.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
