import { Link } from "react-router-dom";
import { photos } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";

/* ============================================================
   For parents — the leaf accent throughout, so a parent knows
   at a glance that this part of the site is theirs.
   Four items in a 2×2 grid: an even set, no orphan.
   ============================================================ */

const PARENT_LINKS = [
  {
    title: "Find a Gujarati school",
    blurb: "List of Gujarati Schools in UK.",
    to: "/find-a-school",
    image: photos.parents1,
  },
  {
    title: "Helping an infant child at home",
    blurb: "Quick tips on how you can talk to your baby and introduce them to Gujarati.",
    to: "/resources?audience=Parents",
    image: photos.parents3,
  },
  {
    title: "Useful Gujarati websites",
    blurb:
      "External website links to Gujarati newspapers, publications, literature, grammar, dictionary, songs, poems, gazals, children's stories and about Gujarat plus more.",
    to: "/resources?type=Useful+Links",
    image: photos.usefulWebsites,
  },
  {
    title: "Resources for teaching Gujarati",
    blurb:
      "A range of resources including online resources, Gujarati fonts, books and DVD videos, where to find interactive games and a list of bookshops.",
    to: "/resources?audience=Parents&type=Teaching+Materials",
    image: photos.parents5,
  },
];

export function ForParents() {
  return (
    <section
      className="section border-y border-rule"
      style={{ background: "var(--leaf-soft)" }}
      aria-labelledby="for-parents"
    >
      <div className="container-cgs">
        <SectionHeader
          id="for-parents"
          title="For parents"
          intro="Plain, practical help for families who want their children to learn Gujarati."
          action={{ to: "/parents", label: "Parents' page" }}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {PARENT_LINKS.map((p) => (
            <Link
              key={p.title}
              to={p.to}
              className="group flex h-full gap-4 rounded-md border border-rule bg-paper-raised p-4 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              style={{ borderLeftColor: "var(--leaf)", borderLeftWidth: 3 }}
            >
              <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-paper-tint sm:block">
                <img
                  src={p.image}
                  alt=""
                  width={160}
                  height={160}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-105 motion-reduce:transform-none"
                />
              </div>
              <div className="min-w-0">
                <h3 className="text-h3 transition-colors group-hover:text-leaf">{p.title}</h3>
                <p className="mt-1 text-small text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden">
                  {p.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
