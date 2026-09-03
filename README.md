# DriveMaster – Driving School HTML Template

A modern, multipurpose HTML template for **driving schools and license training centers**. Includes a full marketing website and a student dashboard for lesson booking and progress tracking.

**Version:** 1.0.0  
**License:** Suitable for sale on template marketplaces (ThemeForest, etc.) — check your final license terms.

---

## Features

- **Responsive** mobile-first design (Tailwind-inspired custom CSS)
- **Dark / Light mode** with system preference detection
- **RTL support** (set `dir="rtl"` on `<html>`)
- **Student Dashboard**: book lessons (date, time, instructor), track hours vs. required minimum, view instructor feedback, download progress report
- SEO-ready meta tags & JSON-LD structured data
- Form validation (client-side)
- Accessible focus states, semantic HTML
- Placeholder integrations: contact form, maps, newsletter

---

## Pages Included

| Page | Path |
|------|------|
| Home | `pages/index.html` |
| About | `pages/about.html` |
| Courses | `pages/courses.html` |
| Instructors | `pages/instructors.html` |
| Vehicles | `pages/vehicles.html` |
| Fees / Pricing | `pages/fees.html` |
| Contact | `pages/contact.html` |
| Login / Register | `pages/login.html` |
| 404 | `pages/404.html` |
| Coming Soon | `pages/coming-soon.html` |
| **Student Dashboard** | `dashboard/index.html` |

---

## File Structure

```
driving-school-template/
├── assets/
│   ├── css/
│   │   ├── style.css          # Main styles + design tokens
│   │   ├── dark-mode.css      # Extra dark-mode refinements
│   │   └── rtl.css            # RTL layout support
│   ├── js/
│   │   ├── main.js            # Theme, nav, forms, counters
│   │   └── dashboard.js       # Booking, progress, report
│   ├── images/                # Add your images here
│   └── fonts/
├── pages/                     # Public site pages
├── dashboard/                 # Student portal
├── documentation/
└── README.md
```

---

## Quick Start

1. Open `pages/index.html` in a browser (or use a local server).
2. For the student portal: open `pages/login.html` → use demo credentials → Sign In → redirects to dashboard.
3. **Demo login:** email `alex.rivera@email.com` / password `demo1234` (pre-filled).

No build step required. Uses CDN for Google Fonts and Bootstrap Icons.

---

## Customization

### Colors
Edit CSS variables in `assets/css/style.css` under `:root`:

```css
--primary-600: #1e88e5;
--secondary-500: #f98007;
--accent-500: #22c55e;
```

### Branding
- Replace logo text/icon in the header of each page.
- Update meta titles/descriptions per page.
- Swap Unsplash placeholder images with your own (WebP recommended).

### Contact Form
Forms use `data-demo="true"` to prevent real submits. For production:
- Remove `data-demo="true"`
- Point `action` to Formspree, Netlify Forms, or your backend.

### Google Maps
Replace the `.map-placeholder` block in `contact.html` with your Maps embed iframe.

### RTL
Add `dir="rtl"` to the `<html>` tag. `rtl.css` handles layout flips.

---

## Student Dashboard Features

- **Book lesson:** select date, time slot, and instructor
- **Progress:** completed hours vs. required (default 30)
- **Feedback:** post-session written notes from instructors
- **Report:** download HTML progress summary (print-friendly)

Demo data lives in `assets/js/dashboard.js` (`Store` object). Replace with API calls in production.

---

## Browser Support

Chrome, Firefox, Safari, Edge (last 2 versions).  
CSS variables and modern JS (ES6+) required.

---

## Credits

- **Fonts:** [Inter](https://fonts.google.com/specimen/Inter), [Poppins](https://fonts.google.com/specimen/Poppins) — Google Fonts
- **Icons:** [Bootstrap Icons](https://icons.getbootstrap.com/)
- **Images:** [Unsplash](https://unsplash.com/) (placeholders)

---

## Changelog

### 1.0.0 – 2026-02
- Initial release
- Full marketing site + student dashboard
- Dark/light mode, RTL, responsive

---

## Support

For customization help, refer to `documentation/` or contact the template author via your marketplace purchase channel.
