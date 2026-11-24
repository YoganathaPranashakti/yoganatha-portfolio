import { MessagesManager } from "@/components/admin/messages-manager";
import { getAdminRows } from "@/lib/data/admin";

export default async function AdminMessagesPage() {
  const rows = await getAdminRows("contact_messages");
  return <MessagesManager rows={rows} />;
}
