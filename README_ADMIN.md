# Admin Panel - Quick Reference

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
Run in Supabase SQL Editor:
```bash
supabase/admin_panel_schema.sql
```

### 3. Create Owner Account
```sql
UPDATE users SET role = 'owner' WHERE email = 'your@email.com';
```

### 4. Access Panel
Navigate to: `http://localhost:3000/admin`

---

## 📁 Admin Routes

| Route | Description | Access |
|-------|-------------|--------|
| `/admin` | Dashboard | Admin, Owner |
| `/admin/orders` | Order management | Admin, Owner |
| `/admin/products` | Product management | Admin, Owner |
| `/admin/content` | Content editor | Admin, Owner |
| `/admin/analytics` | Analytics dashboard | Admin, Owner |
| `/admin/manage` | Admin management | Owner only |

---

## 👥 Roles

### Owner
- Full access to all features
- Can manage admin users
- Cannot be removed by other admins

### Admin
- Can edit content and pricing
- Can view orders and analytics
- Cannot manage other admins

---

## 🔐 Security

- All routes protected with `requireAdmin()`
- Owner-only routes use `requireOwner()`
- RLS policies on all tables
- Activity logging enabled
- Server-side authentication

---

## 📊 Features

✅ Dashboard with revenue stats  
✅ Order management & tracking  
✅ Product & pricing management  
✅ Content editor  
✅ Analytics integration  
✅ Admin user management  
✅ Activity logging  
✅ CSV export  

---

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Styling:** TailwindCSS
- **Analytics:** Google Analytics API
- **Icons:** Lucide React

---

## 📚 Documentation

- **Full Setup Guide:** `ADMIN_PANEL_SETUP.md`
- **Implementation Summary:** `ADMIN_PANEL_SUMMARY.md`
- **Database Schema:** `supabase/admin_panel_schema.sql`

---

## 🔧 Configuration

### Environment Variables

```env
# Required
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Optional (for Analytics)
GOOGLE_ANALYTICS_PROPERTY_ID=your_id
GOOGLE_ANALYTICS_CLIENT_EMAIL=your_email
GOOGLE_ANALYTICS_PRIVATE_KEY=your_key
```

---

## 🐛 Common Issues

### Can't access admin panel
```sql
-- Check role
SELECT role FROM users WHERE email = 'your@email.com';

-- Fix role
UPDATE users SET role = 'owner' WHERE email = 'your@email.com';
```

### Analytics not working
- Analytics is optional
- Panel works without Google Analytics
- Check environment variables if configured

---

## 📞 Support

For detailed documentation, see:
- `ADMIN_PANEL_SETUP.md` - Complete setup guide
- `ADMIN_PANEL_SUMMARY.md` - Feature overview

---

**Version:** 1.0.0  
**Status:** Production Ready ✅
