# PRODUCT REQUIREMENTS DOCUMENT (PRD)

# Yoganatha Pranashakti — Personal Portfolio Website

**Document Version:** 1.0  
**Status:** Development Specification  
**Last Updated:** November 2026  
**Project Type:** Personal Branding & Developer Portfolio  
**Primary Owner:** Yoganatha Pranashakti

---

# 1. PROJECT OVERVIEW

## 1.1 Project Background

This project aims to develop a modern, interactive, and professional personal portfolio website for Yoganatha Pranashakti, a fresh graduate in Information Systems with an interest in full-stack web development, software quality assurance, system analysis, and modern web technologies.

The website will serve as a centralized platform to present professional identity, academic background, technical skills, projects, certifications, experience, and contact information.

The portfolio must provide a distinctive visual identity while maintaining usability, accessibility, responsiveness, and performance.

The website will also include an administrative dashboard that allows the owner to manage portfolio content without modifying source code manually.

## 1.2 Project Vision

Create a visually distinctive, futuristic, and professional portfolio that communicates technical capabilities, demonstrates real project experience, and strengthens personal branding.

## 1.3 Project Objectives

1. Establish a professional online presence.
2. Showcase verified projects and technical skills.
3. Present academic and professional information.
4. Provide direct access to GitHub, LinkedIn, CV, and project demonstrations.
5. Provide an administrative dashboard for content management.
6. Allow visitors to contact the owner through a website form.
7. Deliver a responsive experience across desktop, tablet, and mobile.
8. Maintain reliable performance within free-tier infrastructure.

## 1.4 Target Audience

- Recruiters and HR professionals.
- Technology companies.
- Software development teams.
- Potential freelance clients.
- Developers and collaborators.
- Academic and professional networks.

---

# 2. OWNER INFORMATION

The following information is the initial verified content source. Additional information must be obtained from the owner's public profiles, repositories, or direct confirmation.

| Attribute | Information |
|---|---|
| Name | Yoganatha Pranashakti |
| Education | S1 Sistem Informasi |
| University | Universitas Buddhi Dharma |
| Degree | Sarjana Komputer |
| GPA | 3.71 |
| GitHub | https://github.com/YoganathaPranashakti |
| Personal Website | https://yoganatha-pranashakti.vercel.app |
| LinkedIn | https://www.linkedin.com/in/yoganatha-pranashakti |
| GitHub Profile Description | Full-Stack Web Developer and QA Enthusiast |

Additional professional interests identified from the GitHub profile:

- Full-stack web applications.
- Progressive Web Applications (PWA).
- PHP and Laravel.
- MySQL.
- JavaScript.
- System analysis.
- UML and SDLC.
- Black-box testing.
- System Usability Scale (SUS).

**Important:** These interests must not automatically be presented as expert-level competencies. Skill levels and professional experience must not be invented.

---

# 3. GITHUB AS A PRIMARY INFORMATION SOURCE

## 3.1 GitHub Profile

The AI development agent must inspect:

https://github.com/YoganathaPranashakti

GitHub is an important source of technical information and project evidence.

## 3.2 Information to Collect

The agent must inspect:

1. GitHub profile README.
2. Public repositories.
3. Repository descriptions.
4. Programming languages.
5. README documentation.
6. Technology stacks.
7. Project features.
8. Screenshots and demo links.
9. Repository structure.
10. Relevant commits and project activity when useful.

## 3.3 Initial Repository Inventory

The following repositories have been identified as initial candidates:

| Repository | Description | Language |
|---|---|---|
| YoganathaPranashakti | Personal GitHub Profile | Markdown |
| Cyclela | Personal menstrual cycle tracker PWA | JavaScript |
| Personal | Personal website/project | HTML |

Repository links:

- https://github.com/YoganathaPranashakti/YoganathaPranashakti
- https://github.com/YoganathaPranashakti/Cyclela
- https://github.com/YoganathaPranashakti/Personal

These are initial discovery results, not a complete project inventory.

The agent must inspect each repository before creating project descriptions or presenting its features.

## 3.4 GitHub Integration Requirements

The portfolio should include:

- GitHub profile link.
- GitHub links on relevant project cards.
- Repository links on project detail pages.
- Verified technology tags.
- Featured repository section.
- Optional GitHub activity visualization.

GitHub activity visualization must gracefully handle API rate limits or unavailable data.

GitHub tokens must never be exposed in client-side code.

## 3.5 Project Verification Rules

The agent must:

- Never fabricate project descriptions.
- Never invent repository statistics.
- Never assume that every public repository is complete.
- Never claim a project is production-ready without evidence.
- Verify technologies through actual repository contents.
- Mark missing information as `Pending Owner Confirmation`.
- Ask for confirmation when repository information conflicts with other sources.
- Never automatically publish every discovered repository.

Only selected and verified projects should become publicly featured.

---

# 4. DESIGN DIRECTION

## 4.1 Design Concept

**Creative — Futuristic Developer Portfolio**

The design should feel modern, expressive, immersive, and technically sophisticated.

The visual direction combines:

- Futuristic interface design.
- Creative developer aesthetics.
- Glassmorphism.
- Fluid gradients.
- Bento grid layouts.
- Subtle 3D elements.
- Interactive backgrounds.
- Modern typography.
- Dynamic micro-interactions.

The website must look professional rather than resembling a generic portfolio template.

## 4.2 Visual References

The development agent may explore and adapt components from:

- https://21st.dev/
- https://ui.aceternity.com/
- https://magicui.design/
- https://motion-primitives.com/
- https://kokonutui.com/
- https://ui.shadcn.com/
- https://motion.dev/

These libraries are references and component sources, not mandatory dependencies.

The agent must select components based on visual quality, compatibility, accessibility, and performance.

## 4.3 Color Palette

### Dark Mode

| Token | Color |
|---|---|
| Background | #080B16 |
| Surface | #11182B |
| Primary | #2563EB |
| Accent | #8B5CF6 |
| Text | #F8FAFC |
| Muted Text | #94A3B8 |
| Border | #263248 |

### Light Mode

| Token | Color |
|---|---|
| Background | #FFFFFF |
| Surface | #F1F5F9 |
| Primary | #0EA5E9 |
| Accent | #2563EB |
| Text | #0F172A |
| Muted Text | #64748B |
| Border | #E2E8F0 |

Both themes must maintain consistent visual identity.

Dark mode should emphasize deep navy, electric blue, and purple.

Light mode should emphasize white, sky blue, and clean neutral surfaces.

## 4.4 Typography

Preferred fonts:

- Geist.
- Inter.
- Geist Mono for code-related elements.

Typography must be responsive, readable, and consistent.

## 4.5 Layout Principles

- Use bento grids where appropriate.
- Apply glassmorphism selectively.
- Use gradients as visual focal points.
- Maintain consistent spacing and border radii.
- Avoid unnecessary visual clutter.
- Maintain readable text contrast.
- Prioritize content hierarchy.
- Ensure mobile layouts remain clean and usable.

---

# 5. ANIMATION AND INTERACTION

## 5.1 Animation Intensity

**Selected Intensity: Intense**

The website should feel dynamic and interactive.

However, animation must not compromise usability or performance.

## 5.2 Required Animation Types

- Text reveal animations.
- Animated text rotation.
- Scroll-triggered reveals.
- Staggered content transitions.
- Hover interactions.
- Magnetic buttons on suitable desktop interfaces.
- Spotlight effects.
- Gradient animations.
- Floating decorative elements.
- Subtle parallax.
- Page transitions.
- Interactive project cards.
- Animated backgrounds.

## 5.3 Animation Guidelines

Use Motion for React where appropriate.

Prefer transform and opacity animations.

Avoid excessive continuous animations, large blur effects, and expensive rendering operations.

Animations must:

- Support `prefers-reduced-motion`.
- Have reduced-motion alternatives.
- Avoid blocking navigation.
- Avoid delaying important content.
- Remain usable on lower-powered devices.
- Avoid unnecessary animation on mobile.

---

# 6. TECHNOLOGY STACK

| Layer | Technology |
|---|---|
| Framework | Next.js App Router |
| Programming Language | TypeScript |
| Styling | Tailwind CSS |
| UI Foundation | shadcn/ui |
| Component Sources | 21st.dev, Aceternity UI, Magic UI, Motion Primitives, Kokonut UI |
| Animation | Motion |
| Icons | Lucide React |
| Backend | Supabase |
| Database | Supabase PostgreSQL |
| Authentication | Supabase Auth |
| Storage | Supabase Storage |
| Source Control | GitHub |
| Deployment | Vercel Free |
| Package Manager | npm |

## 6.1 Technical Requirements

- Use Next.js App Router.
- Use TypeScript with strict mode.
- Prefer Server Components by default.
- Use Client Components only when necessary.
- Build reusable components.
- Use semantic HTML.
- Use responsive Tailwind utilities.
- Avoid unnecessary dependencies.
- Follow current official documentation.
- Keep the code maintainable and modular.

## 6.2 Existing Project Preservation

The development agent must inspect the existing project before making modifications.

Project location:

`C:\Projects\yoganatha-portfolio`

Do not automatically replace the existing project structure.

Identify the current framework version, dependencies, configuration, routes, components, and existing functionality first.

Preserve working features unless there is a clear technical reason to change them.

---

# 7. WEBSITE STRUCTURE

## 7.1 Architecture

**Selected Structure: Hybrid**

The homepage will contain the main portfolio sections as a single-page experience.

Additional pages will provide detailed information.

### Public Routes

| Route | Purpose |
|---|---|
| `/` | Main portfolio homepage |
| `/about` | Detailed profile |
| `/projects` | Project directory |
| `/projects/[slug]` | Project details |
| `/certifications` | Certification directory |

### Admin Routes

| Route | Purpose |
|---|---|
| `/admin/login` | Admin authentication |
| `/admin` | Dashboard overview |
| `/admin/projects` | Project management |
| `/admin/experience` | Experience management |
| `/admin/education` | Education management |
| `/admin/skills` | Skills management |
| `/admin/certifications` | Certification management |
| `/admin/testimonials` | Testimonial management |
| `/admin/messages` | Contact message management |

Admin pages must not appear in the public navigation.

---

# 8. PUBLIC WEBSITE FUNCTIONAL REQUIREMENTS

## FR-01: Navigation Bar

The navigation bar must include:

- Personal logo or name.
- Home.
- About.
- Skills.
- Projects.
- Experience.
- Certifications.
- Contact.
- Dark/light theme toggle.
- CV download button.

Additional behavior:

- Sticky or floating navigation.
- Active section indicator.
- Smooth scrolling.
- Responsive mobile menu.
- Accessible keyboard navigation.
- Proper focus states.

## FR-02: Hero Section

The hero section must communicate the owner's identity immediately.

Required content:

- Yoganatha Pranashakti.
- Professional introduction.
- Animated professional role or interests.
- Profile photograph.
- Short professional summary.
- GitHub link.
- LinkedIn link.
- CV download.
- Explore Projects button.

Possible professional role descriptions:

- Full-Stack Web Developer.
- QA Enthusiast.
- Information Systems Graduate.

These descriptions should remain truthful and must not imply unverified employment or seniority.

Suggested visual effects:

- Spotlight background.
- Aurora or gradient background.
- Text reveal.
- Floating decorative elements.
- Interactive profile card.
- Subtle parallax.

## FR-03: About Section

Include:

- Personal introduction.
- Academic background.
- Technical interests.
- Development philosophy.
- Problem-solving approach.
- Professional aspirations.

Content should be written naturally and professionally.

Avoid generic marketing statements.

## FR-04: Education Section

Initial education information:

- Institution: Universitas Buddhi Dharma.
- Program: Sistem Informasi.
- Degree: Sarjana Komputer.
- GPA: 3.71.

Graduation year, enrollment period, and other details must be verified before publication.

Optional:

- Relevant coursework.
- Academic achievements.
- Thesis or final project.

## FR-05: Skills Section

Organize skills into categories:

1. Programming Languages.
2. Frontend Development.
3. Backend Development.
4. Database.
5. Tools and Platforms.
6. System Analysis.
7. Software Testing.
8. UI/UX.

Possible visual presentation:

- Skill cards.
- Animated logo cloud.
- Technology icons.
- Responsive grid.
- Hover interactions.
- Marquee animation.

Only display technologies supported by GitHub repositories, project documentation, or owner confirmation.

Do not invent skill percentages or proficiency scores.

## FR-06: Projects Section

The project section is one of the most important parts of the portfolio.

Requirements:

- Featured projects.
- Project directory.
- Category filters.
- Optional search.
- Project cards.
- Technology tags.
- Live Demo links.
- GitHub repository links.
- Dedicated project detail pages.

Initial project candidates:

1. Real Food Tangerang.
2. Sistem Informasi Puskesmas.
3. Cyclela.
4. Other verified projects discovered through GitHub.

Each project should contain:

| Field | Description |
|---|---|
| Title | Project name |
| Slug | URL identifier |
| Description | Short summary |
| Thumbnail | Main image |
| Gallery | Additional screenshots |
| Category | Project category |
| Technologies | Verified technology stack |
| Role | Actual contribution |
| Features | Implemented functionality |
| Challenges | Problems encountered |
| Solutions | Implemented solutions |
| Results | Verified project outcomes |
| Live Demo | Public demonstration URL |
| GitHub URL | Repository URL |
| Featured | Featured project status |
| Published | Public visibility |

Project detail pages should use a case-study structure:

1. Project Overview.
2. Problem Statement.
3. Objectives.
4. Technologies.
5. Key Features.
6. Development Process.
7. Challenges and Solutions.
8. Results.
9. Screenshots.
10. Live Demo and Repository.

Do not invent performance metrics, user counts, business impact, or project outcomes.

## FR-07: Experience Section

Support:

- Employment.
- Internship.
- Freelance projects.
- Organizational activities.
- Academic projects.
- Relevant technical contributions.

If formal employment experience is unavailable, emphasize verified academic and project experience.

Do not create fictional employment history.

## FR-08: Certifications Section

Each certification should contain:

- Certification name.
- Issuing organization.
- Issue date.
- Credential ID, if available.
- Verification URL, if available.
- Certificate image.
- Description.

## FR-09: Testimonials Section

Optional functionality.

Features:

- Testimonial cards.
- Author name.
- Author role.
- Organization.
- Testimonial content.
- Approval status.
- Featured status.

Only approved testimonials can appear publicly.

Do not create fictional testimonials.

## FR-10: Contact Section

Display:

- Email.
- LinkedIn.
- GitHub.
- Location, if confirmed.

Contact form fields:

- Name.
- Email.
- Subject.
- Message.

Required functionality:

- Input validation.
- Loading state.
- Success feedback.
- Error feedback.
- Supabase message storage.

Visitors must not be able to read submitted messages.

## FR-11: Footer

Include:

- Personal branding.
- Navigation links.
- Social links.
- Copyright.
- Back-to-top interaction.

---

# 9. ADMIN DASHBOARD

## 9.1 Overview Dashboard

Display:

- Total projects.
- Published projects.
- Total certifications.
- Total testimonials.
- Pending testimonials.
- Total messages.
- Unread messages.

## 9.2 Content Management

The administrator must be able to:

- Create content.
- Edit content.
- Delete content.
- Publish and unpublish content.
- Upload images.
- Manage featured content.
- Preview relevant content.

Supported content:

- Profile.
- Projects.
- Skills.
- Education.
- Experience.
- Certifications.
- Testimonials.

## 9.3 Message Management

Admin must be able to:

- View submitted messages.
- Read message details.
- Mark messages as read.
- Mark messages as replied.
- Archive messages.
- Delete messages.

## 9.4 Authentication

Use Supabase Auth.

Requirements:

- No public administrator registration.
- Admin accounts must be provisioned securely.
- Protected admin routes.
- Server-side authorization.
- Secure session management.
- Logout functionality.

Hiding admin links in the UI is not sufficient security.

---

# 10. DATABASE DESIGN

Use Supabase PostgreSQL.

Initial tables:

| Table | Purpose |
|---|---|
| `admin_users` | Administrator authorization |
| `profiles` | Personal profile |
| `projects` | Portfolio projects |
| `project_images` | Project screenshots |
| `skills` | Technical skills |
| `experiences` | Experience records |
| `education` | Academic history |
| `certifications` | Certifications |
| `testimonials` | Testimonials |
| `contact_messages` | Contact submissions |

## 10.1 Relationships

- One project can have multiple project images.
- Public content must have publication status.
- Contact messages must remain private.
- Admin authorization must be enforced through trusted server-side logic and database policies.

## 10.2 Security Requirements

Implement Row Level Security (RLS).

Policies must ensure:

- Public users can read published portfolio content.
- Public users can read only approved testimonials.
- Public users can submit contact messages.
- Public users cannot read contact messages.
- Administrators can manage authorized content.
- Administrators can access contact messages.
- Unauthorized users cannot modify portfolio data.

Use SQL migrations and appropriate indexes.

Storage policies must also be configured.

Never expose the Supabase service role key in frontend code.

---

# 11. RESPONSIVE DESIGN

The website must support:

| Device | Width |
|---|---|
| Small Mobile | 320–374 px |
| Mobile | 375–767 px |
| Tablet | 768–1023 px |
| Desktop | 1024–1439 px |
| Large Desktop | 1440 px and above |

Requirements:

- Mobile-first implementation.
- No horizontal overflow.
- No overlapping buttons.
- No clipped text.
- Proper image scaling.
- Responsive navigation.
- Touch-friendly interactions.
- Readable typography.
- Adapted animation intensity.

Test all major pages at representative viewport sizes.

---

# 12. PERFORMANCE, SEO, AND ACCESSIBILITY

## 12.1 Performance

Target Lighthouse scores:

- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

These are optimization targets, not guaranteed scores.

Requirements:

- Use Next.js Image optimization.
- Prefer WebP or AVIF where suitable.
- Lazy-load non-critical images.
- Optimize font loading.
- Minimize unnecessary JavaScript.
- Avoid layout shifts.
- Use Server Components by default.
- Avoid excessive animation rendering.
- Optimize database queries.

## 12.2 SEO

Each public page must support:

- Unique title.
- Meta description.
- Open Graph metadata.
- Twitter metadata.
- Canonical URL.
- Sitemap.
- Robots configuration.
- Semantic HTML.
- Descriptive image alt text.
- Appropriate structured data.

## 12.3 Accessibility

Requirements:

- Keyboard navigation.
- Visible focus indicators.
- Appropriate color contrast.
- Form labels.
- Screen-reader-friendly elements.
- Reduced-motion support.
- Accessible mobile menu.
- Descriptive link text.

---

# 13. INFRASTRUCTURE AND DEPLOYMENT

## 13.1 Hosting

Use free-tier services:

| Service | Purpose |
|---|---|
| Vercel Free | Next.js hosting |
| Supabase Free | Database, authentication, storage |
| GitHub | Source code and version control |

The project should aim to operate with Rp0 infrastructure cost.

However, free-tier services have usage limits, storage limits, quotas, and policies that may change.

The agent must review current provider documentation and avoid designing core functionality that requires paid services.

## 13.2 GitHub Workflow

Expected workflow:

1. Local development.
2. Commit changes.
3. Push to GitHub.
4. GitHub repository connected to Vercel.
5. Push to `main` triggers production deployment.
6. Pull requests may trigger preview deployments.

Do not claim that automatic deployment is configured until it has been verified.

## 13.3 Environment Variables

Create `.env.example`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=
```

Use the currently supported Supabase publishable key or legacy anon key format as appropriate.

Never commit real credentials.

Never prefix privileged secrets with `NEXT_PUBLIC_`.

Configure production environment variables through the Vercel dashboard.

## 13.4 Free-Tier Optimization

- Avoid unnecessary background jobs.
- Avoid paid external APIs for core features.
- Optimize image storage and database queries.
- Handle Supabase downtime or quota exhaustion gracefully.
- Avoid relying on long-running server processes.
- Avoid unnecessary third-party services.
- Document free-tier limitations.
- Provide graceful fallbacks for optional features.

---

# 14. ERROR HANDLING

The application must handle:

- Database connection failures.
- Authentication errors.
- Unauthorized access.
- Form validation errors.
- Image upload failures.
- Missing project data.
- Invalid URLs.
- API rate limits.
- Empty content states.
- Network failures.

Every interactive element must have a functional outcome.

Do not create decorative buttons that appear functional but do nothing.

---

# 15. DEVELOPMENT PRIORITIES

## P0 — Core Portfolio

- Inspect existing project.
- Establish design system.
- Implement responsive layout.
- Implement navigation.
- Implement hero.
- Implement about.
- Implement education.
- Implement skills.
- Implement projects.
- Implement project details.
- Implement theme switching.
- Integrate GitHub and CV links.

## P1 — Backend and Management

- Supabase configuration.
- Database migrations.
- RLS policies.
- Contact form.
- Admin authentication.
- Admin dashboard.
- Content management.
- Certifications.
- Experience management.

## P2 — Advanced Features

- Testimonials.
- Advanced animations.
- Optional GitHub activity visualization.
- Optional analytics.
- Optional additional integrations.

Core portfolio functionality must not depend on P2 features.

---

# 16. ACCEPTANCE CRITERIA

The project is considered ready when:

1. The website runs successfully locally.
2. The website builds without TypeScript or production build errors.
3. All primary pages are responsive.
4. Dark and light modes work correctly.
5. Navigation works on desktop and mobile.
6. Project cards link to valid detail pages.
7. GitHub links point to the correct repositories.
8. Portfolio content is based on verified information.
9. The contact form validates and stores messages securely.
10. Admin routes are protected.
11. RLS policies have been tested.
12. Public visitors cannot access private messages.
13. No secrets are committed to GitHub.
14. Important interactions work without animations.
15. Reduced-motion preferences are respected.
16. There are no critical console errors.
17. SEO metadata is implemented.
18. The project can be deployed to Vercel Free.
19. Deployment configuration is documented.
20. The application stays within the intended free-tier usage where practical.

---

# 17. REQUIRED DELIVERABLES

The development agent must produce:

- Complete source code.
- Maintainable folder structure.
- Reusable UI components.
- Responsive public pages.
- Dark and light themes.
- Animation system.
- Supabase integration.
- SQL migrations.
- RLS policies.
- Storage configuration.
- Admin dashboard.
- Authentication flow.
- `.env.example`.
- README.md.
- Deployment documentation.
- Testing documentation.
- GitHub integration instructions.

---

# 18. DEVELOPMENT AGENT RULES

The AI development agent must follow these rules:

1. Inspect the existing codebase before modifying anything.
2. Inspect the GitHub profile and relevant public repositories.
3. Verify all portfolio information before publishing it.
4. Never fabricate personal information, experience, achievements, or project metrics.
5. Preserve working functionality.
6. Do not install unnecessary libraries.
7. Read official documentation before implementing unfamiliar integrations.
8. Use compatible versions of dependencies.
9. Maintain consistent design tokens.
10. Make all visible controls functional.
11. Follow secure Supabase practices.
12. Test after every major implementation phase.
13. Fix errors before continuing.
14. Report changed files and installed dependencies.
15. Do not claim a deployment succeeded without verification.
16. Do not modify remote repositories or deploy production changes without explicit permission.
17. Do not expose secrets.
18. Prioritize maintainability, performance, accessibility, and usability.

---

# 19. FINAL PRODUCT EXPECTATION

The final result should be a polished, distinctive, and professional developer portfolio.

It should combine:

- Strong personal branding.
- Futuristic creative design.
- Smooth and purposeful animations.
- Verified technical project showcases.
- Responsive user experience.
- Functional contact system.
- Secure content management.
- Reliable GitHub and Vercel workflow.

The portfolio should communicate not only what the owner knows, but also how the owner approaches problems, develops solutions, and creates useful digital products.

**The final priority is quality, authenticity, and usability — not simply the number of animations or visual effects.**