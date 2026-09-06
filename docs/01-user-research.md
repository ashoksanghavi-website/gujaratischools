# User research note — Consortium of Gujarati Schools

Method: secondary research. Evidence base is the live site's own content and
structure (58 posts, 10 pages crawled), the client's two stated complaints, and
the audience model supplied in the brief. No primary interviews were run, so
every claim below is traceable to observed site evidence or client statement,
and marked where it is inference.

## The two client statements, restated as research questions

1. "Teacher members find the site hard to navigate." → *What is a teacher
   actually trying to retrieve, and what does the current IA make them do?*
2. "Nobody updates the site." → *What does the publishing path cost today?*

## Jobs to be done

Ranked by frequency implied by content volume and by the client's complaint.

| # | Job | Who | Trigger | Success |
|---|---|---|---|---|
| 1 | "Get me the past paper for this exam and year" | Volunteer teacher | Preparing a lesson or mock, often the night before | Correct PDF open on the phone |
| 2 | "Get me the handout from the training I attended" | Volunteer teacher | Days/weeks after a session | Finds it by *event date*, not by title |
| 3 | "What has changed in the exam spec?" | Teacher / leader | Exam board announcement | Reads the change, gets the source link |
| 4 | "Get me the membership form and know where to send it" | Leader, new member | Joining or renewing | Downloads form + sees the email address |
| 5 | "How do I run/administer my school?" | Leader | Ad hoc | Finds guidance page |
| 6 | "Where is my nearest Gujarati school / how do I help at home?" | Parent | One-off | Clear parent-only path |
| 7 | "Publish this news item" | Committee | Occasional | One file, no developer |

Jobs 1–2 are the design centre of gravity. Everything else is served well by
conventional pages.

## The critical finding: the retrieval key is not the document title

Teachers do not hold document titles in their heads. Evidence from the live
site's own content shape:

- Past papers exist for **7 sessions (2012–2018)** across **two exam boards**
  (Pearson/Edexcel and OCR), at **GCSE and A Level**. That is a matrix, not a list.
- Training materials are titled by **date** ("Training on 28th November 2020"),
  which is exactly how an attendee remembers them.

So a teacher's mental query is a *combination*: `2018 + OCR + GCSE + past paper`,
or `the training I went to in July`. The current site answers only single-axis
category archives, which is why retrieval fails: the user has one axis in mind
and the site asks them to guess which one it filed under.

**IA consequence, and it is the single most important decision in this build:**
the resource library must filter on **four independent axes simultaneously** —
audience, type, exam, and *exam board / year* — with free-text search across all
of them. The brief specifies three axes; the real content requires a fourth
(board) and a year facet for past papers. Adding it is what makes job #1
achievable in under fifteen seconds.

## Journey map — job #1, today vs target

| Stage | Today (observed) | Target |
|---|---|---|
| Entry | Lands on home, no search visible | Search field visible in header on every page |
| Orient | Scans top nav, guesses "Teachers" | Types "2018 ocr" or taps Resources |
| Narrow | Category archive → paginated post list | Filters combine; count always visible |
| Retrieve | Post page → link out | Direct download button, file type + size shown |
| Steps | 5+ taps, guesswork | ≤3 taps, no guesswork |

## Ranked information architecture

1. **Resources** — the retrieval engine. Earns the mega menu and the search.
2. **News & events** — training materials arrive here; dated, so browsable.
3. **Teachers** — hub that funnels into pre-filtered resource views.
4. **Membership** — high-intent, low-frequency; forms must be one tap.
5. **Parents** — small, warm, deliberately separated so it stops diluting
   teacher content (this is a real cause of complaint #1).
6. **About / Rules / Committee** — credibility, low frequency.
7. **Gallery, Contact** — supporting.

## Accessibility as a primary requirement, not a checkbox

The audience is described as parents and community volunteers, "often 40 plus,
moderate computer confidence," typically on a phone, often late in the evening.
Inference, flagged as such: this population is disproportionately likely to be
using larger text sizes, to be on mid-range Android hardware and mobile data,
and to abandon on a mis-tap. Design consequences carried into the build:

- 18px base body text; layout must survive 200% zoom.
- Every download states its file size before it is tapped (mobile data).
- Touch targets 48px in the mobile menu.
- Filters must never require precision dragging or hover.
- Nothing important behind a hover-only interaction.

## What would change my mind

The one assumption most worth testing with real users: that teachers think
*board-first* (OCR vs Pearson) rather than *year-first*. If year dominates, the
past-paper facet order should flip. The filter UI is built so either order works,
so this is cheap to change once the committee can ask three teachers.
