import { useEffect, useRef, useState } from "react";

/* ============================================================
   Accordion
   Height animates from a measured value (never `auto`), the
   chevron rotates, and content fades in just after the panel
   starts opening. Fully keyboard operable; the button carries
   aria-expanded and controls the panel by id.
   ============================================================ */

export function Accordion({
  title,
  children,
  defaultOpen = false,
  id,
  accent,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
  accent?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const panelRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number | undefined>(defaultOpen ? undefined : 0);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (open) {
      setH(el.scrollHeight);
      // after the transition, release to auto so nested content can grow
      const t = window.setTimeout(() => setH(undefined), 340);
      return () => window.clearTimeout(t);
    }
    setH(el.scrollHeight);
    // next frame, collapse to 0 so the transition has a start value
    const r = requestAnimationFrame(() => setH(0));
    return () => cancelAnimationFrame(r);
  }, [open]);

  const panelId = id ? `${id}-panel` : undefined;
  const btnId = id ? `${id}-button` : undefined;

  return (
    <div className="border-b border-rule" style={accent ? { borderLeft: `3px solid ${accent}`, paddingLeft: 16 } : undefined}>
      <h3>
        <button
          id={btnId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="flex min-h-[56px] w-full items-center justify-between gap-4 py-4 text-left font-semibold text-ink transition-colors duration-fast hover:text-indigo"
        >
          <span className="text-h3">{title}</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            aria-hidden="true"
            focusable="false"
            className="shrink-0 transition-transform duration-base ease-out motion-reduce:transition-none"
            style={{ transform: open ? "rotate(180deg)" : "none" }}
          >
            <path d="M4 7l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </h3>

      <div
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        hidden={!open && h === 0}
        style={{
          height: h === undefined ? "auto" : h,
          overflow: h === undefined ? "visible" : "hidden",
          transition: "height var(--t-base) var(--ease-in-out)",
        }}
      >
        <div
          ref={panelRef}
          className="pb-6 transition-opacity duration-base ease-out"
          style={{ opacity: open ? 1 : 0, transitionDelay: open ? "80ms" : "0ms" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
