import { redirect } from 'next/navigation'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { PageBackground } from '@/components/PageBackground'
import { Mail, Settings, LayoutDashboard, LogOut, CheckCircle2, Circle } from 'lucide-react'
import Link from 'next/link'

// Allow dynamic rendering for real-time contact submissions
export const dynamic = 'force-dynamic'

export default async function PortalDashboard() {
  const supabase = await createSupabaseServerComponentClient()

  // 1. Check if user is authenticated
  const { data: { user }, error } = await supabase.auth.getUser()

  if (error || !user) {
    redirect('/portal')
  }

  // 2. Authorize user
  const isAuthorizedClient =
    user.email === 'boragoweb@gmail.com' ||
    user.email === 'stanislav@boragoweb.eu' ||
    user.email === 'nikola@boragoweb.eu' ||
    user.email === 'darkobgto@gmail.com' ||
    user.email?.includes('boragoweb');

  if (!isAuthorizedClient) {
    redirect('/portal')
  }

  // 3. Fetch latest contact submissions securely from the server
  const { createSupabaseServiceClient } = await import('@/lib/supabase/server')
  const adminSupabase = await createSupabaseServiceClient()

  const { data: submissions, error: dbError } = await adminSupabase
    .from('contact_submissions')
    .select('id, email, subject, message, created_at')
    .order('created_at', { ascending: false })
    .limit(50)

  return (
    <div className="min-h-screen relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <PageBackground variant="default" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
              Welcome back, Borago Web
            </h1>
            <p className="text-gray-400">
              Manage your internal tools and review recent client submissions.
            </p>
          </div>

          <form action="/auth/signout" method="post">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </form>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 rounded-2xl shadow-2xl ring-1 ring-inset ring-white/10 p-6 mb-12">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              href="/portal/submissions"
              className="flex items-center gap-4 p-5 rounded-xl bg-black/40 border border-white/10 hover:border-[#4ade80]/50 hover:bg-white/[0.02] transition-all group"
            >
              <div className="rounded-lg bg-[#4ade80]/10 p-3 group-hover:bg-[#4ade80]/20 transition-colors">
                <Mail className="w-6 h-6 text-[#4ade80]" />
              </div>
              <div>
                <div className="font-semibold text-white">Manage Submissions</div>
                <div className="text-sm text-gray-400 mt-1">View, read, and delete contacts</div>
              </div>
            </Link>

            <div
              className="flex items-center gap-4 p-5 rounded-xl bg-black/40 border border-white/5 opacity-50 cursor-not-allowed"
            >
              <div className="rounded-lg bg-gray-500/10 p-3">
                <Settings className="w-6 h-6 text-gray-400" />
              </div>
              <div>
                <div className="font-semibold text-white">Site Settings</div>
                <div className="text-sm text-gray-500 mt-1">Coming soon</div>
              </div>
            </div>
          </div>
        </div>
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg bg-blue-500/20 p-3">
                <Mail className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Total Submissions</h3>
                <p className="text-2xl font-semibold text-white">{submissions?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg bg-[#22c55e]/20 p-3">
                <LayoutDashboard className="h-6 w-6 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">System Status</h3>
                <p className="text-2xl font-semibold text-white">Online & Secure</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-inset ring-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="rounded-lg bg-purple-500/20 p-3">
                <Settings className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400">Active Admin</h3>
                <p className="text-sm font-semibold text-white truncate max-w-[150px]">{user.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Submissions Feed */}
        <div className="rounded-2xl bg-black/40 backdrop-blur-xl ring-1 ring-inset ring-white/10 overflow-hidden shadow-2xl">
          <div className="border-b border-white/10 px-6 py-5">
            <h3 className="text-base font-semibold leading-6 text-white">Contact Requests</h3>
          </div>

          <ul role="list" className="divide-y divide-white/5">
            {dbError ? (
              <li className="px-6 py-12 text-center text-sm text-red-400">
                <p>Error loading submissions. Is the Supabase table created yet?</p>
              </li>
            ) : !submissions || submissions.length === 0 ? (
              <li className="px-6 py-12 text-center text-sm text-gray-400">
                No contact requests yet. Submissions from the About page will appear here.
              </li>
            ) : (
              submissions.map((sub: any) => (
                <li key={sub.id} className="relative px-6 py-5 hover:bg-white/[0.02] transition-colors border-b border-white/5 last:border-0">
                  <div className="flex w-full justify-between gap-x-6">
                    <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-white">
                          <a href={`mailto:${sub.email}`}>
                            <span className="absolute inset-x-0 -top-px bottom-0" />
                            {sub.subject}
                          </a>
                        </p>
                        <p className="mt-1 flex text-xs leading-5 text-gray-400">
                          <a href={`mailto:${sub.email}`} className="relative truncate hover:underline">
                            {sub.email}
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-x-4">
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-white">
                          {new Date(sub.created_at).toLocaleDateString()}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-400">
                          {new Date(sub.created_at).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-4 text-sm text-gray-300">
                    <div className="rounded-lg bg-white/5 p-4 ring-1 ring-inset ring-white/10">
                      <p className="whitespace-pre-wrap">{sub.message}</p>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
