import { requireAdmin } from '@/lib/admin/auth'
import AdminNav from '@/components/admin/AdminNav'

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
