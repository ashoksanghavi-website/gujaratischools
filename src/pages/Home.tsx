import { Hero } from "@/sections/Hero";
import { GrowthModule } from "@/sections/GrowthModule";
import { WhatWeDo } from "@/sections/WhatWeDo";
import { MissionBand } from "@/sections/MissionBand";
import { LatestNews } from "@/sections/LatestNews";
import { FeaturedResources } from "@/sections/FeaturedResources";
import { ExamUpdates } from "@/sections/ExamUpdates";
import { ForParents } from "@/sections/ForParents";
import { Heritage, Gandhiji } from "@/sections/Heritage";
import { MembershipStrip } from "@/sections/MembershipStrip";
import { Seo, organisationJsonLd } from "@/lib/seo";

/* Sections are ordered so the page alternates in layout as well as
   in colour: full-bleed bands, feature+grid, editorial passage. */
export default function Home() {
  return (
    <>
      <Seo
        title="Consortium of Gujarati Schools — Inspiring Gujarati teachers and students"
        description="A UK educational charity supporting the teaching and learning of Gujarati for children aged 5 to 16. Past papers, training materials and exam guidance, free to download."
        path="/"
        jsonLd={organisationJsonLd}
      />
      <Hero />
      <GrowthModule />
      <WhatWeDo />
      <MissionBand />
      <LatestNews />
      <FeaturedResources />
      <ExamUpdates />
      <ForParents />
      <Heritage />
      <Gandhiji />
      <MembershipStrip />
    </>
  );
}
