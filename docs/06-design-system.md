# Design system — The Exercise Book

Every value below lives in `src/styles/tokens.css` and is surfaced to Tailwind
in `tailwind.config.js`. No component hardcodes a colour, radius, shadow,
duration or easing.

---

## Tokens

### Colour

| Token | Value | Role | Notes |
|---|---|---|---|
| `--paper` | `#FFFDF9` | Page background | Warm white, deliberately *not* cream |
| `--paper-raised` | `#FFFFFF` | Cards, raised surfaces | |
| `--paper-tint` | `#F4F7F4` | Alternate sections | Faint green cast |
| `--ink` | `#16234A` | Headings, body | Deep indigo; never black |
| `--ink-soft` | `#4C5872` | Secondary, meta | |
| `--indigo` | `#23407F` | Links, nav, focus | |
| `--indigo-deep` | `#182D5C` | Hover / pressed | |
| `--marigold` | `#F2A61C` | Accent **fills** | Text on it is always `--ink` |
| `--marigold-deep` | `#C07E04` | Thin state **indicators** | Reaches 3:1; used for active underlines, progress |
| `--marigold-soft` | `#FDEFD2` | Tinted backgrounds, selected chips | |
| `--leaf` | `#27684C` | Parents accent, success | |
| `--leaf-soft` | `#E3F1EA` | Parents tint | |
| `--kumkum` | `#B2223C` | Errors, required, rare emphasis | |
| `--margin-rule` | `#E9A7B0` | The exercise-book margin line | Decorative, always `aria-hidden` |
| `--rule` | `#DEE4EF` | **Decorative** dividers only | 1.26:1 — never a control boundary |
| `--rule-strong` | `#7E8EAE` | **Interactive** control borders | 3.25:1, satisfies 1.4.11 |
| `--gold-hair` | `#C9A24B` | Decorative hairlines only | 2.36:1 — **never text** |
| `--gold-hair-text` | `#7A5C1C` | Leaders labels | The readable companion |

**Audience identity.** `--aud-teachers` → indigo, `--aud-leaders` →
gold-hair-text, `--aud-parents` → leaf. This is functional, not decorative: a
teacher learns within one visit that green things are not for them.

### Type

| Family | Role | Notes |
|---|---|---|
| Bricolage Grotesque Variable | Display | Page titles, hero, card headings. Tracking tightens as size grows. |
| Inter Variable | Body | 18px base, 1.65 line height, ~70ch measure. `.tnum` enables tabular figures for sizes, dates and the year matrix. |
| Noto Sans Gujarati | All `lang="gu"` | Mukta Vaani fallback. Gujarati must never render in a Latin fallback. |

Scale: `--fs-display` `--fs-h1` `--fs-h2` `--fs-h3` `--fs-lead` `--fs-body`
`--fs-small` `--fs-micro`, all fluid via `clamp()`.

### Spacing, radius, elevation, motion

- **Spacing.** Tailwind's own 4px scale, plus named rhythm keys: `py-section`
  (`--section-y`, `clamp(4rem, 8vw, 7rem)`), `py-section-sm` (0.6×), `gutter`.
  *The numeric scale is deliberately not overridden* — doing so silently
  redefines `w-10`, `py-9` and every other numeric utility.
- **Radius, meaningful not uniform.** `--r-sm` 8px chips/inputs · `--r-md` 14px
  cards · `--r-lg` 22px feature panels · `--r-pill` buttons and tabs.
- **Elevation, three levels only,** indigo-tinted, never grey. `--e-1` resting ·
  `--e-2` hover · `--e-3` overlays. Never animated directly; cards cross-fade an
  `::after` layer instead.
- **Motion.** `--ease-out` `cubic-bezier(.22,1,.36,1)` · `--ease-in-out`
  `cubic-bezier(.65,0,.35,1)` · `--t-fast` 180ms · `--t-base` 320ms ·
  `--t-slow` 520ms. Nothing exceeds `--t-slow`.

---

## Components

### Button — `ui/Button.tsx`
**Variants** primary (marigold/ink) · secondary (indigo/white) · quiet
(transparent, `--rule-strong` border) · danger.
**Sizes** sm 44px · md 48px · lg 56px — all at or above the touch minimum.
**States** rest · hover (colour only, label never moves) · active `scale(.98)` ·
focus-visible (2px indigo ring, 2px offset) · disabled.
**Behaviour** `magnetic` gives ≤4px pull on fine pointers only.
`ButtonLink` renders the same thing as a router `Link`, or an `<a>` for
external/`mailto:`/`tel:` targets.
**a11y** Focus ring never removed; `active:scale` disabled under reduced motion.

### Card + RhythmGrid — `ui/Card.tsx`
`RhythmGrid` takes an **item count** and picks the layout, so content changes
cannot produce an orphan row. `chooseLayout(n)`: divisible by 3 → 3-up;
divisible by 4 and ≥8 → 4-up; even → 2-up; otherwise a two-column list.
`Card` clamps titles to 2 lines and descriptions to 3, keeps equal heights, and
scales its image inside a fixed frame so nothing reflows. The whole card is one
link target. `ActionTile` completes a row while doing real work.

### Badge / Chip — `ui/Badge.tsx`
`Badge` is static and never clickable. `Chip` is interactive and optionally
removable. They are separate components because they do different jobs.
`audienceAccent` / `audienceTint` keep audience colour consistent site-wide.

### IndexTab — `motifs/Motifs.tsx`
Ring-binder divider shape for the filter rail. `aria-pressed`, 48px minimum,
shows a live count, `--rule-strong` border, marigold fill when active.

### Field — `ui/Field.tsx`
Label, optional help, control, and a **permanently reserved message slot** so
validation never shifts layout. Errors are text, tied via `aria-describedby`,
with `aria-invalid`; colour is never the only signal. Required fields carry both
a visible `*` and an `sr-only` "(required)".

### Accordion — `ui/Accordion.tsx`
Height animates from a measured value then releases to `auto`. `aria-expanded`
+ `aria-controls`; chevron rotates; content fades 80ms after the panel starts.

### Lightbox — `ui/Lightbox.tsx`
Modal dialog, focus trapped, Escape closes, arrows navigate, focus returns to
the trigger, body scroll locked.

### EmptyState — `ui/SectionHeader.tsx`
Names *which* filter is too narrow and offers one tap to remove it. Never a
dead end.

### SectionHeader — `ui/SectionHeader.tsx`
One component so every section heading sits at the same distance from its
content. Optional label is sentence case at small size — never a tracked-out
all-caps eyebrow.

### Motifs — `motifs/Motifs.tsx`
`RuledPaper` (baseline-aligned rules, masked at both ends) · `MarginRule` (the
signature line — hero, articles, library, nowhere else) · `Kakko` (large quiet
letterform watermark) · `TracedLetter` (the one orchestrated load moment) ·
`IndexTab`. All decorative motifs are `aria-hidden`.

---

## Motion vocabulary — and nothing outside it

1. Hero load sequence — once per session, ~1.2s, never repeats on scroll.
2. Direction-aware header — compacts down, reveals up. Transform/opacity only.
3. Scroll progress as a pencil line — `scaleX` only.
4. Section reveal — major blocks only, 16px rise, 60ms stagger.
5. Parallax — twice on the whole site, under 40px travel.
6. Filter reflow — Framer layout animation on the results grid.
7. Interaction micro-motion — link underline draws left-to-right, card lift 4px
   with elevation cross-fade, tab indicator slides, accordion height.
8. Page transition — the paper turn: out 12px/180ms, in 12px/320ms.

**Hard rules.** DOM animation uses `transform` and `opacity` only. `box-shadow`,
width, height, top, left and margin are never animated on scroll. `position:
fixed` is limited to header, progress bar, bottom bar and overlays.

---

## Audit results

Run at the end of the build:

- **Hardcoded colours in `src/`:** none. A grep for hex literals across all
  `.tsx` returns exactly two kinds of match, both legitimate: `#000` inside two
  CSS mask gradients (a mask uses the alpha channel, so the colour is not
  rendered) and `#fade-${id}`, which is an SVG fragment identifier rather than a
  colour. Every visible colour resolves to a token, including the `color-mix()`
  hover states.
- **Naming drift:** none. Every Tailwind colour key maps 1:1 to a token.
- **Contrast:** all pairs pass AA; body text AAA. See `05-accessibility-audit.md`.
- **One known trap, documented:** do not override Tailwind's numeric `spacing`
  scale with the token scale. It silently changes `w-10` from 40px to 128px.
