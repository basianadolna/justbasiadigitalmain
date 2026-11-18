import type { Metadata } from "next";
import { getPrivacy, getSite } from "@/lib/sanity/data";
import { subpageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const privacy = await getPrivacy();
  return subpageMetadata({ path: "/privacy/", title: privacy.seo.title, description: privacy.seo.description });
}

export default async function Privacy() {
  const [site, privacy] = await Promise.all([getSite(), getPrivacy()]);
  return (
    <main id="main" className="page">
      <div className="wrap">
        <h1>
          {privacy.title}
          <span className="dot">.</span>
        </h1>
        <p className="updated">
          {privacy.updatedLabel} <time dateTime={privacy.updatedDate}>{privacy.updatedDisplay}</time>
        </p>
        {privacy.blocks.map((b, i) => (
          <section key={i}>
            {b.heading ? <h2>{b.heading}</h2> : null}
            <p>
              {b.body}
              {b.heading === "Your choices" ? (
                <>
                  {" "}
                  <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>.
                </>
              ) : null}
            </p>
          </section>
        ))}
      </div>
    </main>
  );
}
