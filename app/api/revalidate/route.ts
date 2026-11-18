import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidatePath, revalidateTag } from "next/cache";

const KNOWN_TYPES = [
  "siteSettings",
  "homePage",
  "approachPage",
  "privacyPage",
  "service",
  "frameworkStep",
  "proofStat",
  "platform",
  "faq",
  "truth",
];

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret);
    if (!isValidSignature) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    if (!body?._type || !KNOWN_TYPES.includes(body._type))
      return NextResponse.json({ error: "Unknown document type" }, { status: 400 });
    revalidateTag("jbd-content", { expire: 0 });
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}
