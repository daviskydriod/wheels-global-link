import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { NewsGrid, type NewsArticle } from "@/components/news";
import { PageIntro, SectionHeading } from "@/components/marketplace";
import image from "@/assets/awa-global.jpg";

export const Route = createFileRoute("/news/")({
  head: () => ({ meta: [{ title: "News | AWA AUTO MALL" }, { name: "description", content: "Read the latest vehicle sourcing and export updates from AWA AUTO MALL." }] }),
  component: NewsPage,
});

function NewsPage() { const [articles, setArticles] = useState<NewsArticle[]>([]); const [loading, setLoading] = useState(true); useEffect(() => { fetch("/news").then((response) => response.ok ? response.json() : Promise.reject()).then((data) => setArticles(Array.isArray(data) ? data : data.articles || [])).catch(() => setArticles([])).finally(() => setLoading(false)); }, []); return <><PageIntro eyebrow="AWA updates" title="News From The Road" copy="Vehicle sourcing, export guidance, and updates from our work in Guangzhou." image={image}/><section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="Latest news" title="What We Are Learning"/>{loading ? <p className="py-16 text-center text-muted-foreground">Loading latest news...</p> : articles.length ? <NewsGrid articles={articles}/> : <p className="border border-border bg-secondary p-8 text-center text-muted-foreground">News articles will appear here soon.</p>}</div></section></>; }
