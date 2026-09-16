import { examUpdate } from "@/data/site";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { IconExternal } from "@/components/ui/Icons";

/* ============================================================
   Exam updates, a notice panel, not a card.
   This is time-sensitive information a teacher must not miss, so
   it gets the kumkum edge that is used nowhere else on the page.
   ============================================================ */

export function ExamUpdates() {
  return (
    <section className="section" aria-labelledby="exam-updates">
      <div className="container-cgs">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div
            className="rounded-lg border border-rule bg-paper-raised p-6 shadow-e1"
            style={{ borderLeftColor: "var(--kumkum)", borderLeftWidth: 4 }}
          >
            <p className="text-small font-semibold text-kumkum">Exam update</p>
            <h2 id="exam-updates" className="mt-2 text-h2">
              {examUpdate.title}
            </h2>
            <p className="mt-4 text-ink-soft">{examUpdate.intro}</p>

            <ul className="mt-5 flex flex-col gap-4">
              {examUpdate.points.map((p, i) => (
                <li key={i} className="relative pl-6 text-ink-soft">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-marigold"
                  />
                  {p}
                </li>
              ))}
            </ul>

            <a
              href={examUpdate.specUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-semibold text-indigo"
            >
              <IconExternal size={16} />
              <span className="link-draw">{examUpdate.specLabel}</span>
              <span className="sr-only">(opens in a new tab, on the Pearson website)</span>
            </a>
          </div>

          <div>
            <h3 className="text-h3">{examUpdate.gradingTitle}</h3>
            <p className="mt-3 text-ink-soft">{examUpdate.gradingBody}</p>
            <VideoEmbed
              id={examUpdate.gradingVideoId}
              title={examUpdate.gradingTitle}
              className="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
