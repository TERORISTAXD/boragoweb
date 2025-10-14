'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function NewProductPage() {
  const router = useRouter()
  const supabase = createSupabaseBrowserClient()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price_cents: 0,
    currency: 'EUR',
    stock: 0,
    sku: '',
    active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log('Creating product with data:', formData)
      
      const { data, error } = await supabase
        .from('products')
        .insert([formData])
        .select()

      console.log('Insert result:', { data, error })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      toast.success('Product created successfully!')
      router.push('/admin/products')
      router.refresh()
    } catch (error) {
      console.error('Error creating product:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to create product')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    let newValue: any = value
    
    if (type === 'number') {
      newValue = parseInt(value) || 0
    } else if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked
    }
    
    console.log('Field changed:', name, '=', newValue)
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))
  }

  // Auto-generate slug from title
  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    
    setFormData(prev => ({ ...prev, slug }))
  }

  return (
    <div>
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/products"
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>

        {/* Debug info */}
        <div className="mb-4 p-4 bg-gray-100 rounded text-xs">
          <strong>Debug - Current Form Data:</strong>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Product Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              onBlur={generateSlug}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900 bg-white"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
              Slug (URL) *
            </label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900 bg-white"
              required
            />
            <p className="text-sm text-gray-500 mt-1">Auto-generated from title. Can be edited.</p>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900 bg-white"
            />
          </div>

          {/* Price and Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price_cents" className="block text-sm font-medium text-gray-700 mb-2">
                Price (in cents) *
              </label>
              <input
                type="number"
                id="price_cents"
                name="price_cents"
                value={formData.price_cents}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900 bg-white"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Example: 1000 = €10.00
              </p>
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency *
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900 bg-white"
              >
                <option value="EUR">EUR (€)</option>
                <option value="USD">USD ($)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
          </div>

          {/* Stock and SKU */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity *
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900 bg-white"
                required
              />
            </div>

            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                SKU (Optional)
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4ade80] focus:border-transparent text-gray-900 bg-white"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="active"
              name="active"
              checked={formData.active}
              onChange={handleChange}
              className="w-4 h-4 text-[#4ade80] border-gray-300 rounded focus:ring-[#4ade80]"
            />
            <label htmlFor="active" className="text-sm font-medium text-gray-700">
              Active (visible to customers)
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-[#4ade80] text-white rounded-lg hover:bg-[#22c55e] transition-colors disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Creating...' : 'Create Product'}
            </button>
            <Link
              href="/admin/products"
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
