import { Link } from "react-router-dom";

/* ============================================================
   Card + RhythmGrid

   RhythmGrid is the enforcement of Part 4's rhythm law. It takes
   an item count and chooses the layout, so adding content can
   never leave an orphan card floating beside empty space.

   Rules encoded here:
     - desktop 2, 3 or 4 per row; tablet 2; mobile 1
     - a set that cannot fill its rows switches to a list layout
       rather than being forced into a broken grid
     - callers can pass a `tile` that completes the final row and
       does real work ("View all resources")
   ============================================================ */

export type GridLayout = "grid-2" | "grid-3" | "grid-4" | "list-2";

/** Given a count, pick a layout that leaves no orphan. */
export function chooseLayout(count: number, tileFillsRow = false): GridLayout {
  const n = count + (tileFillsRow ? 1 : 0);
  if (n <= 1) return "grid-2";
  if (n % 3 === 0 && n >= 3) return "grid-3";
  if (n % 4 === 0 && n >= 8) return "grid-4";
  if (n % 2 === 0) return "grid-2";
  // odd and not divisible by 3 (5, 7, 11…) → a two-column list reads
  // better than a grid with a hole in it
  return "list-2";
}

const LAYOUT_CLASS: Record<GridLayout, string> = {
  "grid-2": "grid gap-5 sm:grid-cols-2",
  "grid-3": "grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
  "grid-4": "grid gap-5 sm:grid-cols-2 lg:grid-cols-4",
  "list-2": "grid gap-4 md:grid-cols-2",
};

export function RhythmGrid({
  count,
  children,
  layout,
  hasTile = false,
  className = "",
  as: Tag = "div",
}: {
  count: number;
  children: React.ReactNode;
  layout?: GridLayout;
  hasTile?: boolean;
  className?: string;
  as?: "div" | "ul";
}) {
  const chosen = layout ?? chooseLayout(count, hasTile);
  return <Tag className={`${LAYOUT_CLASS[chosen]} ${className}`}>{children}</Tag>;
}

/* ============================================================
   Card — equal heights, clamped text, one link target.
   The image scales behind a fixed frame so nothing reflows.
   ============================================================ */

export function Card({
  to,
  title,
  description,
  meta,
  image,
  imageAlt = "",
  imageW,
  imageH,
  badges,
  accent,
  feature = false,
  external = false,
  className = "",
}: {
  to: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imageW?: number;
  imageH?: number;
  badges?: React.ReactNode;
  accent?: string;
  feature?: boolean;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {image && (
        <div
          className={`relative overflow-hidden rounded-[calc(var(--r-md)-4px)] bg-paper-tint ${
            feature ? "aspect-[16/9]" : "aspect-[3/2]"
          }`}
        >
          <img
            src={image}
            alt={imageAlt}
            width={imageW}
            height={imageH}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        {badges && <div className="mb-3 flex flex-wrap gap-2">{badges}</div>}
        <h3
          className={`${feature ? "text-h2" : "text-h3"} [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden`}
        >
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
            {description}
          </p>
        )}
        {meta && <div className="mt-auto pt-4 text-small text-ink-soft">{meta}</div>}
      </div>
    </>
  );

  const cls =
    "group relative flex h-full flex-col overflow-hidden rounded-md border border-rule bg-paper-raised " +
    "shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 " +
    "after:pointer-events-none after:absolute after:inset-0 after:rounded-md after:opacity-0 " +
    "after:shadow-e2 after:transition-opacity after:duration-base hover:after:opacity-100 " +
    className;

  const style = accent ? { borderTopColor: accent, borderTopWidth: 3 } : undefined;

  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls} style={style}>
        {inner}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} style={style}>
      {inner}
    </Link>
  );
}

/** A tile that completes a row and does real work. */
export function ActionTile({
  to,
  title,
  body,
  className = "",
}: {
  to: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <Link
      to={to}
      className={`group flex h-full flex-col justify-between rounded-md border-2 border-dashed border-rule bg-paper p-5 transition-colors duration-base ease-out hover:border-marigold hover:bg-marigold-soft ${className}`}
    >
      <div>
        <h3 className="text-h3">{title}</h3>
        {body && <p className="mt-2 text-ink-soft">{body}</p>}
      </div>
      <span className="mt-6 font-semibold text-indigo">Open</span>
    </Link>
  );
}
