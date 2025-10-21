import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description: 'Review your cart and proceed to checkout – BoragoWeb digital products and services.',
  keywords: ['shopping cart', 'BoragoWeb cart', 'checkout'],
  openGraph: {
    title: 'Shopping Cart – BoragoWeb',
    description: 'Review your cart and proceed to checkout – BoragoWeb digital products and services.',
    url: 'https://boragoweb.eu/cart',
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
    title: 'Shopping Cart – BoragoWeb',
    description: 'Review your cart and proceed to checkout.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
