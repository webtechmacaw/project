# Installation Guide – DriveMaster Template

## Requirements

- Any modern web browser
- Optional: local web server (Live Server, Python `http.server`, etc.) for best results with relative paths

## Steps

1. **Download / extract** the template package.
2. Upload the entire `driving-school-template` folder to your hosting (or open locally).
3. Set your domain’s document root to the folder that contains `pages/` and `dashboard/`, **or** open `pages/index.html` directly.
4. Test the student flow:
   - Go to `pages/login.html`
   - Click **Sign In** with the pre-filled demo credentials
   - You should land on `dashboard/index.html`

## Production Checklist

- [ ] Replace all placeholder images with optimized WebP/JPG of your fleet, instructors, and location
- [ ] Update contact details, phone, email, address
- [ ] Point contact form to Formspree / Netlify / your API (remove `data-demo="true"`)
- [ ] Insert real Google Maps embed on Contact page
- [ ] Update JSON-LD business data in `index.html`
- [ ] Set canonical URLs and Open Graph tags to your domain
- [ ] Connect student dashboard to a real backend (booking, auth, progress)
- [ ] Add `robots.txt` and `sitemap.xml` at site root
- [ ] Test dark mode and mobile menu on real devices
- [ ] Run Lighthouse / PageSpeed and fix any remaining issues

## RTL Setup

```html
<html lang="ar" dir="rtl" data-theme="light">
```

Ensure `rtl.css` is loaded (already linked on all pages).

## Theme Default

Theme is stored in `localStorage` under key `drivemaster-theme`.  
First visit follows `prefers-color-scheme`.
