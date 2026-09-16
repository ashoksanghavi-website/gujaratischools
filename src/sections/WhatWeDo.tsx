import { Link } from "react-router-dom";
import { themes, photos } from "@/data/site";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { resources } from "@/lib/content";

/* ============================================================
   What we do, feature plus grid.
   Not four identical boxes. The feature is Resources, because
   that is what people actually come for; the other three sit
   beneath it. The layout encodes a priority that is true.
   ============================================================ */

export function WhatWeDo() {
  const feature = themes.find((t) => "feature" in t && t.feature)!;
  const rest = themes.filter((t) => t.key !== feature.key);

  return (
    <section className="section" aria-labelledby="what-we-do">
      <div className="container-cgs">
        <SectionHeader
          id="what-we-do"
          title="What the Consortium does"
          intro="Four things, and they all point the same way: better teaching, and students who do well in Gujarati."
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {/* Feature panel, spans two columns on desktop */}
          <Link
            to={feature.to}
            className="group relative flex flex-col justify-between overflow-hidden rounded-lg border border-rule bg-paper-raised shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 lg:col-span-2"
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-paper-tint lg:aspect-[21/9]">
              <img
                src={photos.training2016}
                alt=""
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
              />
            </div>
            <div className="p-6">
              <h3 className="text-h2 transition-colors group-hover:text-indigo">{feature.title}</h3>
              <p className="mt-3 max-w-measure text-ink-soft">{feature.blurb}</p>
              <p className="tnum mt-4 text-small font-semibold text-indigo">
                Browse {resources.length} documents
              </p>
            </div>
          </Link>

          {/* The other three, stacked beside and beneath */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((t) => (
              <Link
                key={t.key}
                to={t.to}
                className="group flex flex-col rounded-md border border-rule bg-paper-raised p-5 shadow-e1 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                style={{ borderTopColor: t.accent, borderTopWidth: 3 }}
              >
                <h3 className="text-h3 transition-colors group-hover:text-indigo">{t.title}</h3>
                <p className="mt-2 text-small text-ink-soft">{t.blurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
