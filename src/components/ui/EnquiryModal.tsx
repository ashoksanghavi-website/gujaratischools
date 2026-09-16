import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { EnquiryForm } from "@/components/ui/EnquiryForm";
import { IconClose } from "@/components/ui/Icons";

/* ============================================================
   EnquiryModal — a generic accessible dialog wrapping EnquiryForm.
   Used for "apply online" on the membership page. Focus trapped,
   Escape closes, scroll locked, focus returned to the trigger.
   ============================================================ */

export interface EnquiryModalConfig {
  title: string;
  subtitle?: string;
  intro?: string;
  subject: string;
  sendTo: string;
  kind: "school" | "teach" | "membership";
  orgLabel?: string;
  responseNote?: string;
  submitLabel?: string;
}

export function EnquiryModal({
  config,
  onClose,
}: {
  config: EnquiryModalConfig | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const open = config !== null;

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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

  return createPortal(
    <div
      className="fixed inset-0 z-overlay flex items-center justify-center bg-ink/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="flex max-h-[90dvh] w-full max-w-lg flex-col overflow-hidden rounded-lg border border-rule bg-paper shadow-e3"
        style={{ animation: "cgs-fade-up var(--t-fast) var(--ease-out) both" }}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-rule bg-paper-tint px-5 py-4">
          <div>
            {config.subtitle && <p className="text-small text-ink-soft">{config.subtitle}</p>}
            <h2 id="enquiry-modal-title" className="text-h3 leading-snug">
              {config.title}
            </h2>
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

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5">
          {config.intro && <p className="mb-4 text-small text-ink-soft">{config.intro}</p>}
          <EnquiryForm
            kind={config.kind}
            subject={config.subject}
            sendTo={config.sendTo}
            orgLabel={config.orgLabel}
            responseNote={config.responseNote}
            submitLabel={config.submitLabel}
            compact
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
