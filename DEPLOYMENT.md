# Deployment Guide

This guide covers deploying BoragoWeb to production.

## Prerequisites

- Supabase project set up with schema and storage buckets
- Stripe account configured
- GitHub repository
- Vercel account (recommended) or other hosting platform

## Step 1: Supabase Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and keys

### 1.2 Run Database Schema

1. Open Supabase SQL Editor
2. Copy and paste contents of `supabase/schema.sql`
3. Execute the SQL
4. Optionally run `supabase/seed.sql` for sample data

### 1.3 Create Storage Buckets

In Supabase Storage, create these **public** buckets:
- `project-images`
- `product-images`
- `testimonial-photos`
- `blog-images`

### 1.4 Configure Authentication

1. Go to Authentication > Providers
2. Enable Email provider
3. Configure email templates (optional)
4. Set up OAuth providers if needed (Google, GitHub, etc.)

## Step 2: Stripe Setup

### 2.1 Get API Keys

1. Go to [stripe.com/dashboard](https://dashboard.stripe.com)
2. Get your publishable and secret keys
3. Switch to live mode for production

### 2.2 Configure Webhook

1. Go to Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhook/stripe`
3. Select events:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
4. Copy the webhook signing secret

## Step 3: Vercel Deployment

### 3.1 Connect Repository

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Select the BoragoWeb project

### 3.2 Configure Environment Variables

Add these environment variables in Vercel:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 3.3 Deploy

1. Click "Deploy"
2. Wait for build to complete
3. Test your deployment

## Step 4: Post-Deployment

### 4.1 Create Admin User

1. Sign up through your site
2. In Supabase SQL Editor, run:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```

### 4.2 Test Checkout Flow

1. Add a product to cart
2. Complete checkout
3. Verify Stripe webhook is working
4. Check order in Supabase

### 4.3 Configure Domain

1. Add custom domain in Vercel
2. Update DNS records
3. Update `NEXT_PUBLIC_SITE_URL`
4. Update Stripe webhook URL

## Step 5: Monitoring & Maintenance

### 5.1 Set Up Monitoring

- Enable Vercel Analytics
- Set up error tracking (Sentry, etc.)
- Monitor Supabase usage

### 5.2 Regular Tasks

- Review and fulfill orders
- Monitor Stripe dashboard
- Back up database regularly
- Update content (projects, products, blog)

## Troubleshooting

### Build Errors

- Check all environment variables are set
- Verify Node.js version (18+)
- Check build logs for specific errors

### Webhook Issues

- Verify webhook URL is correct
- Check webhook signing secret
- Review Stripe webhook logs
- Test with Stripe CLI locally first

### Database Issues

- Verify RLS policies are correct
- Check service role key is set (server-side only)
- Review Supabase logs

### Authentication Issues

- Verify Supabase URL and keys
- Check email provider is enabled
- Review auth redirect URLs

## Alternative Hosting

### Netlify

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables
5. Deploy

### Self-Hosted with Nginx

**See [NGINX_SETUP.md](./NGINX_SETUP.md) for detailed instructions.**

Quick start:

#### Option 1: Docker (Recommended)
```bash
# Update environment variables
cp .env.example .env
# Edit .env with your values

# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

#### Option 2: Manual Setup
1. Build: `npm run build`
2. Start: `npm start`
3. Use PM2 or systemd for process management
4. Set up reverse proxy (Nginx) - see nginx.conf
5. Configure SSL certificate with Let's Encrypt

## Security Checklist

- [ ] All environment variables set correctly
- [ ] Service role key never exposed to client
- [ ] RLS policies enabled and tested
- [ ] Stripe webhook signature verification working
- [ ] HTTPS enabled
- [ ] Admin routes protected
- [ ] Input validation on all forms
- [ ] Rate limiting configured (if needed)

## Performance Optimization

- Enable Vercel Edge Functions
- Configure CDN for static assets
- Optimize images (already using next/image)
- Enable ISR for static pages
- Monitor Core Web Vitals

## Backup Strategy

1. **Database**: Use Supabase automatic backups
2. **Storage**: Regularly backup storage buckets
3. **Code**: Keep in version control (GitHub)
4. **Environment**: Document all configuration

## Support

For deployment issues:
- Check Vercel logs
- Review Supabase logs
- Check Stripe dashboard
- Consult Next.js documentation

---

**Note**: Always test in a staging environment before deploying to production.
