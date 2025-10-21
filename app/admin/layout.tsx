import { requireAdmin } from '@/lib/admin/auth'
import AdminNav from '@/components/admin/AdminNav'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'BoragoWeb admin dashboard – manage content, products, and analytics.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAdmin()

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNav userRole={user.role as 'owner' | 'admin'} />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
