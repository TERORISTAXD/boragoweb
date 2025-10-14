import { requireOwner } from '@/lib/admin/auth'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import ManageAdminsClient from '@/components/admin/ManageAdminsClient'

export default async function ManageAdminsPage() {
  await requireOwner() // Only owners can access this page
  const supabase = await createSupabaseServerComponentClient()

  // Fetch all admin and owner users
  const { data: adminUsers } = await supabase
    .from('users')
    .select('id, email, name, role, created_at')
    .in('role', ['owner', 'admin'])
    .order('created_at', { ascending: false })

  return <ManageAdminsClient initialAdmins={adminUsers || []} />
}
