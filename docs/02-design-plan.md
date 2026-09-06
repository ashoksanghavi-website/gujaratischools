# Design plan — "The Exercise Book"

Pass 1 is the plan. Pass 2 (at the end of this file) is the self-review that
challenges every part of it before any code was written.

## Subject, audience, job

Subject: a UK charity that trains volunteer Gujarati teachers.
Audience: a volunteer teacher on a phone, late, moderate computer confidence.
The page's single job: **retrieval**. Everything else is credibility.

The design world comes from the objects of the classroom this charity actually
operates in: the ruled exercise book with its red margin, the kakko chart on the
wall, the ring-binder of past papers on the teacher's shelf.

## Color — 6 named values (full token set in `src/styles/tokens.css`)

| Name | Hex | Why this one |
|---|---|---|
| Paper | `#FFFDF9` | Warm white, *not* cream. Deliberately lighter than the #F4F1EA default so the page reads as fresh paper, not aged parchment. |
| Ink | `#16234A` | Deep indigo. The colour of school pen ink. Never black. |
| Indigo | `#23407F` | Interactive. Links, nav, focus ring. |
| Marigold | `#F2A61C` | The one warm accent. Active tabs, the pencil progress line, underlines. Text on it is always Ink. |
| Leaf | `#2E7D5B` | Parents' identity colour. |
| Margin rule | `#E9A7B0` | The soft red exercise-book margin. The site's signature line. |

Audience colour-coding is functional, not decorative: Teachers indigo, Leaders
gold-hair, Parents leaf. A teacher learns in one visit that green things are not
for them — that is a navigation aid doing the work of a filter.

## Type — three families, three jobs

- **Bricolage Grotesque** (variable) — display. Slightly condensed, a little odd
  in the details. Chosen over the reflexive editorial serif because a serif here
  would drift straight into the AI-default look the brief forbids. Tracking
  tightens as size grows.
- **Inter** — body, 18px / 1.65, measure capped at ~70ch. Tabular numerals
  switched on for file sizes, dates and the past-paper year matrix.
- **Noto Sans Gujarati** — every `lang="gu"` element, no exceptions. On a
  language charity's site, Gujarati rendering in a fallback face is a defect.

## Layout concept — the double-page spread

One 12-column grid, 1200px content, left-aligned throughout. The margin rule
runs down the left of the hero, article pages and the resource library, and
nowhere else — it marks "this is a page you read", which is true information.

```
HOME — hero (the signature moment)
┌─────────────────────────────────────────────────────┐
│▏ ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  · │  ← ruled lines fade in
│▏                                                    │
│▏   ક  ← draws itself on dotted guide lines          │
│▏   Inspiring Gujarati                               │   photo of a real
│▏   teachers and students                            │   training session
│▏   One sentence on what CGS does.                   │   (parallax, <40px)
│▏   [ Find a resource ]  Become a member             │
│▏                                                    │
└─────────────────────────────────────────────────────┘
 ↑ margin rule draws down on load, once
```

```
QUICK ACCESS STRIP — three doors, the fix for complaint #1
┌───────────────┬───────────────┬───────────────┐
│ I teach       │ I lead a      │ I'm a         │
│ Gujarati      │ school        │ parent        │
│ indigo        │ gold-hair     │ leaf          │
└───────────────┴───────────────┴───────────────┘
  each → /resources pre-filtered. Not cards: full-bleed bands
  divided by hairlines, so they read as doors, not decoration.
```

```
RESOURCES — the ring binder (the page the client is paying for)
┌──────────┬──────────────────────────────────────────┐
│ ╭──────╮ │  Search  [                          ]    │
│ │Teach │ │  47 resources · 2 filters  [Clear all]   │
│ ╰──────╯ │ ┌──────────────────────────────────────┐ │
│ ╭──────╮ │ │ 📄 Past paper 2018 · OCR GCSE        │ │
│ │Leads │ │ │    Reading · PDF 4.3 MB · added 2018 │ │
│ ╰──────╯ │ │                     [ Download PDF ] │ │
│ ╭──────╮ │ ├──────────────────────────────────────┤ │
│ │Parent│ │ │ 📄 ...                               │ │
│ ╰──────╯ │ └──────────────────────────────────────┘ │
│  ── type │                                          │
│  ── exam │  tabs are real tab shapes, cut like ring- │
│  ── year │  binder dividers; active tab is marigold  │
└──────────┴──────────────────────────────────────────┘
```

## Signature

**The kakko index.** Gujarati letterforms do real navigational work rather than
sitting behind headings as decoration: a large quiet ક watermark anchors the
mission band, and the resource library carries a kakko strip that jumps to
titles by letter. The one orchestrated motion moment is a letter completing
itself along a child's handwriting guide lines, on load, once.

The risk I am taking, and the justification: putting a non-Latin script into the
*navigation* of an English-language site is unusual and could read as decorative
tokenism if done badly. It is right here because the organisation's entire
purpose is that these letterforms are learned — and because it is backed up by
an ordinary A–Z control for anyone who does not read the script. Cultural pride
expressed as a working control, with a plain-English fallback.

---

# Pass 2 — self-review before writing code

I worked through the brief a second time asking, of each decision: *would I have
produced this for any other charity?* Four things failed that test and changed.

**1. The four "what we do" themes as four equal cards → feature + grid.**
Four identical boxes was the generic answer and the brief explicitly forbids it.
Changed to one feature panel (Resources — the thing they actually came for)
spanning two columns, with the other three beneath. The layout now encodes a
priority that is true, instead of implying four equal things.

**2. Quick-access strip as three rounded cards → three full-bleed bands.**
Cards would have made the most important navigational element on the site look
like the least important. Bands divided by hairlines read as doors.

**3. Past papers as a flat filtered list → a year × board matrix.**
This is the biggest change and it came from the content, not the brief. The live
site has seven sessions (2012–2018) across two boards at two levels. A teacher
holds *year + board* in their head. A flat list makes them scan; a small matrix
lets them land on one cell. The filter rail gained a fourth axis (board) and a
year facet because the real content demanded it.

**4. Scroll reveals on every section → three only.**
My first pass had a reveal on each home section, which is precisely the tell the
brief names. Cut to the hero sequence, the mission band, and the featured
resources. Everything else is simply there when you arrive.

One accessory removed, per Chanel: I dropped a planned paper-grain texture
overlay on the whole page. The ruled-line motif already says "paper"; grain on
top of it would have been the second thing saying the same thing, at a cost to
contrast and to LCP.
