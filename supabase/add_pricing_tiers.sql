-- Quick fix: Add pricing tier products to database
-- Run this in your Supabase SQL Editor

-- Delete existing pricing tier products if they exist (to avoid conflicts)
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
