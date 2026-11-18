import { notFound } from "next/navigation";

// Multiple root layouts (route groups) mean the global app/not-found.tsx has no
// root layout to render in. Route all unmatched URLs into the (site) group so
// the custom 404 renders with the site chrome.
export default function CatchAllPage() {
  notFound();
}
