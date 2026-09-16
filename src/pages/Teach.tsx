import { events, countByType, formatDateShort } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { Seo } from "@/lib/seo";

/* ============================================================
   Become a Gujarati teacher — the recruitment / growth page.
   Reframes teaching as accessible: you don't need to be qualified,
   CGS trains you. Directly addresses the falling teacher numbers
   by lowering the barrier to starting.
   ============================================================ */

const STEPS = [
  {
    title: "You already have what matters",
    body: "If you speak Gujarati and want to pass it on, you're most of the way there. Most CGS teachers are parents and volunteers, not qualified teachers.",
  },
  {
    title: "We train you",
    body: "CGS runs teacher training on planning lessons, assessment, behaviour and the exam syllabus — so you teach with confidence from your first class.",
  },
  {
    title: "You get the materials",
    body: "Every training pack, past paper and lesson resource is here to download, free. You never start from a blank page.",
  },
  {
    title: "You join a network",
    body: "You're not on your own — you join teachers across the UK who share what works, at schools run by temples and community groups.",
  },
];

const PROVIDES = [
  "Teacher training days, run by experienced Gujarati educators",
  "Lesson planning, assessment and classroom-management guidance",
  "GCSE and A Level exam specifications, past papers and mark schemes",
  "A community of teachers to learn from and share with",
];

export default function Teach() {
  const upcoming = events.slice(0, 2);

  return (
    <>
      <Seo
        title="Become a Gujarati teacher"
        description="You don't need to be a qualified teacher to teach Gujarati. CGS trains parents and volunteers to teach with confidence, and gives you every resource you need."
        path="/teach"
      />

      <PageHero
        title="Become a Gujarati teacher"
        intro="You don't need to be a qualified teacher. If you speak Gujarati and want to pass it on, we'll train you and give you everything you need."
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="શિ"
        tint
      />

      {/* The reframe, as four reassuring steps */}
      <section className="section">
        <div className="container-cgs">
          <SectionHeader
            title="Teaching Gujarati is more within reach than you think"
            intro="The children learning Gujarati today are taught, in the main, by parents and volunteers who stepped forward and were trained. You can be one of them."
          />
          <ol className="grid gap-4 sm:grid-cols-2">
            {STEPS.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col rounded-md border border-rule bg-paper-raised p-5"
                style={{ borderTopColor: "var(--indigo)", borderTopWidth: 3 }}
              >
                <span
                  aria-hidden="true"
                  className="tnum font-display text-[1.75rem] leading-none text-indigo"
                >
                  {i + 1}
                </span>
                <h3 className="mt-3 text-h3">{s.title}</h3>
                <p className="mt-2 text-ink-soft">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* What CGS provides + next training */}
      <section className="section border-y border-rule bg-paper-tint">
        <div className="container-cgs">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-h2">What CGS gives you</h2>
              <ul className="prose-cgs mt-4">
                {PROVIDES.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="tnum mt-5 text-small text-ink-soft">
                {countByType("Training Materials")} training files and{" "}
                {countByType("Past Papers")} past papers, all free to download.
              </p>
            </div>

            <div className="rounded-lg border border-rule bg-paper-raised p-6">
              <h2 className="text-h3">Training events</h2>
              {upcoming.length > 0 ? (
                <ul className="mt-4 flex flex-col gap-3">
                  {upcoming.map((e) => (
                    <li key={e.slug}>
                      <Link
                        to={`/events/${e.slug}`}
                        className="group block rounded-md border border-rule bg-paper p-4 transition-colors duration-fast hover:border-indigo"
                      >
                        <span className="tnum text-small text-ink-soft">{formatDateShort(e.date)}</span>
                        <span className="mt-1 block font-medium text-ink group-hover:text-indigo">
                          {e.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-ink-soft">
                  New training dates are announced through the year — join CGS to hear first.
                </p>
              )}
              <Link to="/events" className="link-draw mt-4 inline-block font-semibold text-indigo">
                See all training events
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The ask */}
      <section className="section">
        <div className="container-cgs">
          <div className="rounded-lg border border-rule bg-marigold-soft p-8 text-center">
            <h2 className="text-h2">Ready to start?</h2>
            <p className="mx-auto mt-3 max-w-[52ch] text-lead text-ink-soft">
              Join CGS as a member and we'll get you into training and teaching. It's the single most
              useful thing you can do to keep Gujarati alive for the next generation.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <ButtonLink to="/membership" size="lg" magnetic>
                Become a member
              </ButtonLink>
              <ButtonLink to="/contact" size="lg" variant="quiet">
                Ask us a question first
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
