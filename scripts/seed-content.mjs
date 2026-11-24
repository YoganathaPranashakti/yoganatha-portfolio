// Seeds the verified fallback content into Supabase so the live site is DB-backed.
// Re-running is safe: projects upsert by slug and other rows are inserted only if absent.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import pg from "pg";
import ts from "typescript";

const env = {};
for (const line of readFileSync(resolve(".env.local"), "utf8").split(/\r?\n/)) {
  const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
  if (match) env[match[1]] = match[2].replace(/^["']|["']$/g, "");
}

const source = readFileSync(resolve("lib/data/fallback.ts"), "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText;
const data = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

const dbUrl = new URL(env.POSTGRES_PRISMA_URL || env.POSTGRES_URL);
dbUrl.searchParams.delete("sslmode");
const client = new pg.Client({
  connectionString: dbUrl.toString(),
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 20000,
});
await client.connect();

for (const p of data.fallbackProjects) {
  await client.query(
    `insert into public.projects
      (slug,title,description,thumbnail,gallery,category,technologies,role,features,challenges,solutions,results,overview,problem,objectives,process,live_url,github_url,featured,published)
     values ($1,$2,$3,$4,$5::jsonb,$6,$7::jsonb,$8,$9::jsonb,$10::jsonb,$11::jsonb,$12::jsonb,$13,$14,$15::jsonb,$16::jsonb,$17,$18,$19,$20)
     on conflict (slug) do update set title=excluded.title, description=excluded.description,
       thumbnail=excluded.thumbnail, gallery=excluded.gallery, category=excluded.category,
       technologies=excluded.technologies, role=excluded.role, features=excluded.features,
       challenges=excluded.challenges, solutions=excluded.solutions, results=excluded.results,
       overview=excluded.overview, problem=excluded.problem, objectives=excluded.objectives,
       process=excluded.process, live_url=excluded.live_url, github_url=excluded.github_url,
       featured=excluded.featured, published=excluded.published`,
    [p.slug, p.title, p.description, p.thumbnail, JSON.stringify(p.gallery), p.category,
      JSON.stringify(p.technologies), p.role, JSON.stringify(p.features), JSON.stringify(p.challenges),
      JSON.stringify(p.solutions), JSON.stringify(p.results), p.overview, p.problem,
      JSON.stringify(p.objectives), JSON.stringify(p.process), p.live_url, p.github_url,
      p.featured, p.published],
  );
}

for (const s of data.fallbackSkills) {
  await client.query(
    `insert into public.skills (name,category,note,sort_order,published)
     select $1,$2,$3,$4,true where not exists
       (select 1 from public.skills where name=$1 and category=$2)`,
    [s.name, s.category, s.note, s.sort_order],
  );
}

for (const e of data.fallbackEducation) {
  await client.query(
    `insert into public.education (institution,program,degree,gpa,published)
     select $1,$2,$3,$4,true where not exists
       (select 1 from public.education where institution=$1 and program=$2)`,
    [e.institution, e.program, e.degree, e.gpa],
  );
}

for (const x of data.fallbackExperience) {
  await client.query(
    `insert into public.experiences (title,organization,type,start_date,description,highlights,url,published)
     select $1,$2,$3,$4,$5,$6::jsonb,$7,true where not exists
       (select 1 from public.experiences where title=$1 and organization=$2)`,
    [x.title, x.organization, x.type, x.start_date, x.description,
      JSON.stringify(x.highlights), x.url],
  );
}

for (const table of ["projects", "skills", "education", "experiences", "certifications", "testimonials"]) {
  const { rows } = await client.query(`select count(*)::int as n from public.${table}`);
  console.log(`${table}: ${rows[0].n}`);
}
await client.end();
