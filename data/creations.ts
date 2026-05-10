export type Platform = 'tiktok' | 'instagram';

export interface Creation {
  id: string;
  title: { id: string; en: string };
  description: { id: string; en: string };
  platform: Platform;
  gradient: string;
  accent: string;
  views: string;
  likes: string;
  url?: string;
}

export const creations: Creation[] = [
  {
    id: 'c1',
    title: {
      id: 'Saya Bikin Full-Stack App dalam 24 Jam',
      en: 'I Built a Full-Stack App in 24 Hours',
    },
    description: {
      id: 'Next.js + Supabase + Deploy ke Vercel',
      en: 'Next.js + Supabase + Deploy to Vercel',
    },
    platform: 'tiktok',
    gradient: 'from-violet-500/20 to-purple-900/30',
    accent: 'text-violet-400',
    views: '48.2K',
    likes: '3.1K',
  },
  {
    id: 'c2',
    title: {
      id: '5 TypeScript Tips yang Harus Kamu Tahu',
      en: '5 TypeScript Tips Every Dev Should Know',
    },
    description: {
      id: 'Generics, Utility Types, dan lainnya',
      en: 'Generics, Utility Types, and more',
    },
    platform: 'instagram',
    gradient: 'from-pink-500/20 to-rose-900/30',
    accent: 'text-pink-400',
    views: '21.7K',
    likes: '1.8K',
  },
  {
    id: 'c3',
    title: {
      id: 'React Hooks Dijelaskan Secara Simpel',
      en: 'React Hooks Explained Simply',
    },
    description: {
      id: 'useState, useEffect, custom hooks',
      en: 'useState, useEffect, custom hooks',
    },
    platform: 'tiktok',
    gradient: 'from-cyan-500/20 to-sky-900/30',
    accent: 'text-cyan-400',
    views: '62.4K',
    likes: '5.2K',
  },
  {
    id: 'c4',
    title: {
      id: 'Setup Development Saya di 2025',
      en: 'My Development Setup in 2025',
    },
    description: {
      id: 'VSCode + Terminal + Tools favorit saya',
      en: 'VSCode + Terminal + my favorite tools',
    },
    platform: 'instagram',
    gradient: 'from-amber-500/20 to-orange-900/30',
    accent: 'text-amber-400',
    views: '34.9K',
    likes: '2.7K',
  },
  {
    id: 'c5',
    title: {
      id: 'Debugging Seperti Senior Developer',
      en: 'Debugging Like a Senior Developer',
    },
    description: {
      id: 'Teknik dan mindset yang jarang diajarkan',
      en: 'Techniques and mindset rarely taught',
    },
    platform: 'tiktok',
    gradient: 'from-emerald-500/20 to-green-900/30',
    accent: 'text-emerald-400',
    views: '89.1K',
    likes: '7.6K',
  },
];
