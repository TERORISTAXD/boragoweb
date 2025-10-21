import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your purchase securely with BoragoWeb – fast and secure checkout process.',
  keywords: ['checkout', 'secure payment', 'BoragoWeb purchase'],
  openGraph: {
    title: 'Checkout – BoragoWeb',
    description: 'Complete your purchase securely with BoragoWeb – fast and secure checkout process.',
    url: 'https://boragoweb.eu/checkout',
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
    title: 'Checkout – BoragoWeb',
    description: 'Complete your purchase securely with BoragoWeb.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
