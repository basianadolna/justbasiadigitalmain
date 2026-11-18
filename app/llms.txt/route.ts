import { buildLlmsBody, plainTextHeaders } from "@/lib/llms";

export async function GET() {
  return new Response(await buildLlmsBody(), { headers: plainTextHeaders });
}
