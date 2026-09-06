import { Link } from "react-router-dom";
import { about, photos, mission, rulesDoc } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { RuledPaper } from "@/components/motifs/Motifs";
import { IconDownload } from "@/components/ui/Icons";
import { Seo, organisationJsonLd } from "@/lib/seo";

export default function About() {
  return (
    <>
      <Seo
        title="About the Consortium of Gujarati Schools"
        description="How CGS was formed, what it aims to do, and the Gujarati schools it works with across the UK."
        path="/about"
        jsonLd={organisationJsonLd}
      />

      <PageHero
        title="About the Consortium"
        intro={about.lead}
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="અ"
        tint
      />

      <section className="section">
        <div className="container-cgs">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <div className="prose-cgs">
              <h2 className="text-h2">{about.formation.heading}</h2>
              <p>{about.formation.body}</p>
              <h2 className="text-h2">{about.members.heading}</h2>
              <p>{about.members.body}</p>
            </div>

            <figure className="lg:sticky lg:top-[140px]">
              <img
                src={photos.about}
                alt="Members of the Consortium of Gujarati Schools at a meeting"
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg border border-rule object-cover"
                style={{ aspectRatio: "3 / 2" }}
              />
              <figcaption className="mt-3 text-small text-ink-soft">
                The Consortium brings together Gujarati schools run by temples, community groups and
                volunteers across the UK.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The four aims — an even set, so a 2×2 grid fills exactly. */}
      <section className="relative section border-y border-rule bg-paper-tint" aria-labelledby="aims">
        <RuledPaper soft />
        <div className="container-cgs relative">
          <SectionHeader id="aims" title="Our four aims" intro={mission.purpose} />
          <ol className="grid gap-5 sm:grid-cols-2">
            {about.aims.map((a, i) => (
              <li
                key={i}
                className="rounded-md border border-rule bg-paper-raised p-5"
                style={{ borderLeftColor: "var(--marigold)", borderLeftWidth: 3 }}
              >
                <p className="text-ink">{a}</p>
              </li>
            ))}
          </ol>

          <div className="mt-7 flex flex-wrap gap-3">
            <ButtonLink to="/about/rules" variant="secondary">
              Read the Rules and objects
            </ButtonLink>
            <a
              href={rulesDoc.fileUrl}
              download
              className="inline-flex min-h-[48px] items-center gap-2 rounded-pill border border-rule bg-paper-raised px-6 font-semibold text-indigo transition-colors duration-fast hover:border-indigo"
            >
              <IconDownload size={18} />
              Download the governing document
            </a>
          </div>
        </div>
      </section>

      {/* Facts — real figures only, taken from the charity's own account. */}
      <section className="section" aria-labelledby="facts">
        <div className="container-cgs">
          <SectionHeader id="facts" title="The Consortium in numbers" />
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.facts.map((f) => (
              <div key={f.label} className="rounded-md border border-rule bg-paper-raised p-5">
                <dt className="text-small text-ink-soft">{f.label}</dt>
                <dd className="tnum mt-2 font-display text-[2.25rem] leading-none text-ink">{f.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-7 text-ink-soft">
            Meet the people who run it on the{" "}
            <Link to="/about/committee" className="link-draw font-semibold text-indigo">
              committee page
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
