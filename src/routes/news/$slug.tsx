import { assetUrl } from "@/lib/asset-url";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import { useMemo, type MouseEvent } from "react";
import DOMPurify from "dompurify";
import { localArticles } from "@/lib/news";
import { publicNews } from "@/lib/vehicle-platform";
import imageAsset from "@/assets/awa-global.jpg";
const image = assetUrl(imageAsset);

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ params }) => {
    try {
      const data = await publicNews(params.slug);
      return { article: Array.isArray(data) ? null : data };
    } catch {
      return { article: localArticles.find((item) => item.slug === params.slug) ?? null };
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.article?.title ?? "News Article | AWA AUTO MALL" },
      ...(loaderData?.article?.excerpt
        ? [{ name: "description", content: loaderData.article.excerpt }]
        : []),
    ],
  }),
  component: NewsDetailPage,
});

const looksLikeHtml = (value: string) => /<\/?[a-z][\s\S]*>/i.test(value);
const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const articleStyles = [
  "text-[1.05rem] leading-8 text-muted-foreground sm:text-[1.1rem]",
  "[&_p]:mb-6",
  "[&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:leading-tight [&_h2]:text-foreground sm:[&_h2]:text-3xl",
  "[&_h3]:mt-10 [&_h3]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-foreground",
  "[&_strong]:font-bold [&_strong]:text-foreground",
  "[&_em]:italic",
  "[&_a]:font-semibold [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:opacity-80",
  "[&_ul]:mb-7 [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6",
  "[&_ol]:mb-7 [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6",
  "[&_li]:pl-1 [&_li::marker]:font-bold [&_li::marker]:text-primary",
  "[&_blockquote]:my-8 [&_blockquote]:rounded-r-2xl [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:bg-muted/60 [&_blockquote]:px-6 [&_blockquote]:py-5 [&_blockquote]:font-medium [&_blockquote]:italic [&_blockquote]:text-foreground",
  "[&_table]:my-8 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_table]:text-left [&_table]:text-sm",
  "[&_thead]:bg-muted",
  "[&_th]:whitespace-nowrap [&_th]:border [&_th]:border-border [&_th]:px-4 [&_th]:py-3 [&_th]:font-bold [&_th]:text-foreground",
  "[&_td]:min-w-[140px] [&_td]:border [&_td]:border-border [&_td]:px-4 [&_td]:py-3 [&_td]:align-top",
  "[&_tbody_tr:nth-child(even)]:bg-muted/40",
  "[&>*:first-child]:mt-0",
].join(" ");

function formatPublishedDate(value?: string) {
  if (!value) return "AWA AUTO MALL editorial";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "AWA AUTO MALL editorial";
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function NewsDetailPage() {
  const { article } = Route.useLoaderData();
  const navigate = useNavigate();

  const body = article?.content || article?.excerpt || "";
  const isHtml = looksLikeHtml(body);
  const canRenderHtml = isHtml && typeof window !== "undefined";
  const readableBody = isHtml ? stripHtml(body) : body;
  const paragraphs = readableBody
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const safeHtml = useMemo(() => {
    if (!isHtml || typeof window === "undefined") return "";
    return DOMPurify.sanitize(body, { USE_PROFILES: { html: true } });
  }, [body, isHtml]);

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    const anchor = (event.target as HTMLElement).closest("a");
    const href = anchor?.getAttribute("href");
    if (anchor && href && href.startsWith("/") && !href.startsWith("//")) {
      event.preventDefault();
      navigate({ to: href });
    }
  };

  if (!article) {
    return (
      <section className="section-pad">
        <div className="container-shell py-20 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">AWA updates</p>
          <h1 className="mt-4 text-4xl font-extrabold uppercase tracking-tight">
            Article unavailable
          </h1>
          <p className="mx-auto mt-4 max-w-md text-muted-foreground">
            This news article could not be found or is no longer published.
          </p>
          <Link
            to="/news"
            className="mt-8 inline-flex items-center gap-2 font-bold text-primary hover:text-destructive"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to news
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-b border-border bg-muted/35">
        <div className="container-shell py-6 sm:py-10">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors hover:text-destructive"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to news
          </Link>

          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.8fr)] lg:gap-14">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                AWA updates
              </p>
              <h1 className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl">
                {article.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                {article.excerpt}
              </p>
              <div className="mt-7 flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <CalendarDays className="h-4 w-4 text-primary" />
                <time dateTime={article.published_at}>
                  {formatPublishedDate(article.published_at)}
                </time>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <img
                src={article.cover_image || image}
                alt={article.title}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad pt-10 sm:pt-14">
        <div className="container-shell grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start lg:gap-14">
          <article className="min-w-0 rounded-2xl border border-border bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-12 lg:px-14">
            <div className="mb-8 border-b border-border pb-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
                In this article
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Practical guidance from the AWA AUTO MALL sourcing team.
              </p>
            </div>

            {canRenderHtml ? (
              <div
                className={articleStyles}
                onClick={handleContentClick}
                dangerouslySetInnerHTML={{ __html: safeHtml }}
              />
            ) : (
              <div className="space-y-6 text-[1.05rem] leading-8 text-muted-foreground sm:text-[1.1rem]">
                {paragraphs.map((paragraph, index) => (
                  <p key={`${article.slug}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>
            )}
          </article>

          <aside className="space-y-5 lg:sticky lg:top-8">
            <div className="rounded-2xl border border-border bg-muted/45 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Need help next?
              </p>
              <h2 className="mt-3 text-2xl font-extrabold uppercase leading-tight">
                Turn this into a sourcing plan.
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Tell us your preferred make, model, budget, destination, and timeline.
              </p>
              <Link
                to="/request-vehicle"
                search={{ vehicle: "" }}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-destructive"
              >
                Request a Vehicle
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <Link
              to="/news"
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"
            >
              Explore all news
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
