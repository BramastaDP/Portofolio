// ─── Types ────────────────────────────────────────────────────────────────────

export type ProjectCategory = 'web' | 'mobile' | 'fullstack' | 'ai' | 'other';
export type ProjectType = 'personal' | 'freelance' | 'internship' | 'competition';

export interface Project {
  id: number;
  slug: string;
  title: string;
  description: { id: string; en: string };
  longDescription: { id: string; en: string };
  thumbnail: string;
  screenshots?: string[];
  techStack: string[];
  category: ProjectCategory;
  type: ProjectType;
  featured: boolean;
  year: number;
  duration?: string;
  teamSize?: number;
  role?: { id: string; en: string };
  liveUrl?: string;
  githubUrl?: string;
  status: 'completed' | 'in-progress' | 'archived';
  reactions?: { emoji: string; count: number }[];
}

// ─── Projects Data ────────────────────────────────────────────────────────────

export const projects: Project[] = [

  // ── 1. AI Video Automation Platform ──────────────────────────────────────────
  {
    id: 1,
    slug: 'ai-video-automation',
    title: 'AI Video Automation Platform',
    description: {
      id: 'Aplikasi otomatisasi editing video berbasis AI yang mengubah video panjang menjadi konten vertikal (TikTok/Reels) secara instan.',
      en: 'AI-powered video editing automation app that instantly converts long-form videos into vertical short-form content (TikTok/Reels).',
    },
    longDescription: {
      id: 'Dibuat untuk mengatasi masalah editing manual yang memakan waktu, aplikasi ini menggabungkan kekuatan Python (Backend) untuk pemrosesan media berat dan Next.js (Frontend) untuk antarmuka yang modern dan responsif.\n\nFitur utama mencakup deteksi otomatis highlight video, cropping vertikal cerdas, subtitle auto-generate, dan ekspor langsung ke format siap upload. Backend Python menangani pipeline pemrosesan video menggunakan FFmpeg dan model AI, sementara frontend Next.js menyajikan antarmuka drag-and-drop yang intuitif untuk mengatur dan mengekspor konten.',
      en: 'Built to solve the problem of time-consuming manual video editing, this app combines the power of Python (Backend) for heavy media processing and Next.js (Frontend) for a modern, responsive interface.\n\nKey features include automatic video highlight detection, smart vertical cropping, auto-generated subtitles, and direct export to upload-ready formats. The Python backend handles the video processing pipeline using FFmpeg and AI models, while the Next.js frontend delivers an intuitive drag-and-drop interface for organizing and exporting content.',
    },
    thumbnail: '/images/projects/ai-video-editor-automation.png',
    techStack: ['Python', 'Next.js', 'TypeScript', 'FFmpeg', 'FastAPI', 'Tailwind CSS'],
    category: 'ai',
    type: 'personal',
    featured: true,
    year: 2025,
    duration: '',
    teamSize: 1,
    role: { id: 'Full-Stack Developer', en: 'Full-Stack Developer' },
    githubUrl: 'https://github.com/BramastaDP/ai-video-editor-automation',
    status: 'in-progress',
    reactions: [{ emoji: '🤖', count: 9 }, { emoji: '🔥', count: 7 }, { emoji: '⭐', count: 5 }],
  },

  // ── 2. Personal Portfolio ─────────────────────────────────────────────────────
  {
    id: 2,
    slug: 'personal-portfolio',
    title: 'Personal Portfolio Website',
    description: {
      id: 'Website portofolio personal dengan dukungan dua bahasa (ID/EN), animasi Framer Motion, splash screen, command palette, dan optimasi SEO lengkap.',
      en: 'Personal portfolio website with bilingual support (ID/EN), Framer Motion animations, splash screen, command palette, and full SEO optimization.',
    },
    longDescription: {
      id: 'Dibangun dari nol menggunakan Next.js 14 App Router dan TypeScript, website ini dirancang untuk menampilkan karya dan perjalanan karier secara profesional.\n\nFitur utama mencakup dukungan dua bahasa (Bahasa Indonesia dan Inggris) menggunakan next-intl, animasi halus dengan Framer Motion (scroll progress, cursor spotlight, typewriter, 3D card tilt, magnetic button, timeline draw), splash screen intro sekali per sesi, command palette ⌘K untuk navigasi cepat, dark/light mode, serta SEO lengkap dengan Open Graph, Twitter Card, canonical URL, sitemap, dan robots.txt.\n\nSemua gambar dioptimasi dengan next/image, font menggunakan next/font, dan aksesibilitas dijaga dengan aria-label pada setiap tombol interaktif.',
      en: 'Built from scratch using Next.js 14 App Router and TypeScript, this website is designed to professionally showcase work and career journey.\n\nKey features include bilingual support (Bahasa Indonesia and English) via next-intl, smooth animations with Framer Motion (scroll progress, cursor spotlight, typewriter, 3D card tilt, magnetic button, timeline draw), a once-per-session splash screen intro, ⌘K command palette for quick navigation, dark/light mode, and full SEO with Open Graph, Twitter Card, canonical URLs, sitemap, and robots.txt.\n\nAll images are optimized with next/image, fonts via next/font, and accessibility is maintained with aria-labels on every interactive element.',
    },
    thumbnail: '/images/projects/portofolio.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'next-intl', 'React'],
    category: 'web',
    type: 'personal',
    featured: false,
    year: 2025,
    duration: '1 bulan',
    teamSize: 1,
    role: { id: 'Full-Stack Developer & UI Designer', en: 'Full-Stack Developer & UI Designer' },
    liveUrl: 'https://portofolio-five-murex.vercel.app',
    githubUrl: 'https://github.com/BramastaDP/Portofolio',
    status: 'completed',
    reactions: [{ emoji: '🚀', count: 3 }, { emoji: '💯', count: 2 }],
  },

  // ── 3. Pasar Kuliah (PasKu) ───────────────────────────────────────────────────
  {
    id: 3,
    slug: 'pasar-kuliah',
    title: 'Pasar Kuliah (PasKu) — E-Commerce Web App',
    description: {
      id: 'Platform marketplace online untuk mahasiswa Telkom University — jual beli barang lintas kategori dengan fitur pencarian dan filter yang efisien.',
      en: 'Online marketplace platform for Telkom University students — buy and sell goods across categories with efficient search and filter features.',
    },
    longDescription: {
      id: 'Pasar Kuliah (PasKu) adalah marketplace online lengkap yang dibangun khusus untuk mahasiswa Universitas Telkom, memungkinkan mereka membeli dan menjual barang di berbagai kategori produk.\n\nDikembangkan menggunakan arsitektur Laravel MVC, platform ini dilengkapi fitur listing produk, pencarian, dan filter kategori untuk penemuan produk yang cepat dan efisien. Skema database dirancang dari awal dan logika backend menangani manajemen produk, transaksi, serta autentikasi pengguna.',
      en: 'Pasar Kuliah (PasKu) is a full-featured online marketplace built specifically for Telkom University students, enabling them to buy and sell goods across multiple product categories.\n\nDeveloped using Laravel MVC architecture, the platform includes product listing, search, and category filter features for fast and efficient product discovery. The database schema was designed from scratch and the backend logic handles product management, transactions, and user authentication.',
    },
    thumbnail: '/images/projects/Pasar%20kuliah.jpeg',
    techStack: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'JavaScript'],
    category: 'fullstack',
    type: 'personal',
    featured: true,
    year: 2024,
    duration: '2 bulan',
    teamSize: 1,
    role: { id: 'Full-Stack Developer', en: 'Full-Stack Developer' },
    githubUrl: 'https://github.com/BramastaDP/FE-BE_PASKUH',
    status: 'completed',
    reactions: [{ emoji: '😍', count: 7 }, { emoji: '👍', count: 5 }, { emoji: '💡', count: 4 }],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const featuredProjects = projects.filter((p) => p.featured);

export const getProjectBySlug = (slug: string) =>
  projects.find((p) => p.slug === slug);

export const getProjectsByType = (type: ProjectType) =>
  projects.filter((p) => p.type === type);

export const getProjectsByCategory = (category: ProjectCategory) =>
  projects.filter((p) => p.category === category);

export const projectCategories: { key: ProjectCategory | 'all'; label: { id: string; en: string } }[] = [
  { key: 'all',       label: { id: 'Semua',     en: 'All'       } },
  { key: 'web',       label: { id: 'Web',        en: 'Web'       } },
  { key: 'ai',        label: { id: 'AI / ML',    en: 'AI / ML'   } },
  { key: 'fullstack', label: { id: 'Full-Stack', en: 'Full-Stack'} },
];

export const projectTypeLabel: Record<ProjectType, { id: string; en: string; color: string }> = {
  personal:    { id: 'Pribadi',    en: 'Personal',    color: 'blue'   },
  freelance:   { id: 'Freelance',  en: 'Freelance',   color: 'green'  },
  internship:  { id: 'Magang',     en: 'Internship',  color: 'orange' },
  competition: { id: 'Kompetisi', en: 'Competition', color: 'purple' },
};
