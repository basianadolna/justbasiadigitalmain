import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getSecretValidationClient } from "@/lib/sanity/client";

// Sanity Presentation tool opens this URL with a signed secret to turn on
// Draft Mode, so the site renders unpublished (draft) content for this
// session only. Anonymous visitors keep seeing published content.
export async function GET(request: Request) {
  const client = getSecretValidationClient();
  if (!client) {
    return new Response("Preview is not configured", { status: 503 });
  }
  const { isValid, redirectTo = "/" } = await validatePreviewUrl(client, request.url);
  if (!isValid) {
    return new Response("Invalid preview secret", { status: 401 });
  }
  (await draftMode()).enable();
  redirect(redirectTo);
}
