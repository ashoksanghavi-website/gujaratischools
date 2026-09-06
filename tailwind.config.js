/** @type {import('tailwindcss').Config} */
/* Every value here points at a token in src/styles/tokens.css.
   Nothing in this file invents a colour, size, radius or duration. */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-raised": "var(--paper-raised)",
        "paper-tint": "var(--paper-tint)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        indigo: "var(--indigo)",
        "indigo-deep": "var(--indigo-deep)",
        marigold: "var(--marigold)",
        "marigold-soft": "var(--marigold-soft)",
        leaf: "var(--leaf)",
        "leaf-soft": "var(--leaf-soft)",
        kumkum: "var(--kumkum)",
        "margin-rule": "var(--margin-rule)",
        rule: "var(--rule)",
        "gold-hair": "var(--gold-hair)",
        "gold-hair-text": "var(--gold-hair-text)",
        "marigold-deep": "var(--marigold-deep)",
        "rule-strong": "var(--rule-strong)",
      },
      fontFamily: {
        display: ["Bricolage Grotesque Variable", "Bricolage Grotesque", "Helvetica Neue", "Arial", "sans-serif"],
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        gujarati: ["Noto Sans Gujarati", "Mukta Vaani", "Shruti", "sans-serif"],
      },
      fontSize: {
        display: ["var(--fs-display)", { lineHeight: "var(--lh-tight)", letterSpacing: "-0.025em" }],
        h1: ["var(--fs-h1)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        h2: ["var(--fs-h2)", { lineHeight: "1.14", letterSpacing: "-0.014em" }],
        h3: ["var(--fs-h3)", { lineHeight: "var(--lh-snug)", letterSpacing: "-0.008em" }],
        lead: ["var(--fs-lead)", { lineHeight: "1.55" }],
        body: ["var(--fs-body)", { lineHeight: "var(--lh-body)" }],
        small: ["var(--fs-small)", { lineHeight: "1.5" }],
        micro: ["var(--fs-micro)", { lineHeight: "1.4" }],
      },
      /* Named additions only. The numeric scale is deliberately left as
         Tailwind's own 4px-based scale — overriding it silently changed
         the meaning of every h-10/w-10/py-9 in the codebase. Token-based
         rhythm is expressed through the named keys below and the
         .section classes in global.css. */
      spacing: {
        gutter: "var(--gutter)",
        section: "var(--section-y)",
        "section-sm": "calc(var(--section-y) * 0.6)",
        "header-h": "var(--header-h)",
        "bottombar-h": "var(--bottombar-h)",
      },
      maxWidth: {
        content: "var(--content-max)",
        measure: "var(--measure)",
      },
      borderRadius: {
        sm: "var(--r-sm)",
        md: "var(--r-md)",
        lg: "var(--r-lg)",
        pill: "var(--r-pill)",
      },
      boxShadow: {
        e1: "var(--e-1)",
        e2: "var(--e-2)",
        e3: "var(--e-3)",
      },
      transitionTimingFunction: {
        out: "var(--ease-out)",
        "in-out": "var(--ease-in-out)",
      },
      transitionDuration: {
        fast: "var(--t-fast)",
        base: "var(--t-base)",
        slow: "var(--t-slow)",
      },
      zIndex: {
        header: "50",
        mega: "60",
        overlay: "70",
        bottombar: "40",
        progress: "80",
      },
    },
  },
  plugins: [],
};
