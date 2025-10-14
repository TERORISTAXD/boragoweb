-- Update existing pricing tier products to use fixed UUIDs
-- This handles the case where products already exist with different IDs

-- Step 1: Find existing products by slug
DO $$
DECLARE
  consultation_id UUID;
  online_store_id UUID;
  static_website_id UUID;
BEGIN
  -- Get existing product IDs
  SELECT id INTO consultation_id FROM public.products WHERE slug = 'consultation';
  SELECT id INTO online_store_id FROM public.products WHERE slug = 'online-store';
  SELECT id INTO static_website_id FROM public.products WHERE slug = 'static-website';

  -- Display what we found
  RAISE NOTICE 'Found existing products:';
  RAISE NOTICE 'Consultation ID: %', consultation_id;
  RAISE NOTICE 'Online Store ID: %', online_store_id;
  RAISE NOTICE 'Static Website ID: %', static_website_id;
END $$;

-- Step 2: Delete products with our target UUIDs if they exist
DELETE FROM public.products WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003'
);

-- Step 3: Update existing products to use our fixed UUIDs
-- Update consultation tier
UPDATE public.products 
SET 
  id = '00000000-0000-0000-0000-000000000001',
  title = 'Free Consultation',
  description = 'Individual consultation session to discuss your business strategies, sales tips, and get professional business advice.',
  price_cents = 0,
  currency = 'EUR',
  stock = 999,
  sku = 'TIER-CONSULTATION',
  active = true
WHERE slug = 'consultation';

-- Update online store tier
UPDATE public.products 
SET 
  id = '00000000-0000-0000-0000-000000000002',
  title = 'Online Store',
  description = 'Complete e-commerce solution with unlimited products, subscribers, advanced analytics, dedicated support, marketing automations, and custom integrations.',
  price_cents = 65000,
  currency = 'EUR',
  stock = 999,
  sku = 'TIER-ENTERPRISE',
  active = true
WHERE slug = 'online-store';

-- Update static website tier
UPDATE public.products 
SET 
  id = '00000000-0000-0000-0000-000000000003',
  title = 'Static Website',
  description = 'Professional static website with unique design, short deadlines, optimized speed, basic SEO, and 24/7 support.',
  price_cents = 35000,
  currency = 'EUR',
  stock = 999,
  sku = 'TIER-STATIC',
  active = true
WHERE slug = 'static-website';

-- Step 4: Insert any missing products
INSERT INTO public.products (id, title, slug, description, price_cents, currency, stock, sku, images, active)
SELECT '00000000-0000-0000-0000-000000000001', 'Free Consultation', 'consultation', 
       'Individual consultation session to discuss your business strategies, sales tips, and get professional business advice.',
       0, 'EUR', 999, 'TIER-CONSULTATION', '[]'::jsonb, true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'consultation');

INSERT INTO public.products (id, title, slug, description, price_cents, currency, stock, sku, images, active)
SELECT '00000000-0000-0000-0000-000000000002', 'Online Store', 'online-store',
       'Complete e-commerce solution with unlimited products, subscribers, advanced analytics, dedicated support, marketing automations, and custom integrations.',
       65000, 'EUR', 999, 'TIER-ENTERPRISE', '[]'::jsonb, true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'online-store');

INSERT INTO public.products (id, title, slug, description, price_cents, currency, stock, sku, images, active)
SELECT '00000000-0000-0000-0000-000000000003', 'Static Website', 'static-website',
       'Professional static website with unique design, short deadlines, optimized speed, basic SEO, and 24/7 support.',
       35000, 'EUR', 999, 'TIER-STATIC', '[]'::jsonb, true
WHERE NOT EXISTS (SELECT 1 FROM public.products WHERE slug = 'static-website');

-- Step 5: Verify the products now have correct UUIDs
SELECT id, title, slug, price_cents, currency, active 
FROM public.products 
WHERE slug IN ('consultation', 'online-store', 'static-website')
ORDER BY price_cents;
