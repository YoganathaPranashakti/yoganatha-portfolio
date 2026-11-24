import { ProjectManager } from "@/components/admin/project-manager";
import { getAdminRows } from "@/lib/data/admin";

export default async function AdminProjectsPage() {
  const rows = await getAdminRows("projects");
  return <ProjectManager rows={rows} />;
}
