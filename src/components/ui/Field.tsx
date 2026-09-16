import { useId, useState } from "react";

/* ============================================================
   Field, label, control, help and error.
   Errors are described in text and tied to the control with
   aria-describedby; colour is never the only signal. The message
   slot is always present so validation never shifts the layout.
   ============================================================ */

export function Field({
  label,
  type = "text",
  required = false,
  help,
  error,
  textarea = false,
  rows = 5,
  value,
  onChange,
  name,
  autoComplete,
  placeholder,
}: {
  label: string;
  type?: string;
  required?: boolean;
  help?: string;
  error?: string;
  textarea?: boolean;
  rows?: number;
  value: string;
  onChange: (v: string) => void;
  name: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  const id = useId();
  const helpId = `${id}-help`;
  const errId = `${id}-err`;
  const [touched, setTouched] = useState(false);
  const show = Boolean(error) && touched;

  const describedBy = [help ? helpId : null, show ? errId : null].filter(Boolean).join(" ") || undefined;

  const control =
    "w-full rounded-sm border bg-paper-raised px-4 py-3 text-body text-ink " +
    "transition-colors duration-fast ease-out placeholder:text-ink-soft/60 " +
    (show ? "border-kumkum" : "border-rule-strong focus:border-indigo");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold text-ink">
        {label}
        {required && (
          <>
            {" "}
            <span className="text-kumkum" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(required)</span>
          </>
        )}
      </label>

      {help && (
        <p id={helpId} className="text-small text-ink-soft">
          {help}
        </p>
      )}

      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          value={value}
          required={required}
          placeholder={placeholder}
          aria-describedby={describedBy}
          aria-invalid={show || undefined}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          className={control}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          required={required}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-describedby={describedBy}
          aria-invalid={show || undefined}
          onBlur={() => setTouched(true)}
          onChange={(e) => onChange(e.target.value)}
          className={control}
        />
      )}

      {/* Reserved space: the message fades in without moving anything. */}
      <p
        id={errId}
        className={`min-h-[1.25rem] text-small text-kumkum transition-opacity duration-fast ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        {show ? error : ""}
      </p>
    </div>
  );
}
