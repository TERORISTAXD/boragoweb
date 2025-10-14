# 🔐 Stripe Integration Setup Guide

## Step 1: Create Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click **Sign up** and create your account
3. Complete the business verification (can skip for testing)

## Step 2: Get Your API Keys

### For Development (Test Mode):
1. Log into [Stripe Dashboard](https://dashboard.stripe.com)
2. Make sure you're in **Test mode** (toggle in top right)
3. Go to **Developers** → **API keys**
4. Copy these keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`)
   - **Webhook signing secret** (we'll get this in Step 4)

## Step 3: Configure Environment Variables

Create a `.env.local` file in the root of your project:

```bash
# Stripe Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Stripe Webhook Secret (get this after Step 4)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

# Your site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase (you should already have these)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Step 4: Set Up Webhooks (Important!)

Webhooks allow Stripe to notify your app when payments succeed/fail.

### For Local Development:

1. Install Stripe CLI:
   ```bash
   # Windows (using Scoop)
   scoop install stripe
   
   # Or download from: https://github.com/stripe/stripe-cli/releases
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```

4. Copy the webhook signing secret (starts with `whsec_...`) and add it to `.env.local`

### For Production:

1. Go to **Developers** → **Webhooks** in Stripe Dashboard
2. Click **Add endpoint**
3. Enter your production URL: `https://yourdomain.com/api/webhook/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the webhook signing secret and add to your production environment variables

## Step 5: Test the Integration

### Test Cards (Use in Test Mode):

| Card Number         | Description                    |
|---------------------|--------------------------------|
| 4242 4242 4242 4242 | Successful payment             |
| 4000 0025 0000 3155 | Requires authentication (3DS)  |
| 4000 0000 0000 9995 | Declined card                  |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### Testing Flow:

1. Start your development server:
   ```bash
   npm run dev
   ```

2. In another terminal, start Stripe webhook forwarding:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```

3. Go to `http://localhost:3000/shop`
4. Add a product to cart
5. Go to checkout
6. Use test card: `4242 4242 4242 4242`
7. Complete the payment
8. Check your Stripe Dashboard → **Payments** to see the test payment

## Step 6: Switch to Production

When ready to go live:

1. Switch to **Live mode** in Stripe Dashboard
2. Get your **Live API keys** (start with `pk_live_...` and `sk_live_...`)
3. Update your production environment variables
4. Set up production webhooks (see Step 4)
5. Complete Stripe account activation (provide business details)

## 🔍 Verify Your Setup

Check that these files exist and are configured:

- ✅ `/lib/stripe.ts` - Stripe client initialization
- ✅ `/app/api/checkout/route.ts` - Creates checkout session
- ✅ `/app/api/webhook/stripe/route.ts` - Handles webhook events
- ✅ `/app/checkout/page.tsx` - Checkout form
- ✅ `/app/cart/page.tsx` - Shopping cart

## 🆘 Troubleshooting

### "No API key provided"
- Check that `.env.local` exists and has the correct keys
- Restart your dev server after adding environment variables

### "Invalid API Key"
- Make sure you're using the correct mode (test vs live)
- Check for extra spaces in your `.env.local` file

### Webhooks not working
- Ensure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhook/stripe`
- Check webhook secret matches in `.env.local`
- Look at webhook logs in Stripe Dashboard

### Payment succeeds but order not updating
- Check webhook endpoint is receiving events
- Look at your server logs for errors
- Verify database connection is working

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Webhooks Guide](https://stripe.com/docs/webhooks)
- [Next.js + Stripe Guide](https://stripe.com/docs/payments/checkout/how-checkout-works)

## 🎉 You're All Set!

Your e-commerce flow is now:
1. **Shop** → Browse products
2. **Cart** → Review items and total
3. **Checkout** → Enter shipping info
4. **Stripe** → Secure payment processing
5. **Success** → Order confirmation

Happy selling! 🚀
