module.exports = {
  ci: {
    collect: {
      startServerCommand: "npm run start",
      url: ["http://localhost:3000/", "http://localhost:3000/approach/", "http://localhost:3000/privacy/"],
      numberOfRuns: 3,
      settings: { chromeFlags: "--no-sandbox" },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],
        "meta-description": "error",
        "document-title": "error",
        "html-has-lang": "error",
        "is-crawlable": "off",
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci/reports" },
  },
};
