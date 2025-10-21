import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About & Contact',
  description: 'Get in touch with BoragoWeb – professional web design and development agency in Bulgaria and Europe.',
  keywords: ['contact BoragoWeb', 'web design agency', 'Bulgaria web development', 'get in touch'],
  openGraph: {
    title: 'About & Contact – BoragoWeb',
    description: 'Get in touch with BoragoWeb – professional web design and development agency in Bulgaria and Europe.',
    url: 'https://boragoweb.eu/about',
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
    title: 'About & Contact – BoragoWeb',
    description: 'Get in touch with BoragoWeb.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
