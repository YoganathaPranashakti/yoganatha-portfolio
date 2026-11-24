// Applies supabase/migrations/*.sql to the project configured in .env.local.
// Intended for one-off setup; the same files can be pasted into the Supabase SQL editor.
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";

const env = {};
for (const line of readFileSync(resolve(".env.local"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
}

const connectionString = env.POSTGRES_PRISMA_URL || env.POSTGRES_URL;
if (!connectionString) throw new Error("POSTGRES_PRISMA_URL is missing from .env.local");

// Strip sslmode from the provider URL so the explicit SSL options below win.
const url = new URL(connectionString);
url.searchParams.delete("sslmode");

const client = new pg.Client({
  connectionString: url.toString(),
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});

await client.connect();
const dir = resolve("supabase/migrations");
const files = readdirSync(dir).filter((f) => f.endsWith(".sql")).sort();

for (const file of files) {
  const sql = readFileSync(resolve(dir, file), "utf8");
  process.stdout.write(`Applying ${file} ... `);
  await client.query(sql);
  process.stdout.write("done\n");
}

const tables = await client.query(
  "select tablename from pg_tables where schemaname='public' order by tablename",
);
console.log("Tables:", tables.rows.map((r) => r.tablename).join(", "));

const policies = await client.query(
  "select count(*)::int as count from pg_policies where schemaname='public'",
);
console.log("RLS policies:", policies.rows[0].count);

await client.end();
