import { Link } from "react-router-dom";
import { posts, formatDateShort } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";

/* ============================================================
   Latest news — one feature plus two.
   A three-item set in a plain grid would be fine, but the feature
   layout matches how people read a news page: one thing first.
   ============================================================ */

const routeFor = (category: string) => (category === "Training Events" ? "/events" : "/news");

export function LatestNews() {
  const [lead, ...rest] = posts.slice(0, 3);
  if (!lead) return null;

  return (
    <section className="section" aria-labelledby="latest-news">
      <div className="container-cgs">
        <SectionHeader
          id="latest-news"
          title="News and training"
          intro="Exam updates, training events and newsletters from the Consortium."
          action={{ to: "/news", label: "All news and events" }}
        />

        <div className="grid gap-5 lg:grid-cols-2">
          {/* Feature */}
          <Link
            to={`${routeFor(lead.category)}/${lead.slug}`}
            className="group flex flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
          >
            {lead.cover && (
              <div className="relative aspect-[16/9] overflow-hidden bg-paper-tint">
                <img
                  src={lead.cover}
                  alt=""
                  width={1200}
                  height={675}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge tone="type">{lead.category}</Badge>
                <span className="tnum text-micro text-ink-soft">{formatDateShort(lead.date)}</span>
              </div>
              <h3 className="text-h2 transition-colors group-hover:text-indigo">{lead.title}</h3>
              {lead.excerpt && <p className="mt-3 text-ink-soft">{lead.excerpt}</p>}
            </div>
          </Link>

          {/* Two beneath */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((p) => (
              <Link
                key={p.slug}
                to={`${routeFor(p.category)}/${p.slug}`}
                className="group flex flex-col rounded-md border border-rule bg-paper-raised p-5 shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge tone="type">{p.category}</Badge>
                  <span className="tnum text-micro text-ink-soft">{formatDateShort(p.date)}</span>
                </div>
                <h3 className="text-h3 transition-colors group-hover:text-indigo">{p.title}</h3>
                {p.excerpt && (
                  <p className="mt-2 text-small text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                    {p.excerpt}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
