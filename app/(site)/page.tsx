import { AboutSection } from "@/components/sections/about-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import {
  getCertifications,
  getEducation,
  getExperience,
  getProfile,
  getProjects,
  getSkills,
  getTestimonials,
} from "@/lib/data/portfolio";

export default async function HomePage() {
  const [profile, projects, skills, education, experience, certifications, testimonials] =
    await Promise.all([
      getProfile(),
      getProjects(),
      getSkills(),
      getEducation(),
      getExperience(),
      getCertifications(),
      getTestimonials(),
    ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} education={education} />
      <EducationSection education={education} />
      <SkillsSection skills={skills} />
      <ProjectsSection projects={projects} />
      <ExperienceSection experience={experience} />
      <CertificationsSection certifications={certifications} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection />
    </>
  );
}
