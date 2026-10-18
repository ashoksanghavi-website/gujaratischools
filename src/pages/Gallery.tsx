import { useMemo, useState } from "react";
import { gallery, galleryEvents, type GalleryPhoto } from "@/data/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { Chip } from "@/components/ui/Badge";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { formatDateShort } from "@/lib/content";
import { Seo } from "@/lib/seo";

/* ============================================================
   Photo gallery.
   An editorial, event-grouped layout: a justified masonry that
   keeps each photograph's own proportions (no hard 3:2 crop), with
   the caption surfacing on hover. Grouping by event — with a dated
   section header and count — makes a large archive feel curated
   rather than dumped. The lightbox walks the photos in the exact
   order they are shown.
   ============================================================ */

function eventDateRange(photos: GalleryPhoto[]): string {
  const dates = photos.map((p) => p.date).filter(Boolean).sort();
  if (!dates.length) return "";
  const a = formatDateShort(dates[0]);
  const b = formatDateShort(dates[dates.length - 1]);
  return a === b ? a : `${a} – ${b}`;
}

function Tile({ photo, onOpen }: { photo: GalleryPhoto; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative mb-4 block w-full overflow-hidden rounded-lg border border-rule bg-paper-tint text-left shadow-e1 transition-shadow duration-base hover:shadow-e2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo"
      aria-label={`View photograph: ${photo.caption}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.w}
        height={photo.h}
        loading="lazy"
        decoding="async"
        className="block w-full transition-transform duration-slow ease-out group-hover:scale-[1.035] motion-reduce:transform-none"
      />
      {/* Caption surfaces on hover / focus. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-10 opacity-0 transition-all duration-base group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        <span className="block text-small font-semibold leading-snug text-white">{photo.caption}</span>
        <span className="tnum mt-0.5 block text-micro text-white/80">{formatDateShort(photo.date)}</span>
      </span>
    </button>
  );
}

function Masonry({ photos, startIndex, onOpen }: { photos: GalleryPhoto[]; startIndex: number; onOpen: (i: number) => void }) {
  return (
    <div className="[column-fill:_balance] columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
      {photos.map((g, i) => (
        <div key={g.src} className="break-inside-avoid">
          <Tile photo={g} onOpen={() => onOpen(startIndex + i)} />
        </div>
      ))}
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState<string>("");
  const [index, setIndex] = useState<number | null>(null);

  /* Group by event (newest group first), or a single group when filtered.
     `shown` is the flat, in-display-order list the lightbox walks. */
  const { groups, shown } = useMemo(() => {
    const base = filter ? gallery.filter((g) => g.event === filter) : gallery;
    const byEvent = new Map<string, GalleryPhoto[]>();
    for (const g of base) {
      if (!byEvent.has(g.event)) byEvent.set(g.event, []);
      byEvent.get(g.event)!.push(g);
    }
    const ordered = Array.from(byEvent.entries()).sort((a, b) => {
      const da = a[1].reduce((m, p) => (p.date > m ? p.date : m), "");
      const db = b[1].reduce((m, p) => (p.date > m ? p.date : m), "");
      return db.localeCompare(da);
    });
    const flat: GalleryPhoto[] = [];
    const grp = ordered.map(([event, photos]) => {
      const start = flat.length;
      flat.push(...photos);
      return { event, photos, start, range: eventDateRange(photos) };
    });
    return { groups: grp, shown: flat };
  }, [filter]);

  const items: LightboxItem[] = shown.map((g) => ({
    src: g.src,
    alt: g.alt,
    caption: `${g.caption}, ${formatDateShort(g.date)}`,
    w: g.w,
    h: g.h,
  }));

  return (
    <>
      <Seo
        title="Photo gallery"
        description="Photographs from Consortium of Gujarati Schools training events, meetings and classrooms."
        path="/gallery"
      />

      <PageHero
        title="Photographs"
        intro="Training days, general meetings and classrooms, from the founding of the Consortium in 2015 onwards."
        breadcrumb={[{ to: "/", label: "Home" }]}
        kakko="ફ"
        tint
      />

      <div className="container-cgs py-section-sm">
        {/* Event filter */}
        <div className="flex flex-wrap items-center gap-2">
          <Chip active={!filter} onClick={() => setFilter("")}>
            All
          </Chip>
          {galleryEvents.map((e) => (
            <Chip key={e} active={filter === e} onClick={() => setFilter(filter === e ? "" : e)}>
              {e}
            </Chip>
          ))}
        </div>

        <p className="tnum mt-4 text-small text-ink-soft" aria-live="polite">
          <strong className="font-semibold text-ink">{shown.length}</strong>{" "}
          {shown.length === 1 ? "photograph" : "photographs"}
          {!filter && groups.length > 1 ? ` across ${groups.length} events` : ""}
        </p>

        {/* Grouped, masonry sections */}
        <div className="mt-8 space-y-12">
          {groups.map((grp) => (
            <section key={grp.event} aria-labelledby={`ev-${grp.start}`}>
              <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule pb-3">
                <h2 id={`ev-${grp.start}`} className="font-display text-[clamp(1.25rem,2.2vw,1.6rem)] leading-tight text-ink">
                  {grp.event}
                </h2>
                <p className="tnum text-small text-ink-soft">
                  {grp.range}
                  <span aria-hidden="true"> · </span>
                  {grp.photos.length} {grp.photos.length === 1 ? "photo" : "photos"}
                </p>
              </div>
              <Masonry photos={grp.photos} startIndex={grp.start} onOpen={setIndex} />
            </section>
          ))}
        </div>
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  );
}
