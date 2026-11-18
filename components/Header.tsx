"use client";

import { useState } from "react";
import Link from "next/link";
import type { SiteContent } from "@/lib/content";

export default function Header({ site }: { site: SiteContent["site"] }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="logo" href="/" aria-label={site.logoAriaLabel}>
          {site.logoText}
          <span className="dot">.</span>
        </Link>
        <button
          className="menu-btn"
          type="button"
          aria-label={open ? "Close menu" : site.menuButtonLabel}
          aria-expanded={open}
          aria-controls="nav"
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D2D2D" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <nav id="nav" className={open ? "nav open" : "nav"} aria-label="Primary" onClick={(e) => {
          if ((e.target as HTMLElement).tagName === "A") setOpen(false);
        }}>
          {site.nav.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link className="btn btn-sm btn-magenta" href={site.navCta.href}>
            {site.navCta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
