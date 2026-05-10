// ─── Types ────────────────────────────────────────────────────────────────────

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';
export type SkillCategoryKey = 'primary' | 'frontend' | 'backend' | 'database' | 'tools';

export interface Skill {
  name: string;
  icon: string;
  level: SkillLevel;
  yearsOfExp?: number;
  highlighted?: boolean;
}

export interface SkillCategory {
  key: SkillCategoryKey;
  category: { id: string; en: string };
  icon: string;
  skills: Skill[];
}

// ─── Level Map ────────────────────────────────────────────────────────────────

export const levelMap: Record<SkillLevel, number> = {
  beginner:     20,
  intermediate: 50,
  advanced:     75,
  expert:       95,
};

export const levelLabel: Record<SkillLevel, { id: string; en: string }> = {
  beginner:     { id: 'Pemula',    en: 'Beginner'     },
  intermediate: { id: 'Menengah', en: 'Intermediate'  },
  advanced:     { id: 'Mahir',    en: 'Advanced'      },
  expert:       { id: 'Ahli',     en: 'Expert'        },
};

// ─── Skills Data ──────────────────────────────────────────────────────────────

export const skills: SkillCategory[] = [
  // ── 1. Primary ──────────────────────────────────────────────────────────────
  {
    key: 'primary',
    category: { id: 'Keahlian Utama', en: 'Core Skills' },
    icon: '⭐',
    skills: [
      { name: 'React',       icon: '⚛️',  level: 'advanced',     yearsOfExp: 2, highlighted: true },
      { name: 'JavaScript',  icon: '🟨',  level: 'advanced',     yearsOfExp: 3, highlighted: true },
      { name: 'PHP',         icon: '🐘',  level: 'intermediate', yearsOfExp: 2, highlighted: true },
      { name: 'Laravel',     icon: '🔴',  level: 'intermediate', yearsOfExp: 2, highlighted: true },
      { name: 'Figma',       icon: '🎨',  level: 'advanced',     yearsOfExp: 2, highlighted: true },
      { name: 'HTML / CSS',  icon: '🌐',  level: 'expert',       yearsOfExp: 3, highlighted: true },
    ],
  },

  // ── 2. Frontend ─────────────────────────────────────────────────────────────
  {
    key: 'frontend',
    category: { id: 'Frontend', en: 'Frontend' },
    icon: '🖥️',
    skills: [
      { name: 'HTML5',         icon: '🌐',  level: 'expert',       yearsOfExp: 3 },
      { name: 'CSS3',          icon: '🎨',  level: 'expert',       yearsOfExp: 3 },
      { name: 'JavaScript',    icon: '🟨',  level: 'advanced',     yearsOfExp: 3 },
      { name: 'React',         icon: '⚛️',  level: 'advanced',     yearsOfExp: 2 },
      { name: 'Bootstrap',     icon: '🅱️',  level: 'advanced',     yearsOfExp: 2 },
      { name: 'Tailwind CSS',  icon: '🎐',  level: 'intermediate', yearsOfExp: 1 },
    ],
  },

  // ── 3. Backend ──────────────────────────────────────────────────────────────
  {
    key: 'backend',
    category: { id: 'Backend', en: 'Backend' },
    icon: '⚙️',
    skills: [
      { name: 'PHP',     icon: '🐘',  level: 'intermediate', yearsOfExp: 2 },
      { name: 'Laravel', icon: '🔴',  level: 'intermediate', yearsOfExp: 2 },
      { name: 'Python',  icon: '🐍',  level: 'intermediate', yearsOfExp: 2 },
      { name: 'Java',    icon: '☕',  level: 'beginner',     yearsOfExp: 1 },
    ],
  },

  // ── 4. Database ─────────────────────────────────────────────────────────────
  {
    key: 'database',
    category: { id: 'Database', en: 'Database' },
    icon: '🗄️',
    skills: [
      { name: 'MySQL', icon: '🐬', level: 'intermediate', yearsOfExp: 2 },
      { name: 'SQL',   icon: '🗄️', level: 'intermediate', yearsOfExp: 2 },
    ],
  },

  // ── 6. Tools & DevOps ───────────────────────────────────────────────────────
  {
    key: 'tools',
    category: { id: 'Tools & Lainnya', en: 'Tools & Others' },
    icon: '🔧',
    skills: [
      { name: 'Figma',     icon: '🎨',  level: 'advanced',     yearsOfExp: 2 },
      { name: 'WordPress', icon: '🌐',  level: 'intermediate', yearsOfExp: 1 },
      { name: 'Git',       icon: '📦',  level: 'intermediate', yearsOfExp: 2 },
      { name: 'GitHub',    icon: '🐙',  level: 'intermediate', yearsOfExp: 2 },
      { name: 'VS Code',   icon: '💙',  level: 'advanced',     yearsOfExp: 3 },
    ],
  },
];
