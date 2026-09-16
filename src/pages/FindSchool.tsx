import { useMemo, useState } from "react";
import {
  schools,
  schoolRegions,
  schoolTownCount,
  type School,
} from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { Chip } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/SectionHeader";
import { IconSearch, IconClose, IconMail, IconPhone, IconSchoolPin } from "@/components/ui/Icons";
import { SchoolEnquiryModal } from "@/components/resources/SchoolEnquiryModal";
import { contact } from "@/data/site";
import { Seo } from "@/lib/seo";

/* ============================================================
   Find a Gujarati school.
   The growth engine for new families: a real directory of member
   schools across the UK. Shown as one dense grid so it always
   reads as a full, living network — region is a colour-coded tag
   and a filter, not a set of half-empty sections. Every school is
   a markdown file the committee can add to or correct.
   ============================================================ */

/* A quiet colour per region — helps the eye group the grid without
   splitting it into sparse sections. */
const regionAccent: Record<string, string> = {
  "London & the South East": "var(--indigo)",
  "East of England": "var(--leaf)",
  "The Midlands": "var(--gold-hair-text)",
  "The North West": "var(--kumkum)",
  "Other member schools": "var(--ink-soft)",
};
const accentFor = (r: string) => regionAccent[r] ?? "var(--ink-soft)";
const regionIndex = (r: string) => {
  const i = schoolRegions.indexOf(r);
  return i < 0 ? 99 : i;
};

function SchoolCard({ s, onEnquire }: { s: School; onEnquire: (s: School) => void }) {
  const accent = accentFor(s.region);
  return (
    <li
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
      style={{ borderTopColor: accent, borderTopWidth: 3 }}
    >
      <div className="flex flex-1 flex-col p-5">
        {/* region tag */}
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 text-micro font-medium text-ink-soft">
          <span className="h-2 w-2 rounded-full" style={{ background: accent }} aria-hidden="true" />
          {s.region}
        </span>

        <h3 className="text-[1.0625rem] font-semibold leading-snug text-ink">{s.name}</h3>
        {s.org && <p className="mt-0.5 text-small text-ink-soft">{s.org}</p>}

        {s.address ? (
          <p className="mt-3 flex gap-2 text-small text-ink-soft">
            <span className="mt-0.5 shrink-0" style={{ color: accent }}>
              <IconSchoolPin size={16} />
            </span>
            <span>
              {s.address}
              {s.postcode && (
                <>
                  {" "}
                  <span className="tnum font-medium text-ink">{s.postcode}</span>
                </>
              )}
            </span>
          </p>
        ) : s.area ? (
          <p className="mt-3 flex items-center gap-2 text-small text-ink-soft">
            <span className="shrink-0" style={{ color: accent }}>
              <IconSchoolPin size={16} />
            </span>
            {s.area}
          </p>
        ) : null}

        {s.when && <p className="mt-2 text-small text-ink-soft">🕑 {s.when}</p>}
        {s.contact && <p className="mt-2 text-small text-ink-soft">{s.contact}</p>}

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => onEnquire(s)}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-pill bg-leaf px-4 text-small font-semibold text-white transition-colors duration-fast hover:brightness-95"
          >
            Enquire about this school
          </button>
        </div>
      </div>
    </li>
  );
}

export default function FindSchool() {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [enquiry, setEnquiry] = useState<School | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return schools
      .filter((s) => {
        if (region && s.region !== region) return false;
        if (term) {
          const hay = `${s.name} ${s.org ?? ""} ${s.area ?? ""} ${s.address ?? ""} ${s.postcode ?? ""}`.toLowerCase();
          if (!hay.includes(term)) return false;
        }
        return true;
      })
      // group visually by region, then alphabetically within it
      .sort(
        (a, b) => regionIndex(a.region) - regionIndex(b.region) || a.name.localeCompare(b.name)
      );
  }, [q, region]);

  const clearAll = () => {
    setQ("");
    setRegion("");
  };

  return (
    <>
      <Seo
        title="Find a Gujarati school near you"
        description="A directory of Gujarati schools across the UK, run by temples and community groups in the CGS network. Search by town to find your nearest class."
        path="/find-a-school"
      />

      <PageHero
        title="Find a Gujarati school near you"
        intro="Gujarati is taught at schools across the UK, run by temples and community groups. Search for your town to find your nearest class."
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="શા"
        tint
      >
        {/* premium stat strip */}
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
          {[
            { n: schools.length, l: "member schools" },
            { n: `${schoolTownCount}+`, l: "towns and areas" },
            { n: schoolRegions.length, l: "regions" },
          ].map((s) => (
            <div key={s.l}>
              <dt className="sr-only">{s.l}</dt>
              <dd className="flex items-baseline gap-2">
                <span className="tnum font-display text-[1.75rem] leading-none text-ink">{s.n}</span>
                <span className="text-small text-ink-soft">{s.l}</span>
              </dd>
            </div>
          ))}
        </dl>
      </PageHero>

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
            placeholder="Search by town, area or postcode, e.g. “Wembley”, “Luton”, “HA0”"
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

        {/* Region filter */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Chip active={!region} onClick={() => setRegion("")}>
            All regions
          </Chip>
          {schoolRegions.map((r) => (
            <Chip
              key={r}
              active={region === r}
              accent={accentFor(r)}
              onClick={() => setRegion(region === r ? "" : r)}
            >
              {r}
            </Chip>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="tnum text-small text-ink-soft" aria-live="polite">
            <strong className="font-semibold text-ink">{filtered.length}</strong>{" "}
            {filtered.length === 1 ? "school" : "schools"}
            {region ? ` in ${region}` : schoolTownCount > 0 && !q ? ` across ${schoolTownCount} towns and areas` : ""}
          </p>
          {(q || region) && (
            <button
              type="button"
              onClick={clearAll}
              className="link-draw text-small font-semibold text-indigo"
            >
              Clear
            </button>
          )}
        </div>

        {/* One dense grid — always full, never sparse sections */}
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
                  <Button variant="quiet" onClick={clearAll}>
                    Clear search
                  </Button>
                </>
              }
            />
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((s) => (
              <SchoolCard key={s.slug} s={s} onEnquire={setEnquiry} />
            ))}
          </ul>
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
              nearest class, or help start one.
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
            <h2 className="text-h3">Run a school? Add it to the directory</h2>
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

      <SchoolEnquiryModal school={enquiry} onClose={() => setEnquiry(null)} />
    </>
  );
}
