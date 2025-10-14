'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { formatPrice } from '@/lib/stripe'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

interface ProductCardProps {
  id: string
  title: string
  slug: string
  description: string | null
  price_cents: number
  currency: string
  images: any
  stock: number
}

export function ProductCard({
  id,
  title,
  slug,
  description,
  price_cents,
  currency,
  images,
  stock,
}: ProductCardProps) {
  const { addItem } = useCart()
  const imageUrl = images?.[0] || null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    
    if (stock <= 0) {
      toast.error('Product is out of stock')
      return
    }

    addItem({
      id,
      title,
      price_cents,
      slug,
      image: imageUrl,
    })
    
    toast.success('Added to cart!')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Link href={`/shop/${slug}`} className="group block">
        <div className="card-hover overflow-hidden">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-background-secondary">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-foreground-subtle">
                No image
              </div>
            )}
            {stock <= 0 && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                <span className="text-lg font-semibold">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2 group-hover:text-accent transition-colors">
              {title}
            </h3>
            {description && (
              <p className="text-foreground-muted text-sm mb-4 line-clamp-2">
                {description}
              </p>
            )}

            {/* Price and CTA */}
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-accent">
                {formatPrice(price_cents, currency)}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={stock <= 0}
                className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label={`Add ${title} to cart`}
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>

            {stock > 0 && stock <= 5 && (
              <p className="text-xs text-accent mt-2">
                Only {stock} left in stock
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
