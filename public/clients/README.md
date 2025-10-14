# Client Logos

This folder contains client/partner logos for the Clients Section.

## Required Logo Files

For each client, you need **TWO versions** of the logo:

### 1. Grayscale/Default Logo
- **Naming**: `[client-name].svg`
- **Style**: Grayscale or monochrome version
- **Usage**: Shown by default (with grayscale filter and 50% opacity)

### 2. Color Logo
- **Naming**: `[client-name]-color.svg`
- **Style**: Full color version of the logo
- **Usage**: Shown on hover

## Current Clients Setup

Based on the image provided, you need these logo files:

1. **AMPECO**
   - `ampeco.svg` (grayscale)
   - `ampeco-color.svg` (color)

2. **APIHAWK**
   - `apihawk.svg` (grayscale)
   - `apihawk-color.svg` (color)

3. **ICN.Bg**
   - `icn.svg` (grayscale)
   - `icn-color.svg` (color)

4. **TRAFICOM**
   - `traficom.svg` (grayscale)
   - `traficom-color.svg` (color)

5. **UniComs**
   - `unicoms.svg` (grayscale)
   - `unicoms-color.svg` (color)

6. **skillplate**
   - `skillplate.svg` (grayscale)
   - `skillplate-color.svg` (color)

## How It Works

- **Default State**: Logos appear in grayscale with 50% opacity
- **Hover State**: 
  - White rounded background appears
  - Color logo fades in
  - Grayscale logo fades out

## Adding New Clients

To add a new client:

1. Add both logo versions to this folder
2. Update `/components/ClientsSection.tsx`:
   ```tsx
   {
     name: 'Client Name',
     logo: '/clients/client-name.svg',
     colorLogo: '/clients/client-name-color.svg',
   }
   ```

## Logo Specifications

- **Format**: SVG (recommended) or PNG
- **Max Height**: 40px (auto-scaled)
- **Max Width**: 120px (auto-scaled)
- **Background**: Transparent
- **Aspect Ratio**: Maintain original logo proportions
