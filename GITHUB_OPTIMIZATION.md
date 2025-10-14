# GitHub Upload Optimization Guide

This document explains the optimizations made to ensure the project can be uploaded to GitHub without exceeding the 25MB per file limit.

## Optimizations Implemented

### 1. Enhanced .gitignore
The `.gitignore` file has been updated to exclude:

- **node_modules/** (~410MB) - Dependencies that can be reinstalled via `npm install`
- **.next/** (~145MB) - Build cache that regenerates on `npm run build`
- **package-lock.json** (~420KB) - Lock file (optional, can be regenerated)
- **Build artifacts** - /build, /dist, /out directories
- **Test artifacts** - Cypress videos, screenshots, downloads
- **IDE files** - .vscode, .idea, workspace files
- **OS files** - Thumbs.db, .DS_Store
- **Temporary files** - .cache, *.tmp, *.temp
- **Log files** - All *.log files
- **Environment files** - .env, .env.local (security best practice)

### 2. .npmrc Configuration
Created `.npmrc` to optimize npm behavior:
- Disabled package-lock.json generation (reduces repo size)
- Enabled prefer-offline for faster installs
- Disabled audit and fund messages

### 3. Repository Size Summary

**Before optimization:**
- Total size: ~555MB
- Largest files: node_modules (410MB), .next (145MB)

**After optimization:**
- Repository size: ~2-3MB (source code only)
- All files under 25MB limit
- No visual changes to the application

## What Gets Uploaded to GitHub

✅ **Included:**
- Source code (app/, components/, lib/, etc.)
- Configuration files (next.config.js, tailwind.config.ts, etc.)
- Documentation (*.md files)
- Public assets (images, SVGs)
- Package.json (dependency list)
- Supabase migrations and seeds

❌ **Excluded:**
- node_modules (reinstall with `npm install`)
- .next build cache (regenerates on build)
- package-lock.json (regenerates on install)
- Environment variables (.env files)
- IDE settings
- Test artifacts

## Setup Instructions for New Clones

When someone clones this repository, they need to:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   - Copy `.env.example` to `.env.local`
   - Fill in required values (Supabase, Stripe keys)

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## File Size Verification

To verify no files exceed GitHub's limits:

```powershell
# Check for files larger than 25MB
Get-ChildItem -Path . -Recurse -File -ErrorAction SilentlyContinue | Where-Object { $_.Length -gt 25MB } | Select-Object FullName, @{Name="SizeMB";Expression={[math]::Round($_.Length/1MB, 2)}}
```

## Notes

- The project uses Next.js 14 which generates build cache in `.next/`
- All dependencies are listed in `package.json` and can be reinstalled
- Public assets (SVGs, images) are small and included in the repo
- No large media files or binaries are present in the source code

## Maintenance

To keep the repository optimized:

1. Don't commit `node_modules/` or `.next/` directories
2. Don't commit environment files with secrets
3. Keep media assets optimized (use SVG when possible)
4. Regularly review `.gitignore` for new patterns
5. Use Git LFS for any files that must be >25MB (not currently needed)

## Current Repository Structure

```
BoragoWeb/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/              # Utility libraries
├── public/           # Static assets (~1.3MB)
├── supabase/         # Database migrations
├── types/            # TypeScript definitions
├── package.json      # Dependencies list
└── [config files]    # Various configuration files
```

All files are well under the 25MB GitHub limit. The repository is ready for upload!
