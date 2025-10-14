# Fix for Existing Products

## Problem

You already have products with slugs `consultation`, `online-store`, and `static-website` in your database, but they have different UUIDs than what the frontend expects.

## Solution Options

### Option A: Use Existing Product IDs (Recommended)

This is the safest approach - update the frontend to use the UUIDs that already exist in your database.

#### Step 1: Get Existing Product IDs

Run this SQL in Supabase SQL Editor:

```sql
SELECT id, title, slug, price_cents 
FROM public.products 
WHERE slug IN ('consultation', 'online-store', 'static-website')
ORDER BY price_cents;
```

#### Step 2: Update Frontend with Actual IDs

Copy the UUIDs from the query result and update `components/Pricing.tsx`:

```typescript
const tiers = [
  {
    nameKey: 'tier.consultation',
    id: 'PASTE_CONSULTATION_UUID_HERE', // From database query
    slug: 'consultation',
    // ...
  },
  {
    nameKey: 'tier.onlineStore',
    id: 'PASTE_ONLINE_STORE_UUID_HERE', // From database query
    slug: 'online-store',
    // ...
  },
  {
    nameKey: 'tier.staticWebsite',
    id: 'PASTE_STATIC_WEBSITE_UUID_HERE', // From database query
    slug: 'static-website',
    // ...
  },
]
```

#### Step 3: Update Migration Map

Update `hooks/useCart.ts` migration map with the actual UUIDs:

```typescript
const ID_MIGRATION_MAP: Record<string, string> = {
  'tier-consultation': 'PASTE_CONSULTATION_UUID_HERE',
  'tier-enterprise': 'PASTE_ONLINE_STORE_UUID_HERE',
  'tier-static': 'PASTE_STATIC_WEBSITE_UUID_HERE',
}
```

---

### Option B: Replace Existing Products

If you want to use the fixed UUIDs (`00000000-0000-0000-0000-00000000000X`), you need to delete the existing products first.

⚠️ **Warning:** This will delete any existing orders that reference these products!

```sql
-- Delete existing products (this will fail if orders reference them)
DELETE FROM public.products 
WHERE slug IN ('consultation', 'online-store', 'static-website');

-- Now insert with fixed UUIDs
INSERT INTO public.products (id, title, slug, description, price_cents, currency, stock, sku, images, active) VALUES
('00000000-0000-0000-0000-000000000001', 'Free Consultation', 'consultation', 'Individual consultation session to discuss your business strategies, sales tips, and get professional business advice.', 0, 'EUR', 999, 'TIER-CONSULTATION', '[]'::jsonb, true),
('00000000-0000-0000-0000-000000000002', 'Online Store', 'online-store', 'Complete e-commerce solution with unlimited products, subscribers, advanced analytics, dedicated support, marketing automations, and custom integrations.', 65000, 'EUR', 999, 'TIER-ENTERPRISE', '[]'::jsonb, true),
('00000000-0000-0000-0000-000000000003', 'Static Website', 'static-website', 'Professional static website with unique design, short deadlines, optimized speed, basic SEO, and 24/7 support.', 35000, 'EUR', 999, 'TIER-STATIC', '[]'::jsonb, true);
```

---

### Option C: Fetch Products Dynamically (Most Flexible)

Instead of hardcoding UUIDs, fetch products by slug on page load.

This requires more changes but is the most maintainable approach.

---

## Quick Fix Script (Option A - Automated)

I'll create a script that automatically gets the IDs and updates your frontend files.

Run this in your terminal:

```bash
# This will be created next
node scripts/sync-product-ids.js
```

---

## Recommended: Option A

Use **Option A** because:
- ✅ No data loss
- ✅ Works with existing orders
- ✅ Quick to implement
- ✅ Safe

Just need to:
1. Query the database for actual UUIDs
2. Update 2 files with those UUIDs
3. Done!

---

## Next Steps

1. Run the SQL query to get your product IDs
2. Share the results with me, and I'll update the files for you
3. Or manually update `components/Pricing.tsx` and `hooks/useCart.ts`

Would you like me to create an automated script to sync the IDs?
