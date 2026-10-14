import type { MetadataRoute } from "next";

const routes = [
  "",
  "cars",
  "news",
  "about",
  "why-awa",
  "shipping",
  "contact",
  "request-vehicle",
  "spare-parts",
];

// Re-render the sitemap at most once per day instead of freezing it at build time.
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://www.awaautos.com/${route}`.replace(/\/$/, route ? "" : "/"),
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.7,
  }));
}
