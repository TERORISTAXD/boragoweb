import { requireAdmin } from '@/lib/admin/auth'
import { Users, Eye, Clock, BarChart3 } from 'lucide-react'
import StatCard from '@/components/admin/StatCard'

export default async function AnalyticsPage() {
  await requireAdmin()

  // Mock data - replace with actual Google Analytics data
  const analyticsData = {
    pageViews: 12543,
    sessions: 8234,
    users: 5621,
    bounceRate: 42.3,
    avgSessionDuration: 185, // seconds
  }

  const topPages = [
    { page: '/', views: 3421 },
    { page: '/pricing', views: 2156 },
    { page: '/about', views: 1834 },
    { page: '/blog', views: 1245 },
    { page: '/cart', views: 987 },
  ]

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}m ${secs}s`
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Website performance and visitor insights</p>
      </div>

      {/* Analytics Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Page Views"
          value={analyticsData.pageViews.toLocaleString()}
          icon={Eye}
          color="text-blue-600"
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Sessions"
          value={analyticsData.sessions.toLocaleString()}
          icon={BarChart3}
          color="text-purple-600"
          trend={{ value: 8.3, isPositive: true }}
        />
        <StatCard
          title="Users"
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color="text-green-600"
          trend={{ value: 15.2, isPositive: true }}
        />
        <StatCard
          title="Avg. Session"
          value={formatDuration(analyticsData.avgSessionDuration)}
          icon={Clock}
          color="text-orange-600"
        />
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bounce Rate</h3>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-gray-900">{analyticsData.bounceRate}%</div>
            <div className="text-sm text-gray-500">
              Percentage of visitors who leave after viewing only one page
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Direct</span>
              <span className="font-medium">45%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Organic Search</span>
              <span className="font-medium">32%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Social</span>
              <span className="font-medium">15%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Referral</span>
              <span className="font-medium">8%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Top Pages</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{page.page}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">{page.views.toLocaleString()} views</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#4ade80] h-2 rounded-full"
                      style={{ width: `${(page.views / topPages[0].views) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Setup Notice */}
      <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="text-sm font-medium text-yellow-900 mb-2">Google Analytics Setup Required</h3>
        <p className="text-sm text-yellow-800">
          To view real analytics data, configure Google Analytics credentials in your environment variables.
          See the documentation for setup instructions.
        </p>
      </div>
    </div>
  )
}
