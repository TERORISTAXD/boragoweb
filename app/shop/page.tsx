import { PageBackground } from '@/components/PageBackground'
import Pricing from '@/components/Pricing'

export const metadata = {
  title: 'Shop',
  description: 'Choose the perfect web design plan for your business – affordable packages by BoragoWeb.',
  keywords: ['web design pricing', 'website packages', 'web development plans', 'BoragoWeb shop'],
  openGraph: {
    title: 'Shop – BoragoWeb Pricing',
    description: 'Choose the perfect web design plan for your business – affordable packages by BoragoWeb.',
    url: 'https://boragoweb.eu/shop',
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
    title: 'Shop – BoragoWeb Pricing',
    description: 'Choose the perfect web design plan for your business.',
    images: ['https://boragoweb.eu/preview.png'],
  },
}

export default function ShopPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <PageBackground variant="shop" />
      
      {/* Pricing Section */}
      <Pricing />
    </div>
  )
}
