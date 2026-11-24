// One-off admin provisioning using the Supabase Auth admin API (server-side only).
import { randomBytes } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const env = {};
for (const line of readFileSync(resolve(".env.local"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
}

const url = env.SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2] || "yoganathapranashakti@gmail.com";
if (!url || !serviceKey) throw new Error("Supabase URL or service role key missing");

const headers = {
  apikey: serviceKey,
  Authorization: `Bearer ${serviceKey}`,
  "Content-Type": "application/json",
};

const password = `${randomBytes(16).toString("base64url")}A1!`;
let userId;

const created = await fetch(`${url}/auth/v1/admin/users`, {
  method: "POST",
  headers,
  body: JSON.stringify({ email, password, email_confirm: true }),
});
if (created.ok) {
  userId = (await created.json()).id;
  console.log("Auth user created.");
} else {
  const body = await created.text();
  if (!/already|registered|exists/i.test(body)) {
    throw new Error(`Auth user creation failed: ${created.status} ${body}`);
  }
  const listed = await fetch(`${url}/auth/v1/admin/users?per_page=200`, { headers });
  const users = await listed.json();
  userId = users.users?.find((u) => u.email === email)?.id;
  if (!userId) throw new Error("User exists but could not be resolved");
  console.log("Existing auth user reused.");
}

const dbUrl = new URL(env.POSTGRES_PRISMA_URL || env.POSTGRES_URL);
dbUrl.searchParams.delete("sslmode");
const client = new pg.Client({
  connectionString: dbUrl.toString(),
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});
await client.connect();
await client.query(
  "insert into public.admin_users (user_id, email) values ($1,$2) on conflict (user_id) do nothing",
  [userId, email],
);
await client.end();

const line = `Admin email: ${email}\nAdmin password: ${password}\nAdmin user id: ${userId}\n`;
writeFileSync(resolve("docs/admin-credentials.txt"), line, { flag: "a" });
console.log("Admin row inserted. Credentials appended to docs/admin-credentials.txt");
