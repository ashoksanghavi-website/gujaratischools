import { useMemo, useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { getPost, posts, resources, formatDate } from "@/lib/content";
import { Badge } from "@/components/ui/Badge";
import { ResourceRow } from "@/components/resources/ResourceRow";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { Seo } from "@/lib/seo";
import { site } from "@/data/site";

/* ============================================================
   Article page — news and events share this.
   Generous measure, the margin rule down the left, a clear date
   and category, attachments listed as proper resource rows, an
   optional gallery with a lightbox, and related posts at the end.
   ============================================================ */

export default function NewsDetail({ kind = "news" }: { kind?: "news" | "events" }) {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  const [lightbox, setLightbox] = useState<number | null>(null);

  /* Course material for a training event lives in the library, tagged
     with the event's source page. Surface it here so nobody has to hunt. */
  const attachments = useMemo(() => {
    if (!post) return [];
    const explicit = post.attachments
      .map((a) => resources.find((r) => r.fileUrl === a || r.slug === a))
      .filter(Boolean);
    if (explicit.length) return explicit as typeof resources;
    const src = post.oldUrl?.replace(/^\//, "");
    if (!src) return [];
    return resources.filter((r) => r.source === src);
  }, [post]);

  const related = useMemo(() => {
    if (!post) return [];
    return posts
      .filter((p) => p.slug !== post.slug && p.category === post.category)
      .slice(0, 3);
  }, [post]);

  const gallery: LightboxItem[] = useMemo(
    () =>
      (post?.gallery ?? []).map((src) => ({
        src,
        alt: `Photograph from ${post?.title ?? "the event"}`,
      })),
    [post]
  );

  if (!post) return <Navigate to="/news" replace />;

  const backTo = kind === "events" ? "/events" : "/news";
  const backLabel = kind === "events" ? "Training events" : "News and events";

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt || `${post.category} from the Consortium of Gujarati Schools.`}
        path={`${backTo}/${post.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": post.category === "Training Events" ? "Event" : "Article",
          name: post.title,
          headline: post.title,
          datePublished: post.date,
          ...(post.category === "Training Events"
            ? { startDate: post.date, eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode" }
            : {}),
          description: post.excerpt,
          publisher: { "@type": "Organization", name: site.name },
        }}
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
                  <Link to={backTo} className="link-draw hover:text-indigo">
                    {backLabel}
                  </Link>
                </li>
              </ol>
            </nav>

            <div className="relative max-w-measure pl-6">
              <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule" />
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge tone="type">{post.category}</Badge>
                <time className="tnum text-small text-ink-soft" dateTime={post.date}>
                  {formatDate(post.date)}
                </time>
                {post.location && <span className="text-small text-ink-soft">· {post.location}</span>}
              </div>
              <h1 className="text-h1">{post.title}</h1>
              {post.excerpt && <p className="mt-4 text-lead text-ink-soft">{post.excerpt}</p>}
            </div>
          </div>
        </header>

        {post.cover && (
          <div className="container-cgs -mt-0 pt-8">
            <img
              src={post.cover}
              alt=""
              width={1200}
              height={675}
              className="w-full rounded-lg border border-rule object-cover"
              style={{ aspectRatio: "16 / 9" }}
            />
          </div>
        )}

        <div className="container-cgs py-8">
          <div className="relative max-w-measure pl-6">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule/60" />
            <div className="prose-cgs" dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>

          {/* Course material / attachments */}
          {attachments.length > 0 && (
            <section className="mt-9" aria-labelledby="attachments">
              <h2 id="attachments" className="text-h2">
                Course material
              </h2>
              <p className="tnum mt-2 text-small text-ink-soft">
                {attachments.length} file{attachments.length === 1 ? "" : "s"} from this session.
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {attachments.slice(0, 12).map((r) => (
                  <ResourceRow key={r.slug} r={r} />
                ))}
              </ul>
              {attachments.length > 12 && (
                <Link
                  to={`/resources?q=${encodeURIComponent(post.title)}`}
                  className="link-draw mt-4 inline-block font-semibold text-indigo"
                >
                  See all {attachments.length} files from this session
                </Link>
              )}
            </section>
          )}

          {/* Gallery */}
          {gallery.length > 0 && (
            <section className="mt-9" aria-labelledby="gallery">
              <h2 id="gallery" className="text-h2">
                Photographs
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">
                {gallery.map((g, i) => (
                  <li key={g.src}>
                    <button
                      type="button"
                      onClick={() => setLightbox(i)}
                      className="group block w-full overflow-hidden rounded-md border border-rule bg-paper-tint"
                    >
                      <img
                        src={g.src}
                        alt={g.alt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[3/2] w-full object-cover transition-transform duration-slow ease-out group-hover:scale-105 motion-reduce:transform-none"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-9 border-t border-rule pt-8" aria-labelledby="related">
              <h2 id="related" className="text-h2">
                More {post.category.toLowerCase()}
              </h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-3">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`${p.category === "Training Events" ? "/events" : "/news"}/${p.slug}`}
                      className="group flex h-full flex-col rounded-md border border-rule bg-paper-raised p-4 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                    >
                      <span className="tnum text-micro text-ink-soft">{formatDate(p.date)}</span>
                      <span className="mt-1 font-display text-h3 text-ink transition-colors group-hover:text-indigo">
                        {p.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>

      <Lightbox items={gallery} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />
    </>
  );
}
