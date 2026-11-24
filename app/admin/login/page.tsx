"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, LockKeyhole } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/input";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    if (!supabase) {
      setError("Supabase is not configured. Add the environment variables and try again.");
      setLoading(false);
      return;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError("Invalid email or password, or this account is not provisioned as an administrator.");
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main id="main-content" className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-12">
      <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to portfolio
        </Link>
        <div className="glass rounded-card p-7 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)] sm:p-9">
          <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <LockKeyhole className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Admin sign in</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            This area is restricted to provisioned administrator accounts. There is no public registration.
          </p>

          {!isSupabaseConfigured ? (
            <p className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-600 dark:text-amber-400">
              Supabase environment variables are missing. See <code className="font-mono">.env.example</code> and the setup guide.
            </p>
          ) : null}

          <form onSubmit={onSubmit} className="mt-7 space-y-5">
            <Field label="Email" htmlFor="admin-email">
              <Input id="admin-email" type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="admin@example.com" />
            </Field>
            <Field label="Password" htmlFor="admin-password">
              <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </Field>
            {error ? <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400" role="alert">{error}</p> : null}
            <Button type="submit" variant="gradient" size="lg" className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" aria-hidden="true" /> : null}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
