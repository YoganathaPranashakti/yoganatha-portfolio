import { ResourceManager, type ManagerField } from "@/components/admin/resource-manager";
import { getAdminRows } from "@/lib/data/admin";

const fields: ManagerField[] = [
  { key: "name", label: "Certification name", type: "text", required: true },
  { key: "issuer", label: "Issuing organization", type: "text", required: true },
  { key: "issue_date", label: "Issue date", type: "text", hint: "YYYY-MM" },
  { key: "credential_id", label: "Credential ID", type: "text" },
  { key: "verification_url", label: "Verification URL", type: "url" },
  { key: "image_url", label: "Certificate image", type: "url" },
  { key: "description", label: "Description", type: "textarea" },
];

export default async function AdminCertificationsPage() {
  const rows = await getAdminRows("certifications");
  return <ResourceManager resource="certifications" fields={fields} rows={rows} titleKey="name" subtitleKey="issuer" />;
}
