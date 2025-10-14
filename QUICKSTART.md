# Quick Start Guide

Get BoragoWeb up and running in 10 minutes.

## 1. Install Dependencies

```bash
npm install
```

## 2. Set Up Supabase

### Create Project
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be ready (~2 minutes)

### Run Schema
1. Open Supabase SQL Editor
2. Copy contents of `supabase/schema.sql`
3. Paste and execute
4. (Optional) Run `supabase/seed.sql` for sample data

### Create Storage Buckets
In Supabase Storage, create these **public** buckets:
- `project-images`
- `product-images`
- `testimonial-photos`
- `blog-images`

## 3. Configure Environment

```bash
# Copy example env file
cp .env.example .env.local
```

Edit `.env.local` with your credentials:

```env
# From Supabase Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...

# From Stripe Dashboard > Developers > API Keys (use test mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# For local development
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 4. Set Up Stripe Webhook (Local Testing)

In a new terminal:

```bash
# Install Stripe CLI if you haven't
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhook/stripe
```

Copy the webhook signing secret and add to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 6. Create Admin User

1. Click "Sign In" → "Sign up"
2. Create an account with your email
3. In Supabase SQL Editor, run:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

4. Refresh the page - you should now see "Admin" in the navigation

## 7. Add Content

### Add a Project
1. Go to `/admin`
2. Click "New Project"
3. Fill in details and upload an image
4. Save

### Add a Product
1. Go to `/admin`
2. Click "New Product"
3. Set price in cents (e.g., 2999 = $29.99)
4. Upload product image
5. Save

## 8. Test Checkout

1. Go to `/shop`
2. Click a product
3. Add to cart
4. Proceed to checkout
5. Use Stripe test card: `4242 4242 4242 4242`
6. Any future date, any CVC
7. Complete purchase

## Common Issues

### "Module not found" errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase connection errors
- Check your URL and keys in `.env.local`
- Ensure keys are from the same project
- Restart dev server after changing env vars

### Stripe webhook not working
- Make sure Stripe CLI is running
- Check webhook secret is correct
- Verify endpoint URL is correct

### Images not loading
- Check storage buckets are created
- Ensure buckets are set to **public**
- Verify image URLs in database

### Can't access admin
- Verify user role is set to 'admin' in database
- Clear browser cache and cookies
- Check middleware is not blocking

## Next Steps

- Customize colors in `tailwind.config.ts`
- Update site metadata in `app/layout.tsx`
- Add your own content
- Deploy to Vercel (see `DEPLOYMENT.md`)

## Need Help?

- Check `README.md` for detailed documentation
- Review `DEPLOYMENT.md` for production setup
- Open an issue on GitHub

---

**Tip**: Use the seed data (`supabase/seed.sql`) to quickly populate your site with sample content for testing!
