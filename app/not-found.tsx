import type { Metadata } from "next";
import Link from "next/link";
import { getSite } from "@/lib/sanity/data";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return { title: site.notFound.seoTitle, description: site.notFound.seoDescription, robots: { index: false, follow: false } };
}

export default async function NotFound() {
  const site = await getSite();
  return (
    <main id="main" className="page">
      <div className="wrap">
        <h1>
          {site.notFound.title}
          <span className="dot">.</span>
        </h1>
        <p>
          {site.notFound.bodyPre} <Link href="/">{site.notFound.homeLinkLabel}</Link> {site.notFound.bodyMid}{" "}
          <Link href="/approach/">{site.notFound.frameworkLinkLabel}</Link>.
        </p>
      </div>
    </main>
  );
}
