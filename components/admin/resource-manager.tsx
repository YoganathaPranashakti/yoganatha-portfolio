"use client";

import { useState, useTransition } from "react";
import { Check, ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";

import { deleteResource, setField, uploadImage, upsertResource } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/input";
import type { ActionResult } from "@/lib/types";
import { cn } from "@/lib/utils";

export type ResourceName =
  | "skills"
  | "experiences"
  | "education"
  | "certifications"
  | "testimonials";

export type ManagerField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "url" | "number" | "select";
  options?: string[];
  hint?: string;
  required?: boolean;
};

type Row = Record<string, unknown>;

function text(row: Row, key: string) {
  const value = row[key];
  return typeof value === "string" ? value : "";
}

export function ResourceManager({
  resource,
  fields,
  rows,
  titleKey,
  subtitleKey,
  toggles = ["published"],
}: {
  resource: ResourceName;
  fields: ManagerField[];
  rows: Row[];
  titleKey: string;
  subtitleKey?: string;
  toggles?: string[];
}) {
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({});
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, startTransition] = useTransition();

  function openNew() {
    setDraft(Object.fromEntries(fields.map((field) => [field.key, field.type === "number" ? 0 : ""])));
    setEditing("new");
    setError("");
    setNotice("");
  }

  function openEdit(row: Row) {
    setDraft({ ...row });
    setEditing(text(row, "id"));
    setError("");
    setNotice("");
  }

  function update(key: string, value: unknown) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setError("");
    setNotice("");
    const id = editing === "new" ? null : editing;
    if (!id) {
      for (const field of fields) {
        if (field.required && !String(draft[field.key] ?? "").trim()) {
          setError(`${field.label} is required.`);
          return;
        }
      }
    }
    startTransition(async () => {
      const result: ActionResult<string> = await upsertResource(resource, id, draft);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setEditing(null);
      setNotice("Saved successfully.");
    });
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this item? This cannot be undone.")) return;
    startTransition(async () => {
      const result = await deleteResource(resource, id);
      if (!result.ok) setError(result.error);
      else setNotice("Item deleted.");
    });
  }

  async function toggle(row: Row, key: string) {
    const id = text(row, "id");
    const value = !Boolean(row[key]);
    startTransition(async () => {
      const result = await setField(resource, id, key, value);
      if (!result.ok) setError(result.error);
      else setNotice(`${key} updated.`);
    });
  }

  async function upload(fieldKey: string, file: File | undefined) {
    if (!file) return;
    setError("");
    const formData = new FormData();
    formData.set("file", file);
    startTransition(async () => {
      const result: ActionResult<string> = await uploadImage(formData);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      update(fieldKey, result.data);
      setNotice("Image uploaded. Remember to save.");
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{resource.charAt(0).toUpperCase() + resource.slice(1)}</h1>
          <p className="mt-1 text-sm text-muted">{rows.length} record{rows.length === 1 ? "" : "s"}</p>
        </div>
        <Button onClick={openNew} variant="gradient">
          <Plus aria-hidden="true" /> Add new
        </Button>
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p> : null}
      {notice ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400" role="status">{notice}</p> : null}

      {editing !== null ? (
        <div className="surface-card rounded-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editing === "new" ? "New record" : "Edit record"}</h2>
            <Button variant="ghost" size="icon" onClick={() => setEditing(null)} aria-label="Close form">
              <X aria-hidden="true" />
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key} className={cn(field.type === "textarea" && "sm:col-span-2")}>
                <Field label={field.label} htmlFor={`f-${field.key}`} hint={field.hint}>
                  {field.type === "textarea" ? (
                    <Textarea
                      id={`f-${field.key}`}
                      value={String(draft[field.key] ?? "")}
                      onChange={(event) => update(field.key, event.target.value)}
                      rows={4}
                    />
                  ) : field.type === "select" ? (
                    <Select id={`f-${field.key}`} value={String(draft[field.key] ?? "")} onChange={(event) => update(field.key, event.target.value)}>
                      {(field.options ?? []).map((option) => <option key={option} value={option}>{option}</option>)}
                    </Select>
                  ) : (
                    <Input
                      id={`f-${field.key}`}
                      type={field.type === "number" ? "number" : field.type === "url" ? "url" : "text"}
                      value={String(draft[field.key] ?? "")}
                      onChange={(event) => update(field.key, field.type === "number" ? Number(event.target.value) : event.target.value)}
                    />
                  )}
                  {(field.key === "thumbnail" || field.key === "image_url" || field.key === "gallery") ? (
                    <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-primary">
                      <ImagePlus className="size-4" aria-hidden="true" />
                      Upload image
                      <input type="file" accept="image/*" className="sr-only" onChange={(event) => void upload(field.key, event.target.files?.[0])} />
                    </label>
                  ) : null}
                </Field>
              </div>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => void save()} disabled={pending} variant="gradient">
              {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Check aria-hidden="true" />}
              Save
            </Button>
            <Button onClick={() => setEditing(null)} variant="ghost">Cancel</Button>
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {rows.length === 0 ? (
          <div className="surface-card rounded-card p-8 text-center text-sm text-muted">
            No records yet. Add the first one above.
          </div>
        ) : rows.map((row) => (
          <div key={text(row, "id")} className="surface-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{text(row, titleKey) || "Untitled"}</p>
              {subtitleKey ? <p className="mt-0.5 truncate text-xs text-muted">{text(row, subtitleKey)}</p> : null}
              <div className="mt-2 flex flex-wrap gap-1.5">
                {toggles.map((key) => (
                  <Badge key={key} variant={row[key] ? "success" : "outline"}>
                    {key.replace("_", " ")}: {row[key] ? "yes" : "no"}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {toggles.map((key) => (
                <Button key={key} variant="ghost" size="sm" disabled={pending} onClick={() => void toggle(row, key)}>
                  Toggle {key.replace("_", " ")}
                </Button>
              ))}
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)} aria-label="Edit record">
                <Pencil className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => void remove(text(row, "id"))} disabled={pending} aria-label="Delete record" className="text-red-500 hover:text-red-600">
                <Trash2 className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
