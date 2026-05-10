// ─── Types ────────────────────────────────────────────────────────────────────

export type AchievementCategory = 'professional' | 'course' | 'award' | 'recognition';
export type AchievementType = 'certificate' | 'badge';

export interface Achievement {
  id: number;
  title: string;
  issuer: string;
  issuerLogo?: string;
  date: string;           // "MM/YYYY" atau "YYYY"
  expiry?: string;        // "MM/YYYY" — null jika tidak expire
  category: AchievementCategory;
  type: AchievementType;
  description: { id: string; en: string };
  image?: string;
  credentialUrl?: string;
  credentialId?: string;
  tags: string[];
  featured?: boolean;
}

// ─── Category Labels ──────────────────────────────────────────────────────────

export const achievementCategoryLabel: Record<AchievementCategory, { id: string; en: string }> = {
  professional: { id: 'Sertifikasi Profesional', en: 'Professional Certificates' },
  course:       { id: 'Kursus & Pelatihan',      en: 'Courses & Training'        },
  award:        { id: 'Penghargaan',              en: 'Awards'                    },
  recognition:  { id: 'Pengakuan',                en: 'Recognition'               },
};

// ─── Achievements Data ────────────────────────────────────────────────────────

export const achievements: Achievement[] = [

  // ── Professional Certifications (HackerRank) ──────────────────────────────────

  {
    id: 1,
    title: 'SQL (Advanced)',
    issuer: 'HackerRank',
    date: '03/2026',
    category: 'professional',
    type: 'certificate',
    description: {
      id: 'Lulus uji sertifikasi keterampilan SQL tingkat lanjut dari HackerRank, mencakup query kompleks, window functions, CTE, dan optimasi performa database.',
      en: 'Passed HackerRank SQL Advanced skill certification test, covering complex queries, window functions, CTEs, and database performance optimization.',
    },
    image: '/images/achievements/sql_advanced%20certificate.png',
    credentialId: '874D1714634C',
    tags: ['SQL', 'Database', 'Advanced SQL', 'HackerRank'],
    featured: true,
  },
  {
    id: 2,
    title: 'SQL (Intermediate)',
    issuer: 'HackerRank',
    date: '02/2026',
    category: 'professional',
    type: 'certificate',
    description: {
      id: 'Lulus uji sertifikasi keterampilan SQL tingkat menengah dari HackerRank, mencakup query kompleks, JOIN, subquery, dan agregasi data.',
      en: 'Passed HackerRank SQL Intermediate skill certification test, covering complex queries, JOINs, subqueries, and data aggregation.',
    },
    image: '/images/achievements/SQL%20(Intermediate).jpeg',
    credentialId: '220524EE10EO',
    tags: ['SQL', 'Database', 'MySQL', 'HackerRank'],
    featured: true,
  },

  // ── Courses — BuildWithAngga ──────────────────────────────────────────────────

  {
    id: 3,
    title: 'Full-Stack Web Developer',
    issuer: 'BuildWithAngga',
    date: '08/2024',
    category: 'course',
    type: 'certificate',
    description: {
      id: 'Sertifikat kelulusan kelas Full-Stack Web Developer dari BuildWithAngga, mencakup pengembangan frontend dan backend untuk membangun aplikasi web yang lengkap dan siap produksi.',
      en: 'Full-Stack Web Developer course completion certificate from BuildWithAngga, covering frontend and backend development to build complete, production-ready web applications.',
    },
    image: '/images/achievements/fullstack%20developer.jpeg',
    credentialId: 'aRpwcSworf',
    tags: ['Full Stack', 'Web Development', 'Frontend', 'Backend', 'BuildWithAngga'],
    featured: true,
  },
  {
    id: 4,
    title: 'Complete UI Designer: Visual Design, Prototype, Usability Testing',
    issuer: 'BuildWithAngga',
    date: '06/2024',
    category: 'course',
    type: 'certificate',
    description: {
      id: 'Sertifikat kelulusan kelas Complete UI Designer dari BuildWithAngga, mencakup visual design, pembuatan prototipe interaktif, dan usability testing untuk memvalidasi desain.',
      en: 'Complete UI Designer course completion certificate from BuildWithAngga, covering visual design, interactive prototyping, and usability testing to validate design decisions.',
    },
    image: '/images/achievements/Complete%20UI%20Designer-%20Visual%20Design%2C%20Prototype%2C%20Usability%20Testing.jpeg',
    credentialId: 'dFoyWP19jc',
    tags: ['UI Design', 'Figma', 'Prototype', 'Usability Testing', 'Visual Design', 'BuildWithAngga'],
    featured: true,
  },

  // ── Courses — Rakamin Academy ─────────────────────────────────────────────────

  {
    id: 5,
    title: 'Kickstart UI UX Design Journey',
    issuer: 'Rakamin Academy',
    date: '07/2023',
    category: 'course',
    type: 'certificate',
    description: {
      id: 'Sertifikat partisipasi program Kickstart UI UX Design Journey dari Rakamin Academy, membahas fondasi UI/UX design, alur kerja desain profesional, dan pembuatan antarmuka yang efektif.',
      en: 'Certificate of participation in the Kickstart UI UX Design Journey program by Rakamin Academy, covering UI/UX design fundamentals, professional design workflows, and effective interface creation.',
    },
    image: '/images/achievements/Kickstart%20UI%20UX%20Design%20Journey.jpeg',
    credentialId: '213904UI_UX1072023',
    tags: ['UI', 'UX', 'Design', 'Figma', 'Rakamin Academy'],
    featured: false,
  },

];
