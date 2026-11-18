import { buildLlmsBody, plainTextHeaders } from "@/lib/llms";

// Same body as /llms.txt under the singular filename that was requested.
export async function GET() {
  return new Response(await buildLlmsBody(), { headers: plainTextHeaders });
}
