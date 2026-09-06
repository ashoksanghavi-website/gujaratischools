import { heritage, gandhiji } from "@/data/site";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { Kakko, RuledPaper } from "@/components/motifs/Motifs";

/* ============================================================
   Heritage — set as an editorial passage, not a card.
   Followed by the Gandhiji passage, which is the cultural heart
   of the page and gets the most typographic care on the site:
   generous measure, Noto Sans Gujarati, comfortable line height,
   and a proper lang attribute so screen readers switch voice.
   ============================================================ */

export function Heritage() {
  return (
    <section className="section" aria-labelledby="heritage">
      <div className="container-cgs">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <div className="relative pl-6">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule" />
            <h2 id="heritage" className="text-h2">
              {heritage.title}
            </h2>
            <p className="prose-cgs mt-5 text-ink-soft">{heritage.body}</p>
          </div>

          <div>
            <VideoEmbed id={heritage.youtubeId} title={heritage.youtubeTitle} />
            <p className="mt-3 text-small text-ink-soft">
              A short film on inspiring Gujarati learning, from the CGS channel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Gandhiji() {
  return (
    <section
      className="relative overflow-hidden border-y border-rule bg-paper-tint"
      aria-labelledby="gandhiji"
    >
      <RuledPaper soft />
      <Kakko
        letter="ગ"
        className="absolute -left-6 bottom-0 text-[18rem] md:text-[24rem]"
        opacity={0.045}
      />

      <div className="container-cgs relative py-section-sm md:py-section">
        <div className="mx-auto max-w-[62ch]">
          <h2 id="gandhiji" lang="gu" className="font-gujarati text-h2 leading-[1.5]">
            {gandhiji.heading}
          </h2>
          <p className="mt-2 text-small text-ink-soft">{gandhiji.headingEn}</p>

          <blockquote className="mt-7">
            <p
              lang="gu"
              className="font-gujarati text-[clamp(1.0625rem,1.5vw,1.25rem)] leading-[2] text-ink"
            >
              {gandhiji.text}
            </p>
            <div className="mt-6 flex items-baseline gap-3">
              <span aria-hidden="true" className="h-[2px] w-8 rounded-full bg-marigold" />
              <cite className="not-italic">
                <span lang="gu" className="font-gujarati font-semibold text-ink">
                  {gandhiji.attribution}
                </span>
                <span className="ml-2 text-small text-ink-soft">({gandhiji.attributionEn})</span>
              </cite>
            </div>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
