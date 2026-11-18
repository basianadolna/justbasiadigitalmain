import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "d6drq683";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = "2026-11-17";

export const sanityConfigured = Boolean(projectId);

const shared = { projectId, dataset, apiVersion } as const;

// Public, published-content client. Safe for the browser bundle (no token).
export const sanityClient = projectId
  ? createClient({ ...shared, useCdn: true, perspective: "published" })
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
