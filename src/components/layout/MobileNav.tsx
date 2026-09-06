import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { createPortal } from "react-dom";
import { primaryNav, megaFor, footerExplore } from "@/data/nav";
import { contact, social } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { IconSearch, IconChevron, IconClose } from "@/components/ui/Icons";
import { useSearch } from "@/lib/searchContext";

/* ============================================================
   Mobile / tablet navigation.
   Full-height panel from the right over a dimmed page. Sections
   expand in place as accordions so the whole structure is visible
   without pushing anyone through extra screens.
   Closes on route change, Escape and tapping outside; focus is
   trapped while open and returns to the trigger on close.
   ============================================================ */

export function MobileNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { open: openSearch } = useSearch();

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const first = panelRef.current?.querySelector<HTMLElement>("button, a");
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const f = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])'
      );
      if (!f || !f.length) return;
      const firstEl = f[0];
      const lastEl = f[f.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* Dimmed page */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="fixed inset-0 z-[65] bg-ink/40 lg:hidden"
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity var(--t-base) var(--ease-out)",
        }}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="fixed inset-y-0 right-0 z-[66] flex w-[min(92vw,26rem)] flex-col bg-paper shadow-e3 lg:hidden"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform var(--t-base) var(--ease-out)",
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
        }}
        {...(!open ? { inert: "" as unknown as boolean } : {})}
      >
        <div className="flex items-center justify-between border-b border-rule px-5 py-4">
          <span className="font-display text-h3">Menu</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-sm text-ink transition-colors hover:bg-paper-tint"
          >
            <IconClose size={22} />
          </button>
        </div>

        {/* Search sits at the top, where a thumb reaches it. */}
        <div className="border-b border-rule p-5">
          <button
            type="button"
            onClick={() => {
              onClose();
              openSearch();
            }}
            className="flex min-h-[52px] w-full items-center gap-3 rounded-sm border border-rule-strong bg-paper-raised px-4 text-left text-ink-soft transition-colors hover:border-indigo"
          >
            <IconSearch size={20} />
            <span>Search resources and news…</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-5 py-4" aria-label="Main">
          <ul className="flex flex-col">
            {primaryNav.map((item) => {
              const sub = megaFor[item.to];
              const isOpen = expanded === item.to;
              return (
                <li key={item.to} className="border-b border-rule/70">
                  <div className="flex items-stretch">
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex min-h-[52px] w-full min-w-0 flex-1 items-center text-body font-medium transition-colors ${
                          isActive ? "text-indigo" : "text-ink"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <span className="flex items-center gap-3">
                          {isActive && (
                            <span className="h-5 w-[3px] rounded-full bg-marigold-deep" aria-hidden="true" />
                          )}
                          <span className={isActive ? "" : "pl-[15px]"}>{item.label}</span>
                        </span>
                      )}
                    </NavLink>

                    {sub && (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                        onClick={() => setExpanded(isOpen ? null : item.to)}
                        className="flex min-h-[52px] min-w-[52px] items-center justify-center text-ink-soft transition-colors hover:text-indigo"
                      >
                        <IconChevron
                          size={20}
                          className="transition-transform duration-base"
                          {...({ style: { transform: isOpen ? "rotate(180deg)" : "none" } } as object)}
                        />
                      </button>
                    )}
                  </div>

                  {sub && isOpen && (
                    <ul className="pb-3 pl-4">
                      {sub.flatMap((col) => col.items).map((s) => (
                        <li key={s.to + s.label}>
                          <Link
                            to={s.to}
                            onClick={onClose}
                            className="flex min-h-[48px] items-center text-small text-ink-soft transition-colors hover:text-indigo"
                          >
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="mt-5 flex flex-col gap-1">
            {footerExplore
              .filter((f) => !primaryNav.some((p) => p.to === f.to))
              .map((f) => (
                <li key={f.to}>
                  <Link
                    to={f.to}
                    onClick={onClose}
                    className="flex min-h-[48px] items-center text-small text-ink-soft transition-colors hover:text-indigo"
                  >
                    {f.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="border-t border-rule p-5">
          <ButtonLink to="/membership" size="md" className="w-full" onClick={onClose}>
            Become a member
          </ButtonLink>
          <p className="mt-4 text-small text-ink-soft">
            {contact.chair} ·{" "}
            <a href={contact.phoneHref} className="link-draw text-indigo">
              {contact.phone}
            </a>
          </p>
          <div className="mt-3 flex gap-4 text-small">
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="link-draw text-indigo">
              Facebook
            </a>
            <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="link-draw text-indigo">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
