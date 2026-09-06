import { Link } from "react-router-dom";
import type { Resource } from "@/lib/content";
import { formatDateShort } from "@/lib/content";
import { Badge, audienceAccent } from "@/components/ui/Badge";
import { IconDownload, IconExternal, IconDoc, IconVideo, IconLink } from "@/components/ui/Icons";

/* ============================================================
   Resource row.
   File-type icon, title, one-line description, audience and type
   badges, file type and real size, date added, and one obvious
   action. External links are marked and open in a new tab.
   The size is always shown: people on mobile data deserve to know
   what they are about to download.
   ============================================================ */

function FileIcon({ type }: { type: string }) {
  if (type === "Video") return <IconVideo size={20} />;
  if (type === "Link") return <IconLink size={20} />;
  return <IconDoc size={20} />;
}

const TYPE_TINT: Record<string, string> = {
  PDF: "var(--kumkum)",
  Word: "var(--indigo)",
  Excel: "var(--leaf)",
  PowerPoint: "var(--marigold)",
  Video: "var(--kumkum)",
  Link: "var(--indigo)",
  Image: "var(--leaf)",
};

export function ResourceRow({ r }: { r: Resource }) {
  const isExternal = r.external;
  const isPage = r.fileType === "Page";
  const actionLabel = isPage
    ? "Read the page"
    : isExternal
      ? "Open link"
      : r.fileType === "Video"
        ? "Watch"
        : `Download ${r.fileType}`;

  return (
    <li className="group relative rounded-md border border-rule bg-paper-raised transition-[border-color,transform] duration-base ease-out hover:-translate-y-0.5 hover:border-indigo/40 motion-reduce:hover:translate-y-0">
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm"
          style={{
            color: TYPE_TINT[r.fileType] ?? "var(--indigo)",
            background: "color-mix(in srgb, currentColor 10%, var(--paper))",
          }}
        >
          <FileIcon type={r.fileType} />
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="text-[1.0625rem] font-semibold leading-snug">
            {/* The title links to the detail page; the button downloads. */}
            <Link
              to={`/resources/${r.slug}`}
              className="text-ink transition-colors after:absolute after:inset-0 after:content-[''] hover:text-indigo"
            >
              {r.title}
            </Link>
          </h3>

          {r.description && (
            <p className="mt-1 text-small text-ink-soft [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
              {r.description}
            </p>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {r.audience.map((a) => (
              <Badge key={a} tone="audience" accent={audienceAccent[a]}>
                {a}
              </Badge>
            ))}
            <Badge tone="type">{r.type}</Badge>
            {r.exam && <Badge tone="exam">{r.exam}</Badge>}
            {r.board && <Badge tone="type">{r.board}</Badge>}
            {r.year && <Badge tone="type">{r.year}</Badge>}
          </div>

          <p className="tnum mt-2 text-micro text-ink-soft">
            {isPage ? "Page on this site" : r.fileType}
            {r.fileSize ? ` · ${r.fileSize}` : ""}
            {r.date ? ` · added ${formatDateShort(r.date)}` : ""}
          </p>
        </div>

        {/* Above the card-wide link, so it wins the click. */}
        <div className="relative z-10 shrink-0 sm:self-center">
          {isPage ? (
            <Link
              to={r.fileUrl}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-indigo px-4 text-small font-semibold text-indigo transition-colors duration-fast hover:bg-indigo hover:text-white"
            >
              {actionLabel}
            </Link>
          ) : isExternal ? (
            <a
              href={r.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-pill border border-indigo px-4 text-small font-semibold text-indigo transition-colors duration-fast hover:bg-indigo hover:text-white"
            >
              <IconExternal size={16} />
              {actionLabel}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <a
              href={r.fileUrl}
              download
              className="inline-flex min-h-[44px] items-center gap-2 rounded-pill bg-marigold px-4 text-small font-semibold text-ink transition-colors duration-fast hover:bg-[color-mix(in_srgb,var(--marigold)_88%,var(--ink))]"
            >
              <IconDownload size={16} />
              {actionLabel}
              {r.fileSize && <span className="sr-only"> ({r.fileSize})</span>}
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
