import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getEducation, getExperience, getProfile } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Yoganatha Pranashakti's background, academic foundation and approach to building software.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Yoganatha Pranashakti",
    description: "Background, academic foundation and approach to building software.",
    url: "/about",
  },
};

export default async function AboutPage() {
  const [profile, education, experience] = await Promise.all([
    getProfile(),
    getEducation(),
    getExperience(),
  ]);

  return (
    <>
      <div className="relative overflow-hidden pb-6 pt-32 sm:pt-40">
        <div className="aurora pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden="true" />
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="About me"
              title={
                <>
                  The person behind <span className="gradient-text">the projects</span>
                </>
              }
              description={profile.headline}
            />
          </Reveal>
        </div>
      </div>
      <AboutSection profile={profile} education={education} />
      <EducationSection education={education} />
      <ExperienceSection experience={experience} />
    </>
  );
}
