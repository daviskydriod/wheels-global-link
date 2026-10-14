import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin/", "/compare", "/favorites", "/track-order"] }],
    sitemap: "https://www.awaautos.com/sitemap.xml",
  };
}
