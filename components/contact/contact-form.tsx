"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/input";
import { contactSchema } from "@/lib/validations";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
      website: String(data.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const key = String(issue.path[0] ?? "form");
        next[key] ??= issue.message;
      });
      setErrors(next);
      setStatus("error");
      return;
    }

    setErrors({});
    setServerError("");
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json()) as { error?: string; ok?: boolean };
      if (!response.ok) {
        setServerError(result.error ?? "Your message could not be sent.");
        setStatus("error");
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="surface-card flex min-h-80 flex-col items-center justify-center gap-4 rounded-card p-8 text-center">
        <CheckCircle2 className="size-12 text-emerald-500" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Message received</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thanks for reaching out. Your message has been stored privately and will be reviewed.
        </p>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="surface-card space-y-5 rounded-card p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="contact-name" error={errors.name}>
          <Input id="contact-name" name="name" autoComplete="name" placeholder="Your name" required maxLength={80} />
        </Field>
        <Field label="Email" htmlFor="contact-email" error={errors.email}>
          <Input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={160} />
        </Field>
      </div>
      <Field label="Subject" htmlFor="contact-subject" error={errors.subject}>
        <Input id="contact-subject" name="subject" placeholder="What would you like to discuss?" required maxLength={120} />
      </Field>
      <Field label="Message" htmlFor="contact-message" error={errors.message}>
        <Textarea id="contact-message" name="message" placeholder="Tell me a little about your idea or question…" required maxLength={2000} className="min-h-36" />
      </Field>

      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && serverError ? (
        <p className="flex items-start gap-2 rounded-xl border border-red-500/25 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400" role="alert">
          <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {serverError}
        </p>
      ) : null}

      <Button type="submit" variant="gradient" size="lg" disabled={status === "loading"} className="w-full sm:w-auto">
        {status === "loading" ? (
          <>
            <Loader2 className="animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            <Send aria-hidden="true" />
            Send message
          </>
        )}
      </Button>
      <p className="text-xs leading-relaxed text-muted">
        Messages are stored privately in the portfolio backend and are never publicly readable.
      </p>
    </form>
  );
}
