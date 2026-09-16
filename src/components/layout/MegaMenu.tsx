import { Link } from "react-router-dom";
import type { MegaColumn } from "@/data/nav";
import { resources, formatDateShort } from "@/lib/content";
import { Kakko } from "@/components/motifs/Motifs";

/* ============================================================
   Mega menu.
   Three structured columns plus the most recent additions, so a
   person can reach any document in two clicks from anywhere.
   Opens on hover (with intent delay) and on keyboard focus;
   closes on Escape, handled by the Header.
   ============================================================ */

/* Newest by date, then by title, so the panel always has something
   current in it without anyone maintaining a list. */
const recent = [...resources]
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)))
  .slice(0, 3);

export function MegaMenu({
  columns,
  onClose,
}: {
  columns: MegaColumn[];
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-x-0 top-full border-b border-rule bg-paper-raised shadow-e3"
      style={{ animation: "cgs-fade-up var(--t-fast) var(--ease-out) both" }}
    >
      <div className="container-cgs relative grid gap-8 py-8 lg:grid-cols-4">
        <Kakko
          letter="ક"
          className="pointer-events-none absolute -top-4 right-6 text-[9rem]"
          opacity={0.04}
        />

        {columns.map((col) => (
          <div key={col.heading}>
            <p id={`mega-${col.heading.replace(/[^a-zA-Z0-9]+/g, "-")}`} className="mb-4 text-small font-semibold text-ink-soft">
              {col.heading}
            </p>
            <ul className="flex flex-col gap-1" aria-labelledby={`mega-${col.heading.replace(/[^a-zA-Z0-9]+/g, "-")}`}>
              {col.items.map((item) => (
                <li key={item.to + item.label}>
                  <Link
                    to={item.to}
                    onClick={onClose}
                    className="group block rounded-sm px-3 py-2 transition-colors duration-fast hover:bg-paper-tint"
                  >
                    <span className="block font-medium text-ink group-hover:text-indigo">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 block text-small text-ink-soft">{item.description}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Recently added, keeps the panel alive without maintenance. */}
        <div className="relative">
          <p id="mega-recent" className="mb-4 text-small font-semibold text-ink-soft">Recently added</p>
          <ul className="flex flex-col gap-3" aria-labelledby="mega-recent">
            {recent.map((r) => (
              <li key={r.slug}>
                <Link
                  to={`/resources/${r.slug}`}
                  onClick={onClose}
                  className="group block rounded-sm border border-rule bg-paper p-3 transition-colors duration-fast hover:border-indigo"
                >
                  <span className="block text-small font-medium leading-snug text-ink [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden group-hover:text-indigo">
                    {r.title}
                  </span>
                  <span className="tnum mt-1 block text-micro text-ink-soft">
                    {r.fileType}
                    {r.fileSize ? ` · ${r.fileSize}` : ""} · {formatDateShort(r.date)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/resources"
            onClick={onClose}
            className="link-draw mt-4 inline-block font-semibold text-indigo"
          >
            Browse all {resources.length} resources
          </Link>
        </div>
      </div>
    </div>
  );
}
