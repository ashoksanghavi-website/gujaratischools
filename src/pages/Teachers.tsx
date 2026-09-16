import { Link } from "react-router-dom";
import { events, resources, countByType, formatDateShort } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Seo } from "@/lib/seo";

/* ============================================================
   Teacher hub.
   Clear entry points, no wall of text: every tile is a door into
   a pre-filtered library view, and the past-paper matrix lets a
   teacher land on one cell rather than scanning a list.
   ============================================================ */

const SHORTCUTS = [
  { label: "Teaching materials", to: "/resources?type=Teaching+Materials", type: "Teaching Materials" },
  { label: "Training packs", to: "/resources?type=Training+Materials", type: "Training Materials" },
  { label: "Exam specifications", to: "/resources?type=Exam+Specifications", type: "Exam Specifications" },
  { label: "Exam information", to: "/resources?type=Exam+Information", type: "Exam Information" },
];

/* Past papers as a year × exam matrix, the way a teacher actually
   remembers what they are looking for. */
function PastPaperMatrix() {
  const papers = resources.filter((r) => r.type === "Past Papers" && r.year && r.exam);
  const years = Array.from(new Set(papers.map((p) => p.year!))).sort((a, b) => b - a);
  const exams = Array.from(new Set(papers.map((p) => p.exam!))).sort();
  if (!years.length) return null;

  return (
    <div className="scroll-x rounded-md border border-rule bg-paper-raised">
      <table className="w-full min-w-[30rem] border-collapse">
        <caption className="sr-only">
          Past papers by exam and year. Each cell links to that set of papers.
        </caption>
        <thead>
          <tr>
            <th scope="col" className="border-b border-rule p-3 text-left text-small text-ink-soft">
              Exam
            </th>
            {years.map((y) => (
              <th
                key={y}
                scope="col"
                className="tnum border-b border-rule p-3 text-left text-small font-semibold text-ink"
              >
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {exams.map((ex) => (
            <tr key={ex}>
              <th scope="row" className="border-b border-rule p-3 text-left font-semibold text-ink">
                {ex}
              </th>
              {years.map((y) => {
                const n = papers.filter((p) => p.exam === ex && p.year === y).length;
                return (
                  <td key={y} className="border-b border-rule p-2">
                    {n > 0 ? (
                      <Link
                        to={`/resources?type=Past+Papers&exam=${encodeURIComponent(ex)}&year=${y}`}
                        className="tnum flex min-h-[44px] items-center justify-center rounded-sm bg-marigold-soft px-3 font-semibold text-ink transition-colors duration-fast hover:bg-marigold"
                      >
                        {n}
                        <span className="sr-only"> {ex} papers from {y}</span>
                      </Link>
                    ) : (
                      <span className="flex min-h-[44px] items-center justify-center text-ink-soft/40" aria-label="none">
                        -
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Teachers() {
  const upcoming = events.slice(0, 3);

  return (
    <>
      <Seo
        title="For teachers"
        description="Training, exam specifications, past papers and classroom material for volunteer Gujarati teachers."
        path="/teachers"
      />

      <PageHero
        title="For teachers"
        intro="Everything you need to plan a lesson, prepare a class for an exam, or pick up where a training session left off."
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="શ"
        tint
      />

      {/* Shortcuts, four items, an even set. */}
      <section className="section-tight">
        <div className="container-cgs">
          <SectionHeader title="Go straight to" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SHORTCUTS.map((s) => (
              <li key={s.to}>
                <Link
                  to={s.to}
                  className="group flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                  style={{ borderTopColor: "var(--indigo)", borderTopWidth: 3 }}
                >
                  <span className="font-display text-h3 text-ink transition-colors group-hover:text-indigo">
                    {s.label}
                  </span>
                  <span className="tnum mt-2 text-small text-ink-soft">
                    {countByType(s.type)} documents
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Past papers */}
      <section className="section border-y border-rule bg-paper-tint" aria-labelledby="papers">
        <div className="container-cgs">
          <SectionHeader
            id="papers"
            title="Past papers"
            intro="Pick the exam and the year. Every cell opens that set of papers, mark schemes and examiner reports."
            action={{ to: "/resources?type=Past+Papers", label: "All past papers" }}
          />
          <PastPaperMatrix />
        </div>
      </section>

      {/* Training */}
      <section className="section" aria-labelledby="training">
        <div className="container-cgs">
          <SectionHeader
            id="training"
            title="Training"
            intro="Course material from every CGS session is kept and free to download."
            action={{ to: "/events", label: "All training events" }}
          />
          <ul className="grid gap-4 sm:grid-cols-3">
            {upcoming.map((e) => (
              <li key={e.slug}>
                <Link
                  to={`/events/${e.slug}`}
                  className="group flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                >
                  <span className="tnum text-small text-ink-soft">{formatDateShort(e.date)}</span>
                  <span className="mt-1 font-display text-h3 text-ink transition-colors group-hover:text-indigo">
                    {e.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Leaders */}
      <section className="section border-t border-rule" aria-labelledby="leaders">
        <div className="container-cgs">
          <div
            className="rounded-lg border border-rule bg-paper-raised p-6"
            style={{ borderLeftColor: "var(--gold-hair)", borderLeftWidth: 4 }}
          >
            <h2 id="leaders" className="text-h2">
              Running a Gujarati school?
            </h2>
            <p className="mt-3 max-w-measure text-ink-soft">
              Guidance on leadership, administration, setting up an examination centre and entering
              students for exams, plus the Consortium's own meeting papers and accounts.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink to="/resources?audience=Leaders" variant="secondary">
                Resources for school leaders
              </ButtonLink>
              <ButtonLink to="/membership" variant="quiet">
                Join the Consortium
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
