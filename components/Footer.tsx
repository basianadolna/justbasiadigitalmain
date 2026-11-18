import Link from "next/link";
import type { SiteContent } from "@/lib/content";

export default function Footer({ site }: { site: SiteContent["site"] }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-brand">
          <Link className="logo" href="/">
            {site.logoText}
            <span className="dot">.</span>
          </Link>
          <svg width="140" height="14" viewBox="0 0 140 14" fill="none" stroke="#F062A8" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
            <path d="M2 7 q 7 -8 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0 t 14 0" />
          </svg>
          <div>{site.footerBrandLine}</div>
          <div>
            {site.footerPainterPrefix}{" "}
            <a className="cream" href={site.instagramUrl} rel="me">
              {site.footerPainterHandle}
            </a>
          </div>
        </div>
        <nav className="foot-nav" aria-label="Footer">
          {site.footerNav.map((item) =>
            item.href.startsWith("http") ? (
              <a key={item.label} href={item.href} rel="me">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            )
          )}
          <span>{site.copyright}</span>
        </nav>
      </div>
    </footer>
  );
}
