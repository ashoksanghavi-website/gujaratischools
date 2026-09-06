import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Fuse from "fuse.js";
import {
  resources,
  resourceTypes,
  resourceExams,
  resourceBoards,
  resourceYears,
  AUDIENCES,
} from "@/lib/content";
import { FilterRail, audienceAccentFor, type FilterGroup } from "@/components/resources/FilterRail";
import { ResourceRow } from "@/components/resources/ResourceRow";
import { Chip } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/SectionHeader";
import { MarginRule, Kakko, KAKKO } from "@/components/motifs/Motifs";
import { IconSearch, IconFilter, IconClose } from "@/components/ui/Icons";
import { useMotionAllowed } from "@/lib/motion";
import { Seo } from "@/lib/seo";

/* ============================================================
   The resource library.
   Four independent filter axes plus free text, combined, with the
   state mirrored into the URL so any view can be bookmarked and
   emailed ("here are all the GCSE past papers").
   ============================================================ */

const PAGE_SIZE = 40;

const fuse = new Fuse(resources, {
  keys: [
    { name: "title", weight: 0.55 },
    { name: "description", weight: 0.2 },
    { name: "tags", weight: 0.15 },
    { name: "collection", weight: 0.1 },
  ],
  threshold: 0.36,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

/** Read a repeatable param as an array. */
const readList = (sp: URLSearchParams, key: string) =>
  sp.getAll(key).flatMap((v) => v.split(",")).filter(Boolean);

export default function Resources() {
  const [sp, setSp] = useSearchParams();
  const allowMotion = useMotionAllowed();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [limit, setLimit] = useState(PAGE_SIZE);
  const resultsTop = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => ({
      audience: readList(sp, "audience"),
      type: readList(sp, "type"),
      exam: readList(sp, "exam"),
      board: readList(sp, "board"),
      year: readList(sp, "year"),
    }),
    [sp]
  );
  const q = sp.get("q") ?? "";

  const activeCount =
    selected.audience.length +
    selected.type.length +
    selected.exam.length +
    selected.board.length +
    selected.year.length +
    (q ? 1 : 0);

  /* ---------- filtering ---------- */
  const base = useMemo(() => (q.trim().length >= 2 ? fuse.search(q).map((r) => r.item) : resources), [q]);

  const filtered = useMemo(
    () =>
      base.filter((r) => {
        if (selected.audience.length && !selected.audience.some((a) => r.audience.includes(a))) return false;
        if (selected.type.length && !selected.type.includes(r.type)) return false;
        if (selected.exam.length && (!r.exam || !selected.exam.includes(r.exam))) return false;
        if (selected.board.length && (!r.board || !selected.board.includes(r.board))) return false;
        if (selected.year.length && (!r.year || !selected.year.includes(String(r.year)))) return false;
        return true;
      }),
    [base, selected]
  );

  useEffect(() => setLimit(PAGE_SIZE), [q, sp]);

  const visible = filtered.slice(0, limit);

  /* ---------- URL state ---------- */
  const update = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      const next = new URLSearchParams(sp);
      mutate(next);
      setSp(next, { replace: true });
    },
    [sp, setSp]
  );

  const toggle = useCallback(
    (group: string, value: string) => {
      update((next) => {
        const cur = next.getAll(group).flatMap((v) => v.split(",")).filter(Boolean);
        const has = cur.includes(value);
        const after = has ? cur.filter((v) => v !== value) : [...cur, value];
        next.delete(group);
        if (after.length) next.set(group, after.join(","));
      });
    },
    [update]
  );

  const clearAll = useCallback(() => setSp(new URLSearchParams(), { replace: true }), [setSp]);

  const setQ = useCallback(
    (value: string) =>
      update((next) => {
        if (value) next.set("q", value);
        else next.delete("q");
      }),
    [update]
  );

  /* ---------- facet counts, computed against the other filters ---------- */
  const countFor = useCallback(
    (group: keyof typeof selected, value: string) =>
      base.filter((r) => {
        const test = { ...selected, [group]: [value] };
        if (test.audience.length && !test.audience.some((a) => r.audience.includes(a))) return false;
        if (test.type.length && !test.type.includes(r.type)) return false;
        if (test.exam.length && (!r.exam || !test.exam.includes(r.exam))) return false;
        if (test.board.length && (!r.board || !test.board.includes(r.board))) return false;
        if (test.year.length && (!r.year || !test.year.includes(String(r.year)))) return false;
        return true;
      }).length,
    [base, selected]
  );

  const groups: FilterGroup[] = useMemo(
    () => [
      {
        key: "audience",
        legend: "Who it's for",
        selected: selected.audience,
        accentFor: audienceAccentFor,
        options: AUDIENCES.map((a) => ({ value: a, label: a, count: countFor("audience", a) })),
      },
      {
        key: "type",
        legend: "Type",
        selected: selected.type,
        options: resourceTypes.map((t) => ({ value: t, label: t, count: countFor("type", t) })),
      },
      {
        key: "exam",
        legend: "Exam",
        selected: selected.exam,
        options: resourceExams.map((e) => ({ value: e, label: e, count: countFor("exam", e) })),
      },
      {
        key: "board",
        legend: "Exam board",
        selected: selected.board,
        options: resourceBoards.map((b) => ({ value: b, label: b, count: countFor("board", b) })),
      },
      {
        key: "year",
        legend: "Exam year",
        selected: selected.year,
        options: resourceYears.map((y) => ({
          value: String(y),
          label: String(y),
          count: countFor("year", String(y)),
        })),
      },
    ],
    [selected, countFor]
  );

  /* ---------- kakko quick jump ---------- */
  const jumpTo = (letter: string) => {
    const target = filtered.find((r) => r.title.toUpperCase().startsWith(letter));
    if (!target) return;
    document.getElementById(`res-${target.slug}`)?.scrollIntoView({ behavior: allowMotion ? "smooth" : "auto", block: "start" });
  };

  const chips = [
    ...selected.audience.map((v) => ({ group: "audience", v })),
    ...selected.type.map((v) => ({ group: "type", v })),
    ...selected.exam.map((v) => ({ group: "exam", v })),
    ...selected.board.map((v) => ({ group: "board", v })),
    ...selected.year.map((v) => ({ group: "year", v })),
  ];

  /* Which filter is the narrowest, so the empty state can name it. */
  const narrowest = useMemo(() => {
    if (!chips.length) return null;
    let worst = chips[0];
    let worstCount = Infinity;
    for (const c of chips) {
      const n = countFor(c.group as keyof typeof selected, c.v);
      if (n < worstCount) {
        worstCount = n;
        worst = c;
      }
    }
    return worst;
  }, [chips, countFor]);

  return (
    <>
      <Seo
        title="Resources — every CGS document in one place"
        description="Past papers, exam specifications, training packs, teaching material, newsletters and membership forms. Filter by audience, type, exam and year."
        path="/resources"
      />

      {/* ---------- Page head ---------- */}
      <section className="relative border-b border-rule bg-paper-tint">
        <div className="container-cgs relative py-section-sm md:py-section">
          <div className="relative pl-5">
            <MarginRule />
            <h1 className="text-h1">Resources</h1>
            <p className="mt-3 max-w-measure text-lead text-ink-soft">
              Every document CGS publishes, in one place. Filter by who it's for, what it is, and
              which exam — or just search for what you remember.
            </p>
          </div>
        </div>
        <Kakko letter="ક" className="absolute right-4 top-2 text-[7rem] md:text-[10rem]" opacity={0.05} />
      </section>

      <div className="container-cgs grid gap-8 py-8 lg:grid-cols-[17rem_1fr]">
        {/* ---------- Filter rail (desktop) ---------- */}
        <aside className="hidden lg:block" aria-labelledby="filters-heading">
          <h2 id="filters-heading" className="sr-only">Filter resources</h2>
          <div className="sticky top-[132px] max-h-[calc(100vh-9.5rem)] overflow-y-auto overscroll-contain pr-1">
            <FilterRail groups={groups} onToggle={toggle} />
          </div>
        </aside>

        {/* ---------- Results ---------- */}
        <div ref={resultsTop}>
          <h2 className="sr-only">Search and results</h2>
          {/* Search */}
          <div className="flex items-center gap-3 rounded-md border border-rule-strong bg-paper-raised px-4">
            <IconSearch size={20} className="shrink-0 text-ink-soft" />
            <label htmlFor="res-q" className="sr-only">
              Search resources
            </label>
            <input
              id="res-q"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by title, e.g. “2018 listening” or “membership”"
              className="min-h-[56px] w-full min-w-0 flex-1 bg-transparent text-body outline-none placeholder:text-ink-soft/70"
            />
            {q && (
              <button
                type="button"
                onClick={() => setQ("")}
                aria-label="Clear search"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-ink-soft hover:text-ink"
              >
                <IconClose size={18} />
              </button>
            )}
          </div>

          {/* Count + active filters */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="tnum text-small text-ink-soft" aria-live="polite">
              <strong className="font-semibold text-ink">{filtered.length}</strong>{" "}
              {filtered.length === 1 ? "resource" : "resources"}
              {activeCount > 0 && ` · ${activeCount} filter${activeCount === 1 ? "" : "s"}`}
            </p>

            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-rule bg-paper-raised px-4 text-small font-semibold text-ink lg:hidden"
            >
              <IconFilter size={18} />
              Filter
              {activeCount > 0 && (
                <span className="tnum rounded-pill bg-marigold px-2 py-0.5 text-micro text-ink">
                  {activeCount}
                </span>
              )}
            </button>
          </div>

          {chips.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {chips.map((c) => (
                <Chip
                  key={c.group + c.v}
                  active
                  onRemove={() => toggle(c.group, c.v)}
                  onClick={() => toggle(c.group, c.v)}
                >
                  {c.v}
                </Chip>
              ))}
              <button
                type="button"
                onClick={clearAll}
                className="link-draw min-h-[44px] text-small font-semibold text-indigo"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Kakko quick jump — the cultural signature, doing real work. */}
          {filtered.length > 12 && (
            <div className="scroll-x mt-5 border-y border-rule py-2">
              <div className="flex items-center gap-1" role="group" aria-label="Jump to a letter">
                <span className="shrink-0 pr-2 text-micro text-ink-soft">Jump to</span>
                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "W"].map(
                  (l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => jumpTo(l)}
                      className="min-h-[44px] min-w-[44px] rounded-sm text-small font-semibold text-ink-soft transition-colors hover:bg-marigold-soft hover:text-ink"
                    >
                      {l}
                    </button>
                  )
                )}
                <span className="ml-2 shrink-0 border-l border-rule pl-2" aria-hidden="true">
                  <span className="font-gujarati text-small text-ink-soft">{KAKKO.slice(0, 8).join(" ")}</span>
                </span>
              </div>
            </div>
          )}

          {/* Results list */}
          {filtered.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No resources match those filters"
                body={
                  narrowest ? (
                    <>
                      The <strong>{narrowest.v}</strong> filter is the one narrowing this down. Remove
                      it, or clear everything and start again.
                    </>
                  ) : (
                    <>Nothing matched that search. Try a shorter word, or browse everything.</>
                  )
                }
                action={
                  <>
                    {narrowest && (
                      <Button variant="secondary" onClick={() => toggle(narrowest.group, narrowest.v)}>
                        Remove “{narrowest.v}”
                      </Button>
                    )}
                    <Button variant="quiet" onClick={clearAll}>
                      Clear all filters
                    </Button>
                  </>
                }
              />
            </div>
          ) : (
            <>
              <motion.ul layout={allowMotion} className="mt-5 flex flex-col gap-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {visible.map((r) => (
                    <motion.div
                      key={r.slug}
                      id={`res-${r.slug}`}
                      layout={allowMotion}
                      initial={allowMotion ? { opacity: 0, y: 8 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      exit={allowMotion ? { opacity: 0, scale: 0.98 } : undefined}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      style={{ scrollMarginTop: "140px" }}
                    >
                      <ResourceRow r={r} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.ul>

              {limit < filtered.length && (
                <div className="mt-7 flex justify-center">
                  <Button
                    variant="quiet"
                    onClick={() => setLimit((l) => l + PAGE_SIZE)}
                    aria-label={`Show more resources. ${filtered.length - limit} remaining.`}
                  >
                    Show {Math.min(PAGE_SIZE, filtered.length - limit)} more
                    <span className="tnum ml-1 text-ink-soft">
                      ({filtered.length - limit} left)
                    </span>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* ---------- Filter sheet (mobile) ---------- */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-overlay flex items-end bg-ink/45 lg:hidden"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSheetOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filter resources"
            className="max-h-[85vh] w-full overflow-y-auto overscroll-contain rounded-t-lg bg-paper p-5"
            style={{
              animation: "cgs-fade-up var(--t-base) var(--ease-out) both",
              paddingBottom: "calc(1.25rem + env(safe-area-inset-bottom))",
            }}
          >
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-h3">Filter</h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-ink-soft hover:bg-paper-tint hover:text-ink"
              >
                <IconClose size={22} />
              </button>
            </div>

            {/* Bottom padding clears the sticky action bar below. */}
            <div className="pb-24">
              <FilterRail groups={groups} onToggle={toggle} idPrefix="sheet" />
            </div>

            <div className="sticky bottom-0 -mx-5 flex gap-3 border-t border-rule bg-paper px-5 py-4">
              <Button variant="quiet" onClick={clearAll} className="flex-1">
                Clear all
              </Button>
              <Button onClick={() => setSheetOpen(false)} className="flex-1">
                Show {filtered.length} result{filtered.length === 1 ? "" : "s"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
