# 🔧 Fix "Failed to create order" Error

## Problem
The order creation is failing because of Row Level Security (RLS) policies in Supabase that were blocking guest checkout.

## Solution
I've updated the schema to allow guest users to create orders. Now you need to apply these changes to your Supabase database.

## Steps to Fix:

### Option 1: Apply via Supabase Dashboard (Recommended)

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy and paste this SQL:

```sql
-- Drop old policies
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can create order items" ON public.order_items;

-- Create new policies that allow guest checkout
CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can create order items" ON public.order_items
  FOR INSERT WITH CHECK (true);
```

6. Click **Run** (or press Ctrl+Enter)
7. You should see "Success. No rows returned"

### Option 2: Reset Entire Database (If you haven't added important data)

1. Go to **Database** → **Tables** in Supabase Dashboard
2. Delete all tables (if you're okay losing test data)
3. Go to **SQL Editor**
4. Run the entire `schema.sql` file from your project:
   - Copy contents of `supabase/schema.sql`
   - Paste into SQL Editor
   - Click **Run**
5. Then run `seed.sql` for sample data (optional):
   - Copy contents of `supabase/seed.sql`
   - Paste into SQL Editor
   - Click **Run**

## Verify the Fix

After applying the changes, test your checkout:

1. Go to `http://localhost:3000/shop`
2. Add a product to cart
3. Go to checkout
4. Fill in the form
5. Click "Complete Order"
6. You should now be redirected to Stripe (no more "Failed to create order" error)

## What Changed?

**Before:**
```sql
CREATE POLICY "Authenticated users can create orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
```
This required users to be logged in to create orders.

**After:**
```sql
CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);
```
This allows anyone (including guests) to create orders.

## Security Note

This is safe because:
- Orders are still validated server-side
- Stripe handles payment security
- Users can only view their own orders (separate policy)
- Only admins can update/delete orders
- Guest orders are tracked by email in shipping_info

## Still Having Issues?

### Check if tables exist:
1. Go to Supabase Dashboard → **Database** → **Tables**
2. Verify these tables exist:
   - `orders`
   - `order_items`
   - `products`

### Check server logs:
Look at your terminal where `npm run dev` is running for detailed error messages.

### Verify environment variables:
Make sure `.env.local` has:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### Test database connection:
Go to `http://localhost:3000/shop` - if products load, database connection works.

## Need More Help?

Check the error in your browser console (F12) and server terminal for specific error messages.
