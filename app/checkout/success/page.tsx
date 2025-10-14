'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { clearCart } = useCart()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Clear cart after successful payment
      clearCart()
    } else {
      // Redirect if no session ID
      router.push('/cart')
    }
  }, [sessionId, clearCart, router])

  if (!sessionId) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>
        
        <h1 className="heading-2 mb-4">Payment Successful!</h1>
        
        <p className="text-foreground-muted mb-8">
          Thank you for your purchase. You'll receive a confirmation email shortly
          with your order details and download links.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop" className="btn-primary px-6 py-3">
            Continue Shopping
          </Link>
          <Link href="/" className="btn-secondary px-6 py-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
