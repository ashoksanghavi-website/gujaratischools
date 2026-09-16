import { useState } from "react";

/* ============================================================
   YouTube with a click-to-load facade.
   Nothing is requested from YouTube, and no cookie is set -
   until the person chooses to play. Keeps the page fast and
   avoids setting third-party cookies without consent.
   ============================================================ */

export function VideoEmbed({
  id,
  title,
  className = "",
}: {
  id: string;
  title: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={`relative aspect-video overflow-hidden rounded-md bg-ink ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className={`group relative block aspect-video w-full overflow-hidden rounded-md border border-rule bg-ink ${className}`}
    >
      {/* YouTube's own still, served from the image host only. */}
      <img
        src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover opacity-90 transition-opacity duration-base group-hover:opacity-100"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-paper/95 shadow-e2 transition-transform duration-base ease-out group-hover:scale-105 motion-reduce:transform-none">
          <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" fill="var(--ink)" />
          </svg>
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 text-left">
        <span className="block font-semibold text-paper">{title}</span>
        <span className="block text-micro text-paper/80">Play video on YouTube</span>
      </span>
    </button>
  );
}
