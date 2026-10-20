# STEP 1 AUDIT: Freshen-v1.0.0.zip

## 1. Extracted Zip File and Folder Tree (Full Recursive Listing)
```text
.
./.git
./Freshen-v1.0.0.zip
./about-rtl.html
./about.html
./assets
./assets/css
./assets/css/font
./assets/css/font/Inter-italic.var.woff2
./assets/css/font/Inter-roman.var.woff2
./assets/css/font/inter.css
./assets/css/main.css
./assets/css/main.min.css
./assets/css/main.min.rtl.css
./assets/css/main.rtl.css
./assets/css/style.css
./assets/img
./assets/img/bg
./assets/img/bg/bg1.jpg
./assets/img/bg/bg10.jpg
./assets/img/bg/bg2.jpg
./assets/img/bg/bg3.jpg
./assets/img/bg/bg4.jpg
./assets/img/bg/bg5.jpg
./assets/img/bg/bg6.jpg
./assets/img/bg/bg7.jpg
./assets/img/bg/bg8.jpg
./assets/img/bg/bg9.jpg
./assets/img/clients
./assets/img/clients/logo1.png
./assets/img/clients/logo2.png
./assets/img/clients/logo3.png
./assets/img/clients/logo4.png
./assets/img/clients/logo5.png
./assets/img/clients/logo6.png
./assets/img/clients/logo7.png
./assets/img/clients/logo8.png
./assets/img/clients/logo9.png
./assets/img/partners
./assets/img/partners/logo1.png
./assets/img/partners/logo2.png
./assets/img/partners/logo3.png
./assets/img/partners/logo4.png
./assets/img/partners/logo5.png
./assets/img/partners/logo6.png
./assets/img/partners/logo7.png
./assets/img/partners/logo8.png
./assets/img/partners/logo9.png
./assets/img/screenshots
./assets/img/screenshots/laptop-rtl.jpg
./assets/img/screenshots/laptop.jpg
./assets/img/small-team
./assets/img/small-team/st1.jpg
./assets/img/small-team/st2.jpg
./assets/img/small-team/st3.jpg
./assets/img/small-team/st4.jpg
./assets/img/small-team/st5.jpg
./assets/img/small-team/st6.jpg
./assets/img/team
./assets/img/team/t1.jpg
./assets/img/team/t2.jpg
./assets/img/team/t3.jpg
./assets/img/team/t4.jpg
./assets/img/team/t5.jpg
./assets/img/team/t6.jpg
./assets/js
./assets/js/color-modes.js
./assets/js/scripts.js
./assets/libraries
./assets/libraries/aos
./assets/libraries/aos/aos.css
./assets/libraries/aos/aos.js
./assets/libraries/bootstrap
./assets/libraries/bootstrap/js
./assets/libraries/bootstrap/js/bootstrap.bundle.min.js
./assets/libraries/glide
./assets/libraries/glide/css
./assets/libraries/glide/css/glide.core.min.css
./assets/libraries/glide/css/glide.theme.min.css
./assets/libraries/glide/glide.min.js
./assets/logo
./assets/logo/android-chrome-192x192.png
./assets/logo/android-chrome-512x512.png
./assets/logo/apple-touch-icon.png
./assets/logo/favicon-16x16.png
./assets/logo/favicon-32x32.png
./assets/logo/favicon.ico
./assets/logo/logo.png
./assets/logo/site.webmanifest
./assets/php
./assets/php/contact
./assets/php/contact/mailer.php
./assets/php/contact/script.js
./assets/php/email.php
./assets/scss
./assets/scss/_utilities.scss
./assets/scss/_variables.scss
./assets/scss/color_palette
./assets/scss/color_palette/_color_palette.scss
./assets/scss/main.scss
./assets/scss/package-lock.json
./assets/scss/package.json
./assets/scss/styles.scss
./blog-author-rtl.html
./blog-author.html
./blog-post-rtl.html
./blog-post.html
./blog-rtl.html
./blog.html
./contact-rtl.html
./contact.html
./home-rtl.html
./home.html
./index.html
./services-rtl.html
./services.html
```

## 2. All @font-face Rules (Verbatim from ./assets/css/font/inter.css)
```css
@font-face {
  font-family: 'Inter var';
  font-weight: 100 900;
  font-display: swap;
  font-style: normal;
  font-named-instance: 'Regular';
  src: url("Inter-roman.var.woff2") format("woff2");
}

@font-face {
  font-family: 'Inter var';
  font-weight: 100 900;
  font-display: swap;
  font-style: italic;
  font-named-instance: 'Italic';
  src: url("Inter-italic.var.woff2") format("woff2");
}
```

## 3. All Existing API Route File Names
- Next.js API routes: None (template archive is static HTML/CSS/JS/PHP).
- Legacy PHP scripts in archive: `./assets/php/contact/mailer.php`, `./assets/php/email.php`.

## 4. All Existing Environment Variable Names
- None (`process.env` and `.env*` files absent from zip archive).

## 5. Loading Screen Path and Presence
- Present: `.loader-wrapper` defined in `./assets/css/style.css` (lines 19-30), dismissed on `window.load` in `./assets/js/scripts.js` (lines 22-26), and rendered in all HTML entry pages (`./index.html`, `./home.html`, `./services.html`, `./about.html`, `./blog.html`, `./contact.html`, and RTL counterparts).

## 6. Cookie Consent Path and Presence
- Absent: No cookie consent banner or preference modal exists in `Freshen-v1.0.0.zip`.

## 7. CAPTCHA Provider and Presence
- Absent: No CAPTCHA provider (reCAPTCHA, hCaptcha, or Turnstile) exists in `Freshen-v1.0.0.zip` (only a hidden honeypot input `.js-validate-robot` for Mailchimp).

## 8. Legal Pages Presence (/legal/privacy-policy, /legal/terms, /legal/cookie-policy)
- Absent: None of `/legal/privacy-policy`, `/legal/terms`, or `/legal/cookie-policy` exist in `Freshen-v1.0.0.zip`.

## 9. Custom Error Pages Presence (/404 and /500)
- Absent: Neither `/404` nor `/500` exists in `Freshen-v1.0.0.zip`.

## 10. All CSS Custom Properties (449 unique custom properties in ./assets/css/main.css)
```css
--bs-blue: #3b82f6;
--bs-indigo: #6366f1;
--bs-purple: #a855f7;
--bs-pink: #ec4899;
--bs-red: #f43f5e;
--bs-orange: #f97316;
--bs-yellow: #eab308;
--bs-green: #22c55e;
--bs-teal: #14b8a6;
--bs-cyan: #06b6d4;
--bs-black: #000;
--bs-white: #fff;
--bs-gray: #0284c7;
--bs-gray-dark: #075985;
--bs-gray-100: #e0f2fe;
--bs-gray-200: #bae6fd;
--bs-gray-300: #7dd3fc;
--bs-gray-400: #38bdf8;
--bs-gray-500: #0ea5e9;
--bs-gray-600: #0284c7;
--bs-gray-700: #0369a1;
--bs-gray-800: #075985;
--bs-gray-900: #0c4a6e;
--bs-primary: #ea580c;
--bs-secondary: #0284c7;
--bs-success: #10b981;
--bs-info: #3b82f6;
--bs-warning: #f59e0b;
--bs-danger: #f43f5e;
--bs-light: #e0f2fe;
--bs-dark: #0c4a6e;
--bs-primary-rgb: 234, 88, 12;
--bs-secondary-rgb: 2, 132, 199;
--bs-success-rgb: 16, 185, 129;
--bs-info-rgb: 59, 130, 246;
--bs-warning-rgb: 245, 158, 11;
--bs-danger-rgb: 244, 63, 94;
--bs-light-rgb: 224, 242, 254;
--bs-dark-rgb: 12, 74, 110;
--bs-primary-text-emphasis: #c2410c | #fdba74;
--bs-secondary-text-emphasis: #0369a1 | #38bdf8;
--bs-success-text-emphasis: #047857 | #6ee7b7;
--bs-info-text-emphasis: #2563eb | #93c5fd;
--bs-warning-text-emphasis: #b45309 | #fcd34d;
--bs-danger-text-emphasis: #be123c | #fda4af;
--bs-light-text-emphasis: #0ea5e9 | #fff;
--bs-dark-text-emphasis: #0284c7 | #38bdf8;
--bs-primary-bg-subtle: #fed7aa | #7c2d12;
--bs-secondary-bg-subtle: #bae6fd | #075985;
--bs-success-bg-subtle: #a7f3d0 | #065f46;
--bs-info-bg-subtle: #bfdbfe | #1e40af;
--bs-warning-bg-subtle: #fef3c7 | #b45309;
--bs-danger-bg-subtle: #fecdd3 | #9f1239;
--bs-light-bg-subtle: #f0f9ff | #0369a1;
--bs-dark-bg-subtle: #7dd3fc | #082f49;
--bs-primary-border-subtle: #f7bc9e | #8c3507;
--bs-secondary-border-subtle: #9acee9 | #014f77;
--bs-success-border-subtle: #9fe3cd | #0a6f4d;
--bs-info-border-subtle: #b1cdfb | #234e94;
--bs-warning-border-subtle: #fbd89d | #935f07;
--bs-danger-border-subtle: #fbb2bf | #922638;
--bs-light-border-subtle: #bae6fd | #0369a1;
--bs-dark-border-subtle: #0ea5e9 | #075985;
--bs-white-rgb: 255, 255, 255;
--bs-black-rgb: 0, 0, 0;
--bs-font-sans-serif: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
--bs-font-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
--bs-gradient: linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0)) | none;
--bs-body-font-family: var(--bs-font-sans-serif);
--bs-body-font-size: 1rem;
--bs-body-font-weight: 400;
--bs-body-line-height: 1.5;
--bs-body-color: #0369a1 | #bae6fd;
--bs-body-color-rgb: 3, 105, 161 | 186, 230, 253;
--bs-body-bg: #fff | #0c4a6e;
--bs-body-bg-rgb: 255, 255, 255 | 12, 74, 110;
--bs-emphasis-color: #0c4a6e | #fff;
--bs-emphasis-color-rgb: 12, 74, 110 | 255, 255, 255;
--bs-secondary-color: #0284c7 | #38bdf8;
--bs-secondary-color-rgb: 2, 132, 199 | 56, 189, 248;
--bs-secondary-bg: #e0f2fe | #0369a1;
--bs-secondary-bg-rgb: 224, 242, 254 | 3, 105, 161;
--bs-tertiary-color: #0ea5e9 | #38bdf8;
--bs-tertiary-color-rgb: 14, 165, 233 | 56, 189, 248;
--bs-tertiary-bg: #f0f9ff | #075985;
--bs-tertiary-bg-rgb: 240, 249, 255 | 7, 89, 133;
--bs-heading-color: inherit;
--bs-link-color: #ea580c | #f29b6d;
--bs-link-color-rgb: 234, 88, 12 | 242, 155, 109 | var(--bs-link-hover-color-rgb);
--bs-link-decoration: underline;
--bs-link-hover-color: #bb460a | #f5af8a;
--bs-link-hover-color-rgb: 187, 70, 10 | 245, 175, 138;
--bs-code-color: #ec4899 | #f491c2;
--bs-highlight-color: #0369a1 | #bae6fd;
--bs-highlight-bg: #fef9c3 | #854d0e;
--bs-border-width: 1px;
--bs-border-style: solid;
--bs-border-color: #7dd3fc | #0369a1;
--bs-border-color-translucent: rgba(0, 0, 0, 0.175) | rgba(255, 255, 255, 0.15);
--bs-border-radius: 0.375rem;
--bs-border-radius-sm: 0.25rem;
--bs-border-radius-lg: 0.5rem;
--bs-border-radius-xl: 1rem;
--bs-border-radius-xxl: 2rem;
--bs-border-radius-2xl: var(--bs-border-radius-xxl);
--bs-border-radius-pill: 50rem;
--bs-box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
--bs-box-shadow-sm: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
--bs-box-shadow-lg: 0 1rem 3rem rgba(0, 0, 0, 0.175);
--bs-box-shadow-inset: inset 0 1px 2px rgba(0, 0, 0, 0.075);
--bs-focus-ring-width: 0.25rem;
--bs-focus-ring-opacity: 0.25;
--bs-focus-ring-color: rgba(234, 88, 12, 0.25) | rgba(var(--bs-primary-rgb), var(--bs-focus-ring-opacity)) | rgba(var(--bs-secondary-rgb), var(--bs-focus-ring-opacity)) | rgba(var(--bs-success-rgb), var(--bs-focus-ring-opacity)) | rgba(var(--bs-info-rgb), var(--bs-focus-ring-opacity)) | rgba(var(--bs-warning-rgb), var(--bs-focus-ring-opacity)) | rgba(var(--bs-danger-rgb), var(--bs-focus-ring-opacity)) | rgba(var(--bs-light-rgb), var(--bs-focus-ring-opacity)) | rgba(var(--bs-dark-rgb), var(--bs-focus-ring-opacity));
--bs-form-valid-color: #10b981 | #86efac;
--bs-form-valid-border-color: #10b981 | #86efac;
--bs-form-invalid-color: #f43f5e | #fca5a5;
--bs-form-invalid-border-color: #f43f5e | #fca5a5;
--bs-gutter-x: 1.5rem | 0 | 0.25rem | 0.5rem | 1rem | 3rem;
--bs-gutter-y: 0 | 0.25rem | 0.5rem | 1rem | 1.5rem | 3rem;
--bs-breakpoint-xs: 0;
--bs-breakpoint-sm: 576px;
--bs-breakpoint-md: 768px;
--bs-breakpoint-lg: 992px;
--bs-breakpoint-xl: 1200px;
--bs-breakpoint-xxl: 1400px;
--bs-table-color-type: initial | var(--bs-table-striped-color);
--bs-table-bg-type: initial | var(--bs-table-striped-bg);
--bs-table-color-state: initial | var(--bs-table-active-color) | var(--bs-table-hover-color);
--bs-table-bg-state: initial | var(--bs-table-active-bg) | var(--bs-table-hover-bg);
--bs-table-color: var(--bs-emphasis-color) | #000 | #fff;
--bs-table-bg: var(--bs-body-bg) | #fbdece | #cce6f4 | #cff1e6 | #d8e6fd | #fdecce | #fdd9df | #e0f2fe | #0c4a6e;
--bs-table-border-color: var(--bs-border-color) | #c9b2a5 | #a3b8c3 | #a6c1b8 | #adb8ca | #cabda5 | #caaeb2 | #b3c2cb | #3d6e8b;
--bs-table-accent-bg: transparent;
--bs-table-striped-color: var(--bs-emphasis-color) | #000 | #fff;
--bs-table-striped-bg: rgba(var(--bs-emphasis-color-rgb), 0.05) | #eed3c4 | #c2dbe8 | #c5e5db | #cddbf0 | #f0e0c4 | #f0ced4 | #d5e6f1 | #185375;
--bs-table-active-color: var(--bs-emphasis-color) | #000 | #fff;
--bs-table-active-bg: rgba(var(--bs-emphasis-color-rgb), 0.1) | #e2c8b9 | #b8cfdc | #bad9cf | #c2cfe4 | #e4d4b9 | #e4c3c9 | #cadae5 | #245c7d;
--bs-table-hover-color: var(--bs-emphasis-color) | #000 | #fff;
--bs-table-hover-bg: rgba(var(--bs-emphasis-color-rgb), 0.075) | #e8cdbf | #bdd5e2 | #bfdfd5 | #c8d5ea | #eadabf | #eac9ce | #cfe0eb | #1e5879;
--bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23075985' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23bae6fd' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
--bs-form-check-bg: var(--bs-body-bg);
--bs-form-check-bg-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='m6 10 3 3 6-6'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='2' fill='%23fff'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23fff' stroke-linecap='round' stroke-linejoin='round' stroke-width='3' d='M6 10h8'/%3e%3c/svg%3e");
--bs-form-switch-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%280, 0, 0, 0.25%29'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23f5ac86'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='%23fff'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='rgba%28255, 255, 255, 0.25%29'/%3e%3c/svg%3e");
--bs-form-select-bg-icon: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2310b981' d='M2.3 6.73.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23f43f5e'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23f43f5e' stroke='none'/%3e%3c/svg%3e");
--bs-btn-padding-x: 0.75rem | 1rem | 0.5rem;
--bs-btn-padding-y: 0.375rem | 0.5rem | 0.25rem;
--bs-btn-font-family: ;
--bs-btn-font-size: 1rem | 1.25rem | 0.875rem;
--bs-btn-font-weight: 400;
--bs-btn-line-height: 1.5;
--bs-btn-color: var(--bs-body-color) | #000 | #fff | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e | var(--bs-link-color);
--bs-btn-bg: transparent | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e;
--bs-btn-border-width: var(--bs-border-width);
--bs-btn-border-color: transparent | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e;
--bs-btn-border-radius: var(--bs-border-radius) | var(--bs-border-radius-lg) | var(--bs-border-radius-sm);
--bs-btn-hover-border-color: transparent | #ec6924 | #1b90cd | #28c08e | #4f8ff7 | #f6a823 | #f5526e | #b3c2cb | #245c7d | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e;
--bs-btn-box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075) | 0 0 0 #000;
--bs-btn-disabled-opacity: 0.65;
--bs-btn-focus-box-shadow: 0 0 0 0.25rem rgba(var(--bs-btn-focus-shadow-rgb), .5);
--bs-btn-hover-color: #000 | #fff | var(--bs-link-hover-color);
--bs-btn-hover-bg: #ed7130 | #2896cf | #34c494 | #5895f7 | #f7ad30 | #f65c76 | #beced8 | #306584 | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e;
--bs-btn-focus-shadow-rgb: 199, 75, 10 | 2, 112, 169 | 14, 157, 110 | 50, 111, 209 | 208, 134, 9 | 207, 54, 80 | 190, 206, 216 | 48, 101, 132 | 234, 88, 12 | 2, 132, 199 | 16, 185, 129 | 59, 130, 246 | 245, 158, 11 | 244, 63, 94 | 224, 242, 254 | 12, 74, 110;
--bs-btn-active-color: #000 | #fff | var(--bs-link-hover-color);
--bs-btn-active-bg: #ee793d | #359dd2 | #40c79a | #629bf8 | #f7b13c | #f6657e | #b3c2cb | #3d6e8b | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e;
--bs-btn-active-border-color: #ec6924 | #1b90cd | #28c08e | #4f8ff7 | #f6a823 | #f5526e | #a8b6bf | #245c7d | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e | transparent;
--bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
--bs-btn-disabled-color: #000 | #fff | #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e;
--bs-btn-disabled-bg: #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e | transparent;
--bs-btn-disabled-border-color: #ea580c | #0284c7 | #10b981 | #3b82f6 | #f59e0b | #f43f5e | #e0f2fe | #0c4a6e | transparent;
--bs-dropdown-zindex: 1000;
--bs-dropdown-min-width: 10rem;
--bs-dropdown-padding-x: 0;
--bs-dropdown-padding-y: 0.5rem;
--bs-dropdown-spacer: 0.125rem;
--bs-dropdown-font-size: 1rem;
--bs-dropdown-color: var(--bs-body-color) | #7dd3fc;
--bs-dropdown-bg: var(--bs-body-bg) | #075985;
--bs-dropdown-border-color: rgba(var(--bs-tertiary-color-rgb), 0.1) | var(--bs-border-color-translucent);
--bs-dropdown-border-radius: var(--bs-border-radius);
--bs-dropdown-border-width: var(--bs-border-width);
--bs-dropdown-inner-border-radius: calc(var(--bs-border-radius) - var(--bs-border-width));
--bs-dropdown-divider-bg: rgba(var(--bs-tertiary-color-rgb), 0.1) | var(--bs-border-color-translucent);
--bs-dropdown-divider-margin-y: 0.5rem;
--bs-dropdown-box-shadow: var(--bs-box-shadow) | ;
--bs-dropdown-link-color: var(--bs-body-color) | #7dd3fc;
--bs-dropdown-link-hover-color: var(--bs-body-color) | #fff;
--bs-dropdown-link-hover-bg: var(--bs-tertiary-bg) | rgba(255, 255, 255, 0.15);
--bs-dropdown-link-active-color: #fff;
--bs-dropdown-link-active-bg: #ea580c;
--bs-dropdown-link-disabled-color: var(--bs-tertiary-color) | #0ea5e9;
--bs-dropdown-item-padding-x: 1rem;
--bs-dropdown-item-padding-y: 0.25rem;
--bs-dropdown-header-color: #0284c7 | #0ea5e9;
--bs-dropdown-header-padding-x: 1rem;
--bs-dropdown-header-padding-y: 0.5rem;
--bs-position: start | end;
--bs-nav-link-padding-x: 1rem | 0;
--bs-nav-link-padding-y: 0.5rem;
--bs-nav-link-font-weight: ;
--bs-nav-link-color: var(--bs-link-color) | var(--bs-navbar-color);
--bs-nav-link-hover-color: var(--bs-link-hover-color) | var(--bs-navbar-hover-color);
--bs-nav-link-disabled-color: var(--bs-secondary-color) | var(--bs-navbar-disabled-color);
--bs-nav-tabs-border-width: var(--bs-border-width);
--bs-nav-tabs-border-color: var(--bs-border-color);
--bs-nav-tabs-border-radius: var(--bs-border-radius);
--bs-nav-tabs-link-hover-border-color: var(--bs-secondary-bg) var(--bs-secondary-bg) var(--bs-border-color);
--bs-nav-tabs-link-active-color: var(--bs-emphasis-color);
--bs-nav-tabs-link-active-bg: var(--bs-body-bg);
--bs-nav-tabs-link-active-border-color: var(--bs-border-color) var(--bs-border-color) var(--bs-body-bg);
--bs-nav-pills-border-radius: var(--bs-border-radius);
--bs-nav-pills-link-active-color: #fff;
--bs-nav-pills-link-active-bg: #ea580c;
--bs-nav-underline-gap: 1rem;
--bs-nav-underline-border-width: 0.125rem;
--bs-nav-underline-link-active-color: var(--bs-emphasis-color);
--bs-navbar-padding-x: 0;
--bs-navbar-padding-y: 0.5rem;
--bs-navbar-color: rgba(var(--bs-emphasis-color-rgb), 0.65) | rgba(255, 255, 255, 0.55);
--bs-navbar-hover-color: rgba(var(--bs-emphasis-color-rgb), 0.8) | rgba(255, 255, 255, 0.75);
--bs-navbar-disabled-color: rgba(var(--bs-emphasis-color-rgb), 0.3) | rgba(255, 255, 255, 0.25);
--bs-navbar-active-color: rgba(var(--bs-emphasis-color-rgb), 1) | #fff;
--bs-navbar-brand-padding-y: 0.3125rem;
--bs-navbar-brand-margin-end: 1rem;
--bs-navbar-brand-font-size: 1.25rem;
--bs-navbar-brand-color: rgba(var(--bs-emphasis-color-rgb), 1) | #fff;
--bs-navbar-brand-hover-color: rgba(var(--bs-emphasis-color-rgb), 1) | #fff;
--bs-navbar-nav-link-padding-x: 0.5rem;
--bs-navbar-toggler-padding-y: 0.25rem;
--bs-navbar-toggler-padding-x: 0.75rem;
--bs-navbar-toggler-font-size: 1.25rem;
--bs-navbar-toggler-icon-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%283, 105, 161, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") | url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28255, 255, 255, 0.55%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
--bs-navbar-toggler-border-color: rgba(var(--bs-emphasis-color-rgb), 0.15) | rgba(255, 255, 255, 0.1);
--bs-navbar-toggler-border-radius: var(--bs-border-radius);
--bs-navbar-toggler-focus-width: 0.25rem;
--bs-navbar-toggler-transition: box-shadow 0.15s ease-in-out;
--bs-card-spacer-y: 1rem;
--bs-card-spacer-x: 1rem;
--bs-card-title-spacer-y: 0.5rem;
--bs-card-title-color: ;
--bs-card-subtitle-color: ;
--bs-card-border-width: var(--bs-border-width);
--bs-card-border-color: var(--bs-border-color-translucent);
--bs-card-border-radius: var(--bs-border-radius);
--bs-card-box-shadow: ;
--bs-card-inner-border-radius: calc(var(--bs-border-radius) - (var(--bs-border-width)));
--bs-card-cap-padding-y: 0.5rem;
--bs-card-cap-padding-x: 1rem;
--bs-card-cap-bg: rgba(var(--bs-body-color-rgb), 0.03);
--bs-card-cap-color: ;
--bs-card-height: ;
--bs-card-color: ;
--bs-card-bg: var(--bs-body-bg);
--bs-card-img-overlay-padding: 1rem;
--bs-card-group-margin: 0.75rem;
--bs-accordion-color: var(--bs-body-color);
--bs-accordion-bg: var(--bs-body-bg);
--bs-accordion-transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, border-radius 0.15s ease;
--bs-accordion-border-color: rgba(var(--bs-emphasis-color-rgb), 0.1);
--bs-accordion-border-width: var(--bs-border-width);
--bs-accordion-border-radius: var(--bs-border-radius);
--bs-accordion-inner-border-radius: calc(var(--bs-border-radius) - (var(--bs-border-width)));
--bs-accordion-btn-padding-x: 1.25rem;
--bs-accordion-btn-padding-y: 1rem;
--bs-accordion-btn-color: var(--bs-body-color);
--bs-accordion-btn-bg: var(--bs-accordion-bg);
--bs-accordion-btn-icon: url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" fill="%230c4a6e" class="bi bi-plus" viewBox="0 0 16 16"%3e %3cpath d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/%3e %3c/svg%3e') | url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" fill="%23fff" class="bi bi-plus" viewBox="0 0 16 16"%3e %3cpath d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/%3e %3c/svg%3e');
--bs-accordion-btn-icon-width: 1.75rem;
--bs-accordion-btn-icon-transform: rotate(-180deg);
--bs-accordion-btn-icon-transition: transform 0.2s ease-in-out;
--bs-accordion-btn-active-icon: url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" fill="%23ea580c" class="bi bi-dash" viewBox="0 0 16 16"%3e %3cpath d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/%3e %3c/svg%3e');
--bs-accordion-btn-focus-box-shadow: none;
--bs-accordion-body-padding-x: 1.25rem;
--bs-accordion-body-padding-y: 1rem;
--bs-accordion-active-color: #ea580c;
--bs-accordion-active-bg: transparent;
--bs-breadcrumb-padding-x: 0;
--bs-breadcrumb-padding-y: 0;
--bs-breadcrumb-margin-bottom: 1rem;
--bs-breadcrumb-bg: ;
--bs-breadcrumb-border-radius: ;
--bs-breadcrumb-divider-color: var(--bs-secondary-color);
--bs-breadcrumb-item-padding-x: 0.5rem;
--bs-breadcrumb-item-active-color: var(--bs-secondary-color);
--bs-pagination-padding-x: 0.75rem | 1.5rem | 0.5rem;
--bs-pagination-padding-y: 0.375rem | 0.75rem | 0.25rem;
--bs-pagination-font-size: 1rem | 1.25rem | 0.875rem;
--bs-pagination-color: var(--bs-link-color);
--bs-pagination-bg: var(--bs-body-bg);
--bs-pagination-border-width: var(--bs-border-width);
--bs-pagination-border-color: var(--bs-border-color);
--bs-pagination-border-radius: var(--bs-border-radius) | var(--bs-border-radius-lg) | var(--bs-border-radius-sm);
--bs-pagination-hover-color: var(--bs-link-hover-color);
--bs-pagination-hover-bg: var(--bs-tertiary-bg);
--bs-pagination-hover-border-color: var(--bs-border-color);
--bs-pagination-focus-color: var(--bs-link-hover-color);
--bs-pagination-focus-bg: var(--bs-secondary-bg);
--bs-pagination-focus-box-shadow: 0 0 0 0.25rem rgba(234, 88, 12, 0.25);
--bs-pagination-active-color: #fff;
--bs-pagination-active-bg: #ea580c;
--bs-pagination-active-border-color: #ea580c;
--bs-pagination-disabled-color: var(--bs-secondary-color);
--bs-pagination-disabled-bg: var(--bs-secondary-bg);
--bs-pagination-disabled-border-color: var(--bs-border-color);
--bs-badge-padding-x: 0.65em;
--bs-badge-padding-y: 0.35em;
--bs-badge-font-size: 0.75em;
--bs-badge-font-weight: 700;
--bs-badge-color: #fff;
--bs-badge-border-radius: var(--bs-border-radius);
--bs-alert-bg: transparent | var(--bs-primary-bg-subtle) | var(--bs-secondary-bg-subtle) | var(--bs-success-bg-subtle) | var(--bs-info-bg-subtle) | var(--bs-warning-bg-subtle) | var(--bs-danger-bg-subtle) | var(--bs-light-bg-subtle) | var(--bs-dark-bg-subtle);
--bs-alert-padding-x: 1rem;
--bs-alert-padding-y: 1rem;
--bs-alert-margin-bottom: 1rem;
--bs-alert-color: inherit | var(--bs-primary-text-emphasis) | var(--bs-secondary-text-emphasis) | var(--bs-success-text-emphasis) | var(--bs-info-text-emphasis) | var(--bs-warning-text-emphasis) | var(--bs-danger-text-emphasis) | var(--bs-light-text-emphasis) | var(--bs-dark-text-emphasis);
--bs-alert-border-color: transparent | var(--bs-primary-border-subtle) | var(--bs-secondary-border-subtle) | var(--bs-success-border-subtle) | var(--bs-info-border-subtle) | var(--bs-warning-border-subtle) | var(--bs-danger-border-subtle) | var(--bs-light-border-subtle) | var(--bs-dark-border-subtle);
--bs-alert-border: var(--bs-border-width) solid var(--bs-alert-border-color);
--bs-alert-border-radius: var(--bs-border-radius);
--bs-alert-link-color: inherit | var(--bs-primary-text-emphasis) | var(--bs-secondary-text-emphasis) | var(--bs-success-text-emphasis) | var(--bs-info-text-emphasis) | var(--bs-warning-text-emphasis) | var(--bs-danger-text-emphasis) | var(--bs-light-text-emphasis) | var(--bs-dark-text-emphasis);
--bs-progress-height: 1rem;
--bs-progress-font-size: 0.75rem;
--bs-progress-bg: var(--bs-secondary-bg);
--bs-progress-border-radius: var(--bs-border-radius);
--bs-progress-box-shadow: var(--bs-box-shadow-inset);
--bs-progress-bar-color: #fff;
--bs-progress-bar-bg: #ea580c;
--bs-progress-bar-transition: width 0.6s ease;
--bs-list-group-color: var(--bs-body-color) | var(--bs-primary-text-emphasis) | var(--bs-secondary-text-emphasis) | var(--bs-success-text-emphasis) | var(--bs-info-text-emphasis) | var(--bs-warning-text-emphasis) | var(--bs-danger-text-emphasis) | var(--bs-light-text-emphasis) | var(--bs-dark-text-emphasis);
--bs-list-group-bg: var(--bs-body-bg) | var(--bs-primary-bg-subtle) | var(--bs-secondary-bg-subtle) | var(--bs-success-bg-subtle) | var(--bs-info-bg-subtle) | var(--bs-warning-bg-subtle) | var(--bs-danger-bg-subtle) | var(--bs-light-bg-subtle) | var(--bs-dark-bg-subtle);
--bs-list-group-border-color: var(--bs-border-color) | var(--bs-primary-border-subtle) | var(--bs-secondary-border-subtle) | var(--bs-success-border-subtle) | var(--bs-info-border-subtle) | var(--bs-warning-border-subtle) | var(--bs-danger-border-subtle) | var(--bs-light-border-subtle) | var(--bs-dark-border-subtle);
--bs-list-group-border-width: var(--bs-border-width);
--bs-list-group-border-radius: var(--bs-border-radius);
--bs-list-group-item-padding-x: 1rem;
--bs-list-group-item-padding-y: 0.5rem;
--bs-list-group-action-color: var(--bs-secondary-color);
--bs-list-group-action-hover-color: var(--bs-emphasis-color);
--bs-list-group-action-hover-bg: var(--bs-tertiary-bg) | var(--bs-primary-border-subtle) | var(--bs-secondary-border-subtle) | var(--bs-success-border-subtle) | var(--bs-info-border-subtle) | var(--bs-warning-border-subtle) | var(--bs-danger-border-subtle) | var(--bs-light-border-subtle) | var(--bs-dark-border-subtle);
--bs-list-group-action-active-color: var(--bs-body-color) | var(--bs-emphasis-color);
--bs-list-group-action-active-bg: var(--bs-secondary-bg) | var(--bs-primary-border-subtle) | var(--bs-secondary-border-subtle) | var(--bs-success-border-subtle) | var(--bs-info-border-subtle) | var(--bs-warning-border-subtle) | var(--bs-danger-border-subtle) | var(--bs-light-border-subtle) | var(--bs-dark-border-subtle);
--bs-list-group-disabled-color: var(--bs-secondary-color);
--bs-list-group-disabled-bg: var(--bs-body-bg);
--bs-list-group-active-color: #fff | var(--bs-primary-bg-subtle) | var(--bs-secondary-bg-subtle) | var(--bs-success-bg-subtle) | var(--bs-info-bg-subtle) | var(--bs-warning-bg-subtle) | var(--bs-danger-bg-subtle) | var(--bs-light-bg-subtle) | var(--bs-dark-bg-subtle);
--bs-list-group-active-bg: #ea580c | var(--bs-primary-text-emphasis) | var(--bs-secondary-text-emphasis) | var(--bs-success-text-emphasis) | var(--bs-info-text-emphasis) | var(--bs-warning-text-emphasis) | var(--bs-danger-text-emphasis) | var(--bs-light-text-emphasis) | var(--bs-dark-text-emphasis);
--bs-list-group-active-border-color: #ea580c | var(--bs-primary-text-emphasis) | var(--bs-secondary-text-emphasis) | var(--bs-success-text-emphasis) | var(--bs-info-text-emphasis) | var(--bs-warning-text-emphasis) | var(--bs-danger-text-emphasis) | var(--bs-light-text-emphasis) | var(--bs-dark-text-emphasis);
--bs-btn-close-color: #000;
--bs-btn-close-bg: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e");
--bs-btn-close-opacity: 0.5;
--bs-btn-close-hover-opacity: 0.75;
--bs-btn-close-focus-shadow: 0 0 0 0.25rem rgba(234, 88, 12, 0.25);
--bs-btn-close-focus-opacity: 1;
--bs-btn-close-disabled-opacity: 0.25;
--bs-btn-close-white-filter: invert(1) grayscale(100%) brightness(200%);
--bs-toast-zindex: 1090;
--bs-toast-padding-x: 0.75rem;
--bs-toast-padding-y: 0.5rem;
--bs-toast-spacing: 1.5rem;
--bs-toast-max-width: 350px;
--bs-toast-font-size: 0.875rem;
--bs-toast-color: ;
--bs-toast-bg: rgba(var(--bs-body-bg-rgb), 0.85);
--bs-toast-border-width: var(--bs-border-width);
--bs-toast-border-color: var(--bs-border-color-translucent);
--bs-toast-border-radius: var(--bs-border-radius);
--bs-toast-box-shadow: var(--bs-box-shadow);
--bs-toast-header-color: var(--bs-secondary-color);
--bs-toast-header-bg: rgba(var(--bs-body-bg-rgb), 0.85);
--bs-toast-header-border-color: var(--bs-border-color-translucent);
--bs-modal-zindex: 1055;
--bs-modal-width: 500px | 300px | 800px | 1140px;
--bs-modal-padding: 1rem;
--bs-modal-margin: 0.5rem | 1.75rem;
--bs-modal-color: ;
--bs-modal-bg: var(--bs-body-bg);
--bs-modal-border-color: var(--bs-border-color-translucent);
--bs-modal-border-width: var(--bs-border-width);
--bs-modal-border-radius: var(--bs-border-radius-lg);
--bs-modal-box-shadow: var(--bs-box-shadow-sm) | var(--bs-box-shadow);
--bs-modal-inner-border-radius: calc(var(--bs-border-radius-lg) - (var(--bs-border-width)));
--bs-modal-header-padding-x: 1rem;
--bs-modal-header-padding-y: 1rem;
--bs-modal-header-padding: 1rem 1rem;
--bs-modal-header-border-color: var(--bs-border-color);
--bs-modal-header-border-width: var(--bs-border-width);
--bs-modal-title-line-height: 1.5;
--bs-modal-footer-gap: 0.5rem;
--bs-modal-footer-bg: ;
--bs-modal-footer-border-color: var(--bs-border-color);
--bs-modal-footer-border-width: var(--bs-border-width);
--bs-backdrop-zindex: 1050;
--bs-backdrop-bg: #000;
--bs-backdrop-opacity: 0.5;
--bs-tooltip-zindex: 1080;
--bs-tooltip-max-width: 200px;
--bs-tooltip-padding-x: 0.5rem;
--bs-tooltip-padding-y: 0.25rem;
--bs-tooltip-margin: ;
--bs-tooltip-font-size: 0.875rem;
--bs-tooltip-color: var(--bs-body-bg);
--bs-tooltip-bg: var(--bs-emphasis-color);
--bs-tooltip-border-radius: var(--bs-border-radius);
--bs-tooltip-opacity: 0.9;
--bs-tooltip-arrow-width: 0.8rem;
--bs-tooltip-arrow-height: 0.4rem;
--bs-popover-zindex: 1070;
--bs-popover-max-width: 276px;
--bs-popover-font-size: 0.875rem;
--bs-popover-bg: var(--bs-body-bg);
--bs-popover-border-width: var(--bs-border-width);
--bs-popover-border-color: var(--bs-border-color-translucent);
--bs-popover-border-radius: var(--bs-border-radius-lg);
--bs-popover-inner-border-radius: calc(var(--bs-border-radius-lg) - var(--bs-border-width));
--bs-popover-box-shadow: var(--bs-box-shadow);
--bs-popover-header-padding-x: 1rem;
--bs-popover-header-padding-y: 0.5rem;
--bs-popover-header-font-size: 1rem;
--bs-popover-header-color: inherit;
--bs-popover-header-bg: var(--bs-secondary-bg);
--bs-popover-body-padding-x: 1rem;
--bs-popover-body-padding-y: 1rem;
--bs-popover-body-color: var(--bs-body-color);
--bs-popover-arrow-width: 1rem;
--bs-popover-arrow-height: 0.5rem;
--bs-popover-arrow-border: var(--bs-popover-border-color);
--bs-spinner-width: 2rem | 1rem;
--bs-spinner-height: 2rem | 1rem;
--bs-spinner-vertical-align: -0.125em;
--bs-spinner-border-width: 0.25em | 0.2em;
--bs-spinner-animation-speed: 0.75s | 1.5s;
--bs-spinner-animation-name: spinner-border | spinner-grow;
--bs-offcanvas-zindex: 1045;
--bs-offcanvas-width: 400px;
--bs-offcanvas-height: 30vh | auto;
--bs-offcanvas-padding-x: 1rem;
--bs-offcanvas-padding-y: 1rem;
--bs-offcanvas-color: var(--bs-body-color);
--bs-offcanvas-bg: var(--bs-body-bg);
--bs-offcanvas-border-width: var(--bs-border-width) | 0;
--bs-offcanvas-border-color: var(--bs-border-color-translucent);
--bs-offcanvas-box-shadow: var(--bs-box-shadow-sm);
--bs-offcanvas-transition: transform 0.3s ease-in-out;
--bs-offcanvas-title-line-height: 1.5;
--bs-aspect-ratio: 100% | 75% | 56.25% | 42.8571428571%;
--bs-border-opacity: 1 | 0.1 | 0.25 | 0.5 | 0.75;
--bs-text-opacity: 1 | 0.25 | 0.5 | 0.75;
--bs-link-opacity: 0.1 | 0.25 | 0.5 | 0.75 | 1;
--bs-link-underline-opacity: 1 | 0 | 0.1 | 0.25 | 0.5 | 0.75;
--bs-bg-opacity: 1 | 0.1 | 0.25 | 0.5 | 0.75;
--bs-scrollbar-thumb-bg: 125, 211, 252, 1 | 14, 165, 233, 0.5;
--bs-scrollbar-track-bg: 224, 242, 254, 1 | 14, 165, 233, 0.16;
--bs-patten-boxes-opacity: 1 | 0.15;
```
