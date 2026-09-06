import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";
import { useReducedMotion } from "./useReducedMotion";

/**
 * Lenis smooth scroll with a hard reduced-motion off switch.
 * Also resets scroll position on route change.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const { pathname } = useLocation();

  useEffect(() => {
    if (reduced) return; // hard off switch

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Expose for anchor scrolling if needed
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, [reduced]);

  // Scroll to top on navigation
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
}
