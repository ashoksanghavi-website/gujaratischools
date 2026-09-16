import { useState } from "react";
import { membership, contact, about, social, forms } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { IconDownload, IconMail } from "@/components/ui/Icons";
import { EnquiryModal, type EnquiryModalConfig } from "@/components/ui/EnquiryModal";
import { Seo } from "@/lib/seo";

/* The online-application config for each form. Organisation and School
   forms ask for the organisation/school name; the individual form does not. */
function onlineConfig(title: string): EnquiryModalConfig {
  const base = {
    kind: "membership" as const,
    sendTo: forms.membershipTo,
    responseNote: forms.responseNote,
    subtitle: "Apply online",
    intro: "Fill this in and send it, no download needed. " + forms.responseNote,
  };
  if (/organisation/i.test(title)) {
    return { ...base, title: "Organisation membership", subject: "Apply: Organisation Membership", orgLabel: "Organisation name" };
  }
  if (/school information/i.test(title)) {
    return { ...base, title: "School information", subject: "School Information Form", orgLabel: "School name" };
  }
  return { ...base, title: "Individual membership", subject: "Apply: Individual Membership" };
}

export default function Membership() {
  const [active, setActive] = useState<EnquiryModalConfig | null>(null);

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
          <SectionHeader title="How to join" intro="The quickest way is to apply online below. If you prefer paper, here is the download route." />
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
                <p className="mt-3 break-words text-ink">{s}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Forms — two ways to apply: online (encouraged) or download */}
      <section className="section border-y border-rule bg-paper-tint" aria-labelledby="forms">
        <div className="container-cgs">
          <SectionHeader
            id="forms"
            title="The forms"
            intro="Two ways to join: fill in a short form online, or download the PDF and email it back."
          />

          {/* The recommended path, stated up front */}
          <div className="mb-6 flex items-start gap-3 rounded-lg border border-rule bg-marigold-soft p-4">
            <span aria-hidden="true" className="mt-0.5 text-[1.25rem] leading-none">⚡</span>
            <p className="text-small text-ink">
              <strong className="font-semibold">Applying online is the fastest way to join.</strong>{" "}
              {forms.responseNote} A downloaded form is fine too, but online reaches us straight away.
            </p>
          </div>

          <ul className="grid gap-4 md:grid-cols-3">
            {membership.forms.map((f) => (
              <li
                key={f.fileUrl}
                className="flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5 shadow-e1"
              >
                <h3 className="text-h3">{f.title}</h3>
                <p className="mt-2 text-small text-ink-soft">{f.description}</p>

                <div className="mt-auto flex flex-col gap-3 pt-5">
                  <button
                    type="button"
                    onClick={() => setActive(onlineConfig(f.title))}
                    className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-pill bg-marigold px-5 font-semibold text-ink transition-colors duration-fast hover:bg-[color-mix(in_srgb,var(--marigold)_88%,var(--ink))]"
                  >
                    Apply online
                  </button>
                  <a
                    href={f.fileUrl}
                    download
                    className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-pill border border-rule-strong px-5 text-small font-semibold text-indigo transition-colors duration-fast hover:border-indigo"
                  >
                    <IconDownload size={16} />
                    Download the form
                  </a>
                </div>
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

      <EnquiryModal config={active} onClose={() => setActive(null)} />
    </>
  );
}
