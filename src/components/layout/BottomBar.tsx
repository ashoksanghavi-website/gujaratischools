import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { bottomBar } from "@/data/nav";
import { IconHome, IconLibrary, IconMail, IconSchoolPin } from "@/components/ui/Icons";

/* ============================================================
   Bottom bar, phones only.
   Four destinations, so the two things people came for are always
   one tap away. Hides while scrolling down, returns on scroll up.
   ============================================================ */

const ICONS = {
  home: IconHome,
  library: IconLibrary,
  school: IconSchoolPin,
  mail: IconMail,
} as const;

export function BottomBar() {
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
        if (y > 200 && dy > 6) setHidden(true);
        else if (dy < -6 || y < 120) setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Quick links"
      className="fixed inset-x-0 bottom-0 z-bottombar border-t border-rule bg-paper/97 backdrop-blur-sm sm:hidden"
      style={{
        transform: hidden ? "translateY(100%)" : "translateY(0)",
        transition: "transform var(--t-base) var(--ease-out)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="grid grid-cols-4">
        {bottomBar.map((item) => {
          const Icon = ICONS[item.icon];
          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  `flex min-h-[56px] flex-col items-center justify-center gap-1 py-2 text-micro font-medium transition-colors duration-fast ${
                    isActive ? "text-indigo" : "text-ink-soft"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative">
                      <Icon size={22} />
                      {isActive && (
                        <span
                          className="absolute -top-2 left-1/2 h-[3px] w-6 -translate-x-1/2 rounded-full bg-marigold-deep"
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    {item.label}
                  </>
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
