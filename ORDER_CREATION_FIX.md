# ✅ Order Creation Error Fixed

## Problem Identified
The order creation was failing with an empty error message because the checkout API was using the **anon key** (with RLS policies) instead of the **service role key** (which bypasses RLS).

When creating orders for guest users (`user_id: null`), the RLS policies were blocking the insert even though they should allow it.

## Solution Applied

### 1. Created Service Role Client
Added `createSupabaseServiceClient()` function in `lib/supabase/server.ts` that uses the service role key to bypass RLS policies.

### 2. Updated Checkout API
Modified `app/api/checkout/route.ts` to:
- Use regular client for authentication (respects user session)
- Use service role client for order creation (bypasses RLS)

## Required: Environment Variable

You **MUST** add the service role key to your environment variables:

### Create `.env.local` file:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Where to Find Your Service Role Key:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** → **API**
4. Under **Project API keys**, find **service_role** key
5. Click **Reveal** and copy it
6. ⚠️ **IMPORTANT**: Never commit this key to Git! It bypasses all security.

## After Adding the Key

1. **Restart your development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   npm run dev
   ```

2. **Test the checkout:**
   - Go to `http://localhost:3000/shop`
   - Add products to cart
   - Go to checkout
   - Fill in shipping info
   - Click "Complete Order"
   - Should now redirect to Stripe successfully! ✅

## What Changed in the Code

### Before:
```typescript
const supabase = await createSupabaseServerComponentClient()
const { data: order, error: orderError } = await supabase
  .from('orders')
  .insert({ ... })
```
This used the anon key with RLS policies, which blocked guest checkouts.

### After:
```typescript
const supabase = await createSupabaseServerComponentClient()
const { data: { user } } = await supabase.auth.getUser()

const supabaseAdmin = await createSupabaseServiceClient()
const { data: order, error: orderError } = await supabaseAdmin
  .from('orders')
  .insert({ ... })
```
Now uses service role client for order creation, bypassing RLS.

## Security Notes

✅ **This is secure because:**
- Service role key is only used server-side (API routes)
- Never exposed to the client
- Only used for order creation (legitimate use case)
- Users still can't access other users' orders (separate RLS policies)
- Payment validation happens through Stripe

⚠️ **Security Best Practices:**
- Never commit `.env.local` to Git (already in `.gitignore`)
- Never expose service role key in client-side code
- Only use service role for operations that need to bypass RLS
- Keep the key secure in production (use environment variables)

## Troubleshooting

### Error: "Missing environment variable"
- Make sure `.env.local` exists in the project root
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set
- Restart the dev server after adding the key

### Still getting "Failed to create order"
1. Check server logs for detailed error
2. Verify Supabase URL and keys are correct
3. Ensure `orders` and `order_items` tables exist in Supabase
4. Check that products exist in the database

### Orders created but Stripe redirect fails
- Verify `STRIPE_SECRET_KEY` is set
- Check that Stripe keys are from the same account (test/live)
- Ensure `NEXT_PUBLIC_SITE_URL` matches your current URL

## Next Steps

After fixing this, you should:
1. ✅ Test guest checkout (without logging in)
2. ✅ Test authenticated checkout (after logging in)
3. ✅ Verify orders appear in Supabase dashboard
4. ✅ Test Stripe payment flow
5. ✅ Set up webhook for payment confirmation (see `STRIPE_SETUP.md`)

## Need Help?

If you're still having issues:
1. Check the terminal where `npm run dev` is running
2. Check browser console (F12) for client-side errors
3. Verify all environment variables are set correctly
4. Make sure Supabase tables exist and have correct schema
