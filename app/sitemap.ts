import type { MetadataRoute } from "next";

const routes = ["", "cars", "news", "about", "why-awa", "shipping", "contact", "request-vehicle", "spare-parts"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://www.awaautos.com/${route}`.replace(/\/$/, route ? "" : "/"),
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
