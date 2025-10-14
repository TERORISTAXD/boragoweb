import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createSupabaseServerComponentClient, createSupabaseServiceClient } from '@/lib/supabase/server'
import { Database } from '@/types/database'

type Product = Database['public']['Tables']['products']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type OrderInsert = Database['public']['Tables']['orders']['Insert']
type OrderItem = Database['public']['Tables']['order_items']['Insert']

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Full request body:', JSON.stringify(body, null, 2))
    
    const { items, shippingInfo } = body

    if (!items || items.length === 0) {
      console.log('No items in request')
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    if (!shippingInfo || !shippingInfo.email) {
      console.log('Missing shipping info')
      return NextResponse.json(
        { error: 'Shipping information is required' },
        { status: 400 }
      )
    }

    // Use regular client to get user info (respects auth)
    const supabase = await createSupabaseServerComponentClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    // Use service role client for order creation (bypasses RLS)
    const supabaseAdmin = await createSupabaseServiceClient()

    // Calculate total
    const totalCents = items.reduce(
      (sum: number, item: any) => sum + item.price_cents * item.quantity,
      0
    )

    // Validate items exist and are active
    const productIds = items.map((item: any) => item.id)
    console.log('Cart items:', items)
    console.log('Product IDs from cart:', productIds)
    
    // First, let's see what products exist in the database
    const { data: allProducts } = await supabaseAdmin
      .from('products')
      .select('id, title, active')
    console.log('All products in database:', allProducts)
    
    const { data: products, error: productsError } = await supabaseAdmin
      .from('products')
      .select('id, title, price_cents, active, stock')
      .in('id', productIds)
      .returns<Pick<Product, 'id' | 'title' | 'price_cents' | 'active' | 'stock'>[]>()
    
    console.log('Products found in database for cart IDs:', products)

    if (productsError) {
      console.error('Products validation error:', productsError)
      console.error('Product IDs being validated:', productIds)
      return NextResponse.json(
        { error: 'Failed to validate products. Please ensure products exist in the database.' },
        { status: 500 }
      )
    }

    // Check if all products exist
    if (!products || products.length === 0) {
      console.error('No products found in database for IDs:', productIds)
      return NextResponse.json(
        { error: 'No products found. Please add products to your database first.' },
        { status: 400 }
      )
    }

    // Check if all products exist and are active
    const activeProducts = products.filter(p => p.active)
    if (activeProducts.length !== productIds.length) {
      const inactiveProducts = products.filter(p => !p.active)
      console.error('Some products are inactive:', inactiveProducts)
      return NextResponse.json(
        { error: 'Some products are no longer available' },
        { status: 400 }
      )
    }

    // Create order in database using service role client
    const orderData: OrderInsert = {
      user_id: user?.id || null,
      status: 'pending',
      total_cents: totalCents,
      currency: 'USD',
      shipping_info: shippingInfo,
      metadata: { items },
    }
    
    console.log('Creating order with data:', orderData)
    
    const { data: order, error: orderError } = (await supabaseAdmin
      .from('orders')
      .insert(orderData)
      .select()
      .single()) as { data: Order | null; error: any }

    if (orderError || !order) {
      console.error('Order creation error:', orderError)
      console.error('Order error details:', {
        message: orderError.message,
        details: orderError.details,
        hint: orderError.hint,
        code: orderError.code,
      })
      console.error('Order data attempted:', {
        user_id: user?.id || null,
        status: 'pending',
        total_cents: totalCents,
        currency: 'USD',
        shipping_info: shippingInfo,
        metadata: { items },
      })
      return NextResponse.json(
        { error: `Failed to create order: ${orderError.message || orderError.details || 'Unknown error'}` },
        { status: 500 }
      )
    }
    
    console.log('Order created successfully:', order)

    // Create order items using service role client
    const orderItems: OrderItem[] = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.id,
      unit_price_cents: item.price_cents,
      qty: item.quantity,
      total_cents: item.price_cents * item.quantity,
    }))

    console.log('Creating order items:', orderItems)

    const { error: orderItemsError } = (await supabaseAdmin
      .from('order_items')
      .insert(orderItems)) as { error: any }

    if (orderItemsError) {
      console.error('Order items creation error:', orderItemsError)
      // Clean up the order if items creation fails
      await supabaseAdmin.from('orders').delete().eq('id', order.id)
      return NextResponse.json(
        { error: 'Failed to create order items' },
        { status: 500 }
      )
    }
    
    console.log('Order items created successfully')

    // Create Stripe checkout session
    console.log('Creating Stripe checkout session...')
    
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.title,
              images: item.image ? [item.image] : [],
            },
            unit_amount: item.price_cents,
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
        metadata: {
          order_id: order.id,
        },
        customer_email: shippingInfo.email,
      })

      console.log('Stripe session created successfully:', session.id)
      return NextResponse.json({ url: session.url })
    } catch (stripeError) {
      console.error('Stripe session creation error:', stripeError)
      return NextResponse.json(
        { error: 'Failed to create payment session' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Checkout failed' },
      { status: 500 }
    )
  }
}
