"use client";

import { useState, useTransition } from "react";
import { Check, ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";

import { deleteResource, setField, uploadImage, upsertResource } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import type { ActionResult } from "@/lib/types";

type Row = Record<string, unknown>;

const simple: { key: string; label: string }[] = [
  { key: "title", label: "Title" },
  { key: "slug", label: "Slug" },
  { key: "category", label: "Category" },
  { key: "role", label: "Role" },
  { key: "thumbnail", label: "Thumbnail URL" },
  { key: "live_url", label: "Live demo URL" },
  { key: "github_url", label: "Repository URL" },
  { key: "description", label: "Short description" },
];

const lists: { key: string; label: string }[] = [
  { key: "technologies", label: "Technologies (one per line)" },
  { key: "features", label: "Key features (one per line)" },
  { key: "objectives", label: "Objectives (one per line)" },
  { key: "process", label: "Development process (one per line)" },
  { key: "challenges", label: "Challenges (one per line)" },
  { key: "solutions", label: "Solutions (one per line)" },
  { key: "results", label: "Results (one per line)" },
  { key: "gallery", label: "Gallery image URLs (one per line)" },
];

const prose: { key: string; label: string }[] = [
  { key: "overview", label: "Project overview" },
  { key: "problem", label: "Problem statement" },
];

const emptyDraft = Object.fromEntries(
  [...simple, ...lists, ...prose].map((field) => [field.key, ""]),
) as Record<string, unknown>;

export function ProjectManager({ rows }: { rows: Row[] }) {
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<Record<string, unknown>>({ ...emptyDraft, featured: false, published: false });
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [pending, startTransition] = useTransition();

  function openNew() {
    setDraft({ ...emptyDraft, featured: false, published: false });
    setEditing("new");
    setError("");
  }

  function openEdit(row: Row) {
    const next = { ...emptyDraft };
    for (const field of [...simple, ...prose]) next[field.key] = String(row[field.key] ?? "");
    for (const field of lists) {
      const value = row[field.key];
      next[field.key] = Array.isArray(value) ? value.join("\n") : "";
    }
    next.featured = Boolean(row.featured);
    next.published = Boolean(row.published);
    setDraft(next);
    setEditing(String(row.id));
    setError("");
  }

  function update(key: string, value: unknown) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setError("");
    if (!String(draft.title ?? "").trim() || !String(draft.slug ?? "").trim()) {
      setError("Title and slug are required.");
      return;
    }
    startTransition(async () => {
      const result: ActionResult<string> = await upsertResource("projects", editing === "new" ? null : editing, draft);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setEditing(null);
      setNotice("Project saved.");
    });
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this project and its images?")) return;
    startTransition(async () => {
      const result = await deleteResource("projects", id);
      if (!result.ok) setError(result.error);
      else setNotice("Project deleted.");
    });
  }

  async function toggle(row: Row, key: string) {
    startTransition(async () => {
      const result = await setField("projects", String(row.id), key, !Boolean(row[key]));
      if (!result.ok) setError(result.error);
      else setNotice(`${key} updated.`);
    });
  }

  async function upload(file: File | undefined) {
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
      update("thumbnail", result.data);
      setNotice("Image uploaded. Remember to save.");
    });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
          <p className="mt-1 text-sm text-muted">{rows.length} project{rows.length === 1 ? "" : "s"} · full case-study editor</p>
        </div>
        <Button onClick={openNew} variant="gradient"><Plus aria-hidden="true" /> New project</Button>
      </div>

      {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p> : null}
      {notice ? <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-600 dark:text-emerald-400" role="status">{notice}</p> : null}

      {editing !== null ? (
        <div className="surface-card rounded-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold">{editing === "new" ? "New project" : "Edit project"}</h2>
            <Button variant="ghost" size="icon" onClick={() => setEditing(null)} aria-label="Close form"><X aria-hidden="true" /></Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {simple.map((field) => (
              <Field key={field.key} label={field.label} htmlFor={`p-${field.key}`}>
                <Input id={`p-${field.key}`} value={String(draft[field.key] ?? "")} onChange={(event) => update(field.key, event.target.value)} />
                {field.key === "thumbnail" ? (
                  <label className="mt-2 inline-flex cursor-pointer items-center gap-2 text-xs font-medium text-primary">
                    <ImagePlus className="size-4" aria-hidden="true" /> Upload thumbnail
                    <input type="file" accept="image/*" className="sr-only" onChange={(event) => void upload(event.target.files?.[0])} />
                  </label>
                ) : null}
              </Field>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {prose.map((field) => (
              <Field key={field.key} label={field.label} htmlFor={`p-${field.key}`}>
                <Textarea id={`p-${field.key}`} value={String(draft[field.key] ?? "")} onChange={(event) => update(field.key, event.target.value)} rows={4} />
              </Field>
            ))}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {lists.map((field) => (
              <Field key={field.key} label={field.label} htmlFor={`p-${field.key}`}>
                <Textarea id={`p-${field.key}`} value={String(draft[field.key] ?? "")} onChange={(event) => update(field.key, event.target.value)} rows={4} />
              </Field>
            ))}
          </div>
          <div className="mt-5 flex flex-wrap gap-6">
            {(["featured", "published"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={Boolean(draft[key])} onChange={(event) => update(key, event.target.checked)} className="size-4 accent-[var(--primary)]" />
                {key === "featured" ? "Featured" : "Published"}
              </label>
            ))}
          </div>
          <div className="mt-6 flex gap-3">
            <Button onClick={() => void save()} disabled={pending} variant="gradient">
              {pending ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Check aria-hidden="true" />} Save project
            </Button>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        {rows.length === 0 ? (
          <div className="surface-card rounded-card p-8 text-center text-sm text-muted">No projects yet.</div>
        ) : rows.map((row) => (
          <div key={String(row.id)} className="surface-card flex flex-wrap items-center justify-between gap-4 rounded-2xl p-4">
            <div className="min-w-0">
              <p className="truncate font-medium">{String(row.title ?? "Untitled")}</p>
              <p className="mt-0.5 truncate text-xs text-muted">/{String(row.slug ?? "")} · {String(row.category ?? "")}</p>
              <div className="mt-2 flex gap-1.5">
                <Badge variant={row.published ? "success" : "outline"}>{row.published ? "Published" : "Draft"}</Badge>
                {row.featured ? <Badge variant="accent">Featured</Badge> : null}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled={pending} onClick={() => void toggle(row, "published")}>Toggle publish</Button>
              <Button variant="ghost" size="icon" onClick={() => openEdit(row)} aria-label="Edit project"><Pencil className="size-4" aria-hidden="true" /></Button>
              <Button variant="ghost" size="icon" onClick={() => void remove(String(row.id))} disabled={pending} aria-label="Delete project" className="text-red-500"><Trash2 className="size-4" aria-hidden="true" /></Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
