# Bramasta Dhuanda Prastiko — Portfolio

Personal portfolio website built with Next.js 14, featuring bilingual support (ID/EN), smooth animations, and a clean dark-themed UI.

**Live:** [bramasta.dev](https://bramasta.dev)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion |
| i18n | next-intl (ID / EN) |
| Theme | next-themes (dark / light) |
| Forms | React Hook Form + Zod |
| Icons | Lucide React + React Icons |
| UI Primitives | Radix UI + Base UI |

---

## Features

- **Bilingual** — Indonesian (default) and English, switchable per-session
- **Splash screen** — intro animation shown once per browser tab session
- **Animations** — scroll progress bar, cursor spotlight, typewriter, 3D card tilt, magnetic button, timeline draw, text reveal
- **Command palette** — `⌘K` / `Ctrl+K` for quick navigation
- **SEO-ready** — `generateMetadata()` per page, Open Graph, Twitter Card, canonical URLs, `hreflang`, `sitemap.xml`, `robots.txt`
- **Accessible** — `aria-label` on all icon buttons, keyboard navigation (Escape closes modals), screen-reader friendly
- **Optimized images** — `next/image` with lazy loading and automatic WebP/AVIF conversion

### Pages

| Route | Description |
|---|---|
| `/` | Hero, featured project teaser, skills grid |
| `/about` | Bio, career timeline, education |
| `/projects` | Filterable project grid with 3D tilt cards and detail modal |
| `/achievements` | Certificate gallery with search, filter, and detail modal |
| `/contact` | Social links + email contact form |

---

## Getting Started

### Prerequisites

- Node.js ≥ 18.17
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/BramastaDP/portofolio.git
cd portofolio
npm install
```

### Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

For production, set this to your actual domain (e.g. `https://bramasta.dev`).

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

---

## Project Structure

```
portofolio/
├── app/
│   ├── [locale]/          # Locale-scoped routes (id default, en prefixed)
│   │   ├── layout.tsx
│   │   ├── page.tsx       # Home
│   │   ├── about/
│   │   ├── projects/
│   │   ├── achievements/
│   │   └── contact/
│   ├── globals.css
│   ├── layout.tsx         # Root layout (fonts, metadataBase)
│   └── sitemap.ts
├── components/
│   ├── layout/            # Sidebar, MobileNav, SplashScreen, CommandPalette, etc.
│   ├── sections/          # Page-level section components
│   └── ui/                # Reusable primitives (scroll-progress, cursor-spotlight, etc.)
├── data/
│   ├── profile.ts         # Personal info, experience, education
│   ├── projects.ts
│   ├── achievements.ts
│   └── skills.ts
├── messages/
│   ├── id.json            # Indonesian translations
│   └── en.json            # English translations
├── hooks/
│   └── useI18n.ts
└── public/
    ├── images/            # Project thumbnails, logos, avatar
    ├── files/             # CV PDF
    └── robots.txt
```

---

## Internationalization

Uses `next-intl` with `localePrefix: 'as-needed'`:

- `https://bramasta.dev/` → Bahasa Indonesia (default)
- `https://bramasta.dev/en/` → English

Locale preference is persisted via `localStorage` and synced to `NEXT_LOCALE` cookie for server-side routing.

---

## Deployment

Optimized for [Vercel](https://vercel.com). One-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/BramastaDP/portofolio)

**Required environment variable on Vercel:**

```
NEXT_PUBLIC_BASE_URL=https://bramasta.dev
```

---

## License

MIT — free to use as reference or template. Attribution appreciated but not required.

---

*Built by [Bramasta Dhuanda Prastiko](https://bramasta.dev)*
