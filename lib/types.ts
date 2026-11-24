export type Project = {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string | null;
  gallery: string[];
  category: string;
  technologies: string[];
  role: string;
  features: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
  overview: string | null;
  problem: string | null;
  objectives: string[];
  process: string[];
  live_url: string | null;
  github_url: string | null;
  featured: boolean;
  published: boolean;
  created_at?: string | null;
};

export type Skill = {
  id: string;
  name: string;
  category: string;
  note: string | null;
  sort_order: number;
  published: boolean;
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  type: string;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  highlights: string[];
  url: string | null;
  published: boolean;
};

export type Education = {
  id: string;
  institution: string;
  program: string;
  degree: string | null;
  gpa: string | null;
  start_date: string | null;
  end_date: string | null;
  description: string | null;
  published: boolean;
};

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  issue_date: string | null;
  credential_id: string | null;
  verification_url: string | null;
  image_url: string | null;
  description: string | null;
  published: boolean;
};

export type Testimonial = {
  id: string;
  author_name: string;
  author_role: string | null;
  organization: string | null;
  content: string;
  approved: boolean;
  featured: boolean;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  is_replied: boolean;
  archived: boolean;
  created_at: string | null;
};

export type Profile = {
  id: string;
  headline: string;
  summary: string;
  location: string | null;
  availability: string | null;
  about: string | null;
  philosophy: string | null;
  updated_at: string | null;
};

export type DashboardStats = {
  projects: number;
  publishedProjects: number;
  certifications: number;
  testimonials: number;
  pendingTestimonials: number;
  messages: number;
  unreadMessages: number;
};

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; error: string };
