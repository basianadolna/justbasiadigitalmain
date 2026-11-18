import { getSite } from "@/lib/sanity/data";
import { siteUrl } from "@/lib/seo";

export async function GET() {
  const site = await getSite();
  const body = `# ${site.siteName}

> ${site.llmsSummary}

${site.llmsKnownAs}

## Key pages

- [Home](${siteUrl}/): ${site.llmsHomeDesc}
- [Connect the Dots](${siteUrl}/approach/): ${site.llmsApproachDesc}

## Services

${site.llmsServices.map((s) => `- ${s}`).join("\n")}

## Contact

- Email: ${site.contactEmail}
- LinkedIn: ${site.linkedinUrl}
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
