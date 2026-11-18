"use client";

import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
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
  plugins: [
    presentationTool({
      previewUrl: {
        origin:
          process.env.SANITY_STUDIO_PREVIEW_ORIGIN ||
          "https://justbasiadigitalmain.vercel.app",
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
