import { sanityClient } from "./client";
import {
  defaultContent,
  type SiteContent,
  type LinkItem,
  type ServiceItem,
  type FaqItem,
  type StepItem,
  type ProofStat,
  type TruthItem,
  type PlatformItem,
} from "../content";

async function sanityFetch<T>(query: string): Promise<T | null> {
  if (!sanityClient) return null;
  try {
    const result = await sanityClient.fetch<T>(query, {}, { next: { tags: ["jbd-content"] } });
    return result ?? null;
  } catch {
    return null;
  }
}

type Doc = Record<string, unknown> | null;
const str = (doc: Doc, key: string, fallback: string): string =>
  (doc?.[key] as string | undefined) ?? fallback;

const links = (doc: Doc, key: string, fallback: LinkItem[]): LinkItem[] => {
  const v = doc?.[key] as LinkItem[] | undefined;
  return v && v.length ? v : fallback;
};

async function typed<T>(type: string, fallback: T[]): Promise<T[]> {
  const docs = await sanityFetch<T[]>(`*[_type=="${type}"]|order(sortOrder asc)`);
  return docs && docs.length ? docs : fallback;
}

export async function getSite(): Promise<SiteContent["site"]> {
  const d = defaultContent.site;
  const doc = await sanityFetch<Doc>(`*[_id=="siteSettings"][0]`);
  const llmsServices = doc?.llmsServices as string[] | undefined;
  return {
    siteName: str(doc, "siteName", d.siteName),
    logoText: str(doc, "logoText", d.logoText),
    logoAriaLabel: str(doc, "logoAriaLabel", d.logoAriaLabel),
    skipLinkText: str(doc, "skipLinkText", d.skipLinkText),
    menuButtonLabel: str(doc, "menuButtonLabel", d.menuButtonLabel),
    nav: links(doc, "nav", d.nav),
    navCta: {
      label: str(doc, "navCtaLabel", d.navCta.label),
      href: str(doc, "navCtaHref", d.navCta.href),
    },
    contactEmail: str(doc, "contactEmail", d.contactEmail),
    linkedinUrl: str(doc, "linkedinUrl", d.linkedinUrl),
    instagramUrl: str(doc, "instagramUrl", d.instagramUrl),
    footerBrandLine: str(doc, "footerBrandLine", d.footerBrandLine),
    footerPainterPrefix: str(doc, "footerPainterPrefix", d.footerPainterPrefix),
    footerPainterHandle: str(doc, "footerPainterHandle", d.footerPainterHandle),
    footerNav: links(doc, "footerNav", d.footerNav),
    copyright: str(doc, "copyright", d.copyright),
    gtmContainerId: str(doc, "gtmContainerId", d.gtmContainerId),
    gtmEnabled: typeof doc?.gtmEnabled === "boolean" ? doc.gtmEnabled : d.gtmEnabled,
    llmsSummary: str(doc, "llmsSummary", d.llmsSummary),
    llmsKnownAs: str(doc, "llmsKnownAs", d.llmsKnownAs),
    llmsHomeDesc: str(doc, "llmsHomeDesc", d.llmsHomeDesc),
    llmsApproachDesc: str(doc, "llmsApproachDesc", d.llmsApproachDesc),
    llmsServices: llmsServices && llmsServices.length ? llmsServices : d.llmsServices,
    seo: {
      title: str(doc, "seoTitle", d.seo.title),
      description: str(doc, "seoDescription", d.seo.description),
      ogTitle: str(doc, "seoOgTitle", d.seo.ogTitle),
      ogDescription: str(doc, "seoOgDescription", d.seo.ogDescription),
      ogImageAlt: str(doc, "seoOgImageAlt", d.seo.ogImageAlt),
    },
    notFound: {
      seoTitle: str(doc, "notFoundSeoTitle", d.notFound.seoTitle),
      seoDescription: str(doc, "notFoundSeoDescription", d.notFound.seoDescription),
      title: str(doc, "notFoundTitle", d.notFound.title),
      bodyPre: str(doc, "notFoundBodyPre", d.notFound.bodyPre),
      homeLinkLabel: str(doc, "notFoundHomeLinkLabel", d.notFound.homeLinkLabel),
      bodyMid: str(doc, "notFoundBodyMid", d.notFound.bodyMid),
      frameworkLinkLabel: str(doc, "notFoundFrameworkLinkLabel", d.notFound.frameworkLinkLabel),
    },
  };
}

export async function getHome(): Promise<SiteContent["home"]> {
  const d = defaultContent.home;
  const doc = await sanityFetch<Doc>(`*[_id=="homePage"][0]`);
  const [proof, dots, services, platforms, faqs] = await Promise.all([
    typed<ProofStat>("proofStat", [...d.proof]),
    typed<StepItem>("frameworkStep", [...d.dots]),
    typed<ServiceItem>("service", [...d.services]),
    typed<PlatformItem>("platform", d.platforms.map((name) => ({ name }))),
    typed<FaqItem>("faq", [...d.faqs]),
  ]);
  const heroCtas = doc?.heroCtas as LinkItem[] | undefined;
  return {
    hero: {
      eyebrow: str(doc, "heroEyebrow", d.hero.eyebrow),
      titlePre: str(doc, "heroTitlePre", d.hero.titlePre),
      titleUnderline: str(doc, "heroTitleUnderline", d.hero.titleUnderline),
      titlePost: str(doc, "heroTitlePost", d.hero.titlePost),
      lede: str(doc, "heroLede", d.hero.lede),
      ctas: heroCtas && heroCtas.length ? (heroCtas as SiteContent["home"]["hero"]["ctas"]) : d.hero.ctas,
      portraitAlt: str(doc, "portraitAlt", d.hero.portraitAlt),
      stickerAValue: str(doc, "stickerAValue", d.hero.stickerAValue),
      stickerALabel: str(doc, "stickerALabel", d.hero.stickerALabel),
      stickerB: str(doc, "stickerB", d.hero.stickerB),
    },
    proof,
    framework: {
      eyebrow: str(doc, "frameworkEyebrow", d.framework.eyebrow),
      title: str(doc, "frameworkTitle", d.framework.title),
      lede: str(doc, "frameworkLede", d.framework.lede),
      ctaLabel: str(doc, "frameworkCtaLabel", d.framework.ctaLabel),
      ctaHref: d.framework.ctaHref,
    },
    dots,
    servicesHead: {
      eyebrow: str(doc, "servicesEyebrow", d.servicesHead.eyebrow),
      title: str(doc, "servicesTitle", d.servicesHead.title),
    },
    services,
    platformsTitle: str(doc, "platformsTitle", d.platformsTitle),
    platforms: platforms.map((p) => p.name),
    faqHead: {
      eyebrow: str(doc, "faqEyebrow", d.faqHead.eyebrow),
      title: str(doc, "faqTitle", d.faqHead.title),
      lede: str(doc, "faqLede", d.faqHead.lede),
    },
    faqs,
    notes: {
      eyebrow: str(doc, "notesEyebrow", d.notes.eyebrow),
      titlePre: str(doc, "notesTitlePre", d.notes.titlePre),
      titleEm: str(doc, "notesTitleEm", d.notes.titleEm),
      lede: str(doc, "notesLede", d.notes.lede),
      cardTitle: str(doc, "notesCardTitle", d.notes.cardTitle),
      cardBody: str(doc, "notesCardBody", d.notes.cardBody),
      ctaLabel: str(doc, "notesCtaLabel", d.notes.ctaLabel),
      ctaSubject: str(doc, "notesCtaSubject", d.notes.ctaSubject),
      cardNote: str(doc, "notesCardNote", d.notes.cardNote),
    },
    contact: {
      title: str(doc, "contactTitle", d.contact.title),
      body: str(doc, "contactBody", d.contact.body),
      emailCtaStyle: d.contact.emailCtaStyle,
      linkedinLabel: str(doc, "linkedinLabel", d.contact.linkedinLabel),
    },
  };
}

export async function getApproach(): Promise<SiteContent["approach"]> {
  const d = defaultContent.approach;
  const doc = await sanityFetch<Doc>(`*[_id=="approachPage"][0]`);
  const [steps, truths] = await Promise.all([
    typed<StepItem>("frameworkStep", [...d.steps]),
    typed<TruthItem>("truth", [...d.truths.items]),
  ]);
  return {
    seo: {
      title: str(doc, "seoTitle", d.seo.title),
      description: str(doc, "seoDescription", d.seo.description),
      ogTitle: str(doc, "seoOgTitle", d.seo.ogTitle),
      ogDescription: str(doc, "seoOgDescription", d.seo.ogDescription),
    },
    hero: {
      eyebrow: str(doc, "heroEyebrow", d.hero.eyebrow),
      titleLine1: str(doc, "titleLine1", d.hero.titleLine1),
      titleLine2Pre: str(doc, "titleLine2Pre", d.hero.titleLine2Pre),
      titleUnderline: str(doc, "titleUnderline", d.hero.titleUnderline),
      lede: str(doc, "heroLede", d.hero.lede),
      byline: str(doc, "byline", d.hero.byline),
      updatedLabel: str(doc, "updatedLabel", d.hero.updatedLabel),
      updatedDate: str(doc, "updatedDate", d.hero.updatedDate),
      updatedDisplay: str(doc, "updatedDisplay", d.hero.updatedDisplay),
    },
    stepsLabel: str(doc, "stepsLabel", d.stepsLabel),
    steps,
    truths: {
      title: str(doc, "truthsTitle", d.truths.title),
      items: truths,
    },
    contact: {
      title: str(doc, "contactTitle", d.contact.title),
      body: str(doc, "contactBody", d.contact.body),
      emailSubject: str(doc, "emailSubject", d.contact.emailSubject),
    },
  };
}

export async function getPrivacy(): Promise<SiteContent["privacy"]> {
  const d = defaultContent.privacy;
  const doc = await sanityFetch<Doc>(`*[_id=="privacyPage"][0]`);
  const blocks = doc?.blocks as SiteContent["privacy"]["blocks"] | undefined;
  return {
    seo: {
      title: str(doc, "seoTitle", d.seo.title),
      description: str(doc, "seoDescription", d.seo.description),
    },
    title: str(doc, "title", d.title),
    updatedLabel: str(doc, "updatedLabel", d.updatedLabel),
    updatedDate: str(doc, "updatedDate", d.updatedDate),
    updatedDisplay: str(doc, "updatedDisplay", d.updatedDisplay),
    blocks: blocks && blocks.length ? blocks : d.blocks,
  };
}
