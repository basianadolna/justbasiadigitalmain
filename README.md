# Just Basia Digital

Marketing site for Just Basia Digital, rebuilt as Next.js + Sanity. Every piece of
content is managed in Sanity; the site falls back to bundled copy
(`lib/content.ts`, generated from the approved static site) if Sanity is
unreachable.

## Stack

- Next.js 16 (App Router, static export-friendly, `trailingSlash: true`)
- React 19, TypeScript, styled-components 6
- Sanity (Content Lake) - project `d6drq683` ("Just Basia Digital", SMjr org), dataset `production`
- Embedded Studio at `/studio`
- Playwright + axe for QA (`.github/workflows/qa.yml`)

## Local development

```bash
npm install
cp .env.local.example .env.local   # fill in project id / dataset
npm run dev                        # http://localhost:3000, Studio at /studio
```

### Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project id (`d6drq683`) |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (`production`) |
| `SANITY_WRITE_TOKEN` | Only for `npm run seed` (kept out of the client bundle) |
| `SANITY_REVALIDATE_SECRET` | Shared secret for the on-demand revalidation webhook |
| `SANITY_API_READ_TOKEN` | Server-only Viewer token for draft preview (Presentation / Draft Mode) |
| `SANITY_STUDIO_URL` | Studio URL visual-editing overlays link back to |

The real project id and dataset are the defaults, so the site and Studio work without env vars; the env vars override them. The site falls back to bundled copy only if the Sanity API is unreachable.

### Draft preview (see edits before publishing)

The Studio includes the Presentation tool (top of the Studio sidebar). It
shows the site next to the editor and loads unpublished (draft) content
through Next.js Draft Mode:

1. Sign in to `/studio` and open **Presentation**.
2. Edit any document - the preview updates with draft content before you
   publish. Click an element in the preview to jump to its field.
3. Publishing updates the live site (on-demand revalidation via
   `/api/revalidate`).

Draft reads use the server-only `SANITY_API_READ_TOKEN` (Viewer role) and are
never cached or exposed to anonymous visitors: visitors always get published
content only. To preview outside the Studio, open
`/api/draft-mode/enable` with a valid preview secret; the "Previewing
unpublished changes" bar links to `/api/draft-mode/disable` to exit.

### Google Tag Manager

GTM is managed in Sanity under Site settings: `gtmEnabled` (default off) and
`gtmContainerId` (`GTM-XXXXXXX`, validated). The container loads on every page
only when enabled AND the ID is set; while off or empty the site ships no
tracking code at all.

## Scripts

- `npm run dev` / `npm run build` / `npm start` - Next.js
- `npm run lint`, `npm run typecheck` - static checks
- `npm test` - Playwright e2e + visual + accessibility (WCAG 2.2 AA)
- `npm run seed` - seed all site content into Sanity (idempotent, fixed document ids)

## Content model

Sanity schemas in `sanity/schemas/`: singletons `siteSettings`, `homePage`,
`approachPage`, `privacyPage`; collections `service`, `frameworkStep`,
`proofStat`, `platform`, `faq`, `truth`. Editing in Studio and publishing
updates the site (on-demand revalidation via `/api/revalidate`).

## Branches and deployment

- `main` - the original static site (GitHub Pages, CNAME justbasiadigital.com). Do not commit the rebuild here.
- `development` - this Next.js + Sanity rebuild.

Production deploy: Vercel (pending). After deploy, add the deploy origin to
Sanity CORS origins and point the revalidation webhook at
`/api/revalidate?secret=...`.
