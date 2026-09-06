import { IndexTab } from "@/components/motifs/Motifs";
import { audienceAccent } from "@/components/ui/Badge";

/* ============================================================
   Filter rail — styled as the tabbed dividers in a ring binder,
   because that is what it is: a way of flipping straight to a
   section. Each tab shows how many documents are behind it, so
   nobody taps into an empty view.
   ============================================================ */

export interface FilterGroup {
  key: string;
  legend: string;
  options: { value: string; label: string; count: number }[];
  selected: string[];
  accentFor?: (v: string) => string;
}

export function FilterRail({
  groups,
  onToggle,
  idPrefix = "rail",
}: {
  groups: FilterGroup[];
  onToggle: (groupKey: string, value: string) => void;
  idPrefix?: string;
}) {
  return (
    <div className="flex flex-col gap-7">
      {groups.map((g) => (
        <fieldset key={g.key} className="min-w-0 border-0 p-0">
          <legend className="mb-3 text-small font-semibold text-ink">{g.legend}</legend>
          <div className="flex flex-col gap-1.5" role="group" aria-label={g.legend}>
            {g.options.map((o) => (
              <IndexTab
                key={o.value}
                id={`${idPrefix}-${g.key}-${o.value}`}
                active={g.selected.includes(o.value)}
                accent={g.accentFor?.(o.value) ?? "var(--rule)"}
                count={o.count}
                onClick={() => onToggle(g.key, o.value)}
              >
                {o.label}
              </IndexTab>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export const audienceAccentFor = (v: string) => audienceAccent[v] ?? "var(--rule)";
