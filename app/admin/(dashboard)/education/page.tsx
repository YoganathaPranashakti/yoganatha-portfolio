import { ResourceManager, type ManagerField } from "@/components/admin/resource-manager";
import { getAdminRows } from "@/lib/data/admin";

const fields: ManagerField[] = [
  { key: "institution", label: "Institution", type: "text", required: true },
  { key: "program", label: "Program", type: "text", required: true },
  { key: "degree", label: "Degree", type: "text" },
  { key: "gpa", label: "GPA", type: "text" },
  { key: "start_date", label: "Start (YYYY-MM)", type: "text" },
  { key: "end_date", label: "End (YYYY-MM)", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
];

export default async function AdminEducationPage() {
  const rows = await getAdminRows("education");
  return <ResourceManager resource="education" fields={fields} rows={rows} titleKey="institution" subtitleKey="program" />;
}
