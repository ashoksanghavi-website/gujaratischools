import { Link } from "react-router-dom";
import { photos, contact } from "@/data/site";
import { resources } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { IconDownload, IconExternal } from "@/components/ui/Icons";
import { Seo } from "@/lib/seo";

/* ============================================================
   For parents.
   Plain English, leaf accent throughout so a parent knows this
   part of the site is theirs, and deliberately separated from
   teacher content, mixing the two is a real cause of the
   navigation complaint.
   ============================================================ */

const STEPS = [
  {
    title: "Find a Gujarati school near you",
    body: "The Consortium works with around 30 schools run by temples and community groups across London, Leicester, Birmingham, Manchester, Walsall, Bolton, Crawley, Luton and Welwyn Garden City.",
    to: "/find-a-school",
    action: "See the list of schools",
  },
  {
    title: "Help your child at home",
    body: "Quick tips on how you can talk to your baby and introduce them to Gujarati, plus sharing books, songs and rhymes.",
    to: "/resources?audience=Parents",
    action: "Tips for parents",
  },
  {
    title: "Useful Gujarati websites",
    body: "External website links to Gujarati newspapers, publications, literature, grammar, dictionary, songs, poems, gazals, children's stories and about Gujarat plus more.",
    to: "/resources?type=Useful+Links",
    action: "Browse the links",
  },
];

export default function Parents() {
  const parentResources = resources.filter((r) => r.audience.includes("Parents")).slice(0, 6);

  return (
    <>
      <Seo
        title="For parents"
        description="How to find a Gujarati school, how to help your child learn Gujarati at home, and useful Gujarati websites."
        path="/parents"
      />

      <PageHero
        title="For parents"
        intro="If you want your child to learn Gujarati, this page is the short version of everything you need."
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="મ"
      />

      <section className="section" style={{ background: "var(--leaf-soft)" }}>
        <div className="container-cgs">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-center">
            <div>
              <h2 className="text-h2">Three things that help most</h2>
              <ol className="mt-6 flex flex-col gap-5">
                {STEPS.map((s, i) => (
                  <li
                    key={s.title}
                    className="rounded-md border border-rule bg-paper-raised p-5"
                    style={{ borderLeftColor: "var(--leaf)", borderLeftWidth: 3 }}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        aria-hidden="true"
                        className="tnum mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm font-display text-small font-semibold text-ink"
                        style={{ background: "var(--leaf-soft)" }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="text-h3">{s.title}</h3>
                        <p className="mt-2 text-ink-soft">{s.body}</p>
                        <Link to={s.to} className="link-draw mt-3 inline-block font-semibold text-leaf">
                          {s.action}
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <figure>
              <img
                src={photos.parents1}
                alt="A parent reading Gujarati with a young child"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg border border-rule object-cover"
                style={{ aspectRatio: "4 / 5" }}
              />
            </figure>
          </div>
        </div>
      </section>

      {parentResources.length > 0 && (
        <section className="section" aria-labelledby="parent-downloads">
          <div className="container-cgs">
            <SectionHeader
              id="parent-downloads"
              title="Downloads for parents"
              action={{ to: "/resources?audience=Parents", label: "All parent resources" }}
            />
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {parentResources.map((r) => (
                <li key={r.slug}>
                  <Link
                    to={`/resources/${r.slug}`}
                    className="group flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                  >
                    <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink transition-colors group-hover:text-leaf">
                      {r.title}
                    </h3>
                    <p className="tnum mt-auto flex items-center gap-2 pt-4 text-small text-ink-soft">
                      {r.external ? <IconExternal size={16} /> : <IconDownload size={16} />}
                      {r.fileType}
                      {r.fileSize ? ` · ${r.fileSize}` : ""}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-tight border-t border-rule">
        <div className="container-cgs">
          <div className="rounded-lg border border-rule bg-paper-raised p-6">
            <h2 className="text-h3">Can't find a school near you?</h2>
            <p className="mt-2 max-w-measure text-ink-soft">
              Get in touch and we will point you to the nearest Gujarati school we know of, or to a
              community group setting one up.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="secondary">
                Contact the Consortium
              </ButtonLink>
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-[48px] items-center rounded-pill border border-rule px-6 font-semibold text-indigo transition-colors hover:border-indigo"
              >
                Email {contact.chair}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
