# Database Setup Guide

## The Issue
You're getting "Failed to validate products" because there are no products in your Supabase database yet. The checkout API is trying to validate products that don't exist.

## Solution: Seed Your Database

### Method 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase project dashboard**
2. **Navigate to SQL Editor** (in the left sidebar)
3. **Copy and paste the following SQL** (from `supabase/seed.sql`):

```sql
-- Insert sample products
INSERT INTO public.products (title, slug, description, price_cents, currency, stock, sku, images, active) VALUES
(
  'UI Kit Pro',
  'ui-kit-pro',
  'Professional UI component library with 200+ components, built with React and Tailwind CSS. Includes dark mode, accessibility features, and comprehensive documentation.',
  4999,
  'USD',
  100,
  'UIKIT-001',
  '["https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800"]'::jsonb,
  true
),
(
  'Design System Template',
  'design-system-template',
  'Complete design system template for Figma. Includes typography scales, color palettes, component library, and design tokens ready for development handoff.',
  2999,
  'USD',
  150,
  'DESIGN-001',
  '["https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800"]'::jsonb,
  true
),
(
  'Landing Page Builder',
  'landing-page-builder',
  'Drag-and-drop landing page builder with 50+ pre-built sections. Export clean, production-ready code. No coding required.',
  7999,
  'USD',
  50,
  'BUILDER-001',
  '["https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800"]'::jsonb,
  true
),
(
  'Icon Pack - 500 Icons',
  'icon-pack-500',
  'Carefully crafted icon set with 500 icons in multiple styles. Available in SVG, PNG, and web font formats. Perfect for web and mobile projects.',
  1999,
  'USD',
  200,
  'ICONS-001',
  '["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"]'::jsonb,
  true
);
```

4. **Click "Run"** to execute the SQL
5. **Verify products were created** by going to Table Editor → products

### Method 2: Using Supabase CLI

If you have Supabase CLI installed:

```bash
# Navigate to your project directory
cd "C:\Users\PC HP Elitebook\Desktop\BoragoWeb"

# Run the seed file
supabase db reset --db-url "your_database_url"
```

### Method 3: Manual Product Creation

If you prefer to create products manually:

1. **Go to Supabase Dashboard → Table Editor**
2. **Select the `products` table**
3. **Click "Insert" → "Insert row"**
4. **Fill in the required fields:**
   - `title`: "Test Product"
   - `slug`: "test-product"
   - `description`: "A test product for checkout"
   - `price_cents`: 1000 (represents $10.00)
   - `currency`: "USD"
   - `stock`: 10
   - `sku`: "TEST-001"
   - `images`: `["https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800"]`
   - `active`: true

## Verify Your Setup

### Step 1: Check Products Exist
1. Go to your Supabase Dashboard
2. Navigate to Table Editor → products
3. You should see 4 products listed

### Step 2: Test Your Application
1. **Restart your dev server** (if it's running)
2. **Go to** `http://localhost:3000/shop`
3. **You should see products displayed**
4. **Add a product to cart**
5. **Go to checkout**
6. **Fill out the form and submit**

### Step 3: Check for Errors
- **Browser Console**: No more "Failed to validate products" errors
- **Server Console**: Should show successful order creation
- **Network Tab**: Checkout API should return 200 status

## Troubleshooting

### "No products found" Error
- **Check**: Products table has data
- **Verify**: Products have `active = true`
- **Ensure**: Product IDs match what's in your cart

### "Some products are no longer available" Error
- **Check**: All products have `active = true`
- **Verify**: Products exist in database
- **Clear**: Browser cache/localStorage and try again

### Still Getting 500 Errors
- **Check**: Environment variables are set correctly
- **Verify**: Supabase connection is working
- **Restart**: Development server after making changes

## Quick Test Products

If you want to quickly test with minimal products, use this simplified SQL:

```sql
INSERT INTO public.products (title, slug, description, price_cents, currency, stock, sku, images, active) VALUES
(
  'Test Product',
  'test-product',
  'A simple test product',
  1000,
  'USD',
  10,
  'TEST-001',
  '["https://images.unsplash.com/photo-1618761714954-0b8cd0026356?w=800"]'::jsonb,
  true
);
```

## Next Steps

After seeding your database:

1. ✅ **Products will appear in your shop**
2. ✅ **Cart functionality will work**
3. ✅ **Checkout will process successfully**
4. ✅ **Orders will be created in database**

Then you can proceed with setting up Stripe webhooks for payment processing!

