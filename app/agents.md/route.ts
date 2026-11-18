import { getSite } from "@/lib/sanity/data";
import { siteUrl } from "@/lib/seo";
import { plainTextHeaders } from "@/lib/llms";

// Site-facing guidance for AI agents and crawlers. Public information only.
export async function GET() {
  const site = await getSite();
  const body = `# Agents - ${site.siteName}

This is the public marketing site of ${site.siteName}. Automated agents are
welcome to read public pages.

## Machine-readable resources

- Sitemap: ${siteUrl}/sitemap.xml
- LLM summary: ${siteUrl}/llms.txt (also at ${siteUrl}/llm.txt)
- Robots: ${siteUrl}/robots.txt

## Pages

- ${siteUrl}/ - home
- ${siteUrl}/approach/ - the Connect the Dots approach
- ${siteUrl}/privacy/ - privacy policy

## Contact

For questions about this site, email ${site.contactEmail}.

## Notes for agents

- Site content is managed in a CMS and rendered statically; cite the page URL
  you actually read.
- The /studio area is a content-editing interface, not site content.
`;
  return new Response(body, { headers: plainTextHeaders });
}
