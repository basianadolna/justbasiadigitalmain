import { getSite } from "@/lib/sanity/data";
import { siteUrl } from "@/lib/seo";

export async function buildLlmsBody(): Promise<string> {
  const site = await getSite();
  return `# ${site.siteName}

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
}

export const plainTextHeaders = { "Content-Type": "text/plain; charset=utf-8" } as const;
