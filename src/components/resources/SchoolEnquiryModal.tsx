import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { School } from "@/lib/content";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { IconClose } from "@/components/ui/Icons";
import { forms } from "@/data/site";

/* ============================================================
   School enquiry modal.
   Opened from a school card in the finder. A family fills one short
   form and submits an enquiry about that specific school, without
   leaving the page. Modal dialog: focus trapped, Escape closes,
   scroll locked, focus returned to the trigger.
   ============================================================ */

export function SchoolEnquiryModal({
  school,
  onClose,
}: {
  school: School | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const open = school !== null;

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // focus the first field shortly after open
    const t = window.setTimeout(() => {
      ref.current?.querySelector<HTMLElement>("input, textarea, button")?.focus();
    }, 40);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "Tab") {
        const f = ref.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!f || !f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus();
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  const place = [school.area, school.postcode].filter(Boolean).join(", ");

  return createPortal(
    <div
      className="fixed inset-0 z-overlay flex items-start justify-center overflow-y-auto bg-ink/50 p-4 pt-[6vh]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
        className="w-full max-w-lg overflow-hidden rounded-lg border border-rule bg-paper shadow-e3"
        style={{ animation: "cgs-fade-up var(--t-fast) var(--ease-out) both" }}
      >
        <div className="flex items-start justify-between gap-4 border-b border-rule bg-paper-tint px-5 py-4">
          <div>
            <p className="text-small text-ink-soft">Enquire about</p>
            <h2 id="enquiry-title" className="text-h3 leading-snug">
              {school.name}
            </h2>
            {place && <p className="mt-0.5 text-small text-ink-soft">{place}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-sm text-ink-soft transition-colors hover:bg-paper hover:text-ink"
          >
            <IconClose size={20} />
          </button>
        </div>

        <div className="p-5">
          <p className="mb-4 text-small text-ink-soft">
            Send a quick enquiry and CGS will connect you with this school. No account needed.
          </p>
          <EnquiryForm
            kind="school"
            subject={`Enquiry: ${school.name}`}
            sendTo={forms.schoolTo}
            compact
            onSubmitted={() => {}}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
