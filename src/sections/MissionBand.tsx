import { mission } from "@/data/site";
import { Kakko, RuledPaper } from "@/components/motifs/Motifs";

/* ============================================================
   Mission band, the aim, set large, on ruled paper with a kakko
   watermark behind it. One of only three reveal moments on the
   home page.
   ============================================================ */

export function MissionBand() {
  return (
    <section className="relative overflow-hidden border-y border-rule bg-paper-tint" aria-labelledby="aim">
      <RuledPaper soft />
      <Kakko
        letter="ક"
        className="absolute -right-4 top-1/2 -translate-y-1/2 text-[16rem] md:text-[22rem]"
        opacity={0.05}
      />

      <div className="container-cgs relative py-section-sm md:py-section">
        <div className="relative max-w-[46ch] pl-6">
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule" />
          <h2 id="aim" className="text-h2">
            Our aim
          </h2>
          <p className="mt-5 font-display text-[clamp(1.35rem,2.6vw,2rem)] leading-[1.35] text-ink">
            {mission.aim}
          </p>
          <p className="mt-6 text-lead text-ink-soft">{mission.secondary}</p>
        </div>
      </div>
    </section>
  );
}
