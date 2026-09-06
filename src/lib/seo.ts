import { useEffect } from "react";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", url);
}

/** Per-route title / meta / canonical + optional JSON-LD. */
export function useSeo(opts: {
  title: string;
  description?: string;
  path?: string;
  jsonLd?: object;
}) {
  const { title, description, path, jsonLd } = opts;
  useEffect(() => {
    const full = title.includes("CGS") || title.includes("Consortium")
      ? title
      : `${title} — Consortium of Gujarati Schools`;
    document.title = full;
    if (description) {
      setMeta("name", "description", description);
      setMeta("property", "og:description", description);
    }
    setMeta("property", "og:title", full);
    const canonical = `https://www.gujaratischools.org${path ?? window.location.pathname}`;
    setCanonical(canonical);
    setMeta("property", "og:url", canonical);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      script.setAttribute("data-route-jsonld", "true");
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, jsonLd]);
}

/** Declarative wrapper around useSeo. Renders nothing. */
export function Seo(opts: {
  title: string;
  description?: string;
  path?: string;
  jsonLd?: object;
}): null {
  useSeo(opts);
  return null;
}

/** Structured data for the charity itself. */
export const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Consortium of Gujarati Schools",
  alternateName: "CGS",
  url: "https://www.gujaratischools.org",
  logo: "https://www.gujaratischools.org/images/logo/cgs-logo-colour.png",
  description:
    "A UK educational charity supporting the teaching and learning of Gujarati for children aged 5 to 16.",
  areaServed: "GB",
  sameAs: [
    "https://www.facebook.com/gujaratischoolsuk",
    "https://twitter.com/gujaratischools",
    "https://www.youtube.com/channel/UCUWtYiPxTcErR4G7gAQhk9g",
  ],
};
