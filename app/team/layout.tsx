import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the talented people behind BoragoWeb – Nikola Dimitrov and Stanislav Nikolov, web design experts.',
  keywords: ['BoragoWeb team', 'Nikola Dimitrov', 'Stanislav Nikolov', 'web design team', 'Bulgaria'],
  openGraph: {
    title: 'Our Team – BoragoWeb',
    description: 'Meet the talented people behind BoragoWeb – Nikola Dimitrov and Stanislav Nikolov, web design experts.',
    url: 'https://boragoweb.eu/team',
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
    title: 'Our Team – BoragoWeb',
    description: 'Meet the talented people behind BoragoWeb.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
