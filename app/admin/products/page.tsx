import { requireAdmin } from '@/lib/admin/auth'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { Package, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default async function ProductsPage() {
  await requireAdmin()
  const supabase = await createSupabaseServerComponentClient()

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  const formatCurrency = (cents: number, currency: string = 'EUR') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(cents / 100)
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-2">Manage products and pricing</p>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 px-4 py-2 bg-[#4ade80] text-white rounded-lg hover:bg-[#22c55e] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{product.slug}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    product.active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {product.active ? 'Active' : 'Inactive'}
                  </span>
                </div>

                {product.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatCurrency(product.price_cents, product.currency)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Stock: {product.stock}
                    </div>
                  </div>
                  {product.sku && (
                    <div className="text-xs text-gray-400 font-mono">
                      SKU: {product.sku}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-lg shadow p-12 text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No products found</p>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#4ade80] text-white rounded-lg hover:bg-[#22c55e] transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
