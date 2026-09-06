import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getResource, resources, formatDate } from "@/lib/content";
import { Badge, audienceAccent } from "@/components/ui/Badge";
import { ResourceRow } from "@/components/resources/ResourceRow";
import { IconDownload, IconExternal } from "@/components/ui/Icons";
import { Seo } from "@/lib/seo";

/* ============================================================
   Resource detail.
   The download is the point, so it sits at the top and is the
   largest thing on the page. Below it: what else came from the
   same collection, because past papers and training packs are
   almost always wanted as a set.
   ============================================================ */

export default function ResourceDetail() {
  const { slug } = useParams();
  const r = slug ? getResource(slug) : undefined;

  const siblings = useMemo(() => {
    if (!r) return [];
    if (r.collection) {
      return resources.filter((x) => x.collection === r.collection && x.slug !== r.slug).slice(0, 12);
    }
    return resources.filter((x) => x.type === r.type && x.slug !== r.slug).slice(0, 6);
  }, [r]);

  if (!r) return <Navigate to="/resources" replace />;

  // A "Page" resource signposts a page on this site rather than a file.
  const isPage = r.fileType === "Page";

  return (
    <>
      <Seo
        title={r.title}
        description={r.description || `${r.type} published by the Consortium of Gujarati Schools.`}
        path={`/resources/${r.slug}`}
      />

      <article>
        <header className="border-b border-rule bg-paper-tint">
          <div className="container-cgs py-section-sm">
            <nav aria-label="Breadcrumb" className="mb-4">
              <ol className="flex flex-wrap items-center gap-2 text-small text-ink-soft">
                <li>
                  <Link to="/" className="link-draw hover:text-indigo">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/resources" className="link-draw hover:text-indigo">
                    Resources
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    to={`/resources?type=${encodeURIComponent(r.type)}`}
                    className="link-draw hover:text-indigo"
                  >
                    {r.type}
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="relative max-w-measure pl-6">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule" />
              <h1 className="text-h1">{r.title}</h1>
              {r.description && <p className="mt-4 text-lead text-ink-soft">{r.description}</p>}

              <div className="mt-5 flex flex-wrap gap-2">
                {r.audience.map((a) => (
                  <Badge key={a} tone="audience" accent={audienceAccent[a]}>
                    {a}
                  </Badge>
                ))}
                <Badge tone="type">{r.type}</Badge>
                {r.exam && <Badge tone="exam">{r.exam}</Badge>}
                {r.board && <Badge tone="type">{r.board}</Badge>}
                {r.year && <Badge tone="type">{r.year}</Badge>}
              </div>
            </div>
          </div>
        </header>

        <div className="container-cgs py-8">
          {/* The download */}
          <div className="rounded-lg border border-rule bg-paper-raised p-6 shadow-e1">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="tnum text-small text-ink-soft">
                  {isPage ? "Page on this site" : r.fileType}
                  {r.fileSize ? ` · ${r.fileSize}` : ""}
                  {r.date ? ` · added ${formatDate(r.date)}` : ""}
                </p>
                {r.collection && (
                  <p className="mt-1 text-small text-ink-soft">
                    Part of{" "}
                    <Link
                      to={`/resources?q=${encodeURIComponent(r.collection)}`}
                      className="link-draw font-semibold text-indigo"
                    >
                      {r.collection}
                    </Link>
                  </p>
                )}
              </div>

              {isPage ? (
                <Link
                  to={r.fileUrl}
                  className="inline-flex min-h-[56px] shrink-0 items-center justify-center gap-2 rounded-pill border-2 border-indigo px-7 font-semibold text-indigo transition-colors duration-fast hover:bg-indigo hover:text-white"
                >
                  Read the page
                </Link>
              ) : r.external ? (
                <a
                  href={r.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[56px] shrink-0 items-center justify-center gap-2 rounded-pill border-2 border-indigo px-7 font-semibold text-indigo transition-colors duration-fast hover:bg-indigo hover:text-white"
                >
                  <IconExternal size={18} />
                  Open link
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ) : (
                <a
                  href={r.fileUrl}
                  download
                  className="inline-flex min-h-[56px] shrink-0 items-center justify-center gap-2 rounded-pill bg-marigold px-7 font-semibold text-ink transition-colors duration-fast hover:bg-[color-mix(in_srgb,var(--marigold)_88%,var(--ink))]"
                >
                  <IconDownload size={18} />
                  Download {r.fileType}
                  {r.fileSize && <span className="font-normal text-ink/70">({r.fileSize})</span>}
                </a>
              )}
            </div>
          </div>

          {r.body.trim() && (
            <div className="relative mt-8 max-w-measure pl-6">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule/60" />
              <div className="prose-cgs" dangerouslySetInnerHTML={{ __html: r.html }} />
            </div>
          )}

          {siblings.length > 0 && (
            <section className="mt-9 border-t border-rule pt-8" aria-labelledby="siblings">
              <h2 id="siblings" className="text-h2">
                {r.collection ? `Everything else in ${r.collection}` : `More ${r.type.toLowerCase()}`}
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {siblings.map((s) => (
                  <ResourceRow key={s.slug} r={s} />
                ))}
              </ul>
              <Link
                to={`/resources?type=${encodeURIComponent(r.type)}`}
                className="link-draw mt-5 inline-block font-semibold text-indigo"
              >
                Browse all {r.type.toLowerCase()}
              </Link>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
