import { forwardRef, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useFinePointerMotion } from "@/lib/motion";

/* ============================================================
   Button
   Variants: primary | secondary | quiet | danger
   Sizes:    sm | md | lg
   States:   rest, hover, active (0.98), focus-visible (2px indigo
             ring, 2px offset), disabled, loading
   Notes:    the label never moves on hover; on a fine pointer the
             whole control drifts at most 4px toward the cursor.
   ============================================================ */

type Variant = "primary" | "secondary" | "quiet" | "danger";
type Size = "sm" | "md" | "lg";

const BASE =
  "relative inline-flex items-center justify-center gap-2 font-semibold rounded-pill " +
  "transition-colors duration-fast ease-out select-none " +
  "disabled:opacity-55 disabled:pointer-events-none " +
  "active:scale-[0.98] motion-reduce:active:scale-100 " +
  "[transition-property:color,background-color,border-color,transform]";

const VARIANTS: Record<Variant, string> = {
  // Text on marigold is always ink, never white.
  primary: "bg-marigold text-ink hover:bg-[color-mix(in_srgb,var(--marigold)_88%,var(--ink))]",
  secondary: "bg-indigo text-white hover:bg-indigo-deep",
  quiet: "bg-transparent text-indigo hover:bg-paper-tint border border-rule-strong",
  danger: "bg-kumkum text-white hover:brightness-95",
};

const SIZES: Record<Size, string> = {
  // 44px / 48px / 56px — all at or above the touch-target minimum.
  sm: "min-h-[44px] px-4 text-small",
  md: "min-h-[48px] px-6 text-body",
  lg: "min-h-[56px] px-8 text-body",
};

interface Common {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  className?: string;
  children: React.ReactNode;
}

/** Gentle magnetic pull, max 4px, fine pointers only. */
function useMagnet(enabled: boolean) {
  const ref = useRef<HTMLElement | null>(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const max = 4;
      setT({
        x: Math.max(-max, Math.min(max, dx * 0.18)),
        y: Math.max(-max, Math.min(max, dy * 0.18)),
      });
    },
    [enabled]
  );

  const onLeave = useCallback(() => setT({ x: 0, y: 0 }), []);

  return {
    ref,
    handlers: enabled ? { onMouseMove: onMove, onMouseLeave: onLeave } : {},
    style: enabled
      ? { transform: `translate3d(${t.x}px, ${t.y}px, 0)`, transition: "transform var(--t-base) var(--ease-out)" }
      : undefined,
  };
}

export const Button = forwardRef<
  HTMLButtonElement,
  Common & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function Button(
  { variant = "primary", size = "md", magnetic = false, className = "", children, ...rest },
  fwd
) {
  const fine = useFinePointerMotion();
  const magnet = useMagnet(magnetic && fine);
  return (
    <button
      ref={(n) => {
        magnet.ref.current = n;
        if (typeof fwd === "function") fwd(n);
        else if (fwd) fwd.current = n;
      }}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      style={magnet.style}
      {...magnet.handlers}
      {...rest}
    >
      {children}
    </button>
  );
});

/** Same button, rendered as a router link. */
export function ButtonLink({
  to,
  variant = "primary",
  size = "md",
  magnetic = false,
  className = "",
  children,
  ...rest
}: Common & { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const fine = useFinePointerMotion();
  const magnet = useMagnet(magnetic && fine);
  const external = /^https?:\/\//.test(to) || to.startsWith("mailto:") || to.startsWith("tel:");

  if (external) {
    return (
      <a
        ref={magnet.ref as React.Ref<HTMLAnchorElement>}
        href={to}
        className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
        style={magnet.style}
        {...magnet.handlers}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      ref={magnet.ref as React.Ref<HTMLAnchorElement>}
      to={to}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      style={magnet.style}
      {...magnet.handlers}
      {...rest}
    >
      {children}
    </Link>
  );
}
