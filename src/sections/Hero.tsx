import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { RuledPaper, TracedLetter } from "@/components/motifs/Motifs";
import { photos, mission } from "@/data/site";
import { resources } from "@/lib/content";
import { useMotionAllowed } from "@/lib/motion";

/* ============================================================
   Hero, the signature moment.
   On load, once: the margin rule draws down the left edge, the
   ruled lines fade in behind, and a Gujarati letter completes
   itself along its handwriting guide lines while the headline
   settles. About 1.2s, then done. It never repeats on scroll.
   With motion off, everything is simply already in place.
   ============================================================ */

export function Hero() {
  const allow = useMotionAllowed();
  const [played, setPlayed] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!allow) return;
    const t = window.setTimeout(() => setPlayed(true), 1300);
    return () => window.clearTimeout(t);
  }, [allow]);

  /* One of only two parallax moments on the site. Under 40px travel. */
  useEffect(() => {
    if (!allow) return;
    const el = imgRef.current;
    if (!el) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 600);
        el.style.transform = `translate3d(0, ${Math.min(36, y * 0.06)}px, 0)`;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [allow]);

  const step = (i: number): React.CSSProperties =>
    allow && !played
      ? { animation: `cgs-fade-up var(--t-slow) var(--ease-out) ${0.15 + i * 0.09}s both` }
      : {};

  return (
    <section className="relative overflow-hidden bg-paper" aria-labelledby="hero-title">
      <RuledPaper soft />

      <div className="container-cgs relative py-section-sm md:py-section lg:py-[calc(var(--section-y)*0.8)]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.18fr_0.82fr]">
          {/* ---------- Left: the statement ---------- */}
          <div className="relative pl-6">
            {/* the margin rule draws down on load */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule"
              style={
                allow && !played
                  ? { transformOrigin: "top", animation: "cgs-draw-down 700ms var(--ease-out) both" }
                  : undefined
              }
            />

            <div className="mb-4 flex items-center gap-4" style={step(0)}>
              <TracedLetter letter="ક" animate={allow && !played} className="h-20 w-20 shrink-0" />
              <p className="text-small text-ink-soft">
                Consortium of Gujarati Schools
                <br />
                <span lang="gu" className="font-gujarati text-ink">
                  ગુજરાતી શાળાઓનું સંગઠન
                </span>
              </p>
            </div>

            <h1 id="hero-title" className="text-display" style={step(1)}>
              Inspiring Gujarati teachers and students
            </h1>

            <p className="mt-5 max-w-[52ch] text-lead text-ink-soft" style={step(2)}>
              We train the volunteers who teach Gujarati to children across the UK, and we keep
              every past paper, training pack and exam specification they need in one place.
            </p>

            <div className="mt-7 flex flex-wrap gap-3" style={step(3)}>
              <ButtonLink to="/resources" size="md" magnetic>
                Find a resource
              </ButtonLink>
              <ButtonLink to="/membership" size="md" variant="quiet">
                Become a member
              </ButtonLink>
            </div>

            <p className="tnum mt-5 text-small text-ink-soft" style={step(4)}>
              {resources.length} documents, free to download
            </p>
          </div>

          {/* ---------- Right: a real training session ---------- */}
          <div className="relative" style={step(2)}>
            <div ref={imgRef} className="relative overflow-hidden rounded-lg border border-rule bg-paper-tint shadow-e1">
              <img
                src={photos.hero}
                alt={photos.heroAlt}
                width={1200}
                height={800}
                {...{ fetchpriority: "high" }}
                decoding="async"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
            <p className="mt-3 max-w-[40ch] text-small text-ink-soft">{mission.aim}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
