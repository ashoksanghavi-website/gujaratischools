import { useMemo, useState } from "react";
import { schools, schoolRegions, schoolTownCount, type School } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Chip } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/SectionHeader";
import { IconSearch, IconClose, IconMail, IconPhone } from "@/components/ui/Icons";
import { contact } from "@/data/site";
import { Seo } from "@/lib/seo";

/* ============================================================
   Find a Gujarati school.
   The growth engine for new families: a real, searchable directory
   of member schools across the UK, grouped by region. A parent
   types their town and finds their nearest class. Every school is
   a markdown file the committee can add to or correct.
   ============================================================ */

function SchoolCard({ s }: { s: School }) {
  const hasDetail = s.address || s.contact || s.when;
  return (
    <li className="flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5">
      <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink">{s.name}</h3>
      {s.org && <p className="mt-0.5 text-small text-ink-soft">{s.org}</p>}

      {s.address ? (
        <p className="mt-3 text-small text-ink-soft">
          {s.address}
          {s.postcode && (
            <>
              <br />
              <span className="tnum font-medium text-ink">{s.postcode}</span>
            </>
          )}
        </p>
      ) : s.area ? (
        <p className="mt-3 text-small text-ink-soft">{s.area}</p>
      ) : null}

      {s.when && <p className="mt-3 text-small text-ink-soft">🕑 {s.when}</p>}
      {s.contact && <p className="mt-2 text-small text-ink-soft">{s.contact}</p>}

      {!hasDetail && (
        <p className="mt-auto pt-4 text-small text-ink-soft">
          Contact CGS and we'll connect you to this school.
        </p>
      )}
    </li>
  );
}

export default function FindSchool() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return schools.filter((s) => {
      if (region && s.region !== region) return false;
      if (term) {
        const hay = `${s.name} ${s.org ?? ""} ${s.area ?? ""} ${s.address ?? ""} ${s.postcode ?? ""}`.toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [q, region]);

  const grouped = useMemo(
    () =>
      schoolRegions
        .map((r) => ({ region: r, items: filtered.filter((s) => s.region === r) }))
        .filter((g) => g.items.length > 0),
    [filtered]
  );

  return (
    <>
      <Seo
        title="Find a Gujarati school near you"
        description="A directory of Gujarati schools across the UK, run by temples and community groups in the CGS network. Search by town to find your nearest class."
        path="/find-a-school"
      />

      <PageHero
        title="Find a Gujarati school near you"
        intro={`Gujarati is taught at ${schools.length} schools across the UK, run by temples and community groups. Search for your town to find your nearest class.`}
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="શા"
        tint
      />

      <div className="container-cgs py-8">
        {/* Search */}
        <div className="flex items-center gap-3 rounded-md border border-rule-strong bg-paper-raised px-4">
          <IconSearch size={20} className="shrink-0 text-ink-soft" />
          <label htmlFor="school-q" className="sr-only">
            Search by town, area or postcode
          </label>
          <input
            id="school-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by town, area or postcode — e.g. “Wembley”, “Luton”, “HA0”"
            className="min-h-[56px] w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft/70"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ("")}
              aria-label="Clear search"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-ink-soft hover:text-ink"
            >
              <IconClose size={18} />
            </button>
          )}
        </div>

        {/* Region chips */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip active={!region} onClick={() => setRegion("")}>
            All regions
          </Chip>
          {schoolRegions.map((r) => (
            <Chip key={r} active={region === r} onClick={() => setRegion(region === r ? "" : r)}>
              {r}
            </Chip>
          ))}
        </div>

        <p className="tnum mt-4 text-small text-ink-soft" aria-live="polite">
          <strong className="font-semibold text-ink">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "school" : "schools"}
          {schoolTownCount > 0 && !q && !region && ` across ${schoolTownCount} towns and areas`}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No schools match that search"
              body={
                <>
                  We may still have a class near you that isn't listed yet. Tell us where you are and
                  we'll point you to the nearest one.
                </>
              }
              action={
                <>
                  <ButtonLink to="/contact" variant="secondary">
                    Ask CGS to help
                  </ButtonLink>
                  <Button
                    variant="quiet"
                    onClick={() => {
                      setQ("");
                      setRegion("");
                    }}
                  >
                    Clear search
                  </Button>
                </>
              }
            />
          </div>
        ) : (
          <div className="mt-6 flex flex-col gap-9">
            {grouped.map((g) => (
              <section key={g.region} aria-labelledby={`region-${g.region.replace(/[^a-z]/gi, "")}`}>
                <h2
                  id={`region-${g.region.replace(/[^a-z]/gi, "")}`}
                  className="mb-4 flex items-baseline gap-3 text-h3"
                >
                  {g.region}
                  <span className="tnum text-small font-normal text-ink-soft">{g.items.length}</span>
                </h2>
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {g.items.map((s) => (
                    <SchoolCard key={s.slug} s={s} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

        {/* Help + growth CTAs */}
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <div
            className="rounded-lg border border-rule bg-paper-raised p-6"
            style={{ borderLeftColor: "var(--leaf)", borderLeftWidth: 4 }}
          >
            <h2 className="text-h3">Can't find a class near you?</h2>
            <p className="mt-2 text-ink-soft">
              New schools open as new teachers come forward. Get in touch and we'll point you to your
              nearest class — or help start one.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-pill bg-leaf px-6 font-semibold text-white transition-colors duration-fast hover:brightness-95"
              >
                <IconMail size={18} />
                Email CGS
              </a>
              <a
                href={contact.phoneHref}
                className="inline-flex min-h-[48px] items-center gap-2 rounded-pill border border-rule-strong px-6 font-semibold text-indigo transition-colors duration-fast hover:border-indigo"
              >
                <IconPhone size={18} />
                {contact.phone}
              </a>
            </div>
          </div>

          <div
            className="rounded-lg border border-rule bg-paper-raised p-6"
            style={{ borderLeftColor: "var(--indigo)", borderLeftWidth: 4 }}
          >
            <h2 className="text-h3">Run a school? Add it to the map</h2>
            <p className="mt-2 text-ink-soft">
              If your Gujarati school isn't listed, or its details have changed, send them to us and
              we'll add your listing so families in your area can find you.
            </p>
            <ButtonLink to="/membership" variant="secondary" className="mt-5">
              Join CGS as a school
            </ButtonLink>
          </div>
        </div>
      </div>
    </>
  );
}
