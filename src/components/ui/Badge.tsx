/* ============================================================
   Badge, a static label describing a thing (audience, file type).
   Chip , an interactive, removable filter token.
   These are different components because they do different jobs:
   a badge is never clickable, a chip always is.
   ============================================================ */

/** Audience carries a consistent colour across the whole site. */
export const audienceAccent: Record<string, string> = {
  Teachers: "var(--aud-teachers)",
  Leaders: "var(--aud-leaders)",
  Parents: "var(--aud-parents)",
};

export function audienceTint(a: string): string {
  if (a === "Parents") return "var(--leaf-soft)";
  if (a === "Leaders") return "color-mix(in srgb, var(--gold-hair) 16%, var(--paper))";
  return "color-mix(in srgb, var(--indigo) 10%, var(--paper))";
}

export function Badge({
  children,
  tone = "neutral",
  accent,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "audience" | "type" | "exam";
  accent?: string;
  className?: string;
}) {
  const styles: React.CSSProperties =
    tone === "audience" && accent
      ? { color: accent, background: audienceTint(String(children)), borderColor: "transparent" }
      : {};

  const toneClass =
    tone === "exam"
      ? "bg-marigold-soft text-ink border-transparent"
      : tone === "type"
        ? "bg-paper-tint text-ink-soft border-rule"
        : "bg-paper-raised text-ink-soft border-rule";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-2 py-[3px] text-micro font-medium ${
        tone === "audience" ? "border" : toneClass
      } ${className}`}
      style={styles}
    >
      {children}
    </span>
  );
}

export function Chip({
  children,
  active = false,
  onRemove,
  accent,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  active?: boolean;
  onRemove?: () => void;
  accent?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <span
      className={`inline-flex items-center overflow-hidden rounded-pill border transition-colors duration-fast ease-out ${
        active
          ? "border-transparent bg-marigold-soft text-ink"
          : "border-rule-strong bg-paper-raised text-ink-soft hover:bg-paper-tint hover:text-ink"
      } ${className}`}
      style={active && accent ? { boxShadow: `inset 0 0 0 1px ${accent}` } : undefined}
    >
      <button
        type="button"
        aria-pressed={active}
        className="min-h-[44px] px-4 text-small font-medium"
        {...rest}
      >
        {children}
      </button>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="min-h-[44px] border-l border-rule/60 px-3 text-ink-soft transition-colors duration-fast hover:bg-kumkum hover:text-white"
        >
          <span className="sr-only">Remove filter {String(children)}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
            <path
              d="M1 1l10 10M11 1L1 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </button>
      )}
    </span>
  );
}
