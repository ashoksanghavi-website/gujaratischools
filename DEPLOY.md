# Deploying the CGS website

The site is split in two, so it stays fast and within free limits:

| What | Where | Why |
|---|---|---|
| **App** — code, pages, text, images (~90 MB) | **GitHub → Vercel** | Small, fast builds and deploys |
| **Document library** — PDFs, audio, video (~810 MB, 555 files) | **Cloudflare R2** (free) | Too big for git/Vercel (GitHub rejects files > 100 MB; one audio file is 180 MB). R2's free tier is 10 GB with no download fees. |

In local development you do **not** need R2 — documents are served straight from
`public/documents`. R2 is only for the live site.

---

## One-time setup

### 1. Create the R2 bucket
1. Sign in to Cloudflare → **R2** → **Create bucket**, name it e.g. `gujaratischools-docs`.
2. In the bucket, open **Settings → Public access** and either:
   - enable the **r2.dev public URL** (quickest — gives a URL like
     `https://pub-xxxxxxxx.r2.dev`), or
   - connect a **custom domain**, e.g. `docs.gujaratischools.org` (tidier).
3. Create an **R2 API token** (Account → R2 → *Manage API Tokens*) with
   *Object Read & Write*. Note the **Access Key ID**, **Secret Access Key**, and
   your **Account ID**.

### 2. Upload the documents
The bucket must hold the files under a `documents/` prefix (so a file at
`public/documents/2026/x.pdf` becomes `documents/2026/x.pdf` in the bucket).

**Using rclone** (recommended — https://rclone.org):
```bash
# configure once:
rclone config create r2 s3 \
  provider Cloudflare \
  access_key_id YOUR_ACCESS_KEY \
  secret_access_key YOUR_SECRET \
  endpoint https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com

# upload (run from the project root):
rclone copy ./public/documents r2:gujaratischools-docs/documents --progress
```

**Or using the AWS CLI:**
```bash
aws s3 sync ./public/documents s3://gujaratischools-docs/documents \
  --endpoint-url https://YOUR_ACCOUNT_ID.r2.cloudflarestorage.com
```

Re-run the same command any time you add documents — it only uploads new/changed files.

### 3. Point the site at R2
In **Vercel → Project → Settings → Environment Variables**, add:

```
VITE_DOCS_BASE = https://pub-xxxxxxxx.r2.dev      # your bucket's public URL
```
(no trailing slash). Set it for **Production** (and Preview if you want).

---

## Going live

1. Commit and push the code (documents are git-ignored and will not be pushed):
   ```bash
   git add -A
   git commit -m "CGS website update"
   git push origin main
   ```
2. Vercel auto-builds and deploys. Because `VITE_DOCS_BASE` is set, every
   document link points at R2.
3. Check a few downloads on the deployed URL, then point **gujaratischools.org**
   at the Vercel project (Vercel → Settings → Domains).

---

## Adding documents later
1. Drop the file into `public/documents/...` and add its `content/resources/*.md`
   (see `content/README.md`).
2. Re-run the rclone/aws upload command (step 2) to push the new file to R2.
3. Commit the new `.md` and push.

## Notes
- No single document may exceed R2 limits (none here do). Vercel/GitHub size
  limits no longer apply because the files never enter git.
- To host documents in git instead (not recommended), remove `/public/documents/`
  from `.gitignore` — but first delete the one 180 MB `.wav` (GitHub rejects it).
