import { ResourceManager, type ManagerField } from "@/components/admin/resource-manager";
import { getAdminRows } from "@/lib/data/admin";

const fields: ManagerField[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "category", label: "Category", type: "select", options: ["Programming Languages", "Frontend Development", "Backend Development", "Database", "Tools and Platforms", "System Analysis", "Software Testing", "UI/UX"] },
  { key: "sort_order", label: "Sort order", type: "number" },
  { key: "note", label: "Evidence note", type: "text", hint: "Where this skill is verified from." },
];

export default async function AdminSkillsPage() {
  const rows = await getAdminRows("skills");
  return <ResourceManager resource="skills" fields={fields} rows={rows} titleKey="name" subtitleKey="category" />;
}
