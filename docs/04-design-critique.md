# Design critique — home, resource library, article page

Self-critique run against the framework, on the built site at desktop and at
the pane's native 897px. Findings are recorded with what was actually changed;
anything left open is stated as open.

---

## Home page

**First impression.** The eye lands on "Inspiring Gujarati teachers and
students" and then on the photograph of a real training session. That is
correct — it says what this is and shows real people rather than stock. The
margin rule and the ruled ground register as texture within about a second, so
the page reads as *a school's own paper*, which is the whole thesis.

| Finding | Severity | Action |
|---|---|---|
| Hero CTAs wrapped onto two lines; the display headline ran to four lines in a 566px column | 🔴 Critical | Rebalanced the grid to `1.18fr / 0.82fr` and dropped the buttons from `lg` to `md`. Headline now sets in three lines and the CTAs sit side by side. |
| "News & events" wrapped to three lines in the header | 🟡 Moderate | Added `whitespace-nowrap`, tightened nav padding to `px-2.5`. |
| The aim sentence under the hero photograph read as an afterthought | 🟢 Minor | Left as a caption. It is genuinely secondary, and the alternative (promoting it) would compete with the headline. **Open.** |

**Hierarchy.** Reading order is headline → photo → the three audience doors →
what we do. The doors being full-bleed bands rather than cards was the right
call: they are the most important navigational element on the site and cards
would have made them look like the least important.

---

## Resource library

**First impression.** "Resources", then the search field, then the count. For a
teacher who came to find one document, that is the correct order — the search
field is the answer to their question and it is the second thing they see.

| Finding | Severity | Action |
|---|---|---|
| `h1` was followed directly by `h3` — a broken heading ladder for screen-reader users | 🟡 Moderate | Added visually-hidden `h2`s naming the filter region and the results region. |
| A–Z jump buttons were 28×36 — below a comfortable target for the stated audience | 🟡 Moderate | Raised to 44×44 and increased from micro to small type. |
| The filter sheet's sticky action bar covered the last rows | 🟡 Moderate | Added `pb-24` to the scroll area and a top border to the bar. |
| 378 rows is a lot to scan | — | Mitigated by four filter axes, live facet counts, search, the A–Z jump, and pagination at 40. |

**What works.** The facet counts recomputing against the other active filters
is the single most useful detail on the page: nobody taps into an empty view.
The URL carrying all filter state means the committee can email
"here are all the 2018 GCSE past papers" as a link — which was an explicit goal.

---

## Article page (training event)

**First impression.** Strong. The cover photograph on the 27 October 2018 event
is a picture of the actual course pack from that day, which does more for
credibility than any amount of copy.

| Finding | Severity | Action |
|---|---|---|
| Every course file was dated "added 1 Jan 2020" — a migration artifact from the upload path, on an event from 2018 | 🔴 Critical | The generator now parses the event date from the source slug. Those 28 files are now dated 27 October 2018. This also repaired the "Recently added" mega-menu column, which had been meaningless. |
| Collection labels read "Training, 27th october 2018" — lowercase month | 🟡 Moderate | Labels are now built from parsed date parts: "Training, 27 October 2018". |
| Three titles carried filename debris ("Action Points Form 010718 Copy", "CGS 170226 Special Meeting Minutes") | 🟡 Moderate | Bare 6-digit date stamps and trailing "Copy" are now stripped in `tidy()`. All 378 titles are clean. |
| Descriptions on the attachments list repeat the collection name on every row | 🟢 Minor | Left. It is redundant in this context but correct on the resource's own page and in search results, and accuracy beat brevity. **Open.** |

---

## Consistency

Checked across all three pages:

- **Spacing** — one `--section-y` token drives every section; page headers all
  use `PageHero`, so the distance from `h1` to content is identical everywhere.
- **Radius** — deliberately not uniform: 8px chips/inputs, 14px cards, 22px
  feature panels, pill for buttons and tabs. Verified no stray values.
- **Elevation** — three levels only, all indigo-tinted, never grey.
- **A caught inconsistency:** I had overridden Tailwind's numeric spacing scale
  with the token scale, which silently redefined `w-10` from 40px to 128px and
  `py-9` from 36px to 96px across the whole codebase. Reverted to Tailwind's
  scale and moved token rhythm to named keys (`py-section`, `py-section-sm`).
  This was the single worst defect found in the whole pass.

## Accessibility

Covered in full in `05-accessibility-audit.md`. Headline: all colour pairs pass
AA, body text is AAA at 15.05:1, and seven original contrast failures were
fixed by adjusting the token palette rather than by patching components.

## Priority recommendations, now closed

1. **The spacing-scale override** — fixed; it was distorting layout site-wide.
2. **Migration dates** — fixed; files now carry the date of the session they
   came from.
3. **Contrast on Leaders/leaf/borders** — fixed at the token layer.

## Left open, deliberately

- The hero caption placement (minor, and the alternatives are worse).
- Repetitive attachment descriptions (accuracy preferred over brevity).
- Whether teachers think board-first or year-first in the past-paper filters —
  genuinely needs three real users, not another critique pass.
