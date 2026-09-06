import { useState } from "react";
import { contact, social } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { IconMail, IconPhone, IconCheck } from "@/components/ui/Icons";
import { Seo } from "@/lib/seo";

/* ============================================================
   Contact.
   The enquiry form has no backend, so rather than pretending to
   send, it composes a pre-filled email. That is honest and it
   works from any device. Success is confirmed in place.
   ============================================================ */

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name: !name.trim() ? "Enter your name so we know who is writing." : "",
    email: !email.trim()
      ? "Enter your email address so we can reply."
      : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
        ? "That email address does not look right. Check for a typo."
        : "",
    message: !message.trim() ? "Tell us what you would like to ask." : "",
  };
  const valid = !errors.name && !errors.email && !errors.message;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!valid) return;
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n—\n${name}\n${email}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <Seo
        title="Contact"
        description="Contact the Consortium of Gujarati Schools — Jayant Tanna, Chair, and the membership secretary."
        path="/contact"
      />

      <PageHero
        title="Contact us"
        intro="Questions about training, membership or finding a Gujarati school — we are glad to hear from you."
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="સ"
        tint
      />

      <div className="container-cgs py-8">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1fr] lg:items-start">
          {/* Details */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-lg border border-rule bg-paper-raised p-6"
              style={{ borderLeftColor: "var(--indigo)", borderLeftWidth: 4 }}
            >
              <h2 className="text-h3">{contact.chair}</h2>
              <p className="mt-1 text-small text-ink-soft">{contact.chairRole}</p>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href={contact.phoneHref}
                    className="flex min-h-[44px] items-center gap-3 font-semibold text-indigo"
                  >
                    <IconPhone size={18} />
                    <span className="link-draw tnum">{contact.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex min-h-[44px] items-center gap-3 font-semibold text-indigo"
                  >
                    <IconMail size={18} />
                    <span className="link-draw break-all">{contact.email}</span>
                  </a>
                </li>
              </ul>
            </div>

            <div
              className="rounded-lg border border-rule bg-paper-raised p-6"
              style={{ borderLeftColor: "var(--gold-hair)", borderLeftWidth: 4 }}
            >
              <h2 className="text-h3">Membership</h2>
              <p className="mt-1 text-small text-ink-soft">
                {contact.membershipContact}, {contact.membershipRole}
              </p>
              <a
                href={`mailto:${contact.membershipEmail}`}
                className="mt-4 flex min-h-[44px] items-center gap-3 font-semibold text-indigo"
              >
                <IconMail size={18} />
                <span className="link-draw break-all">{contact.membershipEmail}</span>
              </a>
            </div>

            <div className="rounded-lg border border-rule bg-paper-raised p-6">
              <h2 className="text-h3">Follow the Consortium</h2>
              <ul className="mt-3 flex flex-wrap gap-4">
                <li>
                  <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="link-draw font-semibold text-indigo">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="link-draw font-semibold text-indigo">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="link-draw font-semibold text-indigo">
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-lg border border-rule bg-paper-raised p-6">
            <h2 className="text-h2">Send an enquiry</h2>

            {sent ? (
              <div
                className="mt-5 flex items-start gap-3 rounded-md p-5"
                style={{ background: "var(--leaf-soft)" }}
                role="status"
              >
                <span className="mt-0.5 shrink-0 text-leaf">
                  <IconCheck size={22} />
                </span>
                <div>
                  <p className="font-semibold text-ink">Your email is ready to send</p>
                  <p className="mt-1 text-small text-ink-soft">
                    We opened your email app with the message filled in. If nothing happened, email{" "}
                    <a href={`mailto:${contact.email}`} className="link-draw font-semibold text-indigo">
                      {contact.email}
                    </a>{" "}
                    directly.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="link-draw mt-3 font-semibold text-indigo"
                  >
                    Write another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-2">
                <p className="mb-2 text-small text-ink-soft">
                  This opens your own email app with the message ready to send.
                </p>
                <Field
                  name="name"
                  label="Your name"
                  required
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                  error={submitted ? errors.name : ""}
                />
                <Field
                  name="email"
                  label="Your email"
                  type="email"
                  required
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  error={submitted ? errors.email : ""}
                />
                <Field
                  name="message"
                  label="Message"
                  textarea
                  required
                  value={message}
                  onChange={setMessage}
                  error={submitted ? errors.message : ""}
                />
                <Button type="submit" size="lg" className="mt-2 self-start">
                  Open my email app
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
