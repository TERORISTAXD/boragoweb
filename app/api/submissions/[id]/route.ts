import { NextResponse } from 'next/server'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { createSupabaseServiceClient } from '@/lib/supabase/server'

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // 1. Verify Authentication via cookie-based client
        const supabase = await createSupabaseServerComponentClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()

        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // 2. Authorize
        const isAuthorized =
            user.email === 'boragoweb@gmail.com' ||
            user.email === 'stanislav@boragoweb.eu' ||
            user.email === 'nikola@boragoweb.eu' ||
            user.email === 'darkobgto@gmail.com' ||
            user.email?.includes('boragoweb')

        if (!isAuthorized) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
        }

        const { id } = params
        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 })
        }

        // 3. Delete with Service Role (bypasses RLS)
        const adminSupabase = await createSupabaseServiceClient()
        const { error: deleteError } = await adminSupabase
            .from('contact_submissions')
            .delete()
            .eq('id', id)

        if (deleteError) {
            console.error('Delete Error:', deleteError)
            return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
        }

        return NextResponse.json({ success: true }, { status: 200 })

    } catch (error) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
