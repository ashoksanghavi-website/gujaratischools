import { membership, contact, about, social } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { IconDownload, IconMail } from "@/components/ui/Icons";
import { Seo } from "@/lib/seo";

export default function Membership() {
  return (
    <>
      <Seo
        title="Membership"
        description="Join the Consortium of Gujarati Schools as an individual or as an organisation. Download the forms and find out how to return them."
        path="/membership"
      />

      <PageHero
        title="Become a member"
        intro={membership.intro}
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="જ"
        tint
      />

      {/* Steps, four, an even set, and genuinely a sequence, so
          numbering here carries real information. */}
      <section className="section">
        <div className="container-cgs">
          <SectionHeader title="How to join" intro="Four steps, and the whole thing is done by email." />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {membership.steps.map((s, i) => (
              <li
                key={i}
                className="flex flex-col rounded-md border border-rule bg-paper-raised p-5"
                style={{ borderTopColor: "var(--marigold)", borderTopWidth: 3 }}
              >
                <span
                  aria-hidden="true"
                  className="tnum font-display text-[1.75rem] leading-none text-marigold"
                >
                  {i + 1}
                </span>
                <p className="mt-3 text-ink">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Forms */}
      <section className="section border-y border-rule bg-paper-tint" aria-labelledby="forms">
        <div className="container-cgs">
          <SectionHeader
            id="forms"
            title="The forms"
            intro="Each one is a fillable PDF. Open it, complete your details, and save it with a new name before you send it."
          />
          <ul className="grid gap-4 md:grid-cols-3">
            {membership.forms.map((f) => (
              <li key={f.fileUrl}>
                <a
                  href={f.fileUrl}
                  download
                  className="group flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5 shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                >
                  <h3 className="text-h3 transition-colors group-hover:text-indigo">{f.title}</h3>
                  <p className="mt-2 text-small text-ink-soft">{f.description}</p>
                  <span className="mt-auto flex items-center gap-2 pt-5 font-semibold text-indigo">
                    <IconDownload size={18} />
                    Download the form
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where to send it */}
      <section className="section">
        <div className="container-cgs">
          <div className="grid gap-8 lg:grid-cols-2">
            <div
              className="rounded-lg border border-rule bg-paper-raised p-6"
              style={{ borderLeftColor: "var(--indigo)", borderLeftWidth: 4 }}
            >
              <h2 className="text-h2">Where to send it</h2>
              <p className="mt-3 text-ink-soft">
                Email your completed form to {contact.membershipContact}, our {contact.membershipRole.toLowerCase()}.
                Please make the subscription payment online too, if you can.
              </p>
              <a
                href={`mailto:${contact.membershipEmail}`}
                className="mt-5 inline-flex min-h-[48px] items-center gap-2 rounded-pill bg-indigo px-6 font-semibold text-white transition-colors duration-fast hover:bg-indigo-deep"
              >
                <IconMail size={18} />
                {contact.membershipEmail}
              </a>
            </div>

            <div className="rounded-lg border border-rule bg-paper-raised p-6">
              <h2 className="text-h2">What members get</h2>
              <ul className="prose-cgs mt-4">
                <li>Teacher training run by experienced Gujarati educators.</li>
                <li>Course material from every training session, free to download.</li>
                <li>Exam guidance for GCSE and A Level, and past papers going back to 2012.</li>
                <li>A voice in how Gujarati teaching is represented to exam boards and the DfE.</li>
              </ul>
              <p className="mt-5 text-small text-ink-soft">{about.members.body}</p>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 rounded-lg border border-rule bg-marigold-soft p-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-measure text-ink">
              Not ready to join? The whole resource library is free to everyone, no account, no
              login.
            </p>
            <div className="flex shrink-0 flex-wrap gap-3">
              <ButtonLink to="/resources" variant="secondary">
                Browse resources
              </ButtonLink>
              <ButtonLink to={social.newsletter} variant="quiet">
                Join the newsletter
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
