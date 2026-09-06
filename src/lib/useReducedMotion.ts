import { useEffect, useState } from "react";

/** Live-updating prefers-reduced-motion hook. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReduced(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return reduced;
}

/** Coarse-pointer (touch) detection, for disabling magnetic buttons etc. */
export function useTouch(): boolean {
  const [touch, setTouch] = useState<boolean>(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(pointer: coarse)").matches;
  });
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const handler = () => setTouch(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return touch;
}
