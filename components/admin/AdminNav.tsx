'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  FileText, 
  Settings, 
  Users,
  LogOut,
  BarChart3
} from 'lucide-react'

interface AdminNavProps {
  userRole: 'owner' | 'admin' | 'editor' | 'customer'
}

export default function AdminNav({ userRole }: AdminNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/products', label: 'Products', icon: Package },
    { href: '/admin/content', label: 'Content', icon: FileText },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ]

  // Add admin management for owners only
  if (userRole === 'owner') {
    navItems.push({ href: '/admin/manage', label: 'Manage Admins', icon: Users })
  }

  return (
    <nav className="bg-gray-900 text-white w-64 min-h-screen p-6 flex flex-col">
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold text-[#4ade80]">
          Borago Admin
        </Link>
      </div>

      <div className="flex-1">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#4ade80] text-gray-900'
                      : 'hover:bg-gray-800 text-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="mt-auto pt-6 border-t border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Back to Site</span>
        </Link>
      </div>
    </nav>
  )
}
