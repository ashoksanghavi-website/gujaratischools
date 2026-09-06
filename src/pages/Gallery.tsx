import { useMemo, useState } from "react";
import { gallery, galleryEvents } from "@/data/gallery";
import { PageHero } from "@/components/ui/PageHero";
import { Chip } from "@/components/ui/Badge";
import { Lightbox, type LightboxItem } from "@/components/ui/Lightbox";
import { formatDateShort } from "@/lib/content";
import { Seo } from "@/lib/seo";

export default function Gallery() {
  const [filter, setFilter] = useState<string>("");
  const [index, setIndex] = useState<number | null>(null);

  const shown = useMemo(
    () => (filter ? gallery.filter((g) => g.event === filter) : gallery),
    [filter]
  );

  const items: LightboxItem[] = shown.map((g) => ({
    src: g.src,
    alt: g.alt,
    caption: `${g.caption} — ${formatDateShort(g.date)}`,
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

      <div className="container-cgs py-8">
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
        </p>

        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((g, i) => (
            <li key={g.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group block w-full overflow-hidden rounded-md border border-rule bg-paper-tint text-left"
              >
                <span className="relative block aspect-[3/2] overflow-hidden">
                  <img
                    src={g.src}
                    alt={g.alt}
                    width={g.w}
                    height={g.h}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
                  />
                </span>
                <span className="block bg-paper-raised p-4">
                  <span className="block font-medium text-ink">{g.caption}</span>
                  <span className="tnum mt-1 block text-micro text-ink-soft">
                    {g.event} · {formatDateShort(g.date)}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Lightbox items={items} index={index} onClose={() => setIndex(null)} onIndex={setIndex} />
    </>
  );
}
