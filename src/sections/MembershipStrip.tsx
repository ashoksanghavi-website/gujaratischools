import { membership, social, contact } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { IconDownload } from "@/components/ui/Icons";

/* ============================================================
   Membership and newsletter.
   Three forms as direct downloads, an odd count, so this is a
   three-column grid that fills exactly, then the newsletter sits
   in its own band beneath rather than orphaning a fourth cell.
   ============================================================ */

export function MembershipStrip() {
  return (
    <section className="section" aria-labelledby="join">
      <div className="container-cgs">
        <SectionHeader
          id="join"
          title="Join the Consortium"
          intro={membership.intro}
          action={{ to: "/membership", label: "How membership works" }}
        />

        <div className="grid gap-4 md:grid-cols-3">
          {membership.forms.map((f) => (
            <a
              key={f.fileUrl}
              href={f.fileUrl}
              download
              className="group flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5 shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
            >
              <h3 className="text-h3 transition-colors group-hover:text-indigo">{f.title}</h3>
              <p className="mt-2 text-small text-ink-soft">{f.description}</p>
              <span className="mt-auto flex items-center gap-2 pt-4 text-small font-semibold text-indigo">
                <IconDownload size={16} />
                Download the form
              </span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-lg border border-rule bg-marigold-soft p-6 md:flex-row md:items-center md:justify-between">
          <div className="max-w-measure">
            <h3 className="text-h3">Return your form, and stay in touch</h3>
            <p className="mt-2 text-ink-soft">
              Email your completed form to {contact.membershipContact} at{" "}
              <a href={`mailto:${contact.membershipEmail}`} className="link-draw font-semibold text-indigo">
                {contact.membershipEmail}
              </a>
              , and please make the subscription payment online if you can.
            </p>
          </div>
          <ButtonLink to={social.newsletter} variant="secondary" size="md" className="shrink-0">
            Join the newsletter
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
