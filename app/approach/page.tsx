import type { Metadata } from "next";
import { getApproach, getSite } from "@/lib/sanity/data";
import { subpageMetadata } from "@/lib/seo";
import { Squiggle } from "@/components/Squiggle";

const stepColors = [
  { num: "var(--pink)", shadow: "var(--pink)", asks: "var(--blush)" },
  { num: "var(--mint)", shadow: "var(--green)", asks: "var(--mint)" },
  { num: "var(--yellow)", shadow: "var(--accent)", asks: "var(--yellow)" },
  { num: "var(--lavender)", shadow: "var(--violet)", asks: "var(--lavender)" },
];
const truthStyles = [
  { bg: "var(--blush)", shadow: "var(--pink)" },
  { bg: "var(--mint)", shadow: "var(--green)" },
  { bg: "var(--yellow)", shadow: "var(--accent)" },
];

export async function generateMetadata(): Promise<Metadata> {
  const approach = await getApproach();
  const site = await getSite();
  return subpageMetadata({
    path: "/approach/",
    title: approach.seo.title,
    description: approach.seo.description,
    ogTitle: approach.seo.ogTitle,
    ogDescription: approach.seo.ogDescription,
    ogImageAlt: site.seo.ogImageAlt,
  });
}

export default async function Approach() {
  const [site, approach] = await Promise.all([getSite(), getApproach()]);
  return (
    <main id="main">
      <section className="approach-hero" aria-labelledby="page-title">
        <div className="circle hide-sm" style={{ right: 80, top: 30, width: 360, height: 360, background: "var(--blush)" }}></div>
        <div className="circle hide-sm" style={{ right: 360, top: 280, width: 110, height: 110, background: "var(--lime)" }}></div>
        <div className="wrap">
          <div className="inner">
            <span className="eyebrow eyebrow-hero">{approach.hero.eyebrow}</span>
            <h1 id="page-title">
              {approach.hero.titleLine1}
              <br />
              {approach.hero.titleLine2Pre}{" "}
              <span className="underline-squiggle">
                {approach.hero.titleUnderline}
                <Squiggle width={280} height={20} startY={10} dip={-11} repeats={15} />
              </span>
              <span className="dot">.</span>
            </h1>
            <p className="lede">{approach.hero.lede}</p>
            <p className="updated">
              {approach.hero.byline} · {approach.hero.updatedLabel}{" "}
              <time dateTime={approach.hero.updatedDate}>{approach.hero.updatedDisplay}</time>
            </p>
          </div>
        </div>
      </section>

      <section className="steps" aria-label={approach.stepsLabel}>
        <div className="wrap">
          {approach.steps.map((s, i) => (
            <article className="step" key={s.num}>
              <div className="step-num" style={{ background: stepColors[i % 4].num }} aria-hidden="true">
                {s.num}
              </div>
              <div className="step-card" style={{ boxShadow: `7px 7px 0 ${stepColors[i % 4].shadow}` }}>
                <h2>{s.title}</h2>
                <p>{s.body || ("text" in s ? String((s as { text?: string }).text ?? "") : "")}</p>
                <div className="asks" style={{ background: stepColors[i % 4].asks }}>
                  <h3>{s.asksTitle}</h3>
                  <p>{s.asksBody}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="truths" aria-labelledby="truths-title">
        <div className="wrap">
          <h2 id="truths-title" className="h2" style={{ color: "var(--cream)" }}>
            {approach.truths.title}
            <span className="dot">.</span>
          </h2>
          <div className="grid">
            {approach.truths.items.map((t, i) => (
              <div
                className={`truth ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}
                style={{ background: truthStyles[i % 3].bg, boxShadow: `6px 6px 0 ${truthStyles[i % 3].shadow}` }}
                key={t.title}
              >
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="contact" aria-labelledby="contact-title">
        <div className="circle" style={{ right: -50, bottom: -50, width: 200, height: 200, background: "var(--blush)" }}></div>
        <div className="wrap">
          <h2 id="contact-title">
            {approach.contact.title}
            <span style={{ color: "var(--yellow)" }}>?</span>
          </h2>
          <p>{approach.contact.body}</p>
          <div className="ctas">
            <a className="btn btn-cream" href={`mailto:${site.contactEmail}?subject=${encodeURIComponent(approach.contact.emailSubject)}`}>
              {site.contactEmail}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
