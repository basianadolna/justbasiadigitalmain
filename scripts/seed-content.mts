/**
 * Seeds the Sanity dataset with the full verified site content.
 * Idempotent: uses fixed document IDs with createOrReplace.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=... NEXT_PUBLIC_SANITY_PROJECT_ID=... npx tsx scripts/seed-content.mts
 */
import { createClient } from "@sanity/client";
import { defaultContent } from "../lib/content";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-11-17",
  useCdn: false,
  token,
});

const keyed = <T extends object>(arr: readonly T[]) =>
  arr.map((item, i) => ({ ...item, _key: `k${i}` }));

const c = defaultContent;
const s = c.site;
const h = c.home;
const a = c.approach;
const p = c.privacy;

const docs: Record<string, unknown>[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: s.siteName,
    logoText: s.logoText,
    logoAriaLabel: s.logoAriaLabel,
    skipLinkText: s.skipLinkText,
    menuButtonLabel: s.menuButtonLabel,
    nav: keyed(s.nav),
    navCtaLabel: s.navCta.label,
    navCtaHref: s.navCta.href,
    contactEmail: s.contactEmail,
    linkedinUrl: s.linkedinUrl,
    instagramUrl: s.instagramUrl,
    footerBrandLine: s.footerBrandLine,
    footerPainterPrefix: s.footerPainterPrefix,
    footerPainterHandle: s.footerPainterHandle,
    footerNav: keyed(s.footerNav),
    copyright: s.copyright,
    gtmContainerId: "",
    gtmEnabled: false,
    llmsSummary: s.llmsSummary,
    llmsKnownAs: s.llmsKnownAs,
    llmsHomeDesc: s.llmsHomeDesc,
    llmsApproachDesc: s.llmsApproachDesc,
    llmsServices: s.llmsServices,
    seoTitle: s.seo.title,
    seoDescription: s.seo.description,
    seoOgTitle: s.seo.ogTitle,
    seoOgDescription: s.seo.ogDescription,
    seoOgImageAlt: s.seo.ogImageAlt,
    notFoundSeoTitle: s.notFound.seoTitle,
    notFoundSeoDescription: s.notFound.seoDescription,
    notFoundTitle: s.notFound.title,
    notFoundBodyPre: s.notFound.bodyPre,
    notFoundHomeLinkLabel: s.notFound.homeLinkLabel,
    notFoundBodyMid: s.notFound.bodyMid,
    notFoundFrameworkLinkLabel: s.notFound.frameworkLinkLabel,
  },
  {
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: h.hero.eyebrow,
    heroTitlePre: h.hero.titlePre,
    heroTitleUnderline: h.hero.titleUnderline,
    heroTitlePost: h.hero.titlePost,
    heroLede: h.hero.lede,
    heroCtas: keyed(h.hero.ctas),
    portraitAlt: h.hero.portraitAlt,
    stickerAValue: h.hero.stickerAValue,
    stickerALabel: h.hero.stickerALabel,
    stickerB: h.hero.stickerB,
    frameworkEyebrow: h.framework.eyebrow,
    frameworkTitle: h.framework.title,
    frameworkLede: h.framework.lede,
    frameworkCtaLabel: h.framework.ctaLabel,
    servicesEyebrow: h.servicesHead.eyebrow,
    servicesTitle: h.servicesHead.title,
    platformsTitle: h.platformsTitle,
    faqEyebrow: h.faqHead.eyebrow,
    faqTitle: h.faqHead.title,
    faqLede: h.faqHead.lede,
    notesEyebrow: h.notes.eyebrow,
    notesTitlePre: h.notes.titlePre,
    notesTitleEm: h.notes.titleEm,
    notesLede: h.notes.lede,
    notesCardTitle: h.notes.cardTitle,
    notesCardBody: h.notes.cardBody,
    notesCtaLabel: h.notes.ctaLabel,
    notesCtaSubject: h.notes.ctaSubject,
    notesCardNote: h.notes.cardNote,
    contactTitle: h.contact.title,
    contactBody: h.contact.body,
    linkedinLabel: h.contact.linkedinLabel,
  },
  {
    _id: "approachPage",
    _type: "approachPage",
    seoTitle: a.seo.title,
    seoDescription: a.seo.description,
    seoOgTitle: a.seo.ogTitle,
    seoOgDescription: a.seo.ogDescription,
    heroEyebrow: a.hero.eyebrow,
    titleLine1: a.hero.titleLine1,
    titleLine2Pre: a.hero.titleLine2Pre,
    titleUnderline: a.hero.titleUnderline,
    heroLede: a.hero.lede,
    byline: a.hero.byline,
    updatedLabel: a.hero.updatedLabel,
    updatedDate: a.hero.updatedDate,
    updatedDisplay: a.hero.updatedDisplay,
    stepsLabel: a.stepsLabel,
    truthsTitle: a.truths.title,
    contactTitle: a.contact.title,
    contactBody: a.contact.body,
    emailSubject: a.contact.emailSubject,
  },
  {
    _id: "privacyPage",
    _type: "privacyPage",
    seoTitle: p.seo.title,
    seoDescription: p.seo.description,
    title: p.title,
    updatedLabel: p.updatedLabel,
    updatedDate: p.updatedDate,
    updatedDisplay: p.updatedDisplay,
    blocks: keyed(p.blocks),
  },
  ...h.services.map((svc, i) => ({
    _id: `service-${i + 1}`,
    _type: "service",
    title: svc.title,
    description: svc.description,
    tags: [...svc.tags],
    badge: svc.badge,
    ...("waitlistLabel" in svc
      ? {
          waitlistLabel: svc.waitlistLabel,
          waitlistSuffix: svc.waitlistSuffix,
          waitlistSubject: svc.waitlistSubject,
        }
      : {}),
    sortOrder: i + 1,
  })),
  ...h.dots.map((dot, i) => ({
    _id: `frameworkStep-${i + 1}`,
    _type: "frameworkStep",
    num: dot.num,
    title: dot.title,
    text: dot.text,
    body: a.steps[i].body,
    asksTitle: a.steps[i].asksTitle,
    asksBody: a.steps[i].asksBody,
    sortOrder: i + 1,
  })),
  ...h.proof.map((stat, i) => ({
    _id: `proofStat-${i + 1}`,
    _type: "proofStat",
    value: stat.value,
    text: stat.text,
    sortOrder: i + 1,
  })),
  ...h.platforms.map((name, i) => ({
    _id: `platform-${i + 1}`,
    _type: "platform",
    name,
    sortOrder: i + 1,
  })),
  ...h.faqs.map((f, i) => ({
    _id: `faq-${i + 1}`,
    _type: "faq",
    question: f.question,
    answer: f.answer,
    ...("linkLabel" in f ? { linkLabel: f.linkLabel, linkHref: f.linkHref } : {}),
    sortOrder: i + 1,
  })),
  ...a.truths.items.map((t, i) => ({
    _id: `truth-${i + 1}`,
    _type: "truth",
    title: t.title,
    body: t.body,
    sortOrder: i + 1,
  })),
];

console.log(`Seeding ${docs.length} documents into ${projectId}/${dataset}...`);
for (const doc of docs) {
  await client.createOrReplace(doc as never);
  console.log(`  ${doc._id}`);
}
console.log("Done.");
