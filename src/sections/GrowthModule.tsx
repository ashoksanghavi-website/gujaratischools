import { Link } from "react-router-dom";
import { schools, schoolTownCount, countByType } from "@/lib/content";
import { IconArrow } from "@/components/ui/Icons";

/* ============================================================
   Growth module, the band directly below the hero.
   The site's answer to falling numbers: two clear human pathways,
   one that brings in new students and one that brings in new
   teachers. Everything else on the home page supports these two.
   ============================================================ */

const PATHS = [
  {
    key: "learn",
    kicker: "For families and students",
    title: "Learn Gujarati",
    line: "Find a Gujarati school near you.",
    body: `Classes run at ${schools.length} schools across the UK, taught at temples and community centres. Search your town and find the nearest one.`,
    to: "/find-a-school",
    cta: "Find a school",
    accent: "var(--leaf)",
    tint: "var(--leaf-soft)",
    stat: `${schools.length} schools · ${schoolTownCount}+ towns`,
  },
  {
    key: "teach",
    kicker: "For parents and volunteers",
    title: "Teach Gujarati",
    line: "You don't need to be qualified, we train you.",
    body: "Most CGS teachers are parents and volunteers. We train you to teach with confidence and give you every lesson resource, free.",
    to: "/teach",
    cta: "Become a teacher",
    accent: "var(--indigo)",
    tint: "color-mix(in srgb, var(--indigo) 8%, var(--paper))",
    stat: `${countByType("Training Materials")} training files, free`,
  },
];

export function GrowthModule() {
  return (
    <section className="border-b border-rule bg-paper" aria-labelledby="grow-title">
      <div className="container-cgs py-section-sm">
        <div className="mb-6 max-w-measure">
          <h2 id="grow-title" className="text-h2">
            Keeping Gujarati alive, one school at a time
          </h2>
          <p className="mt-3 text-lead text-ink-soft">
            Whether you want your child to learn Gujarati or you'd like to teach it yourself, this is
            where to start.
          </p>
        </div>

        {/* Two large pathways, an even set, always a clean 2-up. */}
        <div className="grid gap-5 md:grid-cols-2">
          {PATHS.map((p) => (
            <Link
              key={p.key}
              to={p.to}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised p-6 shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:p-8"
              style={{ borderTopColor: p.accent, borderTopWidth: 3 }}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-base group-hover:opacity-100"
                style={{ background: `linear-gradient(160deg, ${p.tint}, transparent 60%)` }}
              />
              <div className="relative">
                <p className="text-small font-semibold" style={{ color: p.accent }}>
                  {p.kicker}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.6rem,3vw,2.25rem)] leading-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-2 text-lead text-ink">{p.line}</p>
                <p className="mt-3 max-w-[46ch] text-ink-soft">{p.body}</p>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 font-semibold text-indigo">
                    {p.cta}
                    <IconArrow
                      size={18}
                      className="transition-transform duration-base ease-out group-hover:translate-x-1 motion-reduce:transform-none"
                    />
                  </span>
                  <span className="tnum text-small text-ink-soft">{p.stat}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Slim secondary row: keeps the fast path for people already involved. */}
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-md border border-rule bg-paper-tint px-5 py-3 text-small">
          <span className="font-semibold text-ink">Already involved?</span>
          <Link to="/resources" className="link-draw text-indigo">
            Find a resource
          </Link>
          <Link to="/events" className="link-draw text-indigo">
            Training events
          </Link>
          <Link to="/membership" className="link-draw text-indigo">
            Become a member
          </Link>
        </div>
      </div>
    </section>
  );
}
