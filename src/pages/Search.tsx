import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { groupResults, searchSite } from "@/lib/search";
import { PageHero } from "@/components/ui/PageHero";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { IconSearch } from "@/components/ui/Icons";
import { Seo } from "@/lib/seo";

/* A full-page mirror of the overlay, so a set of results can be
   linked and shared. */
export default function Search() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") ?? "";

  const results = useMemo(() => searchSite(q, 60), [q]);
  const groups = useMemo(() => groupResults(results), [results]);

  return (
    <>
      <Seo
        title={q ? `Search: ${q}` : "Search"}
        description="Search resources, news and pages across the Consortium of Gujarati Schools website."
        path="/search"
      />

      <PageHero title="Search" breadcrumb={[{ to: "/", label: "Home" }]} tint />

      <div className="container-cgs py-8">
        <div className="flex items-center gap-3 rounded-md border border-rule-strong bg-paper-raised px-4">
          <IconSearch size={20} className="shrink-0 text-ink-soft" />
          <label htmlFor="site-q" className="sr-only">
            Search the site
          </label>
          <input
            id="site-q"
            type="search"
            value={q}
            onChange={(e) => {
              const next = new URLSearchParams(sp);
              if (e.target.value) next.set("q", e.target.value);
              else next.delete("q");
              setSp(next, { replace: true });
            }}
            placeholder="Search resources, news and pages"
            className="min-h-[56px] w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft/70"
          />
        </div>

        <p className="tnum mt-4 text-small text-ink-soft" aria-live="polite">
          {q.length < 2
            ? "Type at least two characters."
            : `${results.length} result${results.length === 1 ? "" : "s"} for “${q}”`}
        </p>

        {q.length >= 2 && results.length === 0 && (
          <div className="mt-6">
            <EmptyState
              title={`Nothing matched “${q}”`}
              body="Try a shorter or more general word — for example “past paper” rather than a full document title."
              action={<ButtonLink to="/resources" variant="secondary">Browse all resources</ButtonLink>}
            />
          </div>
        )}

        {groups.map((g) => (
          <section key={g.kind} className="mt-8">
            <h2 className="text-h3">
              {g.kind === "Resource" ? "Resources" : g.kind === "News" ? "News and events" : "Pages"}
              <span className="tnum ml-2 text-small font-normal text-ink-soft">{g.items.length}</span>
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {g.items.map((r) => (
                <li key={r.to + r.title}>
                  <Link
                    to={r.to}
                    className="group flex flex-col gap-1 rounded-md border border-rule bg-paper-raised p-4 transition-transform duration-base ease-out hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
                  >
                    <span className="flex flex-wrap items-start justify-between gap-3">
                      <span className="font-semibold text-ink transition-colors group-hover:text-indigo">
                        {r.title}
                      </span>
                      {r.type && <Badge tone="type">{r.type}</Badge>}
                    </span>
                    {r.description && <span className="text-small text-ink-soft">{r.description}</span>}
                    {r.meta && <span className="tnum text-micro text-ink-soft">{r.meta}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}
