import { useId } from "react";

/* ============================================================
   THE EXERCISE BOOK, motifs
   These carry the theme. Each is decorative unless stated, so
   each is aria-hidden and contributes nothing to the a11y tree.
   ============================================================ */

/** Faint ruled-paper lines, aligned to the 8px baseline grid. */
export function RuledPaper({
  className = "",
  soft = false,
  fade = true,
}: {
  className?: string;
  soft?: boolean;
  fade?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${soft ? "ruled-soft" : "ruled"} ${className}`}
      style={
        fade
          ? {
              maskImage: "linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
            }
          : undefined
      }
    />
  );
}

/**
 * The margin rule, the site's signature line.
 * Used in the hero, on article pages and beside the resource library.
 * Never everywhere.
 */
export function MarginRule({
  className = "",
  animated = false,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule ${className}`}
      style={
        animated
          ? { transformOrigin: "top", animation: "cgs-draw-down var(--t-slow) var(--ease-out) both" }
          : undefined
      }
    />
  );
}

/* The kakko, the Gujarati alphabet, in teaching order. */
export const KAKKO = [
  "ક","ખ","ગ","ઘ","ચ","છ","જ","ઝ","ટ","ઠ","ડ","ઢ","ણ",
  "ત","થ","દ","ધ","ન","પ","ફ","બ","ભ","મ","ય","ર","લ",
  "વ","શ","ષ","સ","હ","ળ",
];

/** A large, quiet Gujarati letter used as a watermark behind a section. */
export function Kakko({
  letter = "ક",
  className = "",
  opacity = 0.06,
}: {
  letter?: string;
  className?: string;
  opacity?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-gujarati leading-none text-ink ${className}`}
      style={{ opacity }}
    >
      {letter}
    </span>
  );
}

/**
 * A Gujarati letter drawn along its handwriting guide lines.
 * The site's one orchestrated motion moment, used once, in the hero.
 * When motion is off it renders as the finished letter, never blank.
 */
export function TracedLetter({
  letter = "ક",
  animate = true,
  className = "",
}: {
  letter?: string;
  animate?: boolean;
  className?: string;
}) {
  const id = useId();
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* the dotted guide lines a child would trace between */}
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 h-full w-full"
        role="presentation"
        focusable="false"
      >
        <defs>
          <linearGradient id={`fade-${id}`} x1="0" x2="1">
            <stop offset="0" stopColor="var(--rule)" stopOpacity="0" />
            <stop offset="0.15" stopColor="var(--rule)" stopOpacity="1" />
            <stop offset="0.85" stopColor="var(--rule)" stopOpacity="1" />
            <stop offset="1" stopColor="var(--rule)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 100, 160].map((y, i) => (
          <line
            key={y}
            x1="0"
            x2="200"
            y1={y}
            y2={y}
            stroke={`url(#fade-${id})`}
            strokeWidth={i === 1 ? 1 : 1}
            strokeDasharray={i === 1 ? "4 6" : undefined}
          />
        ))}
      </svg>
      <span
        className="relative flex h-full w-full items-center justify-center font-gujarati text-ink"
        style={{
          fontSize: "clamp(4rem, 12vw, 9rem)",
          lineHeight: 1,
          animation: animate ? "cgs-write var(--t-slow) var(--ease-out) both" : undefined,
        }}
      >
        {letter}
      </span>
    </div>
  );
}

/**
 * A ring-binder index tab. Used for the resource library filters,
 * where the tab shape itself tells you what the control does.
 */
export function IndexTab({
  children,
  active = false,
  accent = "var(--indigo)",
  count,
  ...rest
}: {
  children: React.ReactNode;
  active?: boolean;
  accent?: string;
  count?: number;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        "group relative flex w-full items-center justify-between gap-3 px-4 py-3 text-left",
        "rounded-r-md border border-l-0 border-rule-strong transition-colors duration-fast ease-out",
        "min-h-[48px] text-small",
        active
          ? "bg-marigold-soft font-semibold text-ink"
          : "bg-paper-raised text-ink-soft hover:bg-paper-tint hover:text-ink",
      ].join(" ")}
      style={{ borderLeft: `4px solid ${active ? "var(--marigold)" : accent}` }}
      {...rest}
    >
      <span className="truncate">{children}</span>
      {typeof count === "number" && (
        <span className="tnum shrink-0 text-micro text-ink-soft">{count}</span>
      )}
    </button>
  );
}
