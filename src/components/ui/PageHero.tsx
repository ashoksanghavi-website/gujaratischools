import { Link } from "react-router-dom";
import { Kakko, RuledPaper } from "@/components/motifs/Motifs";

/* ============================================================
   Page header — one component so every interior page opens at
   the same rhythm. The margin rule marks "this is a page you
   read"; the kakko watermark is optional and used sparingly.
   ============================================================ */

export function PageHero({
  title,
  intro,
  breadcrumb,
  kakko,
  tint = false,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  breadcrumb?: { to: string; label: string }[];
  kakko?: string;
  tint?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`relative overflow-hidden border-b border-rule ${tint ? "bg-paper-tint" : "bg-paper"}`}
    >
      {tint && <RuledPaper soft />}
      {kakko && (
        <Kakko
          letter={kakko}
          className="absolute right-2 top-0 text-[8rem] md:text-[12rem]"
          opacity={0.05}
        />
      )}

      <div className="container-cgs relative py-section-sm md:py-section">
        {breadcrumb && breadcrumb.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-small text-ink-soft">
              {breadcrumb.map((b, i) => (
                <li key={b.to} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  <Link to={b.to} className="link-draw hover:text-indigo">
                    {b.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="relative max-w-measure pl-6">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule" />
          <h1 className="text-h1">{title}</h1>
          {intro && <p className="mt-4 text-lead text-ink-soft">{intro}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
