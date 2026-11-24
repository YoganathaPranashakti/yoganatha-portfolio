export const siteConfig = {
  name: "Yoganatha Pranashakti",
  shortName: "Yoganatha",
  initials: "YP",
  title: "Yoganatha Pranashakti — Full-Stack Web Developer & QA Enthusiast",
  description:
    "Portfolio of Yoganatha Pranashakti, an Information Systems graduate exploring full-stack web development, progressive web apps, system analysis and software quality assurance.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "yoganathapranashakti@gmail.com",
  links: {
    github: "https://github.com/YoganathaPranashakti",
    linkedin: "https://www.linkedin.com/in/yoganatha-pranashakti/",
    cv: "https://drive.google.com/drive/folders/1NnnOonIQJQU1KSNm_Zy2RCBGSOWEtx1G?usp=drive_link",
    cyclela: "https://cyclela.vercel.app/",
    profileAvatar: "https://avatars.githubusercontent.com/u/117502449?v=4",
  },
  nav: [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Skills", href: "/#skills" },
    { label: "Projects", href: "/projects" },
    { label: "Experience", href: "/#experience" },
    { label: "Certifications", href: "/certifications" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export const keywordList = [
  "Yoganatha Pranashakti",
  "Full-Stack Web Developer",
  "QA Enthusiast",
  "Information Systems",
  "Progressive Web App",
  "Next.js",
  "Laravel",
  "Portfolio",
];
