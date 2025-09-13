# GitHub Pages Deployment Instructions

This project is configured to deploy to GitHub Pages using the `gh-pages` npm package instead of GitHub Actions.

## Deployment Process

### 1. Build and Deploy
```bash
npm run deploy
```

This command will:
1. Run `npm run build` (predeploy script)
2. Build the project to the `dist/` folder
3. Deploy the `dist/` folder contents to the `gh-pages` branch

### 2. GitHub Pages Configuration

To set up GitHub Pages for this repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **"Deploy from a branch"**
4. Select **Branch**: `gh-pages` and **Folder**: `/ (root)`
5. Under **Custom domain**, enter: `promptvn.site`
6. Check **"Enforce HTTPS"**

### 3. Domain Configuration

For the custom domain `promptvn.site`, add these DNS records at your domain provider:

#### A Records (for apex domain):
```
Type: A
Name: @
Value: 185.199.108.153

Type: A  
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

#### CNAME Record (for www subdomain):
```
Type: CNAME
Name: www
Value: lockman04.github.io
```

### 4. Files Automatically Handled

The build process automatically copies these important files:
- `CNAME` - For custom domain configuration
- `.nojekyll` - Prevents GitHub from treating this as a Jekyll site
- `site.webmanifest` - PWA manifest file
- All static assets (images, CSV, etc.)

### 5. Accessing the Site

After deployment, the site will be available at:
- **Custom domain**: https://promptvn.site
- **GitHub Pages URL**: https://lockman04.github.io/Vietnamese-prompts (backup)

### 6. Troubleshooting

If you encounter MIME type errors or manifest loading issues:
1. Ensure `.nojekyll` file is present in the `public/` directory
2. Verify the `site.webmanifest` file is in the `public/` directory
3. Check that the CNAME file contains only `promptvn.site`
4. Wait a few minutes after deployment for CDN to update

The `.nojekyll` file prevents GitHub Pages from processing the site as a Jekyll site, which resolves MIME type issues with modern JavaScript modules.