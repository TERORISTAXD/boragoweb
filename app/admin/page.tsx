import { requireAdmin } from '@/lib/admin/auth'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import StatCard from '@/components/admin/StatCard'
import { 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Users,
  Package,
  Eye,
  Clock
} from 'lucide-react'
import Link from 'next/link'

export default async function AdminDashboard() {
  const user = await requireAdmin()
  const supabase = await createSupabaseServerComponentClient()

  // Fetch comprehensive stats
  const [
    { count: totalOrders },
    { count: totalProducts },
    { count: totalUsers },
    { data: paidOrders },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('users').select('*', { count: 'exact', head: true }),
    supabase
      .from('orders')
      .select('total_cents')
      .eq('status', 'paid'),
    supabase
      .from('orders')
      .select('id, total_cents, status, created_at, shipping_info')
      .order('created_at', { ascending: false })
      .limit(5),
  ])

  // Calculate revenue
  const totalRevenue = paidOrders?.reduce((sum, order) => sum + order.total_cents, 0) || 0
  const avgOrderValue = paidOrders && paidOrders.length > 0 
    ? totalRevenue / paidOrders.length 
    : 0

  // Format currency
  const formatCurrency = (cents: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'EUR',
    }).format(cents / 100)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {user.name || user.email}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
          color="text-green-600"
          href="/admin/orders"
        />
        <StatCard
          title="Total Orders"
          value={totalOrders || 0}
          icon={ShoppingBag}
          color="text-blue-600"
          href="/admin/orders"
        />
        <StatCard
          title="Products"
          value={totalProducts || 0}
          icon={Package}
          color="text-purple-600"
          href="/admin/products"
        />
        <StatCard
          title="Customers"
          value={totalUsers || 0}
          icon={Users}
          color="text-orange-600"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-[#4ade80]" />
            <h3 className="text-gray-600 text-sm font-medium">Avg Order Value</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgOrderValue)}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-600 text-sm font-medium">Paid Orders</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">{paidOrders?.length || 0}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-yellow-600" />
            <h3 className="text-gray-600 text-sm font-medium">Pending Orders</h3>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {(totalOrders || 0) - (paidOrders?.length || 0)}
          </p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Link 
              href="/admin/orders"
              className="text-[#4ade80] hover:text-[#22c55e] text-sm font-medium"
            >
              View All →
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(order.shipping_info as any)?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(order.total_cents)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    No orders yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/products"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#4ade80] transition-colors"
          >
            <Package className="w-6 h-6 text-[#4ade80]" />
            <div>
              <div className="font-semibold text-gray-900">Manage Products</div>
              <div className="text-sm text-gray-500">Edit pricing & inventory</div>
            </div>
          </Link>

          <Link
            href="/admin/content"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#4ade80] transition-colors"
          >
            <Eye className="w-6 h-6 text-[#4ade80]" />
            <div>
              <div className="font-semibold text-gray-900">Edit Content</div>
              <div className="text-sm text-gray-500">Update page texts</div>
            </div>
          </Link>

          <Link
            href="/admin/analytics"
            className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-[#4ade80] transition-colors"
          >
            <TrendingUp className="w-6 h-6 text-[#4ade80]" />
            <div>
              <div className="font-semibold text-gray-900">View Analytics</div>
              <div className="text-sm text-gray-500">Site performance</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
