// ─── Types ────────────────────────────────────────────────────────────────────

export interface LocalizedString {
  id: string;
  en: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  instagram: string;
  tiktok: string;
  email: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: LocalizedString;
  field: LocalizedString;
  period: string;
  gpa?: string;
  description: LocalizedString;
  logo?: string;
}

export interface Experience {
  id: number;
  company: string;
  fullCompanyName?: string;
  logo?: string;
  flag?: string;
  role: LocalizedString;
  type: 'fulltime' | 'parttime' | 'freelance' | 'internship';
  mode: 'hybrid' | 'remote' | 'onsite';
  period: string;
  current: boolean;
  description: LocalizedString;
  responsibilities: LocalizedString[];
  learnings?: LocalizedString[];
  impact?: LocalizedString[];
  tech: string[];
  location: string;
}

// ─── Profile ──────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Bramasta',
  fullName: 'Bramasta Dhuanda Prastiko',
  nickname: 'Bram',
  role: {
    id: 'Full-Stack Developer & UI/UX Designer',
    en: 'Full-Stack Developer & UI/UX Designer',
  },
  email: 'bramasta06alam3@gmail.com',
  phone: '+62 812-3874-9581',
  location: {
    city: 'Bandung',
    country: 'Indonesia',
    flag: '🇮🇩',
  },
  status: {
    available: true,
    label: {
      id: 'Terbuka untuk Peluang Baru',
      en: 'Open to New Opportunities',
    },
  },
  bio: {
    short: {
      id: 'Fresh graduate Teknik Informatika yang passionate dalam full stack web development dan UI/UX design.',
      en: 'Fresh graduate in Informatics Engineering passionate about full stack web development and UI/UX design.',
    },
    long: {
      id: 'Saya adalah fresh graduate Teknik Informatika dari Universitas Telkom (IPK 3.21/4.00), membangun karier di persimpangan antara kode yang bersih dan desain yang intuitif. Fokus saya adalah membangun aplikasi web yang responsif dan pixel-perfect — mulai dari mengonversi mockup Figma menjadi kode siap produksi, hingga membangun solusi full-stack dengan React, Laravel, dan PHP.\n\nSaya telah berkesempatan magang di tiga perusahaan: saat ini di Mores Strategics sebagai Full Stack Engineer, di mana saya bekerja erat bersama tim desain untuk menghidupkan antarmuka; sebelumnya di PT Global Tekno Solusi sebagai Frontend Developer selama lebih dari setahun; dan juga magang berbasis proyek di HUMIC Engineering Research Center sebagai WordPress Specialist.\n\nSaya percaya produk yang hebat lahir dari kolaborasi mendalam antara desain dan rekayasa. Di luar pekerjaan, saya aktif mengeksplorasi tren UI/UX, mengasah kemampuan front-end, dan membangun proyek pribadi yang memecahkan masalah nyata di kehidupan sehari-hari.',
      en: "I'm a fresh graduate in Informatics Engineering from Telkom University (GPA 3.21/4.00), building my career at the intersection of clean code and intuitive design. My focus is on crafting responsive, pixel-perfect web applications — from converting Figma mockups into production-ready code to building full-stack solutions with React, Laravel, and PHP.\n\nI've had the opportunity to intern at three companies: currently at Mores Strategics as a Full Stack Engineer, working closely with design teams to bring interfaces to life; previously at PT Global Tekno Solusi as a Frontend Developer for over a year; and a project-based stint at HUMIC Engineering Research Center as a WordPress Specialist.\n\nI believe great products come from deep collaboration between design and engineering. Outside of work, I actively explore UI/UX trends, sharpen my front-end skills, and build personal projects that solve real-world problems.",
    },
  },
  avatar: '/images/avatar.jpeg',
  ogImage: '/images/avatar.jpeg',
  socials: {
    github:    'https://github.com/BramastaDP',
    linkedin:  'https://www.linkedin.com/in/bramastadhuandaprastiko/',
    twitter:   '',
    instagram: 'https://www.instagram.com/bramasta_dp/',
    tiktok:    'https://www.tiktok.com/@ke.facts',
    email:     'mailto:bramasta06alam3@gmail.com',
  } satisfies SocialLinks,
  cv:      '/files/CV_Bramasta_Updated.pdf',
  website: '',
};

// ─── Stats ────────────────────────────────────────────────────────────────────

export const stats = [
  { value: '2+',  label: { id: 'Tahun Pengalaman',  en: 'Years Experience'    } },
  { value: '5+',  label: { id: 'Proyek Selesai',    en: 'Projects Completed'  } },
  { value: '3+',  label: { id: 'Klien Dilayani',    en: 'Clients Served'      } },
  { value: '10+', label: { id: 'Sertifikasi',       en: 'Certifications'      } },
];

// ─── Education ────────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    id: 1,
    institution: 'Telkom University',
    logo: '/images/logos/logo%20telkom%20university.png',
    degree: {
      id: 'Sarjana Teknik Informatika',
      en: 'Bachelor of Informatics Engineering',
    },
    field: {
      id: 'Teknik Informatika',
      en: 'Informatics Engineering',
    },
    period: 'Sep 2021 – Aug 2025',
    gpa: '3.21 / 4.00',
    description: {
      id: 'Mata kuliah relevan: Algoritma & Pemrograman (Python), Pemrograman Berorientasi Objek (Java), Desain UX (Figma), Desain Interaksi, Pengantar Pemrograman & Logika (JavaScript & PHP), serta Analisis dan Desain Sistem Informasi.',
      en: 'Relevant coursework: Algorithms & Programming (Python), Object-Oriented Programming (Java), User Experience Design (Figma), Interaction Design, Introduction to Programming & Logic (JavaScript & PHP), and Analysis and Design of Information Systems.',
    },
  },
];

// ─── Experience ───────────────────────────────────────────────────────────────

export const experience: Experience[] = [
  {
    id: 1,
    company: 'Mores Strategics',
    logo: '/images/logos/mores%20strategic.jpeg',
    flag: '🇮🇩',
    role: { id: 'Full Stack Engineer', en: 'Full Stack Engineer' },
    type: 'internship',
    mode: 'hybrid',
    period: 'Apr 2026 – Present',
    current: true,
    description: {
      id: 'Magang sebagai Full Stack Engineer, mengonversi desain Figma menjadi kode HTML/CSS/JS yang responsif dan pixel-perfect untuk meningkatkan pengalaman pengguna.',
      en: 'Interning as a Full Stack Engineer, converting Figma designs into responsive, pixel-perfect HTML/CSS/JS code to enhance user experience.',
    },
    responsibilities: [
      {
        id: 'Mengonversi mockup Figma menjadi kode HTML/CSS/JS yang responsif dan pixel-perfect, mengurangi waktu handoff desain-ke-kode secara signifikan',
        en: 'Converted Figma mockups into responsive, pixel-perfect HTML/CSS/JS code, reducing design-to-code handoff time significantly',
      },
      {
        id: 'Membangun komponen UI dinamis termasuk menu navigasi, tombol interaktif, dan efek animasi CSS untuk meningkatkan pengalaman pengguna',
        en: 'Built dynamic UI components including navigation menus, interactive buttons, and CSS animation effects to enhance user experience',
      },
      {
        id: 'Berkolaborasi erat dengan tim desain untuk memastikan konsistensi visual dan kompatibilitas lintas browser',
        en: 'Collaborated closely with the design team to ensure visual consistency and cross-browser compatibility',
      },
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Figma'],
    location: 'Bandung, Indonesia',
  },
  {
    id: 2,
    company: 'PT Global Tekno Solusi',
    flag: '🇮🇩',
    role: { id: 'Frontend Developer', en: 'Frontend Developer' },
    type: 'internship',
    mode: 'remote',
    period: 'Jul 2024 – Aug 2025',
    current: false,
    description: {
      id: 'Magang sebagai Frontend Developer, berfokus pada konversi desain (slicing), pengembangan interaksi, serta optimasi performa dan UX website.',
      en: 'Internship as Frontend Developer, focused on design conversion (slicing), interaction development, and website performance & UX optimization.',
    },
    responsibilities: [
      {
        id: 'Konversi desain (slicing): mengonversi desain visual dari mockup Figma menjadi struktur kode yang fungsional dan presisi',
        en: 'Design Conversion (Slicing): converting visual designs from Figma mockups into functional and precise code structures',
      },
      {
        id: 'Pengembangan interaksi: membangun komponen antarmuka dinamis termasuk navigasi, tombol, dan efek animasi untuk menghidupkan website',
        en: 'Interaction Development: building dynamic interface components including navigation, buttons, and animation effects to bring websites to life',
      },
      {
        id: 'Optimasi performa & UX: memastikan performa website yang cepat, tampilan responsif di semua ukuran layar, dan pengalaman pengguna yang nyaman',
        en: 'Performance & UX Optimization: ensuring fast website performance, responsive display on all screen sizes, and a comfortable user experience',
      },
    ],
    learnings: [
      {
        id: 'Memahami alur kerja frontend profesional dari desain hingga produksi dalam lingkungan tim nyata',
        en: 'Understood the professional frontend workflow from design to production in a real team environment',
      },
      {
        id: 'Mengasah kemampuan slicing Figma yang akurat dan membangun komponen yang dapat digunakan kembali',
        en: 'Sharpened accurate Figma slicing skills and building reusable components',
      },
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    location: 'Remote',
  },
  {
    id: 3,
    company: 'HUMIC Engineering Research Center',
    logo: '/images/logos/logo-humic-text-207x86px.png',
    fullCompanyName: 'HUMIC Engineering Research Center — Telkom University',
    flag: '🇮🇩',
    role: { id: 'WordPress Specialist', en: 'WordPress Specialist' },
    type: 'internship',
    mode: 'hybrid',
    period: 'May 2024 – Jun 2024',
    current: false,
    description: {
      id: 'Magang berbasis proyek sebagai WordPress Specialist, mengembangkan dan meluncurkan website resmi CoE Humic Engineering dari awal hingga produksi.',
      en: 'Project-based internship as WordPress Specialist, developing and launching the official CoE Humic Engineering website from setup to production.',
    },
    responsibilities: [
      {
        id: 'Mengembangkan dan meluncurkan website CoE Humic Engineering menggunakan WordPress, mencakup setup lengkap, theming, dan konfigurasi plugin',
        en: 'Developed and launched the CoE Humic Engineering website using WordPress, covering full setup, theming, and plugin configuration',
      },
      {
        id: 'Mengimplementasikan halaman Research Products dan Community Service, meningkatkan keterdapatan konten pusat riset',
        en: 'Implemented the Research Products page and Community Service page, improving content discoverability for the research center',
      },
      {
        id: 'Berkoordinasi dengan tim riset untuk menyelaraskan struktur website dengan tujuan organisasi dan kebutuhan konten',
        en: 'Coordinated with the research team to align website structure with organizational goals and content requirements',
      },
    ],
    impact: [
      {
        id: 'Meluncurkan website resmi yang meningkatkan visibilitas online HUMIC Engineering Research Center',
        en: 'Launched the official website, improving the online visibility of HUMIC Engineering Research Center',
      },
    ],
    tech: ['WordPress', 'PHP', 'HTML', 'CSS'],
    location: 'Bandung, Indonesia',
  },
  {
    id: 4,
    company: 'HIMAIF Telkom University',
    logo: '/images/logos/bpm%20hima%20if.jpeg',
    fullCompanyName: 'Himpunan Mahasiswa Informatika — Telkom University (HIMAIF)',
    flag: '🇮🇩',
    role: { id: 'Staf DURT — Badan Perwakilan Mahasiswa', en: 'DURT Staff — Student Representative Body (BPM)' },
    type: 'parttime',
    mode: 'onsite',
    period: 'Jan 2023 – Dec 2023',
    current: false,
    description: {
      id: 'Berperan sebagai Staf DURT di Badan Perwakilan Mahasiswa (BPM) HIMAIF, mengelola penjadwalan internal dan acara organisasi.',
      en: 'Served as DURT Staff in the Student Representative Body (BPM) of HIMAIF, managing internal scheduling and organizational events.',
    },
    responsibilities: [
      {
        id: 'Memimpin dan mengarahkan tim staf magang dalam mengelola seluruh penjadwalan internal dan acara organisasi',
        en: 'Led and directed a team of intern staff in managing all internal scheduling and organizational events',
      },
      {
        id: 'Berkoordinasi dengan administrasi kampus dan pihak eksternal untuk acara kolaboratif lintas departemen',
        en: 'Coordinated with campus administration and external parties for cross-departmental collaborative events',
      },
      {
        id: 'Memfasilitasi kegiatan kohesi tim dan mengelola komunikasi internal lintas organisasi',
        en: 'Facilitated team cohesion activities and managed internal communication across the organization',
      },
    ],
    tech: [],
    location: 'Bandung, Indonesia',
  },
];
