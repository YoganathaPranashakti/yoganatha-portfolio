import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminUser } from "@/lib/auth";

export const metadata = { title: "Admin", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  const admin = await getAdminUser();
  if (!admin) redirect("/admin/login");

  return <AdminShell email={admin.email ?? "Administrator"}>{children}</AdminShell>;
}
