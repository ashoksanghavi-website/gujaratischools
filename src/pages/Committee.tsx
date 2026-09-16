import { committeeCurrent, committeeArchive, type Member } from "@/data/site";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { chooseLayout } from "@/components/ui/Card";
import { Seo } from "@/lib/seo";

/* ============================================================
   Committee.
   The roster length changes every term, so the layout is chosen
   from the count (Part 4): an odd set that would orphan a card
   falls back to the two-column list instead of breaking the grid.
   ============================================================ */

function Portrait({ m }: { m: Member }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-md border border-rule bg-paper-raised">
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-tint">
        {m.photo ? (
          <img
            src={m.photo}
            alt={`${m.name}, ${m.role}`}
            width={436}
            height={565}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-display text-[2.5rem] text-ink-soft/40"
          >
            {m.name.charAt(0)}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink">{m.name}</h3>
        <p className="mt-1 text-small text-ink-soft">{m.role}</p>
      </div>
    </div>
  );
}

function Row({ m }: { m: Member }) {
  return (
    <div className="flex items-center gap-4 rounded-md border border-rule bg-paper-raised p-3">
      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-sm bg-paper-tint">
        {m.photo && (
          <img
            src={m.photo}
            alt=""
            width={112}
            height={112}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-ink">{m.name}</h3>
        <p className="text-small text-ink-soft">{m.role}</p>
      </div>
    </div>
  );
}

const GRID_CLASS: Record<string, string> = {
  "grid-4": "grid gap-5 grid-cols-2 md:grid-cols-4",
  "grid-3": "grid gap-5 grid-cols-2 md:grid-cols-3",
  "grid-2": "grid gap-5 grid-cols-2",
  "list-2": "grid gap-3 md:grid-cols-2",
};

function Roster({ members }: { members: Member[] }) {
  const layout = chooseLayout(members.length);
  const asList = layout === "list-2";

  return (
    <ul className={GRID_CLASS[layout]}>
      {members.map((m) => (
        <li key={m.name + m.role} className="h-full">
          {asList ? <Row m={m} /> : <Portrait m={m} />}
        </li>
      ))}
    </ul>
  );
}

/**
 * Office-holders and committee members are genuinely different roles, so they
 * are shown differently: office-holders as portraits, members as a compact
 * list. This also lets each group pick a layout that fills its rows, instead
 * of one odd-numbered set being forced into a grid with a hole in it.
 */
function Term({ members }: { members: Member[] }) {
  const officers = members.filter((m) => m.role !== "Committee Member");
  const rest = members.filter((m) => m.role === "Committee Member");

  return (
    <>
      <Roster members={officers} />
      {rest.length > 0 && (
        <>
          <h3 className="mb-4 mt-8 text-h3">Committee members</h3>
          <Roster members={rest} />
        </>
      )}
    </>
  );
}

export default function Committee() {
  return (
    <>
      <Seo
        title="Committee"
        description="The Consortium of Gujarati Schools committee for 2024-2026, and the previous term."
        path="/about/committee"
      />

      <PageHero
        title="The committee"
        intro="The volunteers who run the Consortium, elected by the membership."
        breadcrumb={[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
        ]}
        kakko="સ"
        tint
      />

      <section className="section">
        <div className="container-cgs">
          <SectionHeader
            title={`Current committee, ${committeeCurrent.term}`}
            label={`${committeeCurrent.members.length} members`}
          />
          <Term members={committeeCurrent.members} />
        </div>
      </section>

      <section className="section border-t border-rule bg-paper-tint">
        <div className="container-cgs">
          <SectionHeader
            title={`Previous committee, ${committeeArchive.term}`}
            label="Archive"
          />
          <Term members={committeeArchive.members} />
        </div>
      </section>
    </>
  );
}
