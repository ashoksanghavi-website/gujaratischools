/* ============================================================
   Document hosting.
   The document library (PDFs, audio, video) is large, so it is
   NOT kept in git / deployed with the app. In production it is
   served from object storage (Cloudflare R2) and VITE_DOCS_BASE
   points the site at it. In local dev the variable is empty, so
   documents are served from /public/documents as usual.

   Only `/documents/...` paths are rewritten — page links
   (/news/…, /resources/…) and external URLs pass through.
   See DEPLOY.md for the R2 setup.
   ============================================================ */

export const DOCS_BASE = (import.meta.env.VITE_DOCS_BASE || "").replace(/\/+$/, "");

export function docUrl(path: string | undefined): string {
  if (!path) return "";
  if (DOCS_BASE && path.startsWith("/documents/")) return DOCS_BASE + path;
  return path;
}
