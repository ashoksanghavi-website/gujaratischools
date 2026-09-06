import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/* ============================================================
   Lightbox — accessible image viewer.
   Modal dialog semantics, focus trapped while open, Escape and
   arrow keys work, focus returns to the trigger on close, and
   background scroll is locked.
   ============================================================ */

export interface LightboxItem {
  src: string;
  alt: string;
  caption?: string;
  w?: number;
  h?: number;
}

export function Lightbox({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreTo = useRef<HTMLElement | null>(null);
  const open = index !== null;

  const next = useCallback(() => {
    if (index === null) return;
    onIndex((index + 1) % items.length);
  }, [index, items.length, onIndex]);

  const prev = useCallback(() => {
    if (index === null) return;
    onIndex((index - 1 + items.length) % items.length);
  }, [index, items.length, onIndex]);

  useEffect(() => {
    if (!open) return;
    restoreTo.current = document.activeElement as HTMLElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab") {
        // trap focus inside the dialog
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables || !focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus();
    };
  }, [open, onClose, next, prev]);

  if (!open || typeof document === "undefined") return null;
  const item = items[index!];

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-ink/85 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`Image ${index! + 1} of ${items.length}: ${item.alt}`}
        tabIndex={-1}
        className="relative flex max-h-full w-full max-w-5xl flex-col outline-none"
      >
        <div className="flex items-center justify-between gap-4 pb-3 text-paper">
          <p className="tnum text-small">
            {index! + 1} of {items.length}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-pill bg-paper/10 px-4 font-semibold text-paper transition-colors duration-fast hover:bg-paper hover:text-ink"
          >
            Close
          </button>
        </div>

        <img
          src={item.src}
          alt={item.alt}
          width={item.w}
          height={item.h}
          className="mx-auto max-h-[70vh] w-auto rounded-md object-contain"
        />

        {item.caption && (
          <p className="pt-3 text-center text-small text-paper/90">{item.caption}</p>
        )}

        {items.length > 1 && (
          <div className="flex justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={prev}
              className="min-h-[44px] rounded-pill bg-paper/10 px-5 font-semibold text-paper transition-colors duration-fast hover:bg-paper hover:text-ink"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={next}
              className="min-h-[44px] rounded-pill bg-paper/10 px-5 font-semibold text-paper transition-colors duration-fast hover:bg-paper hover:text-ink"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
