import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { IconCheck } from "@/components/ui/Icons";
import { forms } from "@/data/site";

/* ============================================================
   EnquiryForm, a short, low-friction "get in touch" form used
   for school enquiries and teacher applications.

   If a form endpoint is configured (src/data/site.ts → forms.endpoint)
   it POSTs there and confirms in place, a true submission. If not, it
   opens the visitor's email app with everything filled in. Either way
   the visitor fills one short form and is done.
   ============================================================ */

export function EnquiryForm({
  subject,
  sendTo,
  kind,
  onSubmitted,
  compact = false,
}: {
  subject: string;
  sendTo: string;
  kind: "school" | "teach";
  onSubmitted?: () => void;
  compact?: boolean;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [done, setDone] = useState<null | "sent" | "email">(null);
  const [sending, setSending] = useState(false);

  const errors = {
    name: !name.trim() ? "Please tell us your name." : "",
    email: !email.trim()
      ? "We need an email address to reply to."
      : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
        ? "That email address doesn't look right."
        : "",
  };
  const valid = !errors.name && !errors.email;

  const bodyText = () => {
    const lines = [
      kind === "teach"
        ? "I'd like to find out about teaching Gujarati with CGS."
        : `I'd like to enquire about: ${subject.replace(/^Enquiry: /, "")}`,
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      area ? `Town / area: ${area}` : null,
      "",
      message ? `Message:\n${message}` : "",
    ].filter((l) => l !== null);
    return lines.join("\n");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!valid) return;

    if (forms.endpoint) {
      setSending(true);
      try {
        const res = await fetch(forms.endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: (() => {
            const fd = new FormData();
            fd.append("_subject", subject);
            fd.append("name", name);
            fd.append("email", email);
            if (phone) fd.append("phone", phone);
            if (area) fd.append("area", area);
            fd.append("message", message || bodyText());
            fd.append("enquiry", subject);
            return fd;
          })(),
        });
        setSending(false);
        if (res.ok) {
          setDone("sent");
          onSubmitted?.();
          return;
        }
      } catch {
        setSending(false);
      }
      // fall through to email if the endpoint failed
    }

    const href = `mailto:${sendTo}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText())}`;
    window.location.href = href;
    setDone("email");
    onSubmitted?.();
  };

  if (done) {
    return (
      <div
        className="flex items-start gap-3 rounded-md p-5"
        style={{ background: "var(--leaf-soft)" }}
        role="status"
      >
        <span className="mt-0.5 shrink-0 text-leaf">
          <IconCheck size={22} />
        </span>
        <div>
          <p className="font-semibold text-ink">
            {done === "sent" ? "Thank you, your enquiry has been sent" : "Your enquiry is ready to send"}
          </p>
          <p className="mt-1 text-small text-ink-soft">
            {done === "sent"
              ? "Someone from CGS will get back to you soon."
              : "We opened your email app with the details filled in. Press send and we'll get back to you soon."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2">
      <div className={compact ? "grid gap-2 sm:grid-cols-2" : "grid gap-2"}>
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
          name="phone"
          label="Phone (optional)"
          type="tel"
          value={phone}
          onChange={setPhone}
          autoComplete="tel"
        />
        <Field
          name="area"
          label={kind === "teach" ? "Your town or area (optional)" : "Your town or area (optional)"}
          value={area}
          onChange={setArea}
        />
      </div>
      <Field
        name="message"
        label={kind === "teach" ? "Anything you'd like us to know? (optional)" : "Your message (optional)"}
        textarea
        rows={compact ? 3 : 4}
        value={message}
        onChange={setMessage}
        placeholder={
          kind === "teach"
            ? "e.g. I speak Gujarati at home and would love to help children learn."
            : "e.g. I'm looking for a class for my 7-year-old."
        }
      />
      <Button type="submit" size="lg" className="mt-2 self-start" disabled={sending}>
        {sending ? "Sending…" : kind === "teach" ? "Send my details" : "Send enquiry"}
      </Button>
    </form>
  );
}
