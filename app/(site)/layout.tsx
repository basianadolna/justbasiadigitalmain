import "@/app/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Gtm from "@/components/Gtm";
import { getSite } from "@/lib/sanity/data";
import { rootMetadata, viewport } from "@/lib/seo";

export const revalidate = 3600;

export const generateMetadata = rootMetadata;
export { viewport };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSite();
  return (
    <html lang="en">
      <body>
        {site.gtmEnabled ? <Gtm containerId={site.gtmContainerId} /> : null}
        <a className="skip" href="#main">
          {site.skipLinkText}
        </a>
        <Header site={site} />
        {children}
        <Footer site={site} />
      </body>
    </html>
  );
}
