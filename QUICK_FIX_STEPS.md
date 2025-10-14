# Quick Fix Steps - Add Pricing Tiers to Database

## Problem
```
Products found in database for cart IDs: []
No products found in database for IDs: [ '00000000-0000-0000-0000-000000000002' ]
```

The pricing tier products don't exist in your database yet.

## Solution - 2 Minutes

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**

### Step 2: Run the SQL Script

Copy and paste the contents of `supabase/add_pricing_tiers.sql` into the SQL Editor:

```sql
-- Delete existing pricing tier products if they exist
DELETE FROM public.products WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003'
);

-- Insert pricing tier products with fixed UUIDs
INSERT INTO public.products (id, title, slug, description, price_cents, currency, stock, sku, images, active) VALUES
(
  '00000000-0000-0000-0000-000000000001',
  'Free Consultation',
  'consultation',
  'Individual consultation session to discuss your business strategies, sales tips, and get professional business advice.',
  0,
  'EUR',
  999,
  'TIER-CONSULTATION',
  '[]'::jsonb,
  true
),
(
  '00000000-0000-0000-0000-000000000002',
  'Online Store',
  'online-store',
  'Complete e-commerce solution with unlimited products, subscribers, advanced analytics, dedicated support, marketing automations, and custom integrations.',
  65000,
  'EUR',
  999,
  'TIER-ENTERPRISE',
  '[]'::jsonb,
  true
),
(
  '00000000-0000-0000-0000-000000000003',
  'Static Website',
  'static-website',
  'Professional static website with unique design, short deadlines, optimized speed, basic SEO, and 24/7 support.',
  35000,
  'EUR',
  999,
  'TIER-STATIC',
  '[]'::jsonb,
  true
);

-- Verify the products were added
SELECT id, title, slug, price_cents, currency, active 
FROM public.products 
WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003'
)
ORDER BY price_cents;
```

### Step 3: Click "Run" or Press F5

You should see a success message and the verification query should return 3 rows:

| id | title | slug | price_cents | currency | active |
|----|-------|------|-------------|----------|--------|
| 00000000-0000-0000-0000-000000000001 | Free Consultation | consultation | 0 | EUR | true |
| 00000000-0000-0000-0000-000000000003 | Static Website | static-website | 35000 | EUR | true |
| 00000000-0000-0000-0000-000000000002 | Online Store | online-store | 65000 | EUR | true |

### Step 4: Test the Checkout

1. Clear your cart (if needed): Go to cart page and remove items
2. Go to the pricing page
3. Click "Add to Cart" on any tier
4. Go to cart and proceed to checkout
5. ✅ Should work without UUID errors!

## Alternative: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Navigate to your project
cd "c:\Users\PC HP Elitebook\Desktop\BoragoWeb"

# Run the SQL file
supabase db execute --file supabase/add_pricing_tiers.sql
```

## Verification

After running the script, verify in your browser console that the checkout works:

1. Open browser DevTools (F12)
2. Go to Console tab
3. Add a tier to cart
4. Proceed to checkout
5. You should see:
   ```
   Products found in database for cart IDs: [{ id: '00000000-0000-0000-0000-000000000002', title: 'Online Store', ... }]
   ```

## Troubleshooting

### If you still see "No products found":

1. **Check if products table exists:**
   ```sql
   SELECT * FROM public.products LIMIT 5;
   ```

2. **Check RLS policies:**
   ```sql
   -- Temporarily disable RLS for testing (re-enable after!)
   ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;
   ```

3. **Verify your Supabase connection:**
   - Check `.env.local` has correct `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### If you get permission errors:

Make sure you're using the service role client in the API route (already implemented in `app/api/checkout/route.ts`):

```typescript
const supabaseAdmin = await createSupabaseServiceClient()
```

## Done! 🎉

Your checkout should now work. The products are in the database with the correct UUIDs that match the frontend code.

---

**Time to fix:** ~2 minutes  
**Difficulty:** Easy  
**Status:** Ready to apply
