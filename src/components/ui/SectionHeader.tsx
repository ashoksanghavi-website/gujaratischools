import { Link } from "react-router-dom";

/* ============================================================
   SectionHeader
   One component so every section heading sits the same distance
   from its content, site-wide. Optional label is sentence case at
   small size, never a tracked-out all-caps eyebrow.
   ============================================================ */

export function SectionHeader({
  title,
  label,
  intro,
  action,
  center = false,
  as: Tag = "h2",
  id,
  className = "",
}: {
  title: React.ReactNode;
  label?: string;
  intro?: React.ReactNode;
  action?: { to: string; label: string };
  center?: boolean;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
}) {
  return (
    <div
      className={`mb-7 flex flex-col gap-4 ${
        center ? "items-center text-center" : "md:flex-row md:items-end md:justify-between"
      } ${className}`}
    >
      <div className={center ? "max-w-measure" : "max-w-measure"}>
        {label && <p className="mb-2 text-small text-ink-soft">{label}</p>}
        <Tag id={id} className={Tag === "h1" ? "text-h1" : "text-h2"}>
          {title}
        </Tag>
        {intro && <p className="mt-4 text-lead text-ink-soft">{intro}</p>}
      </div>

      {action && (
        <Link
          to={action.to}
          className="link-draw shrink-0 self-start font-semibold text-indigo md:self-auto"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
}

/* ============================================================
   EmptyState, names what is too narrow and offers the fix.
   Never a shrug; always one tap out of the dead end.
   ============================================================ */

export function EmptyState({
  title,
  body,
  action,
  icon,
}: {
  title: string;
  body: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-dashed border-rule bg-paper-raised px-6 py-section-sm text-center">
      {icon && <div className="mb-4 flex justify-center text-ink-soft">{icon}</div>}
      <h3 className="text-h3">{title}</h3>
      <p className="mx-auto mt-3 max-w-[46ch] text-ink-soft">{body}</p>
      {action && <div className="mt-6 flex flex-wrap justify-center gap-3">{action}</div>}
    </div>
  );
}
