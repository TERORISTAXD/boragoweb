'use client'

import { useCart } from '@/hooks/useCart'
import { useLanguage } from '@/contexts/LanguageContext'
import { formatPrice } from '@/lib/stripe'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'

export default function CartPage() {
  const { t } = useLanguage()
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCart()
  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-foreground-muted" />
          <h2 className="heading-2 mb-4">{t('cart.empty')}</h2>
          <p className="text-foreground-muted mb-8">
            {t('cart.emptyDesc')}
          </p>
          <Link href="/shop" className="btn-primary px-8 py-3">
            {t('cart.browseProducts')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen section">
      <div className="container-custom max-w-6xl">
        <h1 className="heading-2 mb-8">{t('cart.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="card p-4">
                <div className="flex gap-4">
                  {/* Image */}
                  <Link
                    href={`/shop/${item.slug}`}
                    className="relative w-24 h-24 rounded-lg overflow-hidden bg-background-secondary flex-shrink-0"
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-foreground-subtle text-xs">
                        {t('cart.noImage')}
                      </div>
                    )}
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.slug}`}
                      className="font-semibold hover:text-accent transition-colors block mb-2"
                    >
                      {item.title}
                    </Link>
                    <div className="text-accent font-bold mb-3">
                      {formatPrice(item.price_cents)}
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-background-elevated rounded transition-colors"
                        aria-label={t('cart.decreaseQuantity')}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-background-elevated rounded transition-colors"
                        aria-label={t('cart.increaseQuantity')}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 hover:bg-background-elevated rounded-lg transition-colors h-fit"
                    aria-label={t('cart.removeItem')}
                  >
                    <Trash2 className="w-5 h-5 text-foreground-muted hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">{t('cart.orderSummary')}</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-foreground-muted">
                  <span>{t('cart.items')} ({totalItems})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-foreground-muted">
                  <span>{t('cart.shipping')}</span>
                  <span>{t('cart.free')}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-lg font-bold">
                  <span>{t('cart.total')}</span>
                  <span className="text-accent">{formatPrice(totalPrice)}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full py-3 mb-3">
                {t('cart.checkout')}
              </Link>

              <Link
                href="/shop"
                className="btn-ghost w-full py-3 text-center block"
              >
                {t('cart.continueShopping')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
