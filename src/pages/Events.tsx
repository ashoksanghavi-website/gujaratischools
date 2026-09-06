import { Link } from "react-router-dom";
import { events, resources, formatDate } from "@/lib/content";
import { PageHero } from "@/components/ui/PageHero";
import { EmptyState } from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Seo } from "@/lib/seo";

/* ============================================================
   Training events.
   Each event shows how many course files came out of it, because
   that is the reason a teacher opens this page weeks later.
   ============================================================ */

export default function Events() {
  const filesFor = (oldUrl?: string) => {
    const src = oldUrl?.replace(/^\//, "");
    return src ? resources.filter((r) => r.source === src).length : 0;
  };

  return (
    <>
      <Seo
        title="Training events"
        description="CGS teacher training events, with the course materials from each session available to download."
        path="/events"
      />

      <PageHero
        title="Training events"
        intro="Every CGS training session, with the course material from each one kept and free to download."
        kakko="ત"
        tint
      />

      <div className="container-cgs py-8">
        {events.length === 0 ? (
          <EmptyState
            title="No training events listed yet"
            body="Training sessions will appear here as they are announced."
            action={<ButtonLink to="/resources" variant="quiet">Browse resources</ButtonLink>}
          />
        ) : (
          <ul className="flex flex-col gap-4">
            {events.map((e) => {
              const count = filesFor(e.oldUrl);
              return (
                <li key={e.slug}>
                  <Link
                    to={`/events/${e.slug}`}
                    className="group flex flex-col gap-4 rounded-md border border-rule bg-paper-raised p-4 transition-transform duration-base ease-out hover:-translate-y-1 motion-reduce:hover:translate-y-0 sm:flex-row sm:items-center"
                  >
                    {e.cover && (
                      <div className="relative h-32 w-full shrink-0 overflow-hidden rounded-sm bg-paper-tint sm:h-24 sm:w-40">
                        <img
                          src={e.cover}
                          alt=""
                          width={320}
                          height={200}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-slow ease-out group-hover:scale-105 motion-reduce:transform-none"
                        />
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <time className="tnum text-small text-ink-soft" dateTime={e.date}>
                        {formatDate(e.date)}
                      </time>
                      <h2 className="mt-1 text-h3 transition-colors group-hover:text-indigo">{e.title}</h2>
                      {e.excerpt && <p className="mt-1 text-small text-ink-soft">{e.excerpt}</p>}
                      {count > 0 && (
                        <p className="tnum mt-2 text-micro font-semibold text-indigo">
                          {count} course file{count === 1 ? "" : "s"}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
