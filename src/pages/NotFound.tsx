import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Kakko, RuledPaper } from "@/components/motifs/Motifs";
import { IconSearch } from "@/components/ui/Icons";
import { resources } from "@/lib/content";
import { Seo } from "@/lib/seo";

/* On brand, friendly, and never a dead end: a search field and
   the three places people are most likely to have been heading. */
export default function NotFound() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  return (
    <>
      <Seo title="Page not found" description="That page could not be found." path="/404" />

      <section className="relative overflow-hidden bg-paper-tint">
        <RuledPaper soft />
        <Kakko letter="?" className="absolute right-6 top-4 font-display text-[10rem]" opacity={0.06} />

        <div className="container-cgs relative py-section">
          <div className="relative max-w-measure pl-6">
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] rounded-full bg-margin-rule" />
            <p className="text-small text-ink-soft">Error 404</p>
            <h1 className="mt-2 text-h1">That page has moved, or never existed</h1>
            <p className="mt-4 text-lead text-ink-soft">
              The site was rebuilt recently. If you followed an old link or a bookmark, the document
              you want is almost certainly still here, search for it below.
            </p>

            <form
              className="mt-7 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                navigate(`/search?q=${encodeURIComponent(q)}`);
              }}
            >
              <div className="flex flex-1 items-center gap-3 rounded-md border border-rule-strong bg-paper-raised px-4">
                <IconSearch size={20} className="shrink-0 text-ink-soft" />
                <label htmlFor="nf-q" className="sr-only">
                  Search the site
                </label>
                <input
                  id="nf-q"
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="What were you looking for?"
                  className="min-h-[52px] w-full min-w-0 flex-1 bg-transparent outline-none placeholder:text-ink-soft/70"
                />
              </div>
              <Button type="submit" size="md">
                Search
              </Button>
            </form>

            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/resources" variant="secondary">
                All {resources.length} resources
              </ButtonLink>
              <ButtonLink to="/news" variant="quiet">
                News and events
              </ButtonLink>
              <ButtonLink to="/" variant="quiet">
                Home
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
