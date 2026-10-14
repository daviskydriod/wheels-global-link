import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClientMarketplace } from "../client-marketplace";

const publicRoutes = new Set([
  "",
  "cars",
  "about",
  "why-awa",
  "shipping",
  "contact",
  "request-vehicle",
  "track-order",
  "spare-parts",
  "compare",
  "favorites",
  "news",
]);

const routeCopy: Record<string, { title: string; description: string; heading: string }> = {
  "": {
    title: "Global Vehicle Sourcing from China",
    description:
      "Browse verified cars from China and get worldwide sourcing and shipping support from AWA AUTO MALL.",
    heading: "Global vehicle sourcing made simple",
  },
  cars: {
    title: "Cars for Sale from China",
    description:
      "Explore export-ready cars, SUVs, sedans, and commercial vehicles sourced from China.",
    heading: "Browse export-ready vehicles",
  },
  news: {
    title: "Vehicle Sourcing News and Guides",
    description:
      "Practical guides for buying, inspecting, shipping, and importing vehicles from China.",
    heading: "Vehicle sourcing news and guides",
  },
  about: {
    title: "About AWA AUTO MALL",
    description: "Learn how AWA AUTO MALL helps international buyers source vehicles from China.",
    heading: "A trusted partner for international vehicle sourcing",
  },
  shipping: {
    title: "Vehicle Shipping from China",
    description:
      "Learn about export documentation, RoRo and container shipping, and delivery support.",
    heading: "Shipping support from China to your market",
  },
  contact: {
    title: "Contact AWA AUTO MALL",
    description:
      "Contact AWA AUTO MALL about vehicle sourcing, inspection, pricing, and worldwide delivery.",
    heading: "Talk to our vehicle sourcing team",
  },
};

function routeKey(slug: string[] | undefined) {
  return slug?.[0] ?? "";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = routeKey(slug);
  const copy = routeCopy[key] ?? {
    title: "Vehicles Sourced from China",
    description: "Find export-ready vehicles from China with AWA AUTO MALL sourcing support.",
    heading: "Find your next vehicle",
  };
  const pathname = slug?.length ? `/${slug.join("/")}` : "/";
  return {
    title: copy.title,
    description: copy.description,
    alternates: { canonical: pathname },
    openGraph: { title: copy.title, description: copy.description, url: pathname },
  };
}

export default async function CatchAllPage({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params;
  const key = routeKey(slug);
  if (slug?.length === 1 && !publicRoutes.has(key) && !key.includes("-")) notFound();
  const copy = routeCopy[key] ?? routeCopy[""]!;
  const pathname = slug?.length ? `/${slug.join("/")}` : "/";
  return (
    <>
      <section className="sr-only" aria-label="Page introduction">
        <h1>{copy.heading}</h1>
        <p>{copy.description}</p>
        <link rel="canonical" href={`https://www.awaautos.com${pathname}`} />
      </section>
      <ClientMarketplace pathname={pathname} />
    </>
  );
}
