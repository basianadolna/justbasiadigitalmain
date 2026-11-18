import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gtm from "@/components/Gtm";
import PreviewBanner from "@/components/PreviewBanner";
import DeferredFonts from "@/components/DeferredFonts";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { getSite } from "@/lib/sanity/data";
import { rootMetadata, viewport } from "@/lib/seo";

export const revalidate = 3600;

export const generateMetadata = rootMetadata;
export { viewport };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const isPreview = (await draftMode()).isEnabled;
  const site = await getSite();
  return (
    <html lang="en">
      {/* Preload the two variable font files so they arrive before first
          paint: no swap reflow (CLS) and no CSS->font chain hop (LCP) */}
      <link rel="preload" href="/assets/fonts/dm-sans-400-800-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href="/assets/fonts/playfair-800-900-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <body>
        {/* No tracking in draft preview: preview pageviews must not reach analytics */}
        {!isPreview && site.gtmEnabled ? <Gtm containerId={site.gtmContainerId} /> : null}
        <a className="skip" href="#main">
          {site.skipLinkText}
        </a>
        <Header site={site} />
        {children}
        <Footer site={site} />
        <DeferredFonts />
        {isPreview ? (
          <>
            <VisualEditing />
            <PreviewBanner />
          </>
        ) : null}
      </body>
    </html>
  );
}
