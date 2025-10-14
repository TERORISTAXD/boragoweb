'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/stripe'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

interface Product {
  id: string
  title: string
  slug: string
  description: string | null
  price_cents: number
  currency: string
  stock: number
  sku: string | null
  images: any
  metadata: any
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()
  const supabase = createSupabaseBrowserClient()

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', params.slug)
        .eq('active', true)
        .single()

      if (error || !data) {
        router.push('/shop')
        return
      }

      setProduct(data)
      setLoading(false)
    }

    fetchProduct()
  }, [params.slug, router, supabase])

  const handleAddToCart = () => {
    if (!product) return

    if (product.stock <= 0) {
      toast.error('Product is out of stock')
      return
    }

    addItem({
      id: product.id,
      title: product.title,
      price_cents: product.price_cents,
      slug: product.slug,
      image: product.images?.[0],
    })

    toast.success('Added to cart!')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  const images = product.images || []

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="container-custom pt-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-foreground-muted hover:text-accent transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>

      {/* Product Details */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-background-secondary">
                {images.length > 0 ? (
                  <Image
                    src={images[selectedImage]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-foreground-subtle">
                    No image available
                  </div>
                )}
              </div>

              {/* Thumbnail gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === index
                          ? 'border-accent'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} - ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="heading-2 mb-4">{product.title}</h1>
                <div className="text-4xl font-bold text-accent mb-6">
                  {formatPrice(product.price_cents, product.currency)}
                </div>
              </div>

              {/* Stock status */}
              <div className="flex items-center gap-2">
                {product.stock > 0 ? (
                  <>
                    <Check className="w-5 h-5 text-green-500" />
                    <span className="text-foreground-muted">
                      {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
                    </span>
                  </>
                ) : (
                  <span className="text-red-500">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div className="prose prose-invert max-w-none">
                  <p className="text-foreground-muted leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* SKU */}
              {product.sku && (
                <div className="text-sm text-foreground-muted">
                  SKU: <span className="font-mono">{product.sku}</span>
                </div>
              )}

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="btn-primary w-full py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>

              {/* Additional info */}
              <div className="border-t border-border pt-6 space-y-3 text-sm text-foreground-muted">
                <p>✓ Instant digital delivery</p>
                <p>✓ Lifetime updates</p>
                <p>✓ 30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
