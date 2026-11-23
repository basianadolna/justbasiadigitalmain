import { defineField, defineType } from "sanity";

const str = (name: string, title?: string) => defineField({ name, title: title ?? name, type: "string" });
const text = (name: string, title?: string) => defineField({ name, title: title ?? name, type: "text" });
const order = defineField({ name: "sortOrder", title: "Sort order", type: "number" });
const link = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "object", fields: [str("label", "Label"), str("href", "URL")] }],
  });

const seoFields = (prefix: string) => [
  str(`${prefix}Title`, "SEO title"),
  text(`${prefix}Description`, "SEO description"),
];

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    str("siteName", "Site name"),
    str("logoText", "Logo text"),
    str("logoAriaLabel", "Logo aria label"),
    str("skipLinkText", "Skip link text"),
    str("menuButtonLabel", "Menu button label"),
    link("nav", "Header navigation"),
    str("navCtaLabel", "Header button label"),
    str("navCtaHref", "Header button URL"),
    str("contactEmail", "Contact email"),
    str("linkedinUrl", "LinkedIn URL"),
    str("instagramUrl", "Instagram URL"),
    str("footerBrandLine", "Footer brand line"),
    str("footerPainterPrefix", "Footer painter prefix"),
    str("footerPainterHandle", "Footer painter handle"),
    link("footerNav", "Footer navigation"),
    str("copyright", "Copyright line"),
    defineField({
      name: "gtmEnabled",
      title: "Enable Google Tag Manager",
      type: "boolean",
      initialValue: false,
      description: "Loads the GTM container on every page. Keep off until a container ID is set.",
    }),
    defineField({
      name: "gtmContainerId",
      title: "GTM container ID",
      type: "string",
      description: "Format GTM-XXXXXXX, from Google Tag Manager.",
      validation: (rule) =>
        rule.custom((v) =>
          v === undefined || v === "" || /^GTM-[A-Z0-9]+$/i.test(v as string)
            ? true
            : "Must look like GTM-XXXXXXX"
        ),
    }),
    text("llmsSummary", "llms.txt summary"),
    str("llmsKnownAs", "llms.txt also-known-as line"),
    str("llmsHomeDesc", "llms.txt home page description"),
    str("llmsApproachDesc", "llms.txt approach page description"),
    defineField({ name: "llmsServices", title: "llms.txt service lines", type: "array", of: [{ type: "string" }] }),
    ...seoFields("seo"),
    str("seoOgTitle", "OG title"),
    text("seoOgDescription", "OG description"),
    str("seoOgImageAlt", "OG image alt text"),
    str("notFoundSeoTitle", "404 SEO title"),
    str("notFoundSeoDescription", "404 SEO description"),
    str("notFoundTitle", "404 title"),
    str("notFoundBodyPre", "404 body (before home link)"),
    str("notFoundHomeLinkLabel", "404 home link label"),
    str("notFoundBodyMid", "404 body (between links)"),
    str("notFoundFrameworkLinkLabel", "404 framework link label"),
  ],
});

const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  fields: [
    str("heroEyebrow", "Hero eyebrow"),
    str("heroTitlePre", "Hero title (before underline)"),
    str("heroTitleUnderline", "Hero title (underlined word)"),
    str("heroTitlePost", "Hero title (after underline)"),
    text("heroLede", "Hero intro"),
    link("heroCtas", "Hero buttons"),
    str("portraitAlt", "Portrait alt text"),
    str("stickerAValue", "Sticker A value"),
    str("stickerALabel", "Sticker A label"),
    str("stickerB", "Sticker B text"),
    str("frameworkEyebrow", "Framework eyebrow"),
    str("frameworkTitle", "Framework title"),
    text("frameworkLede", "Framework intro"),
    str("frameworkCtaLabel", "Framework button label"),
    str("servicesEyebrow", "Services eyebrow"),
    str("servicesTitle", "Services title"),
    str("platformsTitle", "Platforms title"),
    str("faqEyebrow", "FAQ eyebrow"),
    str("faqTitle", "FAQ title"),
    text("faqLede", "FAQ intro"),
    str("notesEyebrow", "Field Notes eyebrow"),
    str("notesTitlePre", "Field Notes title (before italic)"),
    str("notesTitleEm", "Field Notes title (italic part)"),
    text("notesLede", "Field Notes intro"),
    str("notesCardTitle", "Field Notes card title"),
    text("notesCardBody", "Field Notes card body"),
    str("notesCtaLabel", "Field Notes button label"),
    str("notesCtaSubject", "Field Notes email subject"),
    str("notesCardNote", "Field Notes card note"),
    str("contactTitle", "Contact title"),
    text("contactBody", "Contact body"),
    str("linkedinLabel", "LinkedIn button label"),
  ],
});

const approachPage = defineType({
  name: "approachPage",
  title: "Approach page",
  type: "document",
  fields: [
    ...seoFields("seo"),
    str("seoOgTitle", "OG title"),
    text("seoOgDescription", "OG description"),
    str("heroEyebrow", "Hero eyebrow"),
    str("titleLine1", "Title line 1"),
    str("titleLine2Pre", "Title line 2 (before underline)"),
    str("titleUnderline", "Title underlined word"),
    text("heroLede", "Hero intro"),
    str("byline", "Byline"),
    str("updatedLabel", "Updated label"),
    str("updatedDate", "Updated date (YYYY-MM-DD)"),
    str("updatedDisplay", "Updated date (display)"),
    str("stepsLabel", "Steps section aria label"),
    str("truthsTitle", "Truths title"),
    str("contactTitle", "Contact title"),
    text("contactBody", "Contact body"),
    str("emailSubject", "Contact email subject"),
  ],
});

const privacyPage = defineType({
  name: "privacyPage",
  title: "Privacy page",
  type: "document",
  fields: [
    ...seoFields("seo"),
    str("title", "Title"),
    str("updatedLabel", "Updated label"),
    str("updatedDate", "Updated date (YYYY-MM-DD)"),
    str("updatedDisplay", "Updated date (display)"),
    defineField({
      name: "blocks",
      title: "Sections",
      type: "array",
      of: [{ type: "object", fields: [str("heading", "Heading (optional)"), text("body", "Body")] }],
    }),
  ],
});

const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    str("title", "Title"),
    text("description", "Description"),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }] }),
    str("badge", "Badge (optional)"),
    str("waitlistLabel", "Waitlist link label (optional)"),
    str("waitlistSuffix", "Text after waitlist link (optional)"),
    str("waitlistSubject", "Waitlist email subject (optional)"),
    str("ctaLabel", "Button label (optional, defaults to Book a call)"),
    str("ctaHref", "Button link (optional, defaults to the booking page)"),
    order,
  ],
});

const frameworkStep = defineType({
  name: "frameworkStep",
  title: "Framework step",
  type: "document",
  fields: [
    str("num", "Number"),
    str("title", "Title"),
    text("text", "Short text (home page)"),
    text("body", "Long body (approach page)"),
    str("asksTitle", "Questions box title (approach page)"),
    text("asksBody", "Questions box body (approach page)"),
    order,
  ],
});

const proofStat = defineType({
  name: "proofStat",
  title: "Proof stat",
  type: "document",
  fields: [str("value", "Value"), text("text", "Text"), order],
});

const platform = defineType({
  name: "platform",
  title: "Platform",
  type: "document",
  fields: [str("name", "Name"), order],
});

const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    str("question", "Question"),
    text("answer", "Answer"),
    str("linkLabel", "Link label (optional)"),
    str("linkHref", "Link URL (optional)"),
    order,
  ],
});

const truth = defineType({
  name: "truth",
  title: "Truth",
  type: "document",
  fields: [str("title", "Title"), text("body", "Body"), order],
});

export const schemaTypes = [
  siteSettings,
  homePage,
  approachPage,
  privacyPage,
  service,
  frameworkStep,
  proofStat,
  platform,
  faq,
  truth,
];

export const singletonTypes = new Set(["siteSettings", "homePage", "approachPage", "privacyPage"]);
