import { Link } from "react-router-dom";
import { audienceDoors } from "@/data/site";
import { countByAudience } from "@/lib/content";

/* ============================================================
   Quick access — three doors.
   Deliberately not cards: full-width bands divided by hairlines,
   so the most important navigational element on the site doesn't
   look like the least important. Each goes straight into a
   pre-filtered library view.
   ============================================================ */

export function QuickAccess() {
  return (
    <section className="border-y border-rule bg-paper-raised" aria-labelledby="doors-title">
      <h2 id="doors-title" className="sr-only">
        Find what you need
      </h2>
      <div className="container-cgs">
        <ul className="grid divide-y divide-rule md:grid-cols-3 md:divide-x md:divide-y-0">
          {audienceDoors.map((d) => (
            <li key={d.key}>
              <Link
                to={d.to}
                className="group flex h-full items-start gap-4 py-6 transition-colors duration-base md:px-6 md:first:pl-0 md:last:pr-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-1 h-8 w-[3px] shrink-0 rounded-full transition-[height] duration-base ease-out group-hover:h-12"
                  style={{ background: d.accent }}
                />
                <span className="min-w-0">
                  <span className="block font-display text-h3 text-ink transition-colors group-hover:text-indigo">
                    {d.title}
                  </span>
                  <span className="mt-1 block text-small text-ink-soft">{d.blurb}</span>
                  <span className="tnum mt-2 block text-micro text-ink-soft">
                    {countByAudience(d.key)} resources
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
