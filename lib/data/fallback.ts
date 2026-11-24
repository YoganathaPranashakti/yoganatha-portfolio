import type {
  Certification,
  Education,
  Experience,
  Profile,
  Project,
  Skill,
  Testimonial,
} from "@/lib/types";

/**
 * Verified fallback content used when Supabase is not configured or unavailable.
 *
 * Sources: PRD.md (owner-provided facts) and the owner's public GitHub profile /
 * repositories inspected on 2026-11-24. Anything unverifiable is deliberately
 * absent rather than invented. See docs/AUDIT.md for the full inventory.
 */

export const fallbackProfile: Profile = {
  id: "verified-fallback",
  headline: "Full-Stack Web Developer & QA Enthusiast",
  summary:
    "Information Systems graduate at Universitas Buddhi Dharma (GPA 3.71) who builds full-stack web applications and progressive web apps, with an interest in system analysis and software quality assurance.",
  location: null,
  availability: "Open to collaboration and entry-level opportunities",
  about:
    "I am an Information Systems graduate who enjoys turning a problem into a working, usable product. My GitHub profile describes me as a full-stack web developer and QA enthusiast, and my recent work includes a progressive web app built entirely in the browser. I am interested in PHP, Laravel, MySQL, JavaScript, system analysis (UML/SDLC), and black-box and SUS testing — areas I am actively developing rather than claiming as senior expertise.",
  philosophy:
    "I prefer simple, understandable implementations: verify the requirement, build the smallest useful version, then test the way a real user would. Privacy and low-friction access matter to me, which is why Cyclela keeps data on the device instead of a server.",
  updated_at: null,
};

export const fallbackProjects: Project[] = [
  {
    id: "cyclela-verified",
    slug: "cyclela",
    title: "Cyclela",
    description:
      "A private, installable menstrual cycle tracker PWA that runs entirely in the browser — no backend, no account, no data leaving the device.",
    thumbnail: "/images/projects/cyclela-home.jpg",
    gallery: [
      "/images/projects/cyclela-home.jpg",
      "/images/projects/cyclela-calendar.jpg",
      "/images/projects/cyclela-journal.jpg",
      "/images/projects/cyclela-settings.jpg",
    ],
    category: "Progressive Web App",
    technologies: [
      "HTML5",
      "CSS",
      "Tailwind CSS",
      "JavaScript (ES6)",
      "Web Audio API",
      "Service Worker",
      "localStorage",
    ],
    role: "Solo developer — the repository has a single contributor.",
    features: [
      "Dashboard with current cycle day, phase and next-period estimate",
      "Cycle calendar with period marking and forecasting",
      "Daily journal for mood, cramp level, symptoms and notes",
      "Settings for cycle length, audio, volume and language",
      "On-device sound effects and background music via Web Audio API",
      "Installable PWA with offline caching",
      "Bahasa Indonesia and English interface (i18n)",
    ],
    challenges: [
      "The app needed to work without any server or account.",
      "It had to remain usable offline and after installation.",
      "Two languages and per-device preferences had to persist locally.",
    ],
    solutions: [
      "All state is stored in localStorage — nothing is sent to a server.",
      "A service worker and web app manifest provide offline use and installation.",
      "An i18n layer and preference storage keep language and settings on the device.",
    ],
    results: [
      "Public demo deployed at cyclela.vercel.app.",
      "Installable and usable offline after the first visit.",
      "Bilingual (ID/EN) interface with on-device privacy.",
    ],
    overview:
      'Cyclela ("Cycle Angela") is a personal, mobile-first progressive web app for tracking the menstrual cycle and logging daily health. It runs entirely in the browser with data stored in localStorage, and no backend or server.',
    problem:
      "Cycle tracking can be done privately on a device without requiring an account or sending personal health notes to a remote service.",
    objectives: [
      "Provide a clear daily view of cycle phase and estimates",
      "Let the owner record period days and daily health notes",
      "Work offline and be installable on a home screen",
      "Support Bahasa Indonesia and English",
    ],
    process: [
      "Built the interface and logic as a small no-build static app (index.html + app.js).",
      "Added a service worker and manifest for PWA installation and offline caching.",
      "Added an i18n layer and on-device audio generated with the Web Audio API.",
      "Documented the app bilingually and captured screenshots for the repository.",
    ],
    live_url: "https://cyclela.vercel.app/",
    github_url: "https://github.com/YoganathaPranashakti/Cyclela",
    featured: true,
    published: true,
  },
  {
    id: "personal-first-site",
    slug: "first-website",
    title: "Personal — First Website",
    description:
      "My first static website: a single-page Hello World site with a topographic background, deployed to Vercel.",
    thumbnail: null,
    gallery: [],
    category: "Learning Milestone",
    technologies: ["HTML5", "CSS", "Vercel"],
    role: "Solo developer — the repository has a single contributor.",
    features: [
      "Single self-contained index.html (HTML + inline CSS, no build step)",
      "Responsive layout with a green topographic background",
      "Deployed as a static site on Vercel",
    ],
    challenges: [
      "Keep the first site simple enough to run by opening a single file.",
    ],
    solutions: [
      "Used plain HTML and CSS with no build tooling, then deployed the static folder directly.",
    ],
    results: [
      "Live at yoganatha-pranashakti.vercel.app at the time of inspection.",
    ],
    overview:
      "The repository describes this as \"Website pertama saya — satu halaman statis berisi Hello World\" (my first website — a single static page with Hello World). The topographic background was adapted from a 21st.dev component and ported to vanilla JavaScript.",
    problem: "A first, low-friction step into publishing a website on the web.",
    objectives: ["Publish a first static page", "Learn the deploy workflow"],
    process: [
      "Wrote a single index.html file with HTML and CSS.",
      "Ported a topographic background component to vanilla JavaScript.",
      "Deployed the static site to Vercel.",
    ],
    live_url: "https://yoganatha-pranashakti.vercel.app/",
    github_url: "https://github.com/YoganathaPranashakti/Personal",
    featured: false,
    published: true,
  },
];

export const fallbackSkills: Skill[] = [
  // Programming languages — GitHub profile README badges
  ["HTML5", "Programming Languages", "Listed on GitHub profile"],
  ["CSS3", "Programming Languages", "Listed on GitHub profile"],
  ["JavaScript", "Programming Languages", "Verified in Cyclela repository"],
  ["TypeScript", "Programming Languages", "Listed on GitHub profile"],
  ["PHP", "Programming Languages", "Stated interest on GitHub profile"],
  ["Java", "Programming Languages", "Listed on GitHub profile"],
  ["Dart", "Programming Languages", "Listed on GitHub profile (Flutter)"],
  // Frontend
  ["React", "Frontend Development", "Listed on GitHub profile"],
  ["Next.js", "Frontend Development", "Listed on GitHub profile"],
  ["Bootstrap", "Frontend Development", "Listed on GitHub profile"],
  ["Tailwind CSS", "Frontend Development", "Verified in Cyclela repository"],
  ["Framer", "Frontend Development", "Listed on GitHub profile"],
  // Backend
  ["Laravel", "Backend Development", "Stated interest on GitHub profile"],
  ["Node.js", "Backend Development", "Listed on GitHub profile"],
  // Database
  ["MySQL", "Database", "Stated interest on GitHub profile"],
  ["MariaDB", "Database", "Listed on GitHub profile"],
  ["SQLite", "Database", "Listed on GitHub profile"],
  // Tools & platforms
  ["Git", "Tools and Platforms", "Listed on GitHub profile"],
  ["Figma", "Tools and Platforms", "Listed on GitHub profile"],
  ["Photoshop", "Tools and Platforms", "Listed on GitHub profile"],
  ["Vercel", "Tools and Platforms", "Verified through live deployments"],
  ["PWA", "Tools and Platforms", "Verified in Cyclela repository"],
  // System analysis
  ["UML", "System Analysis", "Stated interest on GitHub profile"],
  ["SDLC", "System Analysis", "Stated interest on GitHub profile"],
  // Software testing
  ["Black-box testing", "Software Testing", "Stated interest on GitHub profile"],
  ["System Usability Scale (SUS)", "Software Testing", "Stated interest on GitHub profile"],
  // UI/UX
  ["Responsive design", "UI/UX", "Verified in Cyclela and Personal repositories"],
].map(([name, category, note], i) => ({
  id: `skill-${i}`,
  name,
  category,
  note,
  sort_order: i,
  published: true,
})) as Skill[];

export const fallbackEducation: Education[] = [
  {
    id: "ubd-sistem-informasi",
    institution: "Universitas Buddhi Dharma",
    program: "Sistem Informasi",
    degree: "Sarjana Komputer",
    gpa: "3.71",
    start_date: null,
    end_date: null,
    description: null,
    published: true,
  },
];

export const fallbackExperience: Experience[] = [
  {
    id: "cyclela-project",
    title: "Creator & Solo Developer",
    organization: "Cyclela (personal project)",
    type: "Personal Project",
    start_date: "2026-11",
    end_date: null,
    description:
      "Designed and built a mobile-first menstrual cycle tracker PWA entirely in the browser, including dashboard, calendar, journal, settings, i18n, offline support and on-device audio.",
    highlights: [
      "Single-contributor repository with a public live demo",
      "Privacy-first: all user data stays in localStorage",
    ],
    url: "https://github.com/YoganathaPranashakti/Cyclela",
    published: true,
  },
  {
    id: "first-website-project",
    title: "Creator & Solo Developer",
    organization: "Personal (personal project)",
    type: "Personal Project",
    start_date: "2026-11",
    end_date: null,
    description:
      "Built and deployed a first static single-page website as an HTML/CSS learning milestone.",
    highlights: ["Single-file static site deployed on Vercel"],
    url: "https://github.com/YoganathaPranashakti/Personal",
    published: true,
  },
];

export const fallbackCertifications: Certification[] = [];

export const fallbackTestimonials: Testimonial[] = [];

/** Fields the owner still needs to confirm before they can be published. */
export const pendingOwnerConfirmation = [
  "Graduation year and enrollment period",
  "Current location",
  "Formal employment or internship history",
  "Certification names, issuers and credential IDs",
  "Approved testimonials",
  "Real Food Tangerang project evidence and screenshots",
  "Sistem Informasi Puskesmas project evidence and screenshots",
  "A direct downloadable CV file (currently a Google Drive folder link)",
] as const;
