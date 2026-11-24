import type { Metadata } from "next";

import { Reveal } from "@/components/motion/reveal";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCertifications } from "@/lib/data/portfolio";

export const metadata: Metadata = {
  title: "Certifications",
  description: "Verified certifications and credentials earned by Yoganatha Pranashakti.",
  alternates: { canonical: "/certifications" },
  openGraph: {
    title: "Certifications — Yoganatha Pranashakti",
    description: "Verified certifications and credentials.",
    url: "/certifications",
  },
};

export default async function CertificationsPage() {
  const certifications = await getCertifications();

  return (
    <div className="min-h-[70vh] pt-32 sm:pt-40">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow="Credentials"
            title={
              <>
                Certifications &amp; <span className="gradient-text">verification</span>
              </>
            }
            description="Credentials are published only when an issuer and verification details are available."
          />
        </Reveal>
        <div className="mt-11 pb-16">
          <CertificationsSection certifications={certifications} full />
        </div>
      </div>
    </div>
  );
}
