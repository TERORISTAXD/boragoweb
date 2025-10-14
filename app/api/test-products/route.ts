import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServiceClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const supabaseAdmin = await createSupabaseServiceClient()
    
    const { data: products, error } = await supabaseAdmin
      .from('products')
      .select('id, title, slug, price_cents, active, stock')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch products', details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      products,
      count: products?.length || 0
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

