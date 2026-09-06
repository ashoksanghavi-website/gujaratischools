# Accessibility audit — Consortium of Gujarati Schools

**Standard:** WCAG 2.1 AA (with AAA body contrast where achievable)
**Method:** computed contrast ratios for every token pair, runtime DOM audit of
structure/labels/targets on the home, resources and article pages, and manual
keyboard operation of the mega menu, mobile panel, filter sheet, search overlay
and lightbox.

## Summary

**Issues found:** 12 · **Critical:** 0 remaining · **Major:** 0 remaining ·
**Minor:** 2 accepted with rationale

All critical and major findings were fixed. Contrast was fixed at the *token*
layer, not by patching individual components, so the corrections hold for
anything built later.

---

## Colour contrast — after fixes

| Element | Foreground | Background | Ratio | Required | Pass |
|---|---|---|---|---|---|
| Body text | `--ink` #16234A | `--paper` #FFFDF9 | **15.05:1** | 4.5 | ✅ AAA |
| Secondary text | `--ink-soft` #4C5872 | `--paper` | 7.02:1 | 4.5 | ✅ AAA |
| Links / nav | `--indigo` #23407F | `--paper` | 9.79:1 | 4.5 | ✅ AAA |
| Ink on marigold button | #16234A | `--marigold` #F2A61C | 7.46:1 | 4.5 | ✅ AAA |
| White on indigo button | #FFFFFF | #23407F | 9.95:1 | 4.5 | ✅ AAA |
| Error text | `--kumkum` #B2223C | `--paper` | 6.49:1 | 4.5 | ✅ |
| Teachers badge | #23407F | indigo 10% tint | 8.27:1 | 4.5 | ✅ AAA |
| Leaders badge | `--gold-hair-text` #7A5C1C | gold 16% tint | 5.39:1 | 4.5 | ✅ |
| Parents badge | `--leaf` #27684C | `--leaf-soft` #E3F1EA | 5.69:1 | 4.5 | ✅ |
| Focus ring | #23407F | `--paper` | 9.79:1 | 3.0 | ✅ |
| Interactive borders | `--rule-strong` #7E8EAE | `--paper` | 3.25:1 | 3.0 | ✅ |
| Active state indicator | `--marigold-deep` #C07E04 | `--paper` | 3.32:1 | 3.0 | ✅ |

### The four palette changes this forced

| Token | Was | Now | Why |
|---|---|---|---|
| `--leaf` | #2E7D5B | **#27684C** | 4.29:1 on `--leaf-soft` — failed AA for parent-section links |
| `--gold-hair-text` | *(did not exist)* | **#7A5C1C** | `--gold-hair` is 2.36:1 and was being used as **text** for Leaders badges. It is now documented as decorative-hairline-only. |
| `--rule-strong` | *(did not exist)* | **#7E8EAE** | `--rule` is 1.26:1. Input, tab, chip and quiet-button borders are UI components and need 3:1 under 1.4.11. Decorative dividers still use `--rule`. |
| `--marigold-deep` | *(did not exist)* | **#C07E04** | Marigold at 2.02:1 was carrying state on its own (active nav underline, active tab, progress). Fills keep `--marigold`, where ink-on-marigold is 7.46:1. |

---

## Structure and semantics

| # | Issue | Criterion | Severity | Resolution |
|---|---|---|---|---|
| 1 | `h1 → h3` jump on `/resources` | 1.3.1 | 🟡 Major | Visually-hidden `h2`s added for the filter and results regions. Verified: zero order jumps. |
| 2 | Mega-menu column headings were `h2`, placing headings above the page `h1` | 1.3.1 | 🟡 Major | Converted to `<p>` + `aria-labelledby` on each list. Navigation labels are not document structure. |
| 3 | Second `contentinfo` landmark from `<footer>` inside the Gandhiji blockquote | 1.3.1 | 🟢 Minor | Changed to `<div>`; one footer landmark remains. |
| 4 | A–Z jump targets 28×36 | 2.5.5 (AAA) / practical | 🟡 Major *for this audience* | Raised to 44×44. Not an AA failure, but the stated users are older and on phones. |

**Verified at runtime:** exactly one `h1` per page · no heading-order jumps ·
every `img` has an `alt` (decorative motifs are `aria-hidden` with empty alt) ·
zero unlabelled form controls · zero buttons without an accessible name · zero
vague link texts ("click here", "read more") · landmarks `header`/`nav`/`main`/
`footer` all present · `lang="gu"` on all Gujarati passages.

---

## Keyboard operation — manually exercised

| Component | Open | Move | Activate | Escape | Focus return | Trap |
|---|---|---|---|---|---|---|
| Mega menu | hover (120ms intent) + focus | Tab | Enter | ✅ closes, returns to trigger | ✅ | n/a |
| Mobile panel | button | Tab | Enter | ✅ | ✅ | ✅ trapped |
| Search overlay | `/` or button | ↑ ↓ | Enter | ✅ | ✅ | ✅ |
| Filter tabs | Tab | Tab | Enter/Space | n/a | n/a | `aria-pressed` on each |
| Filter sheet | button | Tab | Enter | ✅ | ✅ | ✅ |
| Lightbox | button | ← → | Enter | ✅ | ✅ | ✅ |
| Accordions | Tab | — | Enter/Space | n/a | n/a | `aria-expanded` + `aria-controls` |

The closed mobile panel is `inert`, so it is not reachable by tab or exposed to
screen readers while hidden — verified in the DOM.

---

## Motion

`useMotionAllowed()` is the single gate: it returns false for
`prefers-reduced-motion: reduce` and for low-core / low-memory devices. Under
reduced motion the duration tokens collapse to 1ms, keyframes resolve to their
end state, and page transitions become a plain cross-fade.

**Nothing is ever left invisible if motion is disabled or scripting fails.**
Reveal styles are opt-in via a `data-reveal` attribute that is only ever set by
script; the default state of every element is visible.

---

## Accepted, with rationale

1. **Inline text links are shorter than 44px.** Inline links within a sentence
   are explicitly exempt from target-size requirements, and enlarging them would
   damage the reading measure that this audience benefits from most.
2. **Resource row titles measure ~21px tall.** Their hit area is the entire
   card via `::after { inset: 0 }`, so the real target is roughly 400×110.

## Recommended next step

Automated checks and my manual pass together catch most issues, but not all.
Before launch, one session with a screen-reader user — ideally a CGS teacher
using VoiceOver on a phone — would be worth more than another audit pass.
