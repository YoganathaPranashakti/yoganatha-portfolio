"use client";

import { useState, useTransition } from "react";
import { Check, Loader2 } from "lucide-react";

import { upsertResource } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";

type Row = Record<string, unknown>;

const fields = [
  { key: "headline", label: "Headline", type: "text" },
  { key: "summary", label: "Short summary", type: "textarea" },
  { key: "about", label: "About", type: "textarea" },
  { key: "philosophy", label: "Development philosophy", type: "textarea" },
  { key: "availability", label: "Availability note", type: "text" },
  { key: "location", label: "Location (only when confirmed)", type: "text" },
] as const;

export function ProfileManager({ row }: { row: Row | null }) {
  const [draft, setDraft] = useState<Record<string, unknown>>(() =>
    Object.fromEntries(fields.map((field) => [field.key, String(row?.[field.key] ?? "")])),
  );
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, startTransition] = useTransition();

  function save() {
    setError("");
    setNotice("");
    startTransition(async () => {
      const result = await upsertResource("profiles", row ? String(row.id) : null, draft);
      if (!result.ok) setError(result.error);
      else setNotice("Profile saved. Public pages have been refreshed.");
    });
  }

  return (
    <div className="max-w-3xl space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted">Manage the public introduction. Only confirmed information should be published here.</p>
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p> : null}
      {notice ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400" role="status">{notice}</p> : null}

      <div className="surface-card space-y-5 rounded-card p-5 sm:p-6">
        {fields.map((field) => (
          <Field key={field.key} label={field.label} htmlFor={`profile-${field.key}`}>
            {field.type === "textarea" ? (
              <Textarea id={`profile-${field.key}`} rows={4} value={String(draft[field.key] ?? "")} onChange={(event) => setDraft((current) => ({ ...current, [field.key]: event.target.value }))} />
            ) : (
              <Input id={`profile-${field.key}`} value={String(draft[field.key] ?? "")} onChange={(event) => setDraft((current) => ({ ...current, [field.key]: event.target.value }))} />
            )}
          </Field>
        ))}
        <Button onClick={save} disabled={pending} variant="gradient">
          {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Check aria-hidden="true" />}
          Save profile
        </Button>
      </div>
    </div>
  );
}
