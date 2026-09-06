import { about, rulesDoc, mission } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { IconDownload } from "@/components/ui/Icons";
import { Seo } from "@/lib/seo";

/* ============================================================
   Rules and objects.
   The client points to the Rules as the best explanation of what
   CGS is for, so the objects are set out readably with anchor
   links, and the governing document is offered as a download.
   The PDF remains the authority; this page says so plainly.
   ============================================================ */

const SECTIONS = [
  { id: "purpose", label: "Purpose" },
  { id: "objects", label: "The objects" },
  { id: "membership", label: "Membership" },
  { id: "document", label: "The governing document" },
];

export default function Rules() {
  return (
    <>
      <Seo
        title="Rules and objects"
        description="The objects of the Consortium of Gujarati Schools, and its governing document adopted on 22 April 2018."
        path="/about/rules"
      />

      <PageHero
        title="Rules and objects"
        intro="What the Consortium exists to do, in its own words."
        breadcrumb={[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
        ]}
        kakko="ર"
        tint
      />

      <div className="container-cgs py-8">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:items-start">
          {/* Chapter rail — a usability win on a long page, not decoration. */}
          <nav aria-label="On this page" className="lg:sticky lg:top-[140px]">
            <p className="mb-3 text-small font-semibold text-ink">On this page</p>
            <ul className="flex flex-col gap-1 border-l border-rule">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px flex min-h-[44px] items-center border-l-2 border-transparent pl-4 text-small text-ink-soft transition-colors duration-fast hover:border-marigold hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="relative max-w-measure pl-6">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule" />

            <section id="purpose" style={{ scrollMarginTop: "140px" }}>
              <h2 className="text-h2">Purpose</h2>
              <p className="prose-cgs mt-4">{mission.purpose}</p>
              <p className="prose-cgs mt-4">{about.lead}</p>
            </section>

            <section id="objects" className="mt-9" style={{ scrollMarginTop: "140px" }}>
              <h2 className="text-h2">The objects</h2>
              <p className="prose-cgs mt-4 text-ink-soft">
                The Consortium has four objects, set out in its Rules.
              </p>
              <ol className="mt-6 flex flex-col gap-5">
                {about.aims.map((a, i) => (
                  <li key={i} className="relative pl-10">
                    <span
                      aria-hidden="true"
                      className="tnum absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-sm bg-marigold-soft font-display text-small font-semibold text-ink"
                    >
                      {i + 1}
                    </span>
                    <p className="text-ink">{a}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section id="membership" className="mt-9" style={{ scrollMarginTop: "140px" }}>
              <h2 className="text-h2">Membership</h2>
              <p className="prose-cgs mt-4">{about.members.body}</p>
              <p className="prose-cgs mt-4">
                The Rules set out who may join, the classes of membership, and how the committee is
                elected. Anyone wishing to join can do so from the{" "}
                <a href="/membership" className="link-draw font-semibold text-indigo">
                  membership page
                </a>
                .
              </p>
            </section>

            <section id="document" className="mt-9" style={{ scrollMarginTop: "140px" }}>
              <h2 className="text-h2">The governing document</h2>
              <p className="prose-cgs mt-4">
                The full Rules, adopted on 22 April 2018, are the authoritative statement of the
                Consortium's objects and how it is governed. The summary above is provided for ease
                of reading; where the two differ, the document is correct.
              </p>
              <a
                href={rulesDoc.fileUrl}
                download
                className="mt-6 inline-flex min-h-[56px] items-center gap-2 rounded-pill bg-marigold px-7 font-semibold text-ink transition-colors duration-fast hover:bg-[color-mix(in_srgb,var(--marigold)_88%,var(--ink))]"
              >
                <IconDownload size={18} />
                Download the Rules (PDF)
              </a>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
