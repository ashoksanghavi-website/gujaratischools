# How to update the website

This guide is for CGS committee members. You do not need to be technical, and
you do not need a developer. **Adding something to the website means adding one
file to a folder.** Nothing else.

There are two folders you will ever touch:

| Folder | What lives in it |
|---|---|
| `content/posts/` | News items and training events |
| `content/resources/` | Documents people download — past papers, forms, training packs |

---

## Part 1 — Publishing a news post

### Step 1. Make a copy of the template

Copy the block below into a new plain-text file. Save it inside
`content/posts/` with a name that describes it, all lowercase, using hyphens
instead of spaces, ending in `.md`.

For example: `training-day-march-2026.md`

### Step 2. Fill it in

```markdown
---
title: Teacher training day, 14 March 2026
date: 2026-03-14
category: Training Events
excerpt: A one-sentence summary that appears on the news page.
cover: /images/uploads/2020/03/DSC0023.jpg
tags: [Training Events, Teachers]
---

Write the post here, in ordinary sentences.

Leave a blank line between paragraphs. To make a heading, start the line with
two hashes:

## What was covered

To make a bulleted list, start each line with a dash:

- The first point
- The second point

To make a link, put the words in square brackets and the address in round
brackets, like this: [the resource library](/resources).

To make text bold, put two stars either side, **like this**.
```

### Step 3. Save it

That is the whole job. The post appears on the site next time it is published.

### What each line at the top means

Everything between the two `---` lines is information *about* the post.

| Line | What to put | Required? |
|---|---|---|
| `title` | The headline | Yes |
| `date` | The date, always written `YYYY-MM-DD` | Yes |
| `category` | One of: `Training Events`, `Exam Updates`, `Committee`, `Newsletters`, `Announcements` | Yes |
| `excerpt` | One sentence shown on the news page | Yes |
| `cover` | A photograph (see Part 3) | No |
| `tags` | Words in square brackets, separated by commas | No |
| `location` | Where the event was held | No |

**Important:** posts with the category `Training Events` automatically appear on
the Events page as well as in News. You do not have to do anything extra.

---

## Part 2 — Adding a document to the resource library

### Step 1. Put the file where it can be found

Put the PDF (or Word file, spreadsheet, presentation) into the `public/documents/`
folder. You can make a sub-folder by year if you like, for example
`public/documents/2026/`.

### Step 2. Make a file describing it

Create a new file in `content/resources/`, named after the document, ending in
`.md`. For example: `membership-form-2026.md`

```markdown
---
title: Individual Membership Form 2026
description: One line saying what this is and who it is for.
audience: [Teachers, Leaders]
type: Membership Forms
fileUrl: /documents/2026/membership-form-2026.pdf
fileType: PDF
fileSize: 240 KB
date: 2026-01-15
tags: [Membership, Forms]
---

Anything written here appears on the document's own page. It is optional — a
sentence or two explaining how to use the document is usually enough.
```

### What each line means

| Line | What to put | Required? |
|---|---|---|
| `title` | What the document is called | Yes |
| `description` | One line. This is what people read when searching | Yes |
| `audience` | Any of `Teachers`, `Leaders`, `Parents`, in square brackets | Yes |
| `type` | See the list below | Yes |
| `fileUrl` | Where the file is, starting with `/documents/` | Yes |
| `fileType` | `PDF`, `Word`, `Excel`, `PowerPoint`, `Video` or `Link` | Yes |
| `fileSize` | For example `240 KB` or `1.4 MB` — see the tip below | Strongly recommended |
| `date` | `YYYY-MM-DD` | Yes |
| `exam` | `GCSE` or `A Level` | Only if relevant |
| `board` | For example `OCR` | Only if relevant |
| `year` | The exam year, for example `2018` | Only for past papers |
| `collection` | Groups related files, e.g. `OCR GCSE 2018` | No |
| `external` | `true` if the file lives on someone else's website | No |

**The `type` must be one of these**, spelled exactly:

`Past Papers` · `Exam Specifications` · `Exam Information` · `Training Materials` ·
`Teaching Materials` · `Membership Forms` · `Newsletters` · `Useful Links` ·
`Governance` · `Press Coverage` · `Videos`

### Why file size matters

Many of our teachers open the site on a phone, sometimes on mobile data. Telling
them a file is 4.3 MB before they tap it is a real kindness. To find the size:
right-click the file, choose Properties (Windows) or Get Info (Mac), and read
the size.

### Linking to someone else's website

If the document lives elsewhere — for example a specification on the Pearson
website — put the full web address in `fileUrl` and add `external: true`:

```markdown
fileUrl: https://qualifications.pearson.com/...
fileType: Link
external: true
```

---

## Part 3 — Photographs

Put photographs in `public/images/`. Then refer to them by their path, starting
with `/images/`.

For example, a file saved as `public/images/training-2026.jpg` is written as:

```markdown
cover: /images/training-2026.jpg
```

Please use a reasonably sized photo — under about 1 MB, and around 1200 pixels
wide is plenty. Very large photos make the page slow to load on a phone.

To add photographs to the gallery page, open `src/data/gallery.ts` and copy one
of the existing blocks. Each needs a description (`alt`) so that people using a
screen reader know what the picture shows.

---

## Rules that will save you trouble

1. **Never use tab characters** at the start of a line. Use spaces.
2. **Dates are always `YYYY-MM-DD`.** So 5 March 2026 is `2026-03-05`.
3. **Keep the two `---` lines.** One above the information block, one below it.
4. **If a title contains a colon**, wrap the whole title in double quotes:
   `title: "Training: what we covered"`
5. **File names**: lowercase, hyphens instead of spaces, ending `.md`.
6. **Don't delete a resource file** if the document is simply out of date — add
   the new one and update the old one's description. Old links keep working.

## Gujarati text

You can write Gujarati anywhere in a post and it will display in a proper
Gujarati typeface. If you are writing a whole passage in Gujarati, mention it to
whoever maintains the site so the paragraph can be tagged correctly for screen
readers.

## If something looks wrong

Nothing you do in these two folders can break the website's design. The worst
that happens is a post does not appear, and that is almost always one of:

- a missing `---` line,
- a date in the wrong format,
- or a `type` that is not spelled exactly as listed above.

Check those three first.
