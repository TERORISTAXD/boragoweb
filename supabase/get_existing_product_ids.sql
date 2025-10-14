-- Get the actual UUIDs of existing pricing tier products
-- Copy these UUIDs and update your frontend code

SELECT 
  id,
  title,
  slug,
  price_cents,
  currency,
  active,
  CASE 
    WHEN slug = 'consultation' THEN 'Use this ID in Pricing.tsx for tier.consultation'
    WHEN slug = 'online-store' THEN 'Use this ID in Pricing.tsx for tier.onlineStore'
    WHEN slug = 'static-website' THEN 'Use this ID in Pricing.tsx for tier.staticWebsite'
  END as note
FROM public.products 
WHERE slug IN ('consultation', 'online-store', 'static-website')
ORDER BY price_cents;
