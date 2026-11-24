"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Award,
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Quote,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import { signOut } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/experience", label: "Experience", icon: BriefcaseBusiness },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/messages", label: "Messages", icon: Mail },
];

export function AdminShell({ children, email }: { children: ReactNode; email: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function active(href: string) {
    return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="glass sticky top-0 z-40 border-b border-line">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-expanded={open} aria-controls="admin-nav" aria-label="Toggle admin navigation" onClick={() => setOpen((v) => !v)}>
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-[0.7rem] font-bold text-white">YP</span>
              <span className="hidden sm:inline">Studio <span className="text-primary">/ admin</span></span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-48 truncate text-xs text-muted sm:block">{email}</span>
            <Button variant="ghost" size="sm" onClick={() => { void signOut().then(() => { router.push("/admin/login"); router.refresh(); }); }}>
              <LogOut aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px] gap-6 px-4 py-6 sm:px-6">
        <nav id="admin-nav" aria-label="Admin navigation" className={cn("w-56 shrink-0", open ? "block" : "hidden lg:block")}>
          <div className="surface-card sticky top-20 rounded-card p-3">
            <ul className="space-y-1">
              {links.map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    aria-current={active(href) ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      active(href) ? "bg-primary/12 text-primary" : "text-muted hover:bg-surface hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-line pt-2">
                <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-surface hover:text-foreground">
                  <Home className="size-4" aria-hidden="true" />
                  View site
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
