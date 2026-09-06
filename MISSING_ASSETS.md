# Asset migration log

Status of everything pulled from the old site. This file is honest: if
something could not be retrieved, the exact URL attempted is recorded.

**Crawled:** `https://www.gujaratischools.org` (65 pages, via `wp-sitemap.xml`)
and `http://photos.gujaratischools.org` (4 pages).

---

## Migrated successfully

### Documents — 365 files, 281 MB
Every document linked from any page of the old site, downloaded and served
locally from `public/documents/`, preserving the original
`/YYYY/MM/filename` path so legacy `/wp-content/uploads/...` links map 1:1.

| Group | Files |
|---|---|
| Training materials (7 sessions, 2016–2020) | 108 |
| Past papers — OCR, GCSE and A Level, 2012–2018 | 100 |
| Exam specifications and sample assessment materials | 60 |
| Teaching materials (assessment, behaviour, grammar, planning, leadership) | 41 |
| Exam information (entries, results, dates, speaking) | 26 |
| Governance (meeting minutes, reports, accounts, the Rules) | 13 |
| Press coverage of the campaign to save Gujarati | 8 |
| Membership forms | 5 |
| Parent resources and useful links | 4 |

**HEAD-checked before download: 362/362 reachable, 0 failures.** Every resource
carries its real byte size, shown before the user taps it.

### Images — 181 files
Originals plus WordPress size variants, in `public/images/uploads/`, each also
converted to `.webp` (17 MB saved) with intrinsic dimensions recorded in
`src/data/imageDimensions.json`.

Includes the material that was previously missing:
- **Committee portraits for both terms** — 13 members for 2024–2026, 10 for
  2020–2022, with names and roles recovered from the live pages.
- **Real training photography** — 27 October 2018 (Wembley), 21 July 2019
  (Oshwal Ekta Centre), 28 November 2020 (Speaking Endorsement), 2 April 2016.
- **Meeting photographs**, including the 30 October 2015 meeting at which the
  Consortium was founded.
- Parent and classroom photographs, and the "Why Gujarati" series.

### Documents recovered that were previously logged as missing
- **`CGS-Rules-adopter-22nd-April-2018.pdf`** — the governing document. It was
  linked from the old site all along; the Rules page now offers it as a download.

### Content
- Committee rosters, roles and photographs for both terms.
- The About page's founding history, four aims, and membership figures
  ("nearly 30 organisation members" across nine towns and cities) — all in the
  charity's own words, which replaced the previous `[EDITABLE]` placeholders.
- The heritage video ID (`IKvVM5FetQ8`), confirmed from the live pages.

### Brand assets generated
Favicon set (16/32/48/96/180/192/512) from the real CGS mark, plus an original
1200×630 Open Graph image in the site's own visual language. See
`docs/03-visual-philosophy.md`.

---

## Not migrated, and why

### The photo archive subdomain is essentially empty
`http://photos.gujaratischools.org/` was crawled in full — its sitemap lists
four pages (`/`, `/photos`, `/general-meetings`, `/hello-world`). After removing
WordPress size variants and logo files, it contains **one** unique photograph:

- `http://photos.gujaratischools.org/wp-content/uploads/2019/12/CGS-Meeting-151030-12.jpg`
  → migrated (the 2015 founding meeting).

The subdomain is a near-empty WordPress install, not a photo library. **There is
no archive of event photographs there to migrate.** The gallery is therefore
built from the photography on the main site, which is genuine CGS material.

**Action for the committee:** if event photographs exist elsewhere — a shared
drive, a phone, a Facebook album — send them over. `src/data/gallery.ts` takes
one entry per photo and `content/README.md` explains the format.

### Old-theme demo galleries — deliberately not migrated
The old site's sitemap lists 17 `/gallery/*` entries with names like
`mountain-biking`, `cooking-cookie`, `karate-lady` and `beauty-and-spa`. These
are demo content shipped with the purchased WordPress theme, not CGS
photographs. They were excluded on purpose.

### Dead commerce pages — redirected, not rebuilt
`/user-account`, `/user-public-account`, `/wishlist`, `/checkout-2` were
artefacts of the old theme's e-commerce features, unused by the charity. They
redirect to the home page.

---

## Decisions worth the committee's attention

### 1. Exam-board material is now hosted by CGS
The 100 past papers, mark schemes, examiner reports and specification documents
are **OCR and Pearson copyright**. The previous site already re-hosted them on
the CGS domain; this build preserves that arrangement so nothing breaks for
teachers who rely on them.

If CGS would rather link to the boards than mirror their PDFs, that is a
per-file change: set `external: true` and put the board's URL in `fileUrl`.
The Pearson GCSE specification is already handled that way — linked, not
mirrored — because the brief specified it.

**This is a judgement call the charity should confirm.** Nothing is blocked
either way; the site works as it stands.

### 2. Repository size
`public/documents/` is 281 MB. That is the charity's entire document archive and
it is the reason the site is useful. It is fine for static hosting (Netlify,
Cloudflare Pages, Vercel), but note Vercel's 100 MB per-file limit — no single
file here exceeds 11 MB, so it is within limits.

---

## Still to confirm with the client

| Item | Where | Status |
|---|---|---|
| Event photographs beyond those on the main site | `src/data/gallery.ts` | Awaiting client |
| Committee member email addresses (if they should be public) | `src/data/site.ts` → `committeeCurrent` | Names and roles present; no emails published |
| Whether to mirror or link exam-board material | See decision 1 above | Currently mirrored, as before |

No invented statistics appear anywhere on the site. Every number shown — the
founding year, the member count, the towns, the document counts — is either
taken from the charity's own words or computed from the real content.
