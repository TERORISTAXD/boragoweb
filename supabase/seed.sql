-- Seed data for BoragoWeb
-- Run this after schema.sql to populate with sample data

-- Insert sample projects
INSERT INTO public.projects (title, slug, summary, body, tags, cover_image, featured) VALUES
(
  'Modern E-commerce Platform',
  'modern-ecommerce-platform',
  'A full-featured e-commerce solution built with Next.js and Stripe',
  '<p>This project showcases a modern approach to building scalable e-commerce platforms. We implemented advanced features including real-time inventory management, personalized recommendations, and seamless checkout experiences.</p><p>The platform handles thousands of transactions daily and provides an intuitive admin dashboard for managing products, orders, and customer data.</p>',
  ARRAY['Next.js', 'E-commerce', 'Stripe', 'TypeScript'],
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=800',
  true
),
(
  'Brand Identity Redesign',
  'brand-identity-redesign',
  'Complete brand overhaul for a leading tech startup',
  '<p>We worked closely with the client to reimagine their brand identity from the ground up. This included logo design, color palette selection, typography, and comprehensive brand guidelines.</p><p>The new identity better reflects their innovative spirit and has been successfully applied across all touchpoints.</p>',
  ARRAY['Branding', 'Design', 'Identity'],
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800',
  true
),
(
  'Mobile App Development',
  'mobile-app-development',
  'Cross-platform mobile app for fitness tracking',
  '<p>A comprehensive fitness tracking application built with React Native. Features include workout logging, progress tracking, social features, and integration with popular wearable devices.</p><p>The app has been downloaded over 100,000 times and maintains a 4.8-star rating.</p>',
  ARRAY['React Native', 'Mobile', 'Fitness', 'API Integration'],
  'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800',
  false
);

-- Delete existing pricing tier products if they exist (to avoid conflicts on re-run)
DELETE FROM public.products WHERE id IN (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000003'
);

-- Insert pricing tier products (with specific UUIDs for frontend reference)
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

-- Insert sample testimonials
INSERT INTO public.testimonials (author, role, quote, visible) VALUES
(
  'Sarah Johnson',
  'CEO, TechStart Inc',
  'Working with Borago was an absolute pleasure. They delivered beyond our expectations and the results speak for themselves. Our conversion rate increased by 150%!',
  true
),
(
  'Michael Chen',
  'Product Manager, InnovateCo',
  'The attention to detail and creative approach that Borago brings to every project is unmatched. They truly understand modern design principles.',
  true
),
(
  'Emily Rodriguez',
  'Founder, CreativeHub',
  'I''ve worked with many agencies, but Borago stands out for their professionalism, creativity, and ability to deliver on time. Highly recommended!',
  true
);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title, slug, excerpt, body, tags, published_at, draft) VALUES
(
  'Getting Started with Next.js 14',
  'getting-started-nextjs-14',
  'Learn how to build modern web applications with the latest version of Next.js and the App Router.',
  '<h2>Introduction</h2><p>Next.js 14 brings exciting new features and improvements that make building web applications faster and more enjoyable than ever.</p><h2>Key Features</h2><ul><li>App Router improvements</li><li>Server Actions</li><li>Improved performance</li></ul><p>In this guide, we''ll walk through the basics of setting up a new Next.js 14 project and explore its key features.</p>',
  ARRAY['Next.js', 'React', 'Web Development'],
  NOW() - INTERVAL '7 days',
  false
),
(
  'Design Systems: A Complete Guide',
  'design-systems-complete-guide',
  'Everything you need to know about creating and maintaining effective design systems for your organization.',
  '<h2>What is a Design System?</h2><p>A design system is a collection of reusable components, guided by clear standards, that can be assembled together to build any number of applications.</p><h2>Benefits</h2><ul><li>Consistency across products</li><li>Faster development</li><li>Better collaboration</li></ul>',
  ARRAY['Design', 'Design Systems', 'UI/UX'],
  NOW() - INTERVAL '14 days',
  false
);

-- Insert site settings
INSERT INTO public.settings (key, value) VALUES
(
  'site_name',
  '"Borago"'::jsonb
),
(
  'site_description',
  '"Creative portfolio and digital products"'::jsonb
),
(
  'hero_title',
  '"Creative Portfolio & Digital Products"'::jsonb
),
(
  'hero_subtitle',
  '"Showcasing exceptional work and offering premium digital products for creators and businesses."'::jsonb
);

-- Note: Remember to create an admin user manually after signup:
-- UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
