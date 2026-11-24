"use client";

import { useState, useTransition } from "react";
import { Archive, Inbox, Loader2, MailCheck, Trash2 } from "lucide-react";

import { deleteResource, setField } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

type Row = Record<string, unknown>;
type Filter = "all" | "unread" | "archived";

export function MessagesManager({ rows }: { rows: Row[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, startTransition] = useTransition();

  const visible = rows.filter((row) => {
    if (filter === "unread") return !row.is_read && !row.archived;
    if (filter === "archived") return Boolean(row.archived);
    return !row.archived;
  });
  const selected = rows.find((row) => String(row.id) === selectedId) ?? null;

  function change(row: Row, field: string, value: boolean) {
    setError("");
    startTransition(async () => {
      const result: ActionResult = await setField("contact_messages", String(row.id), field, value);
      if (!result.ok) setError(result.error);
      else setNotice("Message updated.");
    });
  }

  function remove(id: string) {
    if (!window.confirm("Delete this message permanently?")) return;
    startTransition(async () => {
      const result = await deleteResource("contact_messages", id);
      if (!result.ok) setError(result.error);
      else {
        setSelectedId(null);
        setNotice("Message deleted.");
      }
    });
  }

  const unread = rows.filter((row) => !row.is_read && !row.archived).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Contact messages</h1>
        <p className="mt-1 text-sm text-muted">{unread} unread · {rows.length} total</p>
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p> : null}
      {notice ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400" role="status">{notice}</p> : null}

      <div className="flex gap-2" role="group" aria-label="Filter messages">
        {(["all", "unread", "archived"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            aria-pressed={filter === item}
            className={cn(
              "rounded-full border px-4 py-2 text-xs font-medium capitalize transition-colors",
              filter === item ? "border-primary bg-primary text-white" : "border-line bg-surface/60 text-muted hover:text-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-2">
          {visible.length === 0 ? (
            <div className="surface-card rounded-card p-8 text-center text-sm text-muted">
              <Inbox className="mx-auto mb-3 size-6" aria-hidden="true" />
              No messages in this view.
            </div>
          ) : visible.map((row) => (
            <button
              key={String(row.id)}
              type="button"
              onClick={() => {
                setSelectedId(String(row.id));
                if (!row.is_read) change(row, "is_read", true);
              }}
              className={cn(
                "surface-card w-full rounded-2xl p-4 text-left transition-colors hover:border-primary/40",
                selectedId === String(row.id) && "border-primary/60",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-semibold">{String(row.name ?? "Unknown")}</span>
                {!row.is_read ? <Badge variant="default">New</Badge> : null}
              </div>
              <p className="mt-1 truncate text-xs text-muted">{String(row.subject ?? "")}</p>
              <p className="mt-1 line-clamp-2 text-xs text-muted">{String(row.message ?? "")}</p>
            </button>
          ))}
        </div>

        <div className="surface-card min-h-72 rounded-card p-5 sm:p-6">
          {selected ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{String(selected.subject ?? "Message")}</h2>
                <div className="flex gap-1.5">
                  {selected.is_read ? <Badge variant="success">Read</Badge> : <Badge variant="default">Unread</Badge>}
                  {selected.is_replied ? <Badge variant="accent">Replied</Badge> : null}
                  {selected.archived ? <Badge variant="warning">Archived</Badge> : null}
                </div>
              </div>
              <p className="mt-2 text-xs text-muted">
                From {String(selected.name ?? "")} · <a href={`mailto:${String(selected.email ?? "")}`} className="text-primary hover:underline">{String(selected.email ?? "")}</a>
                {selected.created_at ? ` · ${new Date(String(selected.created_at)).toLocaleString()}` : ""}
              </p>
              <p className="mt-5 whitespace-pre-wrap text-sm leading-relaxed">{String(selected.message ?? "")}</p>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                <Button variant="outline" size="sm" disabled={pending} onClick={() => change(selected, "is_replied", !selected.is_replied)}>
                  <MailCheck aria-hidden="true" /> {selected.is_replied ? "Mark unreplied" : "Mark replied"}
                </Button>
                <Button variant="outline" size="sm" disabled={pending} onClick={() => change(selected, "archived", !selected.archived)}>
                  <Archive aria-hidden="true" /> {selected.archived ? "Unarchive" : "Archive"}
                </Button>
                <Button variant="danger" size="sm" disabled={pending} onClick={() => remove(String(selected.id))}>
                  {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />} Delete
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid h-full place-items-center text-center text-sm text-muted">
              Select a message to read it. Messages are private to administrators.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
