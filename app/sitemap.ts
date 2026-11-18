import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { getApproach } from "@/lib/sanity/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const approach = await getApproach();
  const lastmod = approach.hero.updatedDate;
  return [
    { url: `${siteUrl}/`, lastModified: lastmod },
    { url: `${siteUrl}/approach/`, lastModified: lastmod },
    { url: `${siteUrl}/privacy/`, lastModified: lastmod },
  ];
}
