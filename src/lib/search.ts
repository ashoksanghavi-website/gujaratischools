import Fuse from "fuse.js";
import { posts, resources } from "./content";

/* ============================================================
   Site-wide search.
   Resources, posts and key pages in one index, so a person types
   what they remember and gets the document. Fuzzy, so a
   misspelling still finds it.
   ============================================================ */

export type ResultKind = "Resource" | "News" | "Page";

export interface SearchDoc {
  kind: ResultKind;
  title: string;
  description: string;
  to: string;
  meta?: string;
  audience: string[];
  type?: string;
  keywords: string;
}

const pageDocs: SearchDoc[] = [
  {
    kind: "Page",
    title: "Resources library",
    description: "Every document CGS publishes, filterable by audience, type, exam and year.",
    to: "/resources",
    audience: ["Teachers", "Leaders", "Parents"],
    keywords: "downloads documents library past papers specifications",
  },
  {
    kind: "Page",
    title: "Membership",
    description: "Who can join, what members get, and the forms to complete.",
    to: "/membership",
    audience: ["Teachers", "Leaders"],
    keywords: "join subscription fees forms individual organisation",
  },
  {
    kind: "Page",
    title: "For teachers",
    description: "Training, exam guidance and classroom material for volunteer teachers.",
    to: "/teachers",
    audience: ["Teachers"],
    keywords: "teacher training cpd classroom",
  },
  {
    kind: "Page",
    title: "For parents",
    description: "Finding a Gujarati school, helping at home, and useful links.",
    to: "/parents",
    audience: ["Parents"],
    keywords: "parents children home school near me",
  },
  {
    kind: "Page",
    title: "Training events",
    description: "Past and upcoming CGS teacher training, with course materials.",
    to: "/events",
    audience: ["Teachers", "Leaders"],
    keywords: "training events courses workshops",
  },
  {
    kind: "Page",
    title: "About CGS",
    description: "What the Consortium of Gujarati Schools does and why.",
    to: "/about",
    audience: ["Teachers", "Leaders", "Parents"],
    keywords: "about charity consortium history aims",
  },
  {
    kind: "Page",
    title: "Rules & objects",
    description: "The charity's governing document and its objects.",
    to: "/about/rules",
    audience: ["Leaders"],
    keywords: "rules objects constitution governing document",
  },
  {
    kind: "Page",
    title: "Committee",
    description: "The current CGS committee and the previous term.",
    to: "/about/committee",
    audience: ["Leaders"],
    keywords: "committee trustees chair secretary treasurer",
  },
  {
    kind: "Page",
    title: "Photo gallery",
    description: "Photographs from CGS training events and meetings.",
    to: "/gallery",
    audience: ["Teachers", "Leaders", "Parents"],
    keywords: "photos gallery pictures events",
  },
  {
    kind: "Page",
    title: "Contact",
    description: "Reach the Chair or the membership secretary.",
    to: "/contact",
    audience: ["Teachers", "Leaders", "Parents"],
    keywords: "contact email phone enquiry",
  },
];

export const searchDocs: SearchDoc[] = [
  ...resources.map<SearchDoc>((r) => ({
    kind: "Resource",
    title: r.title,
    description: r.description,
    to: `/resources/${r.slug}`,
    meta: [r.fileType, r.fileSize].filter(Boolean).join(" · "),
    audience: r.audience,
    type: r.type,
    keywords: [r.type, r.exam, r.board, r.year, r.collection, ...r.tags].filter(Boolean).join(" "),
  })),
  ...posts.map<SearchDoc>((p) => ({
    kind: "News",
    title: p.title,
    description: p.excerpt,
    to: `${p.category === "Training Events" ? "/events" : "/news"}/${p.slug}`,
    meta: p.category,
    audience: p.audience,
    type: p.category,
    keywords: [p.category, ...p.tags].join(" "),
  })),
  ...pageDocs,
];

export const fuse = new Fuse(searchDocs, {
  keys: [
    { name: "title", weight: 0.5 },
    { name: "keywords", weight: 0.25 },
    { name: "description", weight: 0.15 },
    { name: "type", weight: 0.1 },
  ],
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
  includeScore: true,
});

export function searchSite(query: string, limit = 24): SearchDoc[] {
  const q = query.trim();
  if (q.length < 2) return [];
  return fuse.search(q, { limit }).map((r) => r.item);
}

/** Group results by kind, preserving relevance order within each group. */
export function groupResults(results: SearchDoc[]): { kind: ResultKind; items: SearchDoc[] }[] {
  const order: ResultKind[] = ["Resource", "News", "Page"];
  return order
    .map((kind) => ({ kind, items: results.filter((r) => r.kind === kind) }))
    .filter((g) => g.items.length > 0);
}
