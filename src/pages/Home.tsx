import { Hero } from "@/sections/Hero";
import { GrowthModule } from "@/sections/GrowthModule";
import { WhatWeDo } from "@/sections/WhatWeDo";
import { MissionBand } from "@/sections/MissionBand";
import { Heritage } from "@/sections/Heritage";
import { Seo, organisationJsonLd } from "@/lib/seo";

/* A deliberately lean home page (per the committee's review): the hero,
   the one "find a school" pathway, what the Consortium does, the aim, and
   the heritage passage. News/training, resources, exam updates, the parents
   cards and membership forms now live on their own pages. */
export default function Home() {
  return (
    <>
      <Seo
        title="Consortium of Gujarati Schools, Inspiring Gujarati teachers and students"
        description="A UK educational charity supporting the teaching and learning of Gujarati for children aged 5 to 16. Past papers, training materials and exam guidance, free to download."
        path="/"
        jsonLd={organisationJsonLd}
      />
      <Hero />
      <GrowthModule />
      <WhatWeDo />
      <MissionBand />
      <Heritage />
    </>
  );
}
