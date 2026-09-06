import { useEffect, useState } from "react";
import { useReducedMotion, useTouch } from "./useReducedMotion";

/* ============================================================
   One gate for all motion on the site.
   Returns false for reduced-motion, low-power / low-core devices,
   and when the tab is hidden. Nothing animates unless this is true,
   and nothing is ever left invisible when it is false.
   ============================================================ */

function lowPowerDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const cores = (navigator as Navigator & { hardwareConcurrency?: number }).hardwareConcurrency;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (typeof cores === "number" && cores > 0 && cores <= 2) return true;
  if (typeof mem === "number" && mem > 0 && mem <= 2) return true;
  return false;
}

export function useMotionAllowed(): boolean {
  const reduced = useReducedMotion();
  const [lowPower] = useState(lowPowerDevice);
  return !reduced && !lowPower;
}

/** Motion allowed *and* a fine pointer — for magnetic buttons and hover-only flourishes. */
export function useFinePointerMotion(): boolean {
  const allowed = useMotionAllowed();
  const touch = useTouch();
  return allowed && !touch;
}

/* ---------- shared Framer variants ----------
   A small vocabulary, deliberately. Anything outside this list
   does not belong on the site. */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const T_FAST = 0.18;
export const T_BASE = 0.32;
export const T_SLOW = 0.52;

/** Section reveal: a short rise and fade. Used on major blocks only. */
export const riseIn = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: T_BASE, ease: EASE_OUT },
  },
};

/** Stagger group. 60ms between children, one group visible at a time. */
export const staggerGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

/** Page transition: the paper turn. */
export const pageOut = { opacity: 0, y: -12, transition: { duration: T_FAST, ease: EASE_IN_OUT } };
export const pageIn = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: T_BASE, ease: EASE_OUT } },
};

/** Does this browser support the View Transitions API? */
export function supportsViewTransitions(): boolean {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

/** Observe an element once, for reveal-on-scroll without a library. */
export function useInViewOnce<T extends Element>(
  ref: React.RefObject<T>,
  rootMargin = "0px 0px -12% 0px"
): boolean {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        }
      },
      { rootMargin, threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, seen, rootMargin]);
  return seen;
}
