import { ProfileManager } from "@/components/admin/profile-manager";
import { getAdminRows } from "@/lib/data/admin";

export default async function AdminProfilePage() {
  const rows = await getAdminRows("profiles");
  return <ProfileManager row={rows[0] ?? null} />;
}
