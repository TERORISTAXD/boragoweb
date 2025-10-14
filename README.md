# BoragoWeb

A modern, creative portfolio and e-commerce platform built with Next.js, Supabase, and Stripe.

## 🚀 Features

- **Portfolio Showcase**: Beautiful project gallery with filtering and detailed case studies
- **E-commerce**: Full-featured shop with cart, checkout, and Stripe payments
- **Admin Dashboard**: Content management for projects, products, and blog posts
- **Authentication**: Secure user authentication with Supabase Auth
- **Blog**: CMS-powered blog for content marketing
- **Responsive Design**: Mobile-first, accessible design with dark theme
- **Performance**: Optimized with Next.js App Router, SSR/ISR, and image optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase (PostgreSQL + Auth + Storage)
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **State Management**: Zustand
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- Supabase account and project
- Stripe account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   cd BoragoWeb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

   Required environment variables:
   ```env
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # Stripe
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Site
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up Supabase database**
   
   Run the SQL schema in your Supabase SQL Editor:
   ```bash
   # Copy contents of supabase/schema.sql and run in Supabase SQL Editor
   ```

5. **Create Supabase Storage buckets**
   
   In Supabase Storage, create these public buckets:
   - `project-images`
   - `product-images`
   - `testimonial-photos`
   - `blog-images`

6. **Set up Stripe webhook**
   
   For local development:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
   
   For production, add webhook endpoint in Stripe Dashboard:
   ```
   https://yourdomain.com/api/webhook/stripe
   ```
   
   Events to listen for:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run Jest tests
- `npm run test:e2e` - Run Cypress E2E tests

## 🗂️ Project Structure

```
BoragoWeb/
├── app/                      # Next.js App Router pages
│   ├── (public)/            # Public routes
│   ├── admin/               # Admin dashboard (protected)
│   ├── api/                 # API routes
│   ├── auth/                # Authentication pages
│   ├── portfolio/           # Portfolio pages
│   ├── shop/                # Shop pages
│   ├── cart/                # Cart page
│   ├── checkout/            # Checkout flow
│   ├── blog/                # Blog pages
│   ├── about/               # About page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Homepage
├── components/              # React components
│   ├── Nav.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── ProjectCard.tsx
│   └── ProductCard.tsx
├── lib/                     # Utility libraries
│   ├── supabase/           # Supabase clients
│   ├── stripe.ts           # Stripe configuration
│   └── utils.ts            # Helper functions
├── hooks/                   # Custom React hooks
│   ├── useCart.ts
│   └── useUser.ts
├── types/                   # TypeScript types
│   └── database.ts         # Supabase database types
├── styles/                  # Global styles
│   └── globals.css
├── supabase/               # Supabase configuration
│   └── schema.sql          # Database schema
└── public/                 # Static assets
```

## 🎨 Design System

### Colors
- **Background**: `#0B0B0B` (very dark gray)
- **Accent**: `#FF7A18` (orange)
- **Text**: `#E6E6E6` (light gray)

### Typography
- **Headings**: Poppins (bold, 600-800 weight)
- **Body**: Inter (regular, 400-500 weight)

## 🔐 Admin Access

To create an admin user:

1. Sign up through the UI
2. In Supabase SQL Editor, run:
   ```sql
   UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
   ```

Admin routes are protected and only accessible to users with `role = 'admin'`.

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

Make sure to set all environment variables in your hosting platform, including:
- Supabase credentials
- Stripe keys
- `NEXT_PUBLIC_SITE_URL` (your production URL)

## 📊 Database Schema

See `supabase/schema.sql` for complete schema including:
- Users (with roles)
- Projects
- Products
- Orders & Order Items
- Testimonials
- Blog Posts
- Settings

## 🧪 Testing

Run unit tests:
```bash
npm test
```

Run E2E tests:
```bash
npm run test:e2e
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions, please open an issue on GitHub or contact hello@borago.com.

---

Built with ❤️ by the Borago team
