import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "d6drq683";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-11-17";

export const sanityConfigured = Boolean(projectId);

const shared = { projectId, dataset, apiVersion } as const;

// Public, published-content client, used server-side only (see data.ts).
// useCdn is false on purpose: Next.js already caches these fetches by tag
// ("jbd-content") and the webhook revalidates that tag on publish. Reading
// through Sanity's CDN on top would serve stale documents to the re-render
// that the webhook just triggered (observed: GTM toggle invisible until a
// second mutation re-fired revalidation).
export const sanityClient = projectId
  ? createClient({ ...shared, useCdn: false, perspective: "published" })
  : null;

// Server-only client for draft preview reads.
// SANITY_API_READ_TOKEN must never be exposed to the browser.
export function getPreviewClient() {
  if (!projectId) return null;
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) return null;
  return createClient({
    ...shared,
    useCdn: false,
    token,
    perspective: "drafts",
    stega: {
      enabled: true,
      studioUrl:
        process.env.SANITY_STUDIO_URL ||
        "https://justbasiadigitalmain.vercel.app/studio",
    },
  });
}

// Server-only client used by the draft-mode enable route to validate the
// preview URL secret Sanity's Presentation tool appends.
export function getSecretValidationClient() {
  if (!projectId) return null;
  const token = process.env.SANITY_API_READ_TOKEN;
  if (!token) return null;
  return createClient({ ...shared, useCdn: false, token });
}
