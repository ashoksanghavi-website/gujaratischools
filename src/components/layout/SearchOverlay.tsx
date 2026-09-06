import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { groupResults, searchSite, type SearchDoc } from "@/lib/search";
import { IconSearch, IconClose } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";

/* ============================================================
   Search overlay.
   Searches resources, news and pages together, groups results
   with type badges, and is fully keyboard operable: arrows move,
   Enter opens, Escape closes. Focus is trapped while open and
   returns to the trigger on close.
   ============================================================ */

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  const results = useMemo(() => searchSite(q, 30), [q]);
  const groups = useMemo(() => groupResults(results), [results]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!open) {
      setQ("");
      return;
    }
    restoreTo.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => Math.min(flat.length - 1, i + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
      } else if (e.key === "Enter") {
        const item = flat[active];
        if (item) {
          e.preventDefault();
          onClose();
          navigate(item.to);
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, flat, active, navigate, onClose]);

  /* Keep the highlighted row in view when arrowing through. */
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open || typeof document === "undefined") return null;

  let idx = -1;

  return createPortal(
    <div
      className="fixed inset-0 z-overlay flex items-start justify-center bg-ink/50 p-4 pt-[8vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-rule bg-paper shadow-e3"
        style={{ animation: "cgs-fade-up var(--t-fast) var(--ease-out) both" }}
      >
        <div className="flex items-center gap-3 border-b border-rule px-5">
          <IconSearch size={20} className="shrink-0 text-ink-soft" />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search past papers, training packs, news…"
            aria-label="Search"
            aria-describedby="search-count"
            autoComplete="off"
            className="min-h-[60px] w-full min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-soft/70"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-ink-soft transition-colors hover:bg-paper-tint hover:text-ink"
          >
            <IconClose size={20} />
          </button>
        </div>

        <p id="search-count" className="sr-only" aria-live="polite">
          {q.length < 2
            ? "Type at least two characters to search."
            : `${results.length} result${results.length === 1 ? "" : "s"} for ${q}`}
        </p>

        <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain">
          {q.length < 2 ? (
            <div className="px-5 py-8 text-center text-ink-soft">
              <p>Try “2018 past paper”, “speaking”, or “membership form”.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="font-semibold text-ink">Nothing matched “{q}”</p>
              <p className="mt-2 text-ink-soft">
                Try a shorter word, or browse the{" "}
                <button
                  type="button"
                  className="link-draw font-semibold text-indigo"
                  onClick={() => {
                    onClose();
                    navigate("/resources");
                  }}
                >
                  full resource library
                </button>
                .
              </p>
            </div>
          ) : (
            groups.map((g) => (
              <div key={g.kind}>
                <h2 className="sticky top-0 bg-paper-tint px-5 py-2 text-micro font-semibold text-ink-soft">
                  {g.kind === "Resource" ? "Resources" : g.kind === "News" ? "News & events" : "Pages"}
                </h2>
                <ul>
                  {g.items.map((r: SearchDoc) => {
                    idx += 1;
                    const i = idx;
                    return (
                      <li key={r.to + r.title}>
                        <button
                          type="button"
                          data-idx={i}
                          onMouseEnter={() => setActive(i)}
                          onClick={() => {
                            onClose();
                            navigate(r.to);
                          }}
                          className={`flex w-full flex-col gap-1 border-b border-rule/60 px-5 py-3 text-left transition-colors ${
                            active === i ? "bg-marigold-soft" : "hover:bg-paper-tint"
                          }`}
                        >
                          <span className="flex items-start justify-between gap-3">
                            <span className="font-medium text-ink">{r.title}</span>
                            {r.type && (
                              <Badge tone="type" className="shrink-0">
                                {r.type}
                              </Badge>
                            )}
                          </span>
                          {r.description && (
                            <span className="text-small text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                              {r.description}
                            </span>
                          )}
                          {r.meta && <span className="tnum text-micro text-ink-soft">{r.meta}</span>}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-rule bg-paper-tint px-5 py-2 text-micro text-ink-soft">
          <span className="tnum">
            {q.length >= 2 ? `${results.length} result${results.length === 1 ? "" : "s"}` : " "}
          </span>
          <span className="hidden sm:block">↑↓ to move · Enter to open · Esc to close</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
