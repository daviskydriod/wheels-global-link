import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { SectionHeading, VehicleGrid } from "@/components/marketplace";
import { getVehicleFallbackImage, vehicles } from "@/lib/inventory";
import hero from "@/assets/awa-cars-category.jpg";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const Route = createFileRoute("/cars/brands/$brand")({
  loader: ({ params }) => {
    const vehicle = vehicles.find((item) => slugify(item.brand) === params.brand);
    if (!vehicle) throw notFound();
    return {
      brand: vehicle.brand,
      image: vehicle.image,
      category: vehicle.category,
      vehicles: vehicles.filter((item) => item.brand === vehicle.brand),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.brand ?? "Vehicle Brand"} | AWA AUTO MALL` },
      {
        name: "description",
        content: `Explore ${loaderData?.brand ?? "vehicle brand"} vehicles available through AWA AUTO MALL.`,
      },
    ],
  }),
  component: BrandDetailPage,
});

function BrandDetailPage() {
  const data = Route.useLoaderData();
  const image = data.image || getVehicleFallbackImage(data.category);

  return (
    <>
      <div className="border-b border-border bg-secondary">
        <div className="container-shell flex min-h-12 items-center gap-2 overflow-hidden text-xs text-muted-foreground">
          <Link to="/" className="shrink-0 hover:text-primary">
            Home
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/cars" className="shrink-0 hover:text-primary">
            Cars
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <Link to="/cars/brands" className="shrink-0 hover:text-primary">
            Brands
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate font-semibold text-foreground">{data.brand}</span>
        </div>
      </div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-shell grid min-h-[480px] gap-10 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-16">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-bold uppercase text-primary-foreground/65">
              Brand collection
            </p>
            <h1 className="mt-3 text-5xl font-extrabold uppercase leading-none sm:text-7xl">
              {data.brand}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/70">
              Explore the current {data.brand} selection, compare available vehicles, and request
              the right specification for your destination.
            </p>
            <Link
              to="/cars/brands"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> All brands
            </Link>
          </div>
          <div className="order-1 overflow-hidden border border-primary-foreground/15 bg-background/10 lg:order-2">
            <img
              src={image}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getVehicleFallbackImage(data.category);
              }}
              alt={data.brand}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Available models"
            title={`${data.brand} Vehicles`}
            copy="Open any vehicle for full details, images, comparison, and an AWA AUTO MALL inquiry."
          />
          <VehicleGrid items={data.vehicles} />
          <Link
            to="/cars"
            className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase text-primary"
          >
            Browse all vehicles <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
