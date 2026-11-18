"use client";

import { defineConfig } from "sanity";
import { defineLocations, presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { schemaTypes, singletonTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "d6drq683";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const singletonTitle: Record<string, string> = {
  siteSettings: "Site settings",
  homePage: "Home page",
  approachPage: "Approach page",
  privacyPage: "Privacy page",
};

export default defineConfig({
  name: "just-basia-digital",
  title: "Just Basia Digital",
  projectId,
  dataset,
  basePath: "/studio",
  resolve: {
    // Map documents to the site pages where they render, so Presentation's
    // "Documents on this page" panel links sections to the right editor.
    locations: {
      siteSettings: defineLocations({
        select: { title: "siteName" },
        resolve: () => ({
          locations: [
            { title: "Home", href: "/" },
            { title: "Approach", href: "/approach" },
            { title: "Privacy", href: "/privacy" },
          ],
        }),
      }),
      homePage: defineLocations({
        select: { title: "heroTitlePre" },
        resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
      }),
      approachPage: defineLocations({
        select: { title: "seoOgTitle" },
        resolve: () => ({ locations: [{ title: "Approach", href: "/approach" }] }),
      }),
      privacyPage: defineLocations({
        select: { title: "title" },
        resolve: () => ({ locations: [{ title: "Privacy", href: "/privacy" }] }),
      }),
      service: defineLocations({
        select: { title: "title" },
        resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
      }),
      frameworkStep: defineLocations({
        select: { title: "title" },
        resolve: () => ({
          locations: [
            { title: "Home", href: "/" },
            { title: "Approach", href: "/approach" },
          ],
        }),
      }),
      proofStat: defineLocations({
        select: { title: "value" },
        resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
      }),
      platform: defineLocations({
        select: { title: "name" },
        resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
      }),
      faq: defineLocations({
        select: { title: "question" },
        resolve: () => ({ locations: [{ title: "Home", href: "/" }] }),
      }),
      truth: defineLocations({
        select: { title: "title" },
        resolve: () => ({ locations: [{ title: "Approach", href: "/approach" }] }),
      }),
    },
  },
  plugins: [
    presentationTool({
      previewUrl: {
        origin:
          process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
          "https://www.justbasiadigital.com",
        previewMode: { enable: "/api/draft-mode/enable" },
      },
    }),
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            ...Object.entries(singletonTitle).map(([id, title]) =>
              S.listItem()
                .title(title)
                .id(id)
                .child(S.document().schemaType(id).documentId(id).title(title))
            ),
            S.divider(),
            S.listItem().title("Services").child(S.documentTypeList("service").title("Services")),
            S.listItem().title("Framework steps").child(S.documentTypeList("frameworkStep").title("Framework steps")),
            S.listItem().title("Proof stats").child(S.documentTypeList("proofStat").title("Proof stats")),
            S.listItem().title("Platforms").child(S.documentTypeList("platform").title("Platforms")),
            S.listItem().title("FAQs").child(S.documentTypeList("faq").title("FAQs")),
            S.listItem().title("Truths").child(S.documentTypeList("truth").title("Truths")),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((item) => !singletonTypes.has(item.templateId));
      }
      return prev;
    },
  },
});
