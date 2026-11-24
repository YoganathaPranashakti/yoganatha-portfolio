import { ResourceManager, type ManagerField } from "@/components/admin/resource-manager";
import { getAdminRows } from "@/lib/data/admin";

const fields: ManagerField[] = [
  { key: "author_name", label: "Author name", type: "text", required: true },
  { key: "author_role", label: "Author role", type: "text" },
  { key: "organization", label: "Organization", type: "text" },
  { key: "content", label: "Testimonial", type: "textarea", required: true },
];

export default async function AdminTestimonialsPage() {
  const rows = await getAdminRows("testimonials");
  return (
    <ResourceManager
      resource="testimonials"
      fields={fields}
      rows={rows}
      titleKey="author_name"
      subtitleKey="organization"
      toggles={["approved", "featured", "published"]}
    />
  );
}
