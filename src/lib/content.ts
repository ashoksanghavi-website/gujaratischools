import { marked } from "marked";

/* ============================================================
   Markdown content loader.
     content/posts/*.md      → news + events
     content/resources/*.md  → the resource library
   Publishing = dropping in a .md file. No code changes.
   See content/README.md for the committee-facing guide.
   ============================================================ */

marked.setOptions({ gfm: true, breaks: false });

export type Audience = "Teachers" | "Leaders" | "Parents";

export interface Post {
  slug: string;
  title: string;
  date: string;
  category: string;
  audience: string[];
  excerpt: string;
  cover?: string;
  tags: string[];
  gallery: string[];
  attachments: string[];
  location?: string;
  oldUrl?: string;
  body: string;
  html: string;
}

export interface Resource {
  slug: string;
  title: string;
  description: string;
  audience: string[];
  type: string;
  exam?: string;
  board?: string;
  year?: number;
  collection?: string;
  fileUrl: string;
  fileType: string;
  fileSize?: string;
  date: string;
  tags: string[];
  external: boolean;
  featured: boolean;
  source?: string;
  body: string;
  html: string;
}

/* ---------- frontmatter ---------- */
function parseFrontmatter(raw: string): { data: Record<string, unknown>; body: string } {
  const match = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/.exec(raw.trim());
  if (!match) return { data: {}, body: raw };

  const [, fm, body] = match;
  const data: Record<string, unknown> = {};
  const lines = fm.split("\n");
  let i = 0;

  const stripQuotes = (v: string) => v.replace(/^["']/, "").replace(/["']$/, "").trim();

  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) {
      i++;
      continue;
    }
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (!kv) {
      i++;
      continue;
    }
    const key = kv[1];
    const value = kv[2].trim();

    if (value === "") {
      const arr: string[] = [];
      let j = i + 1;
      while (j < lines.length && /^\s*-\s+/.test(lines[j])) {
        arr.push(stripQuotes(lines[j].replace(/^\s*-\s+/, "")));
        j++;
      }
      data[key] = arr.length ? arr : "";
      i = arr.length ? j : i + 1;
      continue;
    }

    if (value.startsWith("[") && value.endsWith("]")) {
      data[key] = value
        .slice(1, -1)
        .split(",")
        .map((s) => stripQuotes(s))
        .filter(Boolean);
      i++;
      continue;
    }

    if (value === "true" || value === "false") {
      data[key] = value === "true";
      i++;
      continue;
    }

    data[key] = stripQuotes(value);
    i++;
  }

  return { data, body };
}

const slugFromPath = (p: string) => p.split("/").pop()!.replace(/\.md$/, "");

function asArray(v: unknown): string[] {
  if (Array.isArray(v)) return v as string[];
  if (typeof v === "string" && v.trim()) return [v.trim()];
  return [];
}

const num = (v: unknown): number | undefined => {
  const n = Number(v);
  return Number.isFinite(n) && v !== "" && v !== undefined ? n : undefined;
};

/* ---------- posts ---------- */
const postFiles = import.meta.glob("/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const posts: Post[] = Object.entries(postFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: (data.slug as string) || slugFromPath(path),
      title: (data.title as string) || "Untitled",
      date: (data.date as string) || "2020-01-01",
      category: (data.category as string) || "Announcements",
      audience: asArray(data.audience),
      excerpt: (data.excerpt as string) || "",
      cover: (data.cover as string) || undefined,
      tags: asArray(data.tags),
      gallery: asArray(data.gallery),
      attachments: asArray(data.attachments),
      location: (data.location as string) || undefined,
      oldUrl: (data.oldUrl as string) || undefined,
      body,
      html: marked.parse(body) as string,
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

/* ---------- resources ---------- */
const resourceFiles = import.meta.glob("/content/resources/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

/* `html` is a lazy getter: rendering 378 documents through marked at
   module load cost ~half a second on a mid-range phone, and only the
   one open detail page ever needs it. Rendered once, then cached. */
function withLazyHtml<T extends { body: string }>(obj: T): T & { html: string } {
  let cached: string | undefined;
  Object.defineProperty(obj, "html", {
    get() {
      if (cached === undefined) cached = marked.parse(obj.body) as string;
      return cached;
    },
    enumerable: false,
    configurable: true,
  });
  return obj as T & { html: string };
}

export const resources: Resource[] = Object.entries(resourceFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const fileUrl = (data.fileUrl as string) || "";
    return withLazyHtml({
      slug: (data.slug as string) || slugFromPath(path),
      title: (data.title as string) || "Untitled",
      description: (data.description as string) || "",
      audience: asArray(data.audience),
      type: (data.type as string) || "Teaching Materials",
      exam: (data.exam as string) || undefined,
      board: (data.board as string) || undefined,
      year: num(data.year),
      collection: (data.collection as string) || undefined,
      fileUrl,
      fileType: (data.fileType as string) || "Link",
      fileSize: (data.fileSize as string) || undefined,
      date: (data.date as string) || "2020-01-01",
      tags: asArray(data.tags),
      external: Boolean(data.external) || /^https?:\/\//.test(fileUrl),
      featured: Boolean(data.featured),
      source: (data.source as string) || undefined,
      body,
    }) as Resource;
  })
  .sort((a, b) => a.title.localeCompare(b.title, "en"));

/* ---------- schools ----------
   The CGS member-school directory. One markdown file per school in
   content/schools/*.md, so each member school can own and update its own
   listing. This is the "find a school near you" growth engine, and the
   maintenance hook that keeps the network visible. */
export interface School {
  slug: string;
  name: string;
  org?: string;
  area?: string;
  address?: string;
  postcode?: string;
  region: string;
  contact?: string;
  when?: string;
  note: string;
}

const schoolFiles = import.meta.glob("/content/schools/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export const schools: School[] = Object.entries(schoolFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    return {
      slug: slugFromPath(path),
      name: (data.name as string) || "Gujarati school",
      org: (data.org as string) || undefined,
      area: (data.area as string) || undefined,
      address: (data.address as string) || undefined,
      postcode: (data.postcode as string) || undefined,
      region: (data.region as string) || "Other member schools",
      contact: (data.contact as string) || undefined,
      when: (data.when as string) || undefined,
      note: body.trim(),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name, "en"));

/* Regions in geographic reading order, with the catch-all last. */
const regionOrder = [
  "London & the South East",
  "East of England",
  "The Midlands",
  "The North West",
  "Other member schools",
];
export const schoolRegions = Array.from(new Set(schools.map((s) => s.region))).sort(
  (a, b) => {
    const ia = regionOrder.indexOf(a);
    const ib = regionOrder.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  }
);
export const schoolTownCount = new Set(
  schools.map((s) => s.area).filter(Boolean)
).size;

/* ---------- lookups ---------- */
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const getResource = (slug: string) => resources.find((r) => r.slug === slug);

/* Events are training posts; news is everything else. Both live in
   content/posts so the committee only has one folder to think about. */
export const events = posts.filter((p) => p.category === "Training Events");
export const news = posts;

export const postCategories = Array.from(new Set(posts.map((p) => p.category))).sort();

/* Filter facets, ordered deliberately: the order a teacher thinks in. */
export const AUDIENCES: Audience[] = ["Teachers", "Leaders", "Parents"];

const typeOrder = [
  "Past Papers",
  "Exam Specifications",
  "Exam Information",
  "Training Materials",
  "Teaching Materials",
  "Membership Forms",
  "Newsletters",
  "Useful Links",
  "Governance",
  "Press Coverage",
  "Videos",
];

export const resourceTypes = Array.from(new Set(resources.map((r) => r.type))).sort(
  (a, b) => {
    const ia = typeOrder.indexOf(a);
    const ib = typeOrder.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib) || a.localeCompare(b);
  }
);

export const resourceExams = Array.from(
  new Set(resources.map((r) => r.exam).filter(Boolean) as string[])
).sort();

export const resourceBoards = Array.from(
  new Set(resources.map((r) => r.board).filter(Boolean) as string[])
).sort();

export const resourceYears = Array.from(
  new Set(resources.map((r) => r.year).filter(Boolean) as number[])
).sort((a, b) => b - a);

export const countByType = (type: string) => resources.filter((r) => r.type === type).length;
export const countByAudience = (a: string) => resources.filter((r) => r.audience.includes(a)).length;

/* ---------- formatting ---------- */
export function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

export function formatDateShort(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
