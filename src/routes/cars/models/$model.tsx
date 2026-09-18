import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { SectionHeading, VehicleGrid } from "@/components/marketplace";
import { getVehicleFallbackImage, vehicles } from "@/lib/inventory";
import hero from "@/assets/awa-showroom.jpg";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const Route = createFileRoute("/cars/models/$model")({
  loader: ({ params }) => {
    const vehicle = vehicles.find((item) => slugify(item.model) === params.model);
    if (!vehicle) throw notFound();
    return {
      model: vehicle.model,
      brand: vehicle.brand,
      image: vehicle.image,
      vehicles: vehicles.filter((item) => item.model === vehicle.model),
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.brand ?? "Vehicle"} ${loaderData?.model ?? "Model"} | AWA AUTO MALL`,
      },
      {
        name: "description",
        content: `Explore ${loaderData?.brand ?? "vehicle"} ${loaderData?.model ?? "model"} options and specifications through AWA AUTO MALL.`,
      },
    ],
  }),
  component: ModelDetailPage,
});

function ModelDetailPage() {
  const data = Route.useLoaderData();
  const image = data.image || getVehicleFallbackImage(data.vehicles[0]?.category);

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
          <Link to="/cars/models" className="shrink-0 hover:text-primary">
            Models
          </Link>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="truncate font-semibold text-foreground">{data.model}</span>
        </div>
      </div>
      <section className="bg-navy text-primary-foreground">
        <div className="container-shell grid min-h-[480px] gap-10 py-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:py-16">
          <div className="order-2 lg:order-1">
            <p className="text-sm font-bold uppercase text-primary-foreground/65">
              Model collection
            </p>
            <p className="mt-5 text-sm font-bold uppercase text-primary">{data.brand}</p>
            <h1 className="mt-2 text-5xl font-extrabold uppercase leading-none sm:text-7xl">
              {data.model}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-primary-foreground/70">
              Explore the current {data.brand} {data.model} selection, compare specifications, and
              request the right configuration for your destination.
            </p>
            <Link
              to="/cars/models"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase text-primary-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              All models
            </Link>
          </div>
          <div className="order-1 overflow-hidden border border-primary-foreground/15 bg-background/10 lg:order-2">
            <img
              src={image}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = getVehicleFallbackImage(data.vehicles[0]?.category);
              }}
              alt={`${data.brand} ${data.model}`}
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Available options"
            title={`Explore ${data.model}`}
            copy="Review the available vehicles below. Open any option for full details, images, and a direct AWA AUTO MALL inquiry."
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
