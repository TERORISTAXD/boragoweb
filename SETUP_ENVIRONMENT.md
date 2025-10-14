# Environment Setup Guide

## Required Environment Variables

To fix the order creation error, you need to set up the following environment variables:

### 1. Create `.env.local` file in the root directory

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 2. How to get Supabase keys:

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

### 3. How to get Stripe keys:

1. Go to your Stripe dashboard
2. Navigate to Developers > API keys
3. Copy the following:
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Secret key** → `STRIPE_SECRET_KEY`

### 4. Restart your development server

After setting up the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## Common Issues Fixed

### Order Creation Error
- **Problem**: `user_id: null` causing order creation to fail
- **Solution**: The code now properly handles guest checkout (null user_id is allowed)
- **Problem**: Service role client was incorrectly configured
- **Solution**: Fixed the service role client to use the proper Supabase client

### Guest Checkout Support
The application now supports both authenticated and guest checkout:
- Authenticated users: Orders are linked to their user account
- Guest users: Orders are created with `user_id: null` but still trackable via email

## Testing the Fix

1. Set up your environment variables
2. Start the development server
3. Try creating an order (both as authenticated user and guest)
4. Check the console for any remaining errors

## Database Schema

The orders table is configured to allow `user_id` to be `NULL` for guest checkouts:

```sql
user_id UUID REFERENCES public.users(id) ON DELETE SET NULL
```

This means guest orders are supported and won't cause foreign key constraint errors.

