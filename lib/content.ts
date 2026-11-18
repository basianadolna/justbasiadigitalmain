
export interface LinkItem { label: string; href: string }
export interface CtaItem { label: string; href: string; style?: string }
export interface SeoFields { title: string; description: string; ogTitle?: string; ogDescription?: string; ogImageAlt?: string }
export interface ServiceItem { title: string; description: string; tags: string[]; badge: string; waitlistLabel?: string; waitlistSuffix?: string; waitlistSubject?: string; sortOrder?: number }
export interface FaqItem { question: string; answer: string; linkLabel?: string; linkHref?: string; sortOrder?: number }
export interface StepItem { num: string; title: string; text?: string; body?: string; asksTitle?: string; asksBody?: string; sortOrder?: number }
export interface ProofStat { value: string; text: string; sortOrder?: number }
export interface TruthItem { title: string; body: string; sortOrder?: number }
export interface PlatformItem { name: string; sortOrder?: number }
export interface PrivacyBlock { heading: string; body: string }

export interface SiteContent {
  site: {
    siteName: string; logoText: string; logoAriaLabel: string; skipLinkText: string; menuButtonLabel: string;
    nav: LinkItem[]; navCta: LinkItem;
    contactEmail: string; linkedinUrl: string; instagramUrl: string;
    footerBrandLine: string; footerPainterPrefix: string; footerPainterHandle: string;
    footerNav: LinkItem[]; copyright: string;
    llmsSummary: string; llmsKnownAs: string; llmsHomeDesc: string; llmsApproachDesc: string; llmsServices: string[];
    seo: { title: string; description: string; ogTitle: string; ogDescription: string; ogImageAlt: string };
    notFound: { seoTitle: string; seoDescription: string; title: string; bodyPre: string; homeLinkLabel: string; bodyMid: string; frameworkLinkLabel: string };
  };
  home: {
    hero: { eyebrow: string; titlePre: string; titleUnderline: string; titlePost: string; lede: string; ctas: CtaItem[]; portraitAlt: string; stickerAValue: string; stickerALabel: string; stickerB: string };
    proof: ProofStat[];
    framework: { eyebrow: string; title: string; lede: string; ctaLabel: string; ctaHref: string };
    dots: StepItem[];
    servicesHead: { eyebrow: string; title: string };
    services: ServiceItem[];
    platformsTitle: string;
    platforms: string[];
    faqHead: { eyebrow: string; title: string; lede: string };
    faqs: FaqItem[];
    notes: { eyebrow: string; titlePre: string; titleEm: string; lede: string; cardTitle: string; cardBody: string; ctaLabel: string; ctaSubject: string; cardNote: string };
    contact: { title: string; body: string; emailCtaStyle: string; linkedinLabel: string };
  };
  approach: {
    seo: { title: string; description: string; ogTitle: string; ogDescription: string };
    hero: { eyebrow: string; titleLine1: string; titleLine2Pre: string; titleUnderline: string; lede: string; byline: string; updatedLabel: string; updatedDate: string; updatedDisplay: string };
    stepsLabel: string;
    steps: StepItem[];
    truths: { title: string; items: TruthItem[] };
    contact: { title: string; body: string; emailSubject: string };
  };
  privacy: {
    seo: { title: string; description: string };
    title: string; updatedLabel: string; updatedDate: string; updatedDisplay: string;
    blocks: PrivacyBlock[];
  };
}

export const defaultContent: SiteContent = {
  "site": {
    "siteName": "Just Basia Digital",
    "logoText": "just basia digital",
    "logoAriaLabel": "Just Basia Digital home",
    "skipLinkText": "Skip to content",
    "menuButtonLabel": "Open menu",
    "nav": [
      {
        "label": "Approach",
        "href": "/approach/"
      },
      {
        "label": "Services",
        "href": "/#services"
      },
      {
        "label": "FAQ",
        "href": "/#faq"
      },
      {
        "label": "Field Notes",
        "href": "/#notes"
      }
    ],
    "navCta": {
      "label": "Let's talk",
      "href": "/#contact"
    },
    "contactEmail": "basia@justbasiadigital.com",
    "linkedinUrl": "https://www.linkedin.com/in/barbaranadolna",
    "instagramUrl": "https://www.instagram.com/justbpainting",
    "footerBrandLine": "Basia Barbara Nadolna · Growth Marketer · Brooklyn, NYC",
    "footerPainterPrefix": "Also a painter:",
    "footerPainterHandle": "@justbpainting",
    "footerNav": [
      {
        "label": "Approach",
        "href": "/approach/"
      },
      {
        "label": "LinkedIn",
        "href": "https://www.linkedin.com/in/barbaranadolna"
      },
      {
        "label": "Privacy",
        "href": "/privacy/"
      }
    ],
    "copyright": "© 2026 Just B Inc.",
    "llmsSummary": "Just Basia Digital is the growth marketing practice of Basia Barbara Nadolna, a Brooklyn, NYC growth marketer specializing in paid media and automation. She has managed more than $3M in working paid media spend across eight ad platforms (Meta, TikTok, YouTube, Pinterest, Google, Microsoft, StackAdapt, ChatGPT Ads) and created the Connect the Dots framework.",
    "llmsKnownAs": "Also known as: Basia Nadolna, Barbara Nadolna, Basia (Barbara) Nadolna.",
    "llmsHomeDesc": "who Basia is, proof, services and FAQ",
    "llmsApproachDesc": "her four-part paid growth framework (Funnels, Channels, Moments, Automation)",
    "llmsServices": [
      "Paid media audit and strategy for DTC brands and B2B teams",
      "Fractional paid media lead (monthly retainer)",
      "AI workflow and automation setup for marketing teams",
      "AI-Powered Paid Media Workshop (waitlist)"
    ],
    "seo": {
      "title": "Basia Barbara Nadolna | Growth Marketer, Paid Media & Automation | Brooklyn, NYC",
      "description": "Basia Barbara Nadolna is a Brooklyn growth marketer for paid media and automation: $3M+ in working media managed across 8 ad platforms, and creator of the Connect the Dots framework.",
      "ogTitle": "Basia Barbara Nadolna | Growth that connects the dots",
      "ogDescription": "Paid media and automation across 8 ad platforms. $3M+ in working media managed. Creator of Connect the Dots.",
      "ogImageAlt": "just basia digital. Growth that connects the dots. Basia Barbara Nadolna, growth marketer."
    },
    "notFound": {
      "seoTitle": "Page not found | Just Basia Digital",
      "seoDescription": "This page doesn't exist.",
      "title": "Lost a dot",
      "bodyPre": "That page doesn't exist. Head back",
      "homeLinkLabel": "home",
      "bodyMid": "or read the",
      "frameworkLinkLabel": "Connect the Dots framework"
    }
  },
  "home": {
    "hero": {
      "eyebrow": "Growth Marketer · Paid Media & Automation",
      "titlePre": "Growth that",
      "titleUnderline": "connects",
      "titlePost": "the dots",
      "lede": "Hi, I'm Basia Barbara Nadolna. I run paid media across eight platforms and build the automation that lets it scale. Data-driven precision, delivered with curiosity and a fearless sense of color.",
      "ctas": [
        {
          "label": "Work with me",
          "href": "#services",
          "style": "dark"
        },
        {
          "label": "Hiring? Let's talk",
          "href": "#contact",
          "style": "light"
        }
      ],
      "portraitAlt": "Illustrated portrait of Basia Barbara Nadolna winking, in black cat-eye glasses and a blue shirt",
      "stickerAValue": "$3M+",
      "stickerALabel": "working media managed",
      "stickerB": "8 ad platforms"
    },
    "proof": [
      {
        "value": "$3M+",
        "text": "in working paid media spend managed directly. Media only, not total budgets."
      },
      {
        "value": "8",
        "text": "ad platforms run hands-on, across a multi-brand consumer and B2B portfolio."
      },
      {
        "value": "5 in 5",
        "text": "promotions in five years, ending as Sr. Strategist & Innovation Lead."
      },
      {
        "value": "AI",
        "text": "Led a team AI platform evaluation and built the automated workflows that followed."
      }
    ],
    "framework": {
      "eyebrow": "The framework",
      "title": "Connect the Dots",
      "lede": "Most growth problems are not channel problems. They are connection problems. This is how I link funnels, channels, moments and automation into one system that compounds.",
      "ctaLabel": "Read the full approach",
      "ctaHref": "/approach/"
    },
    "dots": [
      {
        "num": "1",
        "title": "Funnels",
        "text": "Map where attention turns into revenue before a single budget moves. Every campaign gets one clear job."
      },
      {
        "num": "2",
        "title": "Channels",
        "text": "Give each platform one role. Some create demand, some capture it, some meet people mid-question."
      },
      {
        "num": "3",
        "title": "Moments",
        "text": "Build creative and timing around real buyer moments: launches, seasons, news. Relevance beats reach."
      },
      {
        "num": "4",
        "title": "Automation",
        "text": "AI takes reporting, QA and test logistics, so human time goes to judgment and creative."
      }
    ],
    "servicesHead": {
      "eyebrow": "Ways to work together",
      "title": "Practitioner help, not a pitch deck"
    },
    "services": [
      {
        "title": "Paid media audit & strategy",
        "description": "A clear read on where spend is working, where it leaks, and what to test next. Delivered as a prioritized plan you can act on the same week.",
        "tags": [
          "DTC brands",
          "B2B teams"
        ],
        "badge": ""
      },
      {
        "title": "Fractional paid media lead",
        "description": "Hands-on management across Meta, TikTok, YouTube, Pinterest, Google, Microsoft, StackAdapt and ChatGPT Ads, with the strategy to connect them.",
        "tags": [
          "Monthly retainer"
        ],
        "badge": ""
      },
      {
        "title": "AI workflow & automation setup",
        "description": "Reporting, pacing alerts, creative benchmarking and research workflows built with the AI tools your team already pays for.",
        "tags": [
          "Project based"
        ],
        "badge": ""
      },
      {
        "title": "AI-Powered Paid Media Workshop",
        "description": "A live, hands-on session for marketers who want to use AI inside real ad accounts.",
        "tags": [],
        "badge": "Waitlist open",
        "waitlistLabel": "Join the waitlist",
        "waitlistSuffix": "for the next cohort date.",
        "waitlistSubject": "Workshop waitlist"
      }
    ],
    "platformsTitle": "Platforms I run hands-on",
    "platforms": [
      "Meta",
      "TikTok",
      "YouTube",
      "Pinterest",
      "Google",
      "Microsoft",
      "StackAdapt",
      "ChatGPT Ads"
    ],
    "faqHead": {
      "eyebrow": "Straight answers",
      "title": "FAQ",
      "lede": "Feel free to challenge me on any of this."
    },
    "faqs": [
      {
        "question": "Who is Basia Barbara Nadolna?",
        "answer": "Basia Barbara Nadolna is a Brooklyn-based growth marketer specializing in paid media and automation. She has managed more than $3M in working media across eight ad platforms and runs Just Basia Digital."
      },
      {
        "question": "Which ad platforms does she manage?",
        "answer": "Meta, TikTok, YouTube, Pinterest, Google, Microsoft, StackAdapt and ChatGPT Ads, for consumer and B2B brands."
      },
      {
        "question": "What is the Connect the Dots framework?",
        "answer": "It is Basia's four-part approach to paid growth: map the funnel, give each channel one role, build around buyer moments, and automate everything that does not need human judgment.",
        "linkLabel": "Read the full framework",
        "linkHref": "/approach/"
      },
      {
        "question": "Is Basia available for consulting or full-time roles?",
        "answer": "Both. She takes select consulting projects through Just Basia Digital and is open to senior growth marketing roles in New York City or remote in the US."
      }
    ],
    "notes": {
      "eyebrow": "Field Notes",
      "titlePre": "A growth marketer's field notes,",
      "titleEm": "sprinkled with curiosity",
      "lede": "Practical takes on paid media, AI workflows and what is actually working. No hype, one takeaway per note.",
      "cardTitle": "Get field notes and workshop dates",
      "cardBody": "Send a one-line email and you're on the list.",
      "ctaLabel": "Join the list",
      "ctaSubject": "Add me to Field Notes",
      "cardNote": "No ads please. Unsubscribe anytime."
    },
    "contact": {
      "title": "Be curious. Be bold. Just B",
      "body": "Hiring for growth, or need a second brain on your ad accounts? Send a note.",
      "emailCtaStyle": "cream",
      "linkedinLabel": "Connect on LinkedIn"
    }
  },
  "approach": {
    "seo": {
      "title": "Connect the Dots: A Four-Part Paid Growth Framework | Basia Barbara Nadolna",
      "description": "Connect the Dots is Basia Barbara Nadolna's four-part paid growth framework: map the funnel, give each channel one role, build around buyer moments, and automate what doesn't need human judgment.",
      "ogTitle": "Connect the Dots: a four-part paid growth framework",
      "ogDescription": "Funnels, channels, moments, automation. The questions Basia Barbara Nadolna asks before a single budget moves."
    },
    "hero": {
      "eyebrow": "The approach",
      "titleLine1": "Connect",
      "titleLine2Pre": "the",
      "titleUnderline": "Dots",
      "lede": "The best growth strategies don't start with a channel. They start with a question. Connect the Dots is the four-part system I use to turn scattered campaigns into one plan that compounds.",
      "byline": "By Basia Barbara Nadolna",
      "updatedLabel": "Updated",
      "updatedDate": "2026-11-16",
      "updatedDisplay": "November 16, 2026"
    },
    "stepsLabel": "The four dots",
    "steps": [
      {
        "num": "1",
        "title": "Funnels",
        "body": "Before any budget moves, I map how a stranger becomes a customer: what they see first, what convinces them, where they stall. Every campaign then has one job in that journey, and one number that proves it is doing that job.",
        "asksTitle": "Questions I ask first",
        "asksBody": "Where does revenue actually come from today? What happens after the click? Which step loses the most people?"
      },
      {
        "num": "2",
        "title": "Channels",
        "body": "Eight platforms is not the point. Giving each one a clear role is. Some platforms create demand, some capture it, and newer ones like ChatGPT Ads meet people in the middle of a question. Budget follows the role, not the habit.",
        "asksTitle": "Questions I ask first",
        "asksBody": "What is each channel's job? Are two channels paying for the same customer? Where is the next dollar most useful?"
      },
      {
        "num": "3",
        "title": "Moments",
        "body": "People buy in moments: a launch, a season, a price change, a piece of news. I plan creative and timing around those moments, then keep always-on testing running underneath so the account keeps learning between them.",
        "asksTitle": "Questions I ask first",
        "asksBody": "What is coming up in the next 90 days? What does the customer care about right now? What creative have we not tried yet?"
      },
      {
        "num": "4",
        "title": "Automation",
        "body": "AI is a teammate, not a strategy. I use it for the work that eats a marketer's week: reporting, pacing checks, QA, creative benchmarking and research. That frees human time for the calls that need judgment.",
        "asksTitle": "Questions I ask first",
        "asksBody": "What does your team do every week by hand? Which AI tools do you already pay for? What would you do with five extra hours?"
      }
    ],
    "truths": {
      "title": "What stays true on every account",
      "items": [
        {
          "title": "Lead with data",
          "body": "Every recommendation comes with the number behind it and the test that would prove it wrong."
        },
        {
          "title": "Deliver with story",
          "body": "Reports explain what happened, why, and what to do next, in plain words your whole team can use."
        },
        {
          "title": "Always a takeaway",
          "body": "No meeting ends without a next step. Field notes, not textbooks."
        }
      ]
    },
    "contact": {
      "title": "Want to connect your dots",
      "body": "Send a note with where you are and where you want to be.",
      "emailSubject": "Connect the Dots"
    }
  },
  "privacy": {
    "seo": {
      "title": "Privacy | Just Basia Digital",
      "description": "How justbasiadigital.com handles your information."
    },
    "title": "Privacy",
    "updatedLabel": "Updated",
    "updatedDate": "2026-11-16",
    "updatedDisplay": "November 16, 2026",
    "blocks": [
      {
        "heading": "",
        "body": "This site is run by Just B Inc. for Just Basia Digital. It is a simple, static website."
      },
      {
        "heading": "What we collect",
        "body": "The site has no forms, accounts or advertising trackers. If you email us, we receive your email address and whatever you choose to write, and we use it only to reply to you or to send you the Field Notes or workshop updates you asked for."
      },
      {
        "heading": "Cookies",
        "body": "This site does not set cookies. Our host, GitHub Pages, may log basic technical data such as IP addresses to keep the service secure."
      },
      {
        "heading": "Your choices",
        "body": "To be removed from any list or to ask what we hold about you, email"
      }
    ]
  }
};
