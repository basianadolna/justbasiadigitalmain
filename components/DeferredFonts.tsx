"use client";

import { useEffect } from "react";

/**
 * Loads below-fold font faces (Playfair italic, DM Sans 500)
 * after the window load event + idle time so they stay out of the
 * LCP critical request chain. The faces remain font-display:swap,
 * so text paints in the fallback and swaps in when the file arrives.
 */
export default function DeferredFonts() {
  useEffect(() => {
    const add = () => {
      if (document.querySelector('link[data-deferred-fonts]')) return;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/assets/fonts-deferred.css";
      link.dataset.deferredFonts = "true";
      document.head.appendChild(link);
    };
    const schedule = () => {
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => void;
      };
      if (typeof w.requestIdleCallback === "function") {
        w.requestIdleCallback(add, { timeout: 1500 });
      } else {
        window.setTimeout(add, 500);
      }
    };
    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
      return () => window.removeEventListener("load", schedule);
    }
  }, []);
  return null;
}
