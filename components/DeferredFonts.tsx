"use client";

import { useEffect } from "react";

/**
 * Loads below-fold font faces (Playfair 800 normal/italic, DM Sans 500)
 * after hydration so they stay out of the LCP critical request chain.
 * The faces remain font-display:swap, so text paints in the fallback and
 * swaps in when the file arrives.
 */
export default function DeferredFonts() {
  useEffect(() => {
    if (document.querySelector('link[data-deferred-fonts]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "/assets/fonts-deferred.css";
    link.dataset.deferredFonts = "true";
    document.head.appendChild(link);
  }, []);
  return null;
}
