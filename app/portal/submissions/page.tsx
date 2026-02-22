import { redirect } from 'next/navigation'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { createSupabaseServiceClient } from '@/lib/supabase/server'
import { PageBackground } from '@/components/PageBackground'
import { Mail } from 'lucide-react'
import Link from 'next/link'
import SubmissionsTable from '@/components/SubmissionsTable'

export const dynamic = 'force-dynamic'

const ITEMS_PER_PAGE = 10

export default async function SubmissionsPage({
    searchParams,
}: {
    searchParams: { page?: string }
}) {
    // 1. Verify Authentication
    const supabase = await createSupabaseServerComponentClient()
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        redirect('/portal')
    }

    // 2. Authorize
    const isAuthorized =
        user.email === 'boragoweb@gmail.com' ||
        user.email === 'stanislav@boragoweb.eu' ||
        user.email === 'nikola@boragoweb.eu' ||
        user.email === 'darkobgto@gmail.com' ||
        user.email?.includes('boragoweb')

    if (!isAuthorized) {
        redirect('/portal')
    }

    // 3. Fetch data server-side with Service Role (bypasses RLS)
    const page = parseInt(searchParams.page || '1')
    const offset = (page - 1) * ITEMS_PER_PAGE

    const adminSupabase = await createSupabaseServiceClient()
    const { data: submissions, count, error: dbError } = await adminSupabase
        .from('contact_submissions')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + ITEMS_PER_PAGE - 1)

    const totalPages = count ? Math.ceil(count / ITEMS_PER_PAGE) : 1

    return (
        <div className="min-h-screen relative pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <PageBackground variant="default" />

            <div className="relative mx-auto max-w-6xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Link href="/portal/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">
                                ← Dashboard
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Submissions</h1>
                        <p className="text-gray-400 mt-1">
                            Manage messages sent from the Contact Us form.
                        </p>
                    </div>
                </div>

                {/* Table Container */}
                <div className="rounded-2xl bg-black/40 backdrop-blur-xl ring-1 ring-inset ring-white/10 overflow-hidden shadow-2xl">
                    <div className="border-b border-white/10 px-6 py-5 flex justify-between items-center bg-white/[0.02]">
                        <h3 className="text-base font-semibold leading-6 text-white flex items-center gap-2">
                            <Mail className="w-5 h-5 text-gray-400" />
                            Inbox Records
                        </h3>
                        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md ring-1 ring-white/10">
                            {count ?? 0} Total
                        </span>
                    </div>

                    {dbError ? (
                        <div className="px-6 py-24 text-center text-red-400">
                            <p>Error loading submissions: {dbError.message}</p>
                            <p className="mt-2 text-sm text-gray-500">Make sure the `contact_submissions` table exists in Supabase.</p>
                        </div>
                    ) : (
                        <SubmissionsTable
                            submissions={submissions ?? []}
                            totalCount={count ?? 0}
                            page={page}
                            totalPages={totalPages}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
