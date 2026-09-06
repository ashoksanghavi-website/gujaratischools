import { Link } from "react-router-dom";
import { resources, countByType } from "@/lib/content";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ActionTile } from "@/components/ui/Card";
import { IconDownload } from "@/components/ui/Icons";

/* ============================================================
   Featured resources — the six most requested documents, with a
   "View all" tile completing the row (Part 4's third orphan
   strategy). Membership forms and exam specifications first,
   because those are what people ask for most.
   ============================================================ */

const WANTED = [
  "Membership Forms",
  "Exam Specifications",
  "Past Papers",
  "Training Materials",
];

function pick() {
  const out: typeof resources = [];
  for (const type of WANTED) {
    for (const r of resources.filter((x) => x.type === type)) {
      if (out.length >= 6) break;
      if (!out.some((o) => o.title === r.title)) out.push(r);
      if (out.filter((o) => o.type === type).length >= 2) break;
    }
  }
  return out.slice(0, 6);
}

export function FeaturedResources() {
  const items = pick();
  if (!items.length) return null;

  return (
    <section className="section border-t border-rule bg-paper-tint" aria-labelledby="featured">
      <div className="container-cgs">
        <SectionHeader
          id="featured"
          title="Most requested"
          intro="The documents people come here for. Every one shows its file size before you tap it."
          action={{ to: "/resources", label: "All resources" }}
        />

        {/* 6 items + 1 tile = 7; a 4-column grid would orphan, so this is
            an explicit 3-across layout with the tile completing row two. */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((r) => (
            <Link
              key={r.slug}
              to={`/resources/${r.slug}`}
              className="group flex h-full flex-col rounded-md border border-rule bg-paper-raised p-5 shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
            >
              <p className="text-micro text-ink-soft">{r.type}</p>
              <h3 className="mt-2 text-[1.0625rem] font-semibold leading-snug text-ink transition-colors group-hover:text-indigo [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                {r.title}
              </h3>
              <p className="tnum mt-auto flex items-center gap-2 pt-4 text-small text-ink-soft">
                <IconDownload size={16} />
                {r.fileType}
                {r.fileSize ? ` · ${r.fileSize}` : ""}
              </p>
            </Link>
          ))}

          <ActionTile
            to="/resources"
            title="View all resources"
            body={`${resources.length} documents — ${countByType("Past Papers")} past papers, ${countByType("Training Materials")} training files.`}
          />
        </div>
      </div>
    </section>
  );
}
