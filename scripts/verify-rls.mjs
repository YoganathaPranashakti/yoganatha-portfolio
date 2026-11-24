// Verifies the deployed Row Level Security rules through PostgREST.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const env = {};
for (const line of readFileSync(resolve(".env.local"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
}
const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const anon = env.SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const service = env.SUPABASE_SERVICE_ROLE_KEY;

async function request(key, path, options = {}) {
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const text = await response.text();
  let body;
  try { body = JSON.parse(text); } catch { body = text; }
  return { status: response.status, body };
}

const anonMessages = await request(anon, "contact_messages?select=id");
console.log("anon SELECT contact_messages:", anonMessages.status, Array.isArray(anonMessages.body) ? anonMessages.body.length : anonMessages.body);

const anonProjects = await request(anon, "projects?select=slug&published=eq.true");
console.log("anon SELECT published projects:", anonProjects.status, anonProjects.body);

const anonInsert = await request(anon, "contact_messages", {
  method: "POST",
  body: JSON.stringify({
    name: "RLS Probe", email: "rls-probe@example.com",
    subject: "Automated RLS check", message: "Temporary message for policy verification.",
  }),
});
console.log("anon INSERT contact_messages:", anonInsert.status, JSON.stringify(anonInsert.body).slice(0, 300));

const adminMessages = await request(service, "contact_messages?select=id,name,email&order=created_at.desc");
console.log("admin SELECT contact_messages:", adminMessages.status, "rows:", adminMessages.body?.length);

const cleanup = await request(service, "contact_messages?email=eq.rls-probe@example.com", { method: "DELETE" });
console.log("cleanup probe:", cleanup.status);

const testimonials = await request(anon, "testimonials?select=id&approved=eq.true&published=eq.true");
console.log("anon SELECT approved testimonials:", testimonials.status, testimonials.body);
