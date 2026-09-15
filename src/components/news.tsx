import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import image from "@/assets/awa-global.jpg";

export type NewsArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  cover_image?: string;
  published_at?: string;
};

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-card">
      <Link to="/news/$slug" params={{ slug: article.slug }}>
        <img
          src={article.cover_image || image}
          alt=""
          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        {article.published_at && (
          <time className="text-xs font-bold uppercase text-primary">
            {new Date(article.published_at).toLocaleDateString()}
          </time>
        )}
        <h2 className="mt-2 text-2xl font-bold uppercase">
          <Link to="/news/$slug" params={{ slug: article.slug }}>
            {article.title}
          </Link>
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{article.excerpt}</p>
        <Link
          to="/news/$slug"
          params={{ slug: article.slug }}
          className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          Read Article
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

export function NewsGrid({ articles }: { articles: NewsArticle[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
