# Cart UUID Fix Documentation

## Problem

The checkout process was failing with the error:
```
invalid input syntax for type uuid: "tier-enterprise"
```

## Root Cause

1. **Database Schema**: The `products` table uses `UUID` type for the `id` column
2. **Frontend Code**: The `Pricing.tsx` component was using string IDs like `'tier-enterprise'`, `'tier-static'`, etc.
3. **Missing Data**: The pricing tiers weren't seeded in the database

When a user added a pricing tier to their cart, the frontend stored the string ID. When checking out, the API tried to query the database using these string IDs in a UUID column, causing a type mismatch error.

## Solution

### 1. Updated Seed Data (`supabase/seed.sql`)

Added the three pricing tiers to the database with specific UUIDs:

```sql
-- Pricing tier products with fixed UUIDs
INSERT INTO public.products (id, title, slug, description, price_cents, currency, stock, sku, images, active) VALUES
(
  '00000000-0000-0000-0000-000000000001',  -- Consultation
  'Free Consultation',
  'consultation',
  'Individual consultation session...',
  0,
  'EUR',
  999,
  'TIER-CONSULTATION',
  '[]'::jsonb,
  true
),
(
  '00000000-0000-0000-0000-000000000002',  -- Online Store
  'Online Store',
  'online-store',
  'Complete e-commerce solution...',
  65000,
  'EUR',
  999,
  'TIER-ENTERPRISE',
  '[]'::jsonb,
  true
),
(
  '00000000-0000-0000-0000-000000000003',  -- Static Website
  'Static Website',
  'static-website',
  'Professional static website...',
  35000,
  'EUR',
  999,
  'TIER-STATIC',
  '[]'::jsonb,
  true
);
```

### 2. Updated Frontend (`components/Pricing.tsx`)

Changed the tier IDs from strings to the matching UUIDs:

```typescript
const tiers = [
  {
    nameKey: 'tier.consultation',
    id: '00000000-0000-0000-0000-000000000001', // UUID from database
    slug: 'consultation',
    // ...
  },
  {
    nameKey: 'tier.onlineStore',
    id: '00000000-0000-0000-0000-000000000002', // UUID from database
    slug: 'online-store',
    // ...
  },
  {
    nameKey: 'tier.staticWebsite',
    id: '00000000-0000-0000-0000-000000000003', // UUID from database
    slug: 'static-website',
    // ...
  },
]
```

## How to Apply the Fix

### Step 1: Update the Database

Run the updated seed script in your Supabase SQL Editor:

```bash
# Copy the contents of supabase/seed.sql and run in Supabase SQL Editor
```

Or if you're using the Supabase CLI:

```bash
supabase db reset  # This will reset and re-seed the database
```

### Step 2: Clear Existing Carts

Since existing carts may have the old string IDs, users should clear their carts:

**Option A - User Action:**
Users can manually clear their cart and re-add items.

**Option B - Automatic Migration (if needed):**
If you have many users with items in their carts, you could create a migration script to update localStorage:

```typescript
// Run this once in the browser console or add to your app initialization
const cart = localStorage.getItem('cart');
if (cart) {
  const items = JSON.parse(cart);
  const migrated = items.map((item: any) => {
    // Map old string IDs to new UUIDs
    const idMap: Record<string, string> = {
      'tier-consultation': '00000000-0000-0000-0000-000000000001',
      'tier-enterprise': '00000000-0000-0000-0000-000000000002',
      'tier-static': '00000000-0000-0000-0000-000000000003',
    };
    
    if (idMap[item.id]) {
      return { ...item, id: idMap[item.id] };
    }
    return item;
  });
  
  localStorage.setItem('cart', JSON.stringify(migrated));
}
```

### Step 3: Restart Development Server

```bash
npm run dev
```

## Verification

### Test the Fix

1. **Clear your browser's localStorage** (or use incognito mode)
2. Navigate to the pricing page
3. Click "Add to Cart" on any tier
4. Go to the cart page
5. Proceed to checkout
6. Verify no UUID errors occur

### Check Database

Verify the products exist:

```sql
SELECT id, title, slug, price_cents, active 
FROM public.products 
WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003'
);
```

Expected output:
```
id                                   | title             | slug           | price_cents | active
-------------------------------------|-------------------|----------------|-------------|-------
00000000-0000-0000-0000-000000000001 | Free Consultation | consultation   | 0           | true
00000000-0000-0000-0000-000000000002 | Online Store      | online-store   | 65000       | true
00000000-0000-0000-0000-000000000003 | Static Website    | static-website | 35000       | true
```

## Why Use Fixed UUIDs?

Using fixed UUIDs (like `00000000-0000-0000-0000-000000000001`) for these specific products has several advantages:

1. **Consistency**: Same IDs across all environments (dev, staging, production)
2. **Frontend Integration**: Frontend can reference these IDs directly
3. **Seed Idempotency**: Can re-run seed script without conflicts
4. **Testing**: Easier to write tests with predictable IDs

## Alternative Approaches Considered

### ❌ Option 1: Change Database to TEXT
```sql
ALTER TABLE products ALTER COLUMN id TYPE TEXT;
```
**Rejected**: UUIDs are better for security, performance, and prevent enumeration attacks.

### ❌ Option 2: Dynamic Product Fetching
Fetch products by slug on page load and use returned UUIDs.
**Rejected**: Adds unnecessary API calls and complexity for static pricing tiers.

### ✅ Option 3: Fixed UUIDs (Implemented)
Use predetermined UUIDs for pricing tiers that are referenced in frontend code.
**Accepted**: Simple, performant, and maintains database integrity.

## Future Considerations

If you add more pricing tiers:

1. Add them to `supabase/seed.sql` with a new fixed UUID
2. Update `components/Pricing.tsx` with the matching UUID
3. Use the format `00000000-0000-0000-0000-00000000000X` where X is the next number

## Related Files

- `supabase/seed.sql` - Database seed data
- `components/Pricing.tsx` - Pricing tiers frontend
- `app/api/checkout/route.ts` - Checkout API that validates product IDs
- `hooks/useCart.ts` - Cart management hook

## Testing Checklist

- [ ] Database has the three pricing tier products
- [ ] Product IDs are valid UUIDs
- [ ] Frontend uses matching UUIDs
- [ ] Can add items to cart
- [ ] Can view cart
- [ ] Can proceed to checkout without UUID errors
- [ ] Stripe session creates successfully

---

**Status**: ✅ Fixed  
**Date**: 2025-10-09  
**Impact**: Critical - Blocks all checkout functionality
