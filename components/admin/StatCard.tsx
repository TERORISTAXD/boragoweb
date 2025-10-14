import { LucideIcon } from 'lucide-react'
import Link from 'next/link'

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  href?: string
  color?: string
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  href,
  color = 'text-[#4ade80]',
}: StatCardProps) {
  const content = (
    <div className={`bg-white rounded-lg shadow p-6 ${href ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gray-100`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        {trend && (
          <div className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend.isPositive ? '+' : ''}{trend.value}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}
