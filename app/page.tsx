import { getHome, getSite } from "@/lib/sanity/data";
import { safeJson, siteUrl } from "@/lib/seo";
import { Squiggle } from "@/components/Squiggle";

const proofStyles = [
  { bg: "var(--blush)", shadow: "var(--pink)" },
  { bg: "var(--mint)", shadow: "var(--green)" },
  { bg: "var(--yellow)", shadow: "var(--accent)" },
  { bg: "var(--lavender)", shadow: "var(--violet)" },
];
const dotColors = ["var(--pink)", "var(--mint)", "var(--yellow)", "var(--lavender)"];
const serviceBgs = ["var(--blush)", "var(--mint)", "var(--lavender)", "var(--yellow)"];
const pillBgs = ["var(--blush)", "var(--mint)", "var(--yellow)", "var(--lavender)", "var(--lime)", "var(--peach)", "var(--sky)", "var(--blush)"];

export default async function Home() {
  const [site, home] = await Promise.all([getSite(), getHome()]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#basia`,
        name: "Basia Barbara Nadolna",
        alternateName: ["Basia Nadolna", "Barbara Nadolna", "Basia (Barbara) Nadolna"],
        givenName: "Basia",
        familyName: "Nadolna",
        jobTitle: "Growth Marketer, Paid Media & Automation",
        description: "Brooklyn-based growth marketer specializing in paid media and automation. Has managed more than $3M in working media across eight ad platforms. Creator of the Connect the Dots framework.",
        url: `${siteUrl}/`,
        image: `${siteUrl}/assets/basia-avatar.png`,
        address: { "@type": "PostalAddress", addressLocality: "Brooklyn", addressRegion: "NY", addressCountry: "US" },
        worksFor: { "@id": `${siteUrl}/#jbd` },
        knowsAbout: [
          "Paid media", "Growth marketing", "Marketing automation", "AI in marketing",
          ...home.platforms.map((p) => (p === "Meta" ? "Meta Ads" : p === "Google" ? "Google Ads" : p === "Microsoft" ? "Microsoft Advertising" : p === "TikTok" ? "TikTok Ads" : p === "YouTube" ? "YouTube Ads" : p === "Pinterest" ? "Pinterest Ads" : p)),
          "Connect the Dots framework",
        ],
        sameAs: [site.linkedinUrl, site.instagramUrl],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#jbd`,
        name: site.siteName,
        url: `${siteUrl}/`,
        logo: `${siteUrl}/favicon.svg`,
        image: `${siteUrl}/og.png`,
        description: "Paid media audits and strategy, fractional paid media leadership, and AI workflow and automation setup for DTC brands and B2B teams.",
        founder: { "@id": `${siteUrl}/#basia` },
        email: site.contactEmail,
        areaServed: "US",
        address: { "@type": "PostalAddress", addressLocality: "Brooklyn", addressRegion: "NY", addressCountry: "US" },
        knowsAbout: ["Paid media", "Growth marketing", "Marketing automation"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: site.siteName,
        publisher: { "@id": `${siteUrl}/#jbd` },
        inLanguage: "en-US",
      },
      {
        "@type": "ProfilePage",
        "@id": `${siteUrl}/#page`,
        url: `${siteUrl}/`,
        name: "Basia Barbara Nadolna | Growth Marketer, Paid Media & Automation",
        mainEntity: { "@id": `${siteUrl}/#basia` },
        isPartOf: { "@id": `${siteUrl}/#website` },
        dateModified: "2026-11-16",
      },
      {
        "@type": "FAQPage",
        "@id": `${siteUrl}/#faq`,
        mainEntity: home.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson(jsonLd) }} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="circle hide-sm" style={{ left: -90, top: 150, width: 200, height: 200, background: "var(--lavender)" }}></div>
        <svg className="deco hide-sm" aria-hidden="true" width="150" height="50" viewBox="0 0 150 50" style={{ left: 70, top: 0 }} fill="none" stroke="#BFE3CB" strokeWidth="9" strokeLinecap="round">
          <path d="M8 30 C 28 5, 48 50, 72 26 S 115 5, 140 26" />
        </svg>
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow eyebrow-hero">{home.hero.eyebrow}</span>
            <h1 id="hero-title">
              {home.hero.titlePre}{" "}
              <span className="underline-squiggle">
                {home.hero.titleUnderline}
                <Squiggle width={360} height={18} startY={9} dip={-10} repeats={19} />
              </span>{" "}
              {home.hero.titlePost}
              <span className="dot">.</span>
            </h1>
            <p className="lede">{home.hero.lede}</p>
            <div className="hero-ctas">
              {home.hero.ctas.map((cta, i) => (
                <a key={cta.label} className={`btn ${"style" in cta && cta.style ? `btn-${cta.style}` : i === 0 ? "btn-dark" : "btn-light"}`} href={cta.href}>
                  {cta.label}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-art">
            <div className="circle" style={{ left: "6%", top: "10%", width: "86%", aspectRatio: "1", height: "auto", background: "var(--blush)" }}></div>
            <div className="circle" style={{ right: 0, bottom: "6%", width: "27%", aspectRatio: "1", height: "auto", background: "var(--lime)" }}></div>
            <div className="circle" style={{ left: "2%", top: "4%", width: "14%", aspectRatio: "1", height: "auto", background: "var(--mint)" }}></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="portrait" src="/assets/basia-avatar.webp" width="640" height="640" alt={home.hero.portraitAlt} fetchPriority="high" />
            <div className="sticker stat-a">
              <b>{home.hero.stickerAValue}</b>
              <span>{home.hero.stickerALabel}</span>
            </div>
            <div className="sticker stat-b">{home.hero.stickerB}</div>
          </div>
        </div>
      </section>

      <section className="proof" aria-label="Proof">
        <div className="wrap">
          {home.proof.map((p, i) => (
            <div
              key={p.value}
              className={`proof-card ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}
              style={{ background: proofStyles[i % 4].bg, boxShadow: `6px 6px 0 ${proofStyles[i % 4].shadow}` }}
            >
              <b>{p.value}</b>
              <span>{p.text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="framework-title">
        <div className="circle hide-sm" style={{ right: -80, top: 60, width: 220, height: 220, background: "var(--lime)" }}></div>
        <div className="wrap">
          <div className="framework-head">
            <div className="section-head">
              <span className="eyebrow" style={{ background: "var(--mint)" }}>{home.framework.eyebrow}</span>
              <h2 id="framework-title" className="h2">
                {home.framework.title}
                <span className="dot">.</span>
              </h2>
              <p className="section-lede">{home.framework.lede}</p>
            </div>
            <a className="btn btn-light" href={home.framework.ctaHref} style={{ flexShrink: 0, fontSize: 16, padding: "14px 24px" }}>
              {home.framework.ctaLabel}
            </a>
          </div>
          <div className="dots">
            <ol className="dots-row" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {home.dots.map((d, i) => (
                <li className="dot-item" key={d.num}>
                  <div className="dot-num" style={{ background: dotColors[i % 4] }} aria-hidden="true">
                    {d.num}
                  </div>
                  <div>
                    <h3>{d.title}</h3>
                    <p>{d.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="services" className="section band-white" aria-labelledby="services-title">
        <div className="circle hide-sm" style={{ left: -60, bottom: -60, width: 180, height: 180, background: "var(--peach)" }}></div>
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow" style={{ background: "var(--yellow)" }}>{home.servicesHead.eyebrow}</span>
            <h2 id="services-title" className="h2">
              {home.servicesHead.title}
              <span className="dot">.</span>
            </h2>
          </div>
          <div className="cards-2">
            {home.services.map((s, i) => (
              <article className="card" style={{ background: serviceBgs[i % 4] }} key={s.title}>
                {"badge" in s && s.badge ? <span className="badge">{s.badge}</span> : null}
                <h3>{s.title}</h3>
                <p>
                  {s.description}{" "}
                  {"waitlistLabel" in s && s.waitlistLabel ? (
                    <>
                      <a className="inline" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent("waitlistSubject" in s && s.waitlistSubject ? s.waitlistSubject : "")}`}>
                        {s.waitlistLabel}
                      </a>{" "}
                      {"waitlistSuffix" in s ? s.waitlistSuffix : ""}
                    </>
                  ) : null}
                </p>
                {s.tags && s.tags.length ? (
                  <div className="chips">
                    {s.tags.map((t) => (
                      <span className="chip" key={t}>{t}</span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="platforms" aria-labelledby="platforms-title">
        <div className="wrap">
          <h2 id="platforms-title">{home.platformsTitle}</h2>
          <ul className="pills">
            {home.platforms.map((p, i) => (
              <li key={p} style={{ background: pillBgs[i % pillBgs.length] }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="faq" className="section band-lavender faq" aria-labelledby="faq-title">
        <div className="wrap">
          <div className="faq-side">
            <span className="eyebrow" style={{ background: "#fff" }}>{home.faqHead.eyebrow}</span>
            <h2 id="faq-title" className="h2">
              {home.faqHead.title}
              <span className="dot">.</span>
            </h2>
            <p className="section-lede">{home.faqHead.lede}</p>
          </div>
          <div className="faq-list">
            {home.faqs.map((f) => (
              <div className="qa" key={f.question}>
                <h3>{f.question}</h3>
                <p>
                  {f.answer}{" "}
                  {"linkLabel" in f && f.linkLabel ? (
                    <>
                      <a href={"linkHref" in f && f.linkHref ? f.linkHref : "#"}>{f.linkLabel}</a>.
                    </>
                  ) : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="notes" className="section band-line notes" aria-labelledby="notes-title">
        <div className="wrap">
          <div className="notes-copy">
            <span className="eyebrow" style={{ background: "var(--lime)" }}>{home.notes.eyebrow}</span>
            <h2 id="notes-title" className="h2">
              {home.notes.titlePre} <em>{home.notes.titleEm}</em>
              <span className="dot">.</span>
            </h2>
            <p className="section-lede">{home.notes.lede}</p>
          </div>
          <div className="notes-card">
            <h3>{home.notes.cardTitle}</h3>
            <p>{home.notes.cardBody}</p>
            <a className="btn btn-dark" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(home.notes.ctaSubject)}`}>
              {home.notes.ctaLabel}
            </a>
            <p className="small">{home.notes.cardNote}</p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact" aria-labelledby="contact-title">
        <div className="circle" style={{ right: -60, top: -60, width: 200, height: 200, background: "var(--mint)" }}></div>
        <div className="wrap">
          <h2 id="contact-title">
            {home.contact.title}
            <span style={{ color: "var(--yellow)" }}>.</span>
          </h2>
          <p>{home.contact.body}</p>
          <div className="ctas">
            <a className="btn btn-cream" href={`mailto:${site.contactEmail}`}>
              {site.contactEmail}
            </a>
            <a className="btn btn-yellow" href={site.linkedinUrl} rel="me">
              {home.contact.linkedinLabel}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
