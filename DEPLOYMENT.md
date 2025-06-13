# Cloudflare Pages Deployment Guide

## Quick Setup

1. **Build the project:**
   ```bash
   npm run deploy
   ```

2. **Connect to Cloudflare Pages:**
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project" > "Connect to Git"
   - Select your `squarenine-oracle` repository
   - Configure build settings:
     - **Framework preset:** Vite
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
     - **Node.js version:** 18.x

3. **Environment Variables (if needed):**
   - None required for basic deployment
   - Add any API keys in Cloudflare Pages settings

## Auto-Deploy Setup

Once connected, Cloudflare will automatically deploy on every push to the main branch.

## Custom Domain (Optional)

1. In Cloudflare Pages dashboard
2. Go to Custom domains
3. Add your domain (must be managed by Cloudflare)

## Performance Optimizations

The build is already optimized with:
- Tree-shaking for minimal bundle size
- Gzip compression
- Modern browser targeting
- Optimized image loading

## Troubleshooting

- **Build fails:** Check Node.js version is 18.x in Cloudflare
- **404 errors:** Ensure SPA fallback is enabled (automatic with Vite)
- **Slow loading:** Enable Cloudflare's rocket loader and minification
