# Language Selector Feature

## Overview
A React-based language selector component that replaces the sign-in button in the navigation bar. It allows users to switch between Bulgarian (default) and English languages with smooth transitions and persistent storage.

## Components Created

### 1. **LanguageSelector.tsx** (`/components/LanguageSelector.tsx`)
- Self-contained dropdown component
- Displays current language with flag icon
- Smooth dropdown animation
- Click-outside-to-close functionality
- Responsive design (hides language code on small screens)

### 2. **LanguageContext.tsx** (`/contexts/LanguageContext.tsx`)
- React Context for global language state management
- Translation function `t(key)` for easy text lookup
- LocalStorage persistence for user preference
- Comprehensive translation dictionary (Bulgarian ↔ English)

## Features

✅ **Default Language**: Bulgarian (bg)  
✅ **Available Languages**: Bulgarian, English  
✅ **Flag Icons**: Uses `/public/flags/bg.svg` and `/public/flags/en.svg`  
✅ **Smooth Transitions**: 200ms slide-down animation  
✅ **Persistent Storage**: Saves user preference to localStorage  
✅ **Responsive Design**: Adapts to mobile and desktop views  
✅ **Accessibility**: Proper ARIA labels and keyboard navigation  
✅ **Click Outside**: Closes dropdown when clicking elsewhere  

## Integration Points

### Modified Files:
1. **`/components/Nav.tsx`**
   - Replaced sign-in button with LanguageSelector
   - Added translation support for navigation links
   - Integrated useLanguage hook
   - Removed non-authenticated sign-in link

2. **`/components/Pricing.tsx`**
   - Converted to client component ('use client')
   - All text now uses translation keys
   - Dynamic tier names, descriptions, and features

3. **`/components/Hero.tsx`**
   - Converted to use translation keys
   - Dynamic hero text with language switching
   - All benefits section translated
   - WIO section fully translated

4. **`/components/HomePageClient.tsx`** (NEW)
   - Client component wrapper for home page sections
   - Translates featured work, products, and CTA sections
   - Maintains server-side data fetching

5. **`/app/page.tsx`**
   - Simplified to use HomePageClient component
   - Keeps server-side data fetching
   - Delegates UI rendering to client component

6. **`/app/layout.tsx`**
   - Wrapped app with LanguageProvider
   - Enables global language context

7. **`/app/globals.css`**
   - Added slideDown animation keyframes
   - Added `.animate-slide-down` utility class

## Translation Keys

### Navigation
- `nav.home`, `nav.portfolio`, `nav.shop`, `nav.blog`, `nav.about`
- `nav.signin`, `nav.signout`, `nav.admin`, `nav.cart`

### Pricing Section
- `pricing.title`, `pricing.subtitle`, `pricing.description`
- `pricing.cta`, `pricing.perMonth`
- `tier.consultation`, `tier.onlineStore`, `tier.staticWebsite`
- `pricing.consultationDesc`, `pricing.onlineStoreDesc`, `pricing.staticWebsiteDesc`

### Hero Section
- `hero.badge`, `hero.mainTitle1`, `hero.mainTitle2`
- `hero.aiServices`, `hero.website`
- `hero.subtitle1`, `hero.subtitle2`
- `hero.getStarted`, `hero.bookConsultation`

### WIO Section
- `wio.whatIs`, `wio.title`, `wio.description`

### Benefits
- `benefit.strategicPlanning`, `benefit.strategicPlanningDesc`
- `benefit.security`, `benefit.securityDesc`
- `benefit.customSolutions`, `benefit.customSolutionsDesc`
- `benefit.efficiency`, `benefit.efficiencyDesc`
- `benefit.innovation`, `benefit.innovationDesc`
- `benefit.leadership`, `benefit.leadershipDesc`

### Home Page
- `home.featuredWork`, `home.featuredWorkDesc`
- `home.viewAll`, `home.viewAllProjects`, `home.viewAllProducts`
- `home.shopProducts`, `home.shopProductsDesc`
- `home.ctaTitle`, `home.ctaDesc`, `home.getInTouch`

### Features
- `feature.individualConsultation`, `feature.businessStrategies`
- `feature.unlimitedProducts`, `feature.advancedAnalytics`
- `feature.uniqueDesign`, `feature.websiteSpeed`
- And more... (see LanguageContext.tsx for full list)

## Usage

### In Components:
```tsx
'use client'
import { useLanguage } from '@/contexts/LanguageContext'

export function MyComponent() {
  const { t, language, setLanguage } = useLanguage()
  
  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <p>Current language: {language}</p>
    </div>
  )
}
```

### Adding New Translations:
Edit `/contexts/LanguageContext.tsx` and add to the `translations` object:
```tsx
export const translations: Translations = {
  // ... existing translations
  'myNewKey': { bg: 'Български текст', en: 'English text' },
}
```

## Styling

The language selector matches the site's design system:
- Dark theme with `bg-background-elevated`
- Green accent color (`#4ade80`, `#22c55e`)
- Smooth hover transitions
- Modern glassmorphism effect with backdrop blur

## Browser Support

- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ LocalStorage API required for persistence

## Future Enhancements

Potential improvements:
- Add more languages (German, French, etc.)
- Integrate with i18n library for advanced features
- Add language detection based on browser settings
- Translate dynamic content from database
- Add RTL support for Arabic/Hebrew

## Notes

- The sign-in functionality has been removed from the navigation bar
- User authentication still works, but the UI has been simplified
- Language preference persists across page reloads
- All static text should use translation keys for consistency
