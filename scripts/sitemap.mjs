/* Generates public/sitemap.xml from the markdown content.
   Run automatically before each build (see package.json). */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BASE = 'https://www.gujaratischools.org';

const STATIC = [
  ['/', '1.0', 'weekly'],
  ['/find-a-school', '0.9', 'monthly'],
  ['/teach', '0.8', 'monthly'],
  ['/resources', '0.9', 'weekly'],
  ['/news', '0.8', 'weekly'],
  ['/events', '0.7', 'monthly'],
  ['/teachers', '0.8', 'monthly'],
  ['/parents', '0.7', 'monthly'],
  ['/membership', '0.7', 'monthly'],
  ['/about', '0.6', 'yearly'],
  ['/about/rules', '0.5', 'yearly'],
  ['/about/committee', '0.5', 'yearly'],
  ['/gallery', '0.5', 'monthly'],
  ['/contact', '0.6', 'yearly'],
  ['/search', '0.3', 'yearly'],
];

const frontmatter = (raw) => {
  const m = /^---\s*\n([\s\S]*?)\n---/.exec(raw.trim());
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (kv) out[kv[1]] = kv[2].replace(/^["']|["']$/g, '').trim();
  }
  return out;
};

const read = (dir) => {
  const p = path.join(ROOT, 'content', dir);
  if (!fs.existsSync(p)) return [];
  return fs.readdirSync(p)
    .filter((f) => f.endsWith('.md') && f !== 'README.md')
    .map((f) => ({ slug: f.replace(/\.md$/, ''), ...frontmatter(fs.readFileSync(path.join(p, f), 'utf8')) }));
};

const posts = read('posts');
const resources = read('resources');
const today = new Date().toISOString().slice(0, 10);

const url = (loc, pri, freq, date) =>
  `  <url>\n    <loc>${BASE}${loc}</loc>\n    <lastmod>${date || today}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${pri}</priority>\n  </url>`;

const body = [
  ...STATIC.map(([l, p, f]) => url(l, p, f)),
  ...posts.map((p) =>
    url(`${p.category === 'Training Events' ? '/events' : '/news'}/${p.slug}`, '0.6', 'yearly', p.date)
  ),
  ...resources.map((r) => url(`/resources/${r.slug}`, '0.5', 'yearly', r.date)),
].join('\n');

fs.writeFileSync(
  path.join(ROOT, 'public/sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`
);

console.log(`sitemap: ${STATIC.length} pages, ${posts.length} posts, ${resources.length} resources`);
