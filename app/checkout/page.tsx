'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/hooks/useCart'
import { formatPrice } from '@/lib/stripe'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

const checkoutSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(3, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const totalPrice = getTotalPrice()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  })

  if (items.length === 0) {
    router.push('/cart')
    return null
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true)

    try {
      console.log('Items being sent to API:', items)
      console.log('Items type:', typeof items)
      console.log('Items length:', items?.length)
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          shippingInfo: data,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Checkout failed')
      }

      // Redirect to Stripe Checkout
      if (result.url) {
        window.location.href = result.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
      toast.error(error instanceof Error ? error.message : 'Checkout failed')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen section">
      <div className="container-custom max-w-6xl">
        <h1 className="heading-2 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="input"
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className="input"
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <input
                      {...register('address')}
                      type="text"
                      id="address"
                      className="input"
                      placeholder="123 Main St"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">
                        City
                      </label>
                      <input
                        {...register('city')}
                        type="text"
                        id="city"
                        className="input"
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium mb-2">
                        Postal Code
                      </label>
                      <input
                        {...register('postalCode')}
                        type="text"
                        id="postalCode"
                        className="input"
                        placeholder="10001"
                      />
                      {errors.postalCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <input
                      {...register('country')}
                      type="text"
                      id="country"
                      className="input"
                      placeholder="United States"
                    />
                    {errors.country && (
                      <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-foreground-muted">
                        {item.title} x {item.quantity}
                      </span>
                      <span>{formatPrice(item.price_cents * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 mb-6">
                  <div className="flex justify-between text-foreground-muted">
                    <span>Subtotal</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-foreground-muted">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-2">
                    <span>Total</span>
                    <span className="text-accent">{formatPrice(totalPrice)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Complete Order'
                  )}
                </button>

                <p className="text-xs text-foreground-muted text-center mt-4">
                  Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
