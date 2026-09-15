import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NewsCard, NewsGrid, type NewsArticle } from "@/components/news";
import { PageIntro, SectionHeading } from "@/components/marketplace";
import image from "@/assets/awa-global.jpg";

const localArticles: NewsArticle[] = [
  { slug: "guangzhou-sourcing-guide", title: "Inside The Guangzhou Sourcing Network", excerpt: "How a clear vehicle brief helps our team search the right market with less guesswork.", cover_image: image, published_at: "2026-02-18" },
  { slug: "vehicle-inspection-basics", title: "The Details Worth Checking Before Purchase", excerpt: "A practical look at condition, specification, and the questions that make a vehicle review useful.", cover_image: image, published_at: "2026-01-30" },
  { slug: "shipping-planning", title: "Planning A Smoother Vehicle Journey", excerpt: "The key information to prepare when a vehicle is headed from China to an international market.", cover_image: image, published_at: "2026-01-12" },
];

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "News | AWA AUTO MALL" },
      {
        name: "description",
        content: "Read the latest vehicle sourcing and export updates from AWA AUTO MALL.",
      },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/news")
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then((data) => {
        const incoming = Array.isArray(data) ? data : data.articles || [];
        setArticles(incoming.length ? incoming : localArticles);
      })
      .catch(() => setArticles(localArticles))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <PageIntro
        eyebrow="AWA updates"
        title="News From The Road"
        copy="Vehicle sourcing, export guidance, and updates from our work in Guangzhou."
        image={image}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading eyebrow="Latest news" title="What We Are Learning" />
          {loading ? (
            <p className="py-16 text-center text-muted-foreground">Loading latest news...</p>
          ) : articles.length ? (
            <div className="grid gap-10 lg:grid-cols-[1.5fr_.8fr]">
              <div>
                <NewsCard article={articles[0]} />
                <div className="mt-8 grid gap-6 md:grid-cols-2"><NewsGrid articles={articles.slice(1)} /></div>
              </div>
              <aside className="border-t-2 border-primary pt-5"><p className="text-xs font-bold uppercase text-primary">AWA desk</p><h2 className="mt-3 text-3xl font-extrabold uppercase">Recent Dispatches</h2><div className="mt-6 grid gap-5">{articles.slice(0, 5).map(article => <Link key={article.slug} to="/news/$slug" params={{slug: article.slug}} className="border-b border-border pb-4 transition-colors hover:text-primary"><span className="text-xs text-muted-foreground">{article.published_at ? new Date(article.published_at).toLocaleDateString() : "AWA AUTO MALL"}</span><strong className="mt-1 block font-display text-xl uppercase">{article.title}</strong></Link>)}</div></aside>
            </div>
          ) : (
            <p className="border border-border bg-secondary p-8 text-center text-muted-foreground">
              News articles will appear here soon.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
