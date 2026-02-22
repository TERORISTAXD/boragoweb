import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    try {
        const cookieStore = await cookies()

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    get(name: string) {
                        return cookieStore.get(name)?.value
                    },
                },
            }
        )

        // 1. Verify Authentication
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Verify Authorization (ensure it's an admin)
        const isAuthorized =
            user.email === 'boragoweb@gmail.com' ||
            user.email === 'stanislav@boragoweb.eu' ||
            user.email === 'nikola@boragoweb.eu' ||
            user.email === 'darkobgto@gmail.com' ||
            user.email?.includes('boragoweb');

        if (!isAuthorized) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        // 3. Parse Pagination Params
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const offset = (page - 1) * limit

        // 4. Fetch Paginated Records using Service Role to bypass RLS
        const { createSupabaseServiceClient } = await import('@/lib/supabase/server')
        const adminSupabase = await createSupabaseServiceClient()

        const { data: submissions, error: dbError, count } = await adminSupabase
            .from('contact_submissions')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (dbError) {
            console.error('Database Error:', dbError)
            return NextResponse.json({ error: 'Failed to fetch submissions' }, { status: 500 })
        }

        // 5. Return Data
        return NextResponse.json({
            submissions,
            pagination: {
                total: count || 0,
                page,
                limit,
                totalPages: count ? Math.ceil(count / limit) : 0
            }
        }, { status: 200 })

    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
