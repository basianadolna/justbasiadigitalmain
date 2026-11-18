import type { Metadata, Viewport } from "next";
import { getSite } from "./sanity/data";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.justbasiadigital.com";

export const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const viewport: Viewport = {
  themeColor: "#FAF5EE",
  width: "device-width",
  initialScale: 1,
};

export async function rootMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(siteUrl),
    title: site.seo.title,
    description: site.seo.description,
    applicationName: site.siteName,
    authors: [{ name: "Basia Barbara Nadolna" }],
    alternates: { canonical: "/" },
    robots: allowIndexing
      ? { index: true, follow: true, "max-image-preview": "large" }
      : { index: false, follow: false },
    openGraph: {
      type: "profile",
      siteName: site.siteName,
      url: "/",
      title: site.seo.ogTitle,
      description: site.seo.ogDescription,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.seo.ogImageAlt }],
      firstName: "Basia",
      lastName: "Nadolna",
    },
    twitter: {
      card: "summary_large_image",
      title: site.seo.ogTitle,
      description: site.seo.ogDescription,
      images: ["/og.png"],
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      apple: "/assets/basia-avatar.png",
    },
  };
}

export function subpageMetadata(opts: {
  path: string;
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImageAlt?: string;
}): Metadata {
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: allowIndexing
      ? { index: true, follow: true, "max-image-preview": "large" }
      : { index: false, follow: false },
    openGraph: {
      siteName: "Just Basia Digital",
      url: opts.path,
      title: opts.ogTitle ?? opts.title,
      description: opts.ogDescription ?? opts.description,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: opts.ogImageAlt ?? "" }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.ogTitle ?? opts.title,
      description: opts.ogDescription ?? opts.description,
      images: ["/og.png"],
    },
  };
}

export function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
