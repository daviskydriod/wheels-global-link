import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home-page";
import { localArticles } from "@/lib/news";
import { publicNews, publicVehicles } from "@/lib/vehicle-platform";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [catalogResult, newsResult] = await Promise.allSettled([publicVehicles(), publicNews()]);
    return {
      catalog: catalogResult.status === "fulfilled" ? catalogResult.value : [],
      articles:
        newsResult.status === "fulfilled" && Array.isArray(newsResult.value)
          ? newsResult.value.map((article) => ({
              ...article,
              cover_image: article.cover_image ?? undefined,
            }))
          : localArticles,
    };
  },
  head: () => ({
    meta: [
      { title: "AWA AUTO MALL | Cars from China" },
      {
        name: "description",
        content: "Source quality cars globally with AWA AUTO MALL in Guangzhou, China.",
      },
      { property: "og:title", content: "AWA AUTO MALL | Cars from China" },
      {
        property: "og:description",
        content: "Quality vehicles sourced in China and supplied globally.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomeRoutePage,
});

function HomeRoutePage() {
  const data = Route.useLoaderData();
  return <HomePage catalog={data.catalog} articles={data.articles} />;
}
