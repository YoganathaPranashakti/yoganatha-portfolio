import Link from "next/link";
import {
  Award,
  FolderKanban,
  Mail,
  Quote,
  Sparkles,
  TriangleAlert,
  Unplug,
} from "lucide-react";

import { getDashboardStats, isSupabaseReady } from "@/lib/data/admin";

export default async function AdminOverviewPage() {
  const stats = await getDashboardStats();
  const ready = isSupabaseReady();

  const cards = [
    { label: "Projects", value: stats.projects, detail: `${stats.publishedProjects} published`, href: "/admin/projects", icon: FolderKanban },
    { label: "Certifications", value: stats.certifications, detail: "Published and drafts", href: "/admin/certifications", icon: Award },
    { label: "Testimonials", value: stats.testimonials, detail: `${stats.pendingTestimonials} awaiting approval`, href: "/admin/testimonials", icon: Quote },
    { label: "Messages", value: stats.messages, detail: `${stats.unreadMessages} unread`, href: "/admin/messages", icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard overview</h1>
        <p className="mt-1 text-sm text-muted">A quick look at your portfolio content and inbox.</p>
      </div>

      {!ready ? (
        <div className="surface-card flex items-start gap-3 rounded-card border-amber-500/40 p-5">
          <Unplug className="mt-0.5 size-5 shrink-0 text-amber-500" aria-hidden="true" />
          <div>
            <p className="font-medium">Supabase is not configured</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Add <code className="font-mono">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
              <code className="font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code> to enable live data.
              See <code className="font-mono">docs/SUPABASE_SETUP.md</code>.
            </p>
          </div>
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, detail, href, icon: Icon }) => (
          <Link key={label} href={href} className="surface-card group rounded-card p-5 transition-all hover:-translate-y-1 hover:border-primary/50">
            <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <p className="mt-4 text-3xl font-bold tracking-tight">{value}</p>
            <p className="mt-1 text-sm font-medium">{label}</p>
            <p className="mt-1 text-xs text-muted">{detail}</p>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="surface-card rounded-card p-6">
          <h2 className="flex items-center gap-2 font-semibold"><Sparkles className="size-4 text-primary" aria-hidden="true" /> Manage content</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Projects, skills, experience, education, certifications and testimonials can all be created,
            edited, unpublished and deleted from this dashboard. Images upload to Supabase Storage.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {[
              ["/admin/projects", "Projects"],
              ["/admin/skills", "Skills"],
              ["/admin/experience", "Experience"],
              ["/admin/education", "Education"],
            ].map(([href, label]) => (
              <Link key={href} href={href} className="rounded-full border border-line px-4 py-2 text-xs font-medium text-muted transition-colors hover:border-primary/50 hover:text-primary">
                {label}
              </Link>
            ))}
          </div>
        </div>
        <div className="surface-card rounded-card p-6">
          <h2 className="flex items-center gap-2 font-semibold"><TriangleAlert className="size-4 text-accent" aria-hidden="true" /> Publishing notes</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Public pages show only published content. Testimonials additionally require approval.
            Contact messages are never readable by visitors. Unpublished records stay private until you publish them.
          </p>
        </div>
      </div>
    </div>
  );
}
