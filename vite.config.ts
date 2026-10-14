// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    pages: [
      { path: "/", sitemap: { priority: 1, changefreq: "daily" } },
      { path: "/cars", sitemap: { priority: 0.9, changefreq: "daily" } },
      { path: "/news", sitemap: { priority: 0.8, changefreq: "daily" } },
      { path: "/about", sitemap: { priority: 0.6, changefreq: "monthly" } },
      { path: "/why-awa", sitemap: { priority: 0.6, changefreq: "monthly" } },
      { path: "/shipping", sitemap: { priority: 0.6, changefreq: "monthly" } },
      { path: "/contact", sitemap: { priority: 0.7, changefreq: "monthly" } },
      { path: "/request-vehicle", sitemap: { priority: 0.8, changefreq: "monthly" } },
      { path: "/track-order", sitemap: { exclude: true } },
      { path: "/spare-parts", sitemap: { priority: 0.5, changefreq: "monthly" } },
      { path: "/compare", sitemap: { exclude: true } },
      { path: "/favorites", sitemap: { exclude: true } },
      { path: "/admin", sitemap: { exclude: true } },
      { path: "/admin/analytics", sitemap: { exclude: true } },
      { path: "/admin/content", sitemap: { exclude: true } },
      { path: "/admin/inquiries", sitemap: { exclude: true } },
      { path: "/admin/orders", sitemap: { exclude: true } },
      { path: "/admin/settings", sitemap: { exclude: true } },
      { path: "/admin/vehicles", sitemap: { exclude: true } },
    ],
    prerender: {
      enabled: true,
      crawlLinks: true,
      autoStaticPathsDiscovery: true,
      failOnError: false,
    },
    sitemap: { enabled: true, host: "https://awaautos.com", outputPath: "sitemap.xml" },
  },
});
