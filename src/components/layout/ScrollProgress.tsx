import { useEffect, useState } from "react";

/* ============================================================
   Scroll progress as a pencil line.
   A thin marigold rule across the top that fills as the page
   progresses. On long article and resource pages it doubles as a
   reading indicator. Transform only, never animates width.
   ============================================================ */

export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        setP(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        ticking = false;
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-progress h-[3px]"
    >
      <div
        className="h-full origin-left bg-marigold-deep"
        style={{
          transform: `scaleX(${p})`,
          transition: "transform 80ms linear",
        }}
      />
    </div>
  );
}
