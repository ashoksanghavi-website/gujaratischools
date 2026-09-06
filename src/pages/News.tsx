import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { posts, postCategories, formatDateShort } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Chip, Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/SectionHeader";
import { RhythmGrid } from "@/components/ui/Card";
import { IconSearch } from "@/components/ui/Icons";
import { useMotionAllowed } from "@/lib/motion";
import { Seo } from "@/lib/seo";

const PAGE = 9;
const routeFor = (c: string) => (c === "Training Events" ? "/events" : "/news");

export default function News() {
  const [sp, setSp] = useSearchParams();
  const allow = useMotionAllowed();
  const [limit, setLimit] = useState(PAGE);

  const category = sp.get("category") ?? "";
  const q = sp.get("q") ?? "";

  const filtered = useMemo(
    () =>
      posts.filter((p) => {
        if (category && p.category !== category) return false;
        if (q.trim().length >= 2) {
          const hay = `${p.title} ${p.excerpt} ${p.tags.join(" ")}`.toLowerCase();
          if (!hay.includes(q.trim().toLowerCase())) return false;
        }
        return true;
      }),
    [category, q]
  );

  const visible = filtered.slice(0, limit);

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(sp);
    if (value) next.set(key, value);
    else next.delete(key);
    setSp(next, { replace: true });
    setLimit(PAGE);
  };

  return (
    <>
      <Seo
        title="News and events"
        description="Exam updates, teacher training events, newsletters and announcements from the Consortium of Gujarati Schools."
        path="/news"
      />

      <PageHero
        title="News and events"
        intro="Exam updates, training events and newsletters. Course materials from each training session are in the resource library."
        kakko="ન"
        tint
      />

      <div className="container-cgs py-8">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-md border border-rule-strong bg-paper-raised px-4">
          <IconSearch size={20} className="shrink-0 text-ink-soft" />
          <label htmlFor="news-q" className="sr-only">
            Search news
          </label>
          <input
            id="news-q"
            type="search"
            value={q}
            onChange={(e) => setParam("q", e.target.value)}
            placeholder="Search news and events"
            className="min-h-[56px] w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft/70"
          />
        </div>

        {/* Category chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip active={!category} onClick={() => setParam("category", "")}>
            All
          </Chip>
          {postCategories.map((c) => (
            <Chip key={c} active={category === c} onClick={() => setParam("category", category === c ? "" : c)}>
              {c}
            </Chip>
          ))}
        </div>

        <p className="tnum mt-4 text-small text-ink-soft" aria-live="polite">
          <strong className="font-semibold text-ink">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "post" : "posts"}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="Nothing here yet"
              body={
                category
                  ? `There are no posts in “${category}” matching that search.`
                  : "No posts matched that search."
              }
              action={
                <Button variant="quiet" onClick={() => setSp(new URLSearchParams(), { replace: true })}>
                  Clear filters
                </Button>
              }
            />
          </div>
        ) : (
          <>
            <RhythmGrid count={visible.length} className="mt-6" as="ul">
              <AnimatePresence initial={false} mode="popLayout">
                {visible.map((p) => (
                  <motion.li
                    key={p.slug}
                    layout={allow}
                    initial={allow ? { opacity: 0, y: 8 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    exit={allow ? { opacity: 0, scale: 0.98 } : undefined}
                    transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                  >
                    <Link
                      to={`${routeFor(p.category)}/${p.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-md border border-rule bg-paper-raised shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                    >
                      {p.cover && (
                        <div className="relative aspect-[3/2] overflow-hidden bg-paper-tint">
                          <img
                            src={p.cover}
                            alt=""
                            width={800}
                            height={533}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
                          />
                        </div>
                      )}
                      <div className="flex flex-1 flex-col p-5">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <Badge tone="type">{p.category}</Badge>
                          <span className="tnum text-micro text-ink-soft">{formatDateShort(p.date)}</span>
                        </div>
                        <h2 className="text-h3 transition-colors group-hover:text-indigo [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                          {p.title}
                        </h2>
                        {p.excerpt && (
                          <p className="mt-2 text-small text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                            {p.excerpt}
                          </p>
                        )}
                      </div>
                    </Link>
                  </motion.li>
                ))}
              </AnimatePresence>
            </RhythmGrid>

            {limit < filtered.length && (
              <div className="mt-7 flex justify-center">
                <Button variant="quiet" onClick={() => setLimit((l) => l + PAGE)}>
                  Show more posts
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
