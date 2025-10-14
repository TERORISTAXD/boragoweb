# Admin Panel Setup Guide

## Overview

A comprehensive admin panel for BoragoWeb with role-based access control, content management, order tracking, and analytics integration.

## Features

### ✅ Implemented

1. **Role-Based Authentication**
   - Owner: Full access to all features including admin management
   - Admin: Limited access - can manage content, products, orders, but not other admins

2. **Dashboard**
   - Revenue and order statistics
   - Recent orders overview
   - Quick action links
   - Real-time metrics

3. **Order Management**
   - View all orders with filtering
   - Export to CSV
   - Order status tracking
   - Customer information

4. **Content Management**
   - Edit page texts dynamically
   - Organized by page and section
   - Support for text, HTML, and Markdown

5. **Admin Management (Owner Only)**
   - Add/remove admin users
   - View all admin accounts
   - Role assignment

6. **Analytics Dashboard**
   - Page views and sessions
   - User statistics
   - Top pages
   - Traffic sources
   - Google Analytics integration ready

7. **Activity Logging**
   - Track all admin actions
   - Audit trail for changes

## Setup Instructions

### Step 1: Database Setup

Run the admin panel schema in your Supabase SQL Editor:

```bash
# File: supabase/admin_panel_schema.sql
```

This creates:
- `page_content` table for editable content
- `analytics_cache` table for caching GA data
- `admin_activity_log` table for audit trail
- Updated `users` table with 'owner' role support
- RLS policies for security
- Helper functions

### Step 2: Create Your First Owner Account

After signing up a user, promote them to owner:

```sql
-- Replace with your email
UPDATE users SET role = 'owner' WHERE email = 'your@email.com';
```

### Step 3: Environment Variables

Add to your `.env.local`:

```env
# Existing Supabase vars
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Analytics (Optional)
GOOGLE_ANALYTICS_PROPERTY_ID=your_property_id
GOOGLE_ANALYTICS_CLIENT_EMAIL=your_service_account_email
GOOGLE_ANALYTICS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### Step 4: Install Dependencies

```bash
npm install @google-analytics/data
```

### Step 5: Access Admin Panel

Navigate to: `http://localhost:3000/admin`

You'll be redirected to sign in if not authenticated.

## File Structure

```
app/
├── admin/
│   ├── layout.tsx           # Admin layout with navigation
│   ├── page.tsx             # Dashboard
│   ├── orders/
│   │   └── page.tsx         # Orders management
│   ├── content/
│   │   └── page.tsx         # Content editor
│   ├── analytics/
│   │   └── page.tsx         # Analytics dashboard
│   └── manage/
│       └── page.tsx         # Admin management (Owner only)
│
lib/
├── admin/
│   ├── auth.ts              # Authentication utilities
│   └── analytics.ts         # Google Analytics integration
│
components/
└── admin/
    ├── AdminNav.tsx         # Navigation sidebar
    └── StatCard.tsx         # Stat display component
```

## Role Permissions

### Owner
- ✅ Full access to all features
- ✅ Manage admin users
- ✅ Edit all content
- ✅ View all orders and analytics
- ✅ Manage products and pricing
- ✅ Access activity logs

### Admin
- ✅ Edit content and pricing
- ✅ View orders and analytics
- ✅ Manage products
- ❌ Cannot manage other admins
- ❌ Cannot access admin management page

### Customer/Editor
- ❌ No admin panel access

## Security Features

1. **Row Level Security (RLS)**
   - All tables protected with RLS policies
   - Role-based data access

2. **Server-Side Authentication**
   - All admin routes protected
   - Automatic redirect for unauthorized users

3. **Activity Logging**
   - All admin actions logged
   - Audit trail for compliance

4. **Environment Variables**
   - Sensitive keys stored securely
   - Never exposed to client

## Google Analytics Setup

### 1. Create Service Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Analytics Data API
4. Create a Service Account
5. Download JSON key file

### 2. Grant Analytics Access

1. Go to Google Analytics Admin
2. Add service account email as a user
3. Grant "Viewer" permissions

### 3. Configure Environment

```env
GOOGLE_ANALYTICS_PROPERTY_ID=123456789
GOOGLE_ANALYTICS_CLIENT_EMAIL=service-account@project.iam.gserviceaccount.com
GOOGLE_ANALYTICS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

### 4. Test Connection

Analytics data will appear in `/admin/analytics` once configured.

## Content Management

### Adding New Content

```sql
INSERT INTO page_content (page, section, content_key, content_value, content_type)
VALUES ('home', 'hero', 'title', 'Welcome to Borago', 'text');
```

### Content Types

- `text`: Plain text
- `html`: HTML content
- `markdown`: Markdown formatted
- `json`: JSON data

## Order Management

### Features

- View all orders
- Filter by status, date, amount
- Export to CSV
- View customer details
- Track payment status

### Order Statuses

- `pending`: Awaiting payment
- `paid`: Payment received
- `fulfilled`: Order completed
- `cancelled`: Order cancelled

## Customization

### Adding New Admin Pages

1. Create page in `app/admin/your-page/page.tsx`
2. Add to navigation in `components/admin/AdminNav.tsx`
3. Protect with `requireAdmin()` or `requireOwner()`

Example:

```typescript
import { requireAdmin } from '@/lib/admin/auth'

export default async function YourPage() {
  await requireAdmin()
  
  return (
    <div>Your content</div>
  )
}
```

### Adding New Roles

1. Update database constraint:
```sql
ALTER TABLE users DROP CONSTRAINT users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check 
  CHECK (role IN ('owner', 'admin', 'editor', 'customer', 'your_new_role'));
```

2. Update TypeScript type in `lib/admin/auth.ts`:
```typescript
export type UserRole = 'owner' | 'admin' | 'editor' | 'customer' | 'your_new_role'
```

## Troubleshooting

### Can't Access Admin Panel

1. Check if user has admin/owner role:
```sql
SELECT email, role FROM users WHERE email = 'your@email.com';
```

2. Update role if needed:
```sql
UPDATE users SET role = 'admin' WHERE email = 'your@email.com';
```

### Analytics Not Showing

1. Verify environment variables are set
2. Check service account has Analytics access
3. Ensure property ID is correct
4. Check browser console for errors

### Content Not Saving

1. Check RLS policies are enabled
2. Verify user has admin role
3. Check browser console for errors
4. Ensure `page_content` table exists

## API Routes

### Admin API Endpoints

You can create API routes for admin operations:

```typescript
// app/api/admin/content/route.ts
import { requireAdmin } from '@/lib/admin/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  await requireAdmin()
  
  // Your admin logic here
  
  return NextResponse.json({ success: true })
}
```

## Best Practices

1. **Always use server-side auth checks**
   - Never rely on client-side role checks
   - Use `requireAdmin()` or `requireOwner()`

2. **Log important actions**
   - Use `logAdminActivity()` for audit trail
   - Track content changes, user management

3. **Cache analytics data**
   - Reduce API calls to Google Analytics
   - Use `analytics_cache` table

4. **Validate input**
   - Sanitize user input
   - Validate data before saving

5. **Test RLS policies**
   - Ensure customers can't access admin data
   - Test with different user roles

## Next Steps

1. ✅ Set up database schema
2. ✅ Create owner account
3. ✅ Access admin panel
4. ⏳ Configure Google Analytics (optional)
5. ⏳ Customize content
6. ⏳ Add admin users
7. ⏳ Test all features

## Support

For issues or questions:
- Check the troubleshooting section
- Review Supabase logs
- Check browser console for errors
- Verify environment variables

---

**Admin Panel Version:** 1.0.0  
**Last Updated:** 2025-10-09  
**Status:** Production Ready ✅
