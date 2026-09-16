import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { primaryNav, megaFor } from "@/data/nav";
import { social, site } from "@/data/site";
import { ButtonLink } from "@/components/ui/Button";
import { IconSearch, IconFacebook, IconTwitter, IconYoutube, IconChevron } from "@/components/ui/Icons";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { useSearch } from "@/lib/searchContext";

/* ============================================================
   Header
   Two tiers at rest. On scroll down the upper tier retracts and
   the main tier compacts; on scroll up it reveals immediately so
   navigation is always one flick away. Transform and opacity only.
   ============================================================ */

function useScrollState() {
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY.current;
        setCompact(y > 80);
        // Only hide well past the hero, and only on a decisive downward move.
        if (y > 320 && dy > 6) setHidden(true);
        else if (dy < -6 || y < 160) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { compact, hidden };
}

export function Header() {
  const { compact, hidden } = useScrollState();
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openSearch } = useSearch();
  const location = useLocation();
  const closeTimer = useRef<number | undefined>(undefined);
  const openTimer = useRef<number | undefined>(undefined);
  const navRef = useRef<HTMLDivElement>(null);

  /* Close everything on navigation. */
  useEffect(() => {
    setOpenMega(null);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  /* Escape closes the mega menu and returns focus to its trigger. */
  useEffect(() => {
    if (!openMega) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        const trigger = navRef.current?.querySelector<HTMLElement>(`[data-mega-trigger="${openMega}"]`);
        trigger?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMega]);

  /* Hover with a short intent delay, so passing the cursor over a
     trigger on the way somewhere else doesn't open a panel. */
  const hoverOpen = useCallback((to: string) => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
    openTimer.current = window.setTimeout(() => setOpenMega(to), 120);
  }, []);

  const hoverClose = useCallback(() => {
    window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 180);
  }, []);

  useEffect(() => () => {
    window.clearTimeout(closeTimer.current);
    window.clearTimeout(openTimer.current);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-header will-change-transform"
      style={{
        transform: hidden ? "translateY(-100%)" : "translateY(0)",
        transition: "transform var(--t-base) var(--ease-out)",
      }}
    >
      {/* ---------- Upper tier: retracts on scroll ---------- */}
      <div
        className="hidden overflow-hidden border-b border-rule bg-paper-tint lg:block"
        style={{
          height: compact ? 0 : 40,
          opacity: compact ? 0 : 1,
          transition: "height var(--t-base) var(--ease-out), opacity var(--t-fast) var(--ease-out)",
        }}
      >
        <div className="mx-auto flex h-10 w-full max-w-[1400px] items-center justify-between px-[var(--gutter)] text-small text-ink-soft">
          <p>Inspiring Gujarati teachers and students</p>
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <span lang="gu" className="font-gujarati text-ink" aria-hidden="true">
                ગુજરાતી
              </span>
              <span className="text-micro">Gujarati content throughout</span>
            </span>
            <span className="flex items-center gap-3">
              <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo" aria-label="CGS on Facebook">
                <IconFacebook size={16} />
              </a>
              <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo" aria-label="CGS on Twitter">
                <IconTwitter size={16} />
              </a>
              <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-indigo" aria-label="CGS on YouTube">
                <IconYoutube size={16} />
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* ---------- Main tier ---------- */}
      <div
        className={`border-b transition-[background-color,border-color,box-shadow] duration-base ease-out ${
          compact ? "border-rule bg-paper shadow-e1" : "border-transparent bg-paper/95 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-4 px-[var(--gutter)]" style={{ minHeight: compact ? 64 : 76, transition: "min-height var(--t-base) var(--ease-out)" }}>
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label={`${site.name}, home`}>
            <img
              src="/images/logo/cgs-logo-colour.png"
              alt=""
              width={compact ? 40 : 48}
              height={compact ? 40 : 48}
              className="h-auto w-auto transition-all duration-base ease-out"
              style={{ height: compact ? 36 : 44 }}
            />
            <span className="hidden font-display text-[1.05rem] font-semibold leading-tight text-ink sm:block xl:hidden 2xl:block">
              Consortium of
              <br />
              Gujarati Schools
            </span>
          </Link>

          {/* Desktop nav */}
          <div ref={navRef} className="hidden items-center gap-0.5 xl:flex" onMouseLeave={hoverClose}>
            {primaryNav.map((item) => {
              const hasMega = Boolean(megaFor[item.to]);
              return (
                <div key={item.to} className="relative" onMouseEnter={() => (hasMega ? hoverOpen(item.to) : setOpenMega(null))}>
                  <NavLink
                    to={item.to}
                    end={item.to === "/"}
                    data-mega-trigger={hasMega ? item.to : undefined}
                    aria-expanded={hasMega ? openMega === item.to : undefined}
                    aria-haspopup={hasMega ? "true" : undefined}
                    onFocus={() => (hasMega ? setOpenMega(item.to) : setOpenMega(null))}
                    onClick={() => setOpenMega(null)}
                    className={({ isActive }) =>
                      [
                        "relative flex min-h-[44px] items-center gap-1 whitespace-nowrap rounded-sm px-2 text-small font-medium transition-colors duration-fast",
                        isActive ? "text-indigo" : "text-ink hover:text-indigo",
                      ].join(" ")
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.label}
                        {hasMega && (
                          <IconChevron
                            size={14}
                            className="transition-transform duration-fast"
                          />
                        )}
                        {isActive && (
                          <span className="absolute inset-x-2 -bottom-px h-[3px] rounded-full bg-marigold-deep" aria-hidden="true" />
                        )}
                      </>
                    )}
                  </NavLink>
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Search opens a full overlay; the "/" shortcut opens it too. */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the site"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-pill text-ink transition-colors duration-fast hover:bg-paper-tint"
            >
              <IconSearch size={20} />
            </button>

            <ButtonLink to="/membership" size="sm" className="hidden xl:inline-flex" magnetic>
              Become a member
            </ButtonLink>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex min-h-[48px] min-w-[48px] items-center justify-center rounded-sm text-ink transition-colors duration-fast hover:bg-paper-tint xl:hidden"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mega menu */}
        {openMega && megaFor[openMega] && (
          <div onMouseEnter={() => window.clearTimeout(closeTimer.current)} onMouseLeave={hoverClose}>
            <MegaMenu
              columns={megaFor[openMega]}
              onClose={() => setOpenMega(null)}
            />
          </div>
        )}
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
