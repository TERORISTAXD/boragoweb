import { PageBackground } from '@/components/PageBackground'
import Pricing from '@/components/Pricing'

export const metadata = {
  title: 'Borago Web - Shop',
  description: 'Choose the perfect plan for your business',
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
