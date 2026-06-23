# ToolNest — Fast, Free & Powerful Online Tools

A production-ready Next.js 14 (App Router) website offering 10 free online tools for images and PDFs, built with TypeScript, Tailwind CSS, and a premium glassmorphism SaaS design with full light/dark mode support.

---

## 1. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Theming:** next-themes (light/dark mode)
- **Icons:** lucide-react
- **PDF processing:** pdf-lib, jsPDF
- **Image compression:** browser-image-compression
- **AI background removal:** @imgly/background-removal (runs client-side via WebAssembly)
- **QR codes:** qrcode

---

## 2. Installation

```bash
# 1. Extract/clone the project, then enter the folder
cd toolnest

# 2. Install dependencies
npm install

# 3. Copy environment variables template
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** The first time you use the Background Remover tool, your browser will download an AI model (a few MB) via WebAssembly. This requires an internet connection on first use per browser; afterward it's cached.

---

## 3. Build & Production

```bash
# Build for production
npm run build

# Start the production server
npm start
```

---

## 4. Project Structure

```
toolnest/
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── apple-touch-icon.png
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── og-image.png                 # Open Graph share image
│   ├── logo.png
│   └── site.webmanifest
├── src/
│   ├── app/                         # Next.js App Router pages
│   │   ├── layout.tsx                # Root layout (navbar, footer, theming, SEO defaults)
│   │   ├── page.tsx                  # Home page
│   │   ├── loading.tsx               # Global loading state
│   │   ├── not-found.tsx             # Custom 404 page
│   │   ├── sitemap.ts                # Dynamic sitemap.xml generator
│   │   ├── robots.ts                 # Dynamic robots.txt generator
│   │   ├── all-tools/
│   │   │   ├── layout.tsx            # Metadata wrapper (page is a client component)
│   │   │   └── page.tsx              # All Tools listing + search/filter
│   │   ├── tools/
│   │   │   ├── background-remover/page.tsx
│   │   │   ├── image-compressor/page.tsx
│   │   │   ├── image-resizer/page.tsx
│   │   │   ├── image-to-pdf/page.tsx
│   │   │   ├── pdf-compressor/page.tsx
│   │   │   ├── pdf-merger/page.tsx
│   │   │   ├── pdf-splitter/page.tsx
│   │   │   ├── pdf-password-protector/page.tsx
│   │   │   ├── qr-code-generator/page.tsx
│   │   │   └── password-generator/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── blog/
│   │       ├── page.tsx              # Blog listing
│   │       └── [slug]/page.tsx       # Dynamic blog post page
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer
│   │   ├── home/                     # Hero, FeatureStrip, CategorySections, Testimonials, CTA
│   │   ├── tools/                    # All 10 tool interfaces + shared ToolPageShell, FileDropzone
│   │   └── ui/                       # ToolCard, FAQSection, Breadcrumb, PageHero, AdSense
│   ├── lib/
│   │   ├── data.ts                   # Tools list, testimonials, blog post metadata, FAQs
│   │   ├── blog-content.ts           # Full blog post content
│   │   └── utils.ts                  # cn(), formatFileSize(), getRelatedTools(), etc.
│   ├── types/index.ts                # Shared TypeScript interfaces
│   └── styles/globals.css            # Tailwind layers, glassmorphism utilities, animations
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
├── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 5. Tool-by-Tool Status

| # | Tool | Status |
|---|------|--------|
| 1 | Background Remover | ✅ Fully working — real AI model (`@imgly/background-removal`), runs client-side |
| 2 | Image Compressor | ✅ Fully working — real compression via `browser-image-compression` |
| 3 | Image Resizer | ✅ Fully working — native Canvas API, no dependency needed |
| 4 | Image to PDF | ✅ Fully working — real PDF generation via `jsPDF` |
| 5 | PDF Compressor | ✅ Working — uses `pdf-lib`'s object-stream optimization. Compression results vary by document; PDFs with large images compress more than text-only PDFs (see Known Limitations) |
| 6 | PDF Merger | ✅ Fully working — real merging via `pdf-lib` |
| 7 | PDF Splitter | ✅ Fully working — real splitting via `pdf-lib` (split-all-pages or page-range modes) |
| 8 | PDF Password Protector | ⚠️ **Partial / requires server-side step** — see explanation below |
| 9 | QR Code Generator | ✅ Fully working — real QR generation via `qrcode` (URL, text, email, Wi-Fi types) |
| 10 | Password Generator | ✅ Fully working — cryptographically secure via Web Crypto API |

### Important note on PDF Password Protector

The `pdf-lib` npm package (the library used for all other PDF tools in this project) **does not include password encryption** in its public API. This is a real, documented limitation of that library — not a bug in this code.

The tool is built to:
1. Accept the file and password input fully (UI is complete and functional)
2. Detect at runtime whether encryption is available
3. If not available, show a clear, honest message explaining that true PDF encryption requires a small server-side addition

**To make this tool produce real encrypted PDFs**, add a server-side API route that shells out to a PDF encryption tool (for example, the `qpdf` command-line utility, or a Node wrapper around it) and have the password protector tool POST the file to that route instead of processing in-browser. This keeps the rest of the architecture (all other 9 tools) completely unchanged. We did not fabricate a fake "encrypted" file or invent an unverified npm package to paper over this — we'd rather tell you exactly what's needed.

---

## 6. SEO Setup

Already configured out of the box:

- ✅ Per-page `<title>` and meta descriptions (via Next.js Metadata API)
- ✅ Open Graph tags (title, description, image, url) on every page
- ✅ Twitter Card tags
- ✅ Canonical URLs on every page
- ✅ Dynamic `sitemap.xml` at `/sitemap.xml` (auto-includes all tools + blog posts)
- ✅ Dynamic `robots.txt` at `/robots.txt`
- ✅ JSON-LD Structured Data: `WebSite`, `Organization`, `SoftwareApplication` (per tool), `BlogPosting`, `BreadcrumbList`
- ✅ Breadcrumb navigation (visual + schema) on all inner pages
- ✅ Internal linking: Related Tools sections, footer category links, blog-to-tool links

### Before going live, update:

1. Replace `https://toolnest.app` throughout the codebase (search for this string) with your real domain — found in `src/app/layout.tsx`, `src/lib/data.ts`, every `page.tsx` metadata block, `sitemap.ts`, and `robots.ts`.
2. Replace `GOOGLE_SITE_VERIFICATION` in `.env.local` with your real Google Search Console verification code, and update `src/app/layout.tsx` → `verification.google`.
3. Submit your sitemap at `https://yourdomain.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
4. Replace the placeholder `og-image.png`, favicons, and `logo.png` in `/public` with your final branded versions (the current ones are generated placeholders so the project runs without 404s).

---

## 7. AdSense Integration

Ad placeholders are already wired into the layout in 4 locations:

- **Header Ad** — top of Home, All Tools, Blog, and every tool page
- **In-Content Ad** — mid-page on tool pages and blog posts
- **Sidebar Ad** — sticky sidebar on tool pages and blog posts (desktop only)
- **Footer Ad** — site-wide footer

**Current status: Placeholder only — requires your AdSense account.** Until you complete the steps below, these render as labeled gray boxes (`src/components/ui/AdSense.tsx`) so the layout looks correct, but no real ads or AdSense script are loaded.

### To activate real ads:

1. Get approved for [Google AdSense](https://www.google.com/adsense) for your domain.
2. Add your publisher ID to `.env.local`:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   ```
3. Open `src/components/ui/AdSense.tsx` and:
   - Uncomment the `<Script>` block inside `AdSenseScript()`
   - Uncomment the real `<ins className="adsbygoogle">` block inside `AdUnit()`
   - Replace the `slot` values passed to `HeaderAd`, `InContentAd`, `SidebarAd`, `FooterAd` with your real ad unit slot IDs from AdSense
4. Rebuild and deploy.

This design keeps all ad placements (header/in-content/sidebar/footer) fixed in the layout — you only need to fill in real IDs, not restructure any pages.

---

## 8. Environment Variables

See `.env.example` for the full list. Required for production:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Your live domain, used in metadata |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Only if using AdSense | Your AdSense publisher ID |
| `GOOGLE_SITE_VERIFICATION` | Recommended | Google Search Console ownership verification |

No environment variables are required to run the project locally in development — all 9 fully-working tools function with zero configuration.

---

## 9. Deployment

### Vercel (recommended, zero-config for Next.js)

```bash
npm install -g vercel
vercel
```
Or connect your Git repository directly at [vercel.com](https://vercel.com) — it will auto-detect Next.js and deploy.

### Other platforms (Netlify, Railway, self-hosted Node server)

```bash
npm run build
npm start
```
Ensure your platform runs Node.js 18.17+ and exposes port 3000 (or set the `PORT` env variable).

---

## 10. Known Limitations

- **PDF Password Protector** requires a server-side addition to produce real encrypted output (see Section 5 above) — the UI and validation logic are complete, but true encryption needs a backend step that isn't included by default to avoid relying on an unverified package.
- **PDF Compressor** results vary significantly by document type. PDFs containing large embedded images will see meaningful size reduction; text-only PDFs (already efficiently encoded) will see minimal change. This is a property of the PDF format itself, not a tool defect.
- **Background Remover** requires WebAssembly support (all modern browsers from the last several years support this) and downloads a small AI model on first use per browser — this requires an internet connection the first time.
- **Contact form** currently shows a success state on submit but does not send a real email yet — wire it to an email API (Resend, SendGrid, or a custom `/api/contact` route) before relying on it in production. Instructions are in `.env.example`.
- Placeholder favicons, OG image, and logo are programmatically generated for completeness — swap in your final brand assets before launch.

---

## 11. Support

For questions about this codebase, contact: **hadiazeem694@gmail.com**
