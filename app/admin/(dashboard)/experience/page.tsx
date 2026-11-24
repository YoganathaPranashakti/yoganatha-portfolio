import { ResourceManager, type ManagerField } from "@/components/admin/resource-manager";
import { getAdminRows } from "@/lib/data/admin";

const fields: ManagerField[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "organization", label: "Organization", type: "text", required: true },
  { key: "type", label: "Type", type: "select", options: ["Personal Project", "Academic Project", "Employment", "Internship", "Freelance", "Organizational"] },
  { key: "start_date", label: "Start (YYYY-MM)", type: "text" },
  { key: "end_date", label: "End (YYYY-MM)", type: "text", hint: "Leave empty for ongoing." },
  { key: "url", label: "Link", type: "url" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "highlights", label: "Highlights", type: "textarea", hint: "One highlight per line." },
];

export default async function AdminExperiencePage() {
  const rows = await getAdminRows("experiences");
  return <ResourceManager resource="experiences" fields={fields} rows={rows} titleKey="title" subtitleKey="organization" />;
}
