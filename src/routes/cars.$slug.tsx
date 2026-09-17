import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Factory,
  Fuel,
  MessageCircle,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getVehicleFallbackImage, vehicles } from "@/lib/inventory";
import { whatsappUrl } from "@/components/site-shell";

export const Route = createFileRoute("/cars/$slug")({
  loader: ({ params }) => {
    const vehicle = vehicles.find((item) => item.slug === params.slug);
    if (!vehicle) throw notFound();
    return vehicle;
  },
  head: ({ loaderData }) => {
    const vehicle = loaderData;
    const title = vehicle
      ? `${vehicle.year} ${vehicle.brand} ${vehicle.model} | AWA AUTO MALL`
      : "Vehicle Not Found | AWA AUTO MALL";
    const description = vehicle
      ? `Request details for the ${vehicle.year} ${vehicle.brand} ${vehicle.model}, available through AWA AUTO MALL in Guangzhou, China.`
      : "The requested vehicle is unavailable.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: vehicle ? [{ rel: "canonical", href: `/cars/${vehicle.slug}` }] : [],
    };
  },
  component: VehicleDetail,
});

function VehicleDetail() {
  const vehicle = Route.useLoaderData();
  const gallery = vehicle.images?.length ? vehicle.images : [vehicle.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const specs = [
    ["Brand", vehicle.brand],
    ["Model", vehicle.model],
    ["Year", String(vehicle.year)],
    ["Category", vehicle.category ?? "Vehicle"],
    ["Mileage", vehicle.mileage],
    ["Fuel", vehicle.fuel],
    ["Transmission", vehicle.transmission],
    ["Engine", vehicle.engine],
    ["Color", vehicle.color],
    ["Condition", vehicle.condition],
  ];
  const requestMessage = `Hello AWA AUTO MALL, please send me full information about the ${vehicle.year} ${vehicle.brand} ${vehicle.model}.`;

  return (
    <>
      <div className="border-b border-border bg-secondary">
        <div className="container-shell flex min-h-12 items-center gap-2 overflow-hidden text-xs text-muted-foreground">
          <Link to="/" className="shrink-0 transition-colors hover:text-primary">
            Home
          </Link>
          <span>/</span>
          <Link to="/cars" className="shrink-0 transition-colors hover:text-primary">
            Cars
          </Link>
          <span>/</span>
          <span className="truncate font-semibold text-foreground">
            {vehicle.brand} {vehicle.model}
          </span>
        </div>
      </div>
      <section className="bg-secondary py-8 sm:py-12">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div className="min-w-0">
            <div className="overflow-hidden border border-border bg-background shadow-sm">
              <img
                src={activeImage}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = getVehicleFallbackImage(vehicle.category);
                }}
                alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                width={1200}
                height={760}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
                {gallery.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setActiveImage(image)}
                    className="overflow-hidden border border-border data-[active=true]:border-primary"
                    data-active={activeImage === image}
                  >
                    <img src={image} alt="" className="aspect-[4/3] w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="border border-border bg-background p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-center gap-3 text-sm font-bold uppercase text-primary">
              <span>{vehicle.brand}</span>
              <span className="text-muted-foreground">{vehicle.year}</span>
              {vehicle.category && (
                <span className="text-muted-foreground">{vehicle.category}</span>
              )}
            </div>
            <h1 className="mt-3 text-5xl font-extrabold uppercase leading-none sm:text-6xl">
              {vehicle.model}
            </h1>
            <div className="mt-6 border-y border-border py-5">
              <p className="text-xs font-bold uppercase text-muted-foreground">Price</p>
              <p className="mt-1 text-2xl font-bold">{vehicle.price}</p>
            </div>
            <p className="mt-6 leading-7 text-muted-foreground">{vehicle.description}</p>
            <div className="mt-6 flex items-start gap-3 border-y border-border py-4 text-sm">
              <CheckCircle2 className="mt-0.5 shrink-0 text-primary" />
              <span>{vehicle.availability}. Final details are confirmed during inquiry.</span>
            </div>
            <div className="mt-6 grid gap-3">
              <Button asChild size="lg">
                <a href={whatsappUrl(requestMessage)}>Request Information</a>
              </Button>
              <Button asChild variant="automotive" size="lg">
                <a href={whatsappUrl(requestMessage)}>
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
            </div>
            <p className="mt-6 text-xs leading-5 text-muted-foreground">
              Availability, specification, shipping cost, and final price must be confirmed with AWA
              AUTO MALL.
            </p>
          </div>
        </div>
      </section>
      <section className="border-y border-border bg-background py-10 sm:py-14">
        <div className="container-shell">
          <SectionTitle eyebrow="Vehicle information" title="Specifications At A Glance" />
          <dl className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-5">
            {specs.map(([label, value]) => (
              <div key={label} className="border-b border-r border-border bg-background p-5">
                <dt className="text-xs font-bold uppercase text-muted-foreground">{label}</dt>
                <dd className="mt-2 font-bold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section-pad bg-navy text-primary-foreground">
        <div className="container-shell grid gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Purchase planning"
              title="From Listing To Your Market"
              copy="AWA AUTO MALL helps turn an initial listing into a clearer sourcing conversation for your destination."
              inverse
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Info
              inverse
              icon={Fuel}
              label="Review"
              value="Confirm vehicle specification and condition"
            />
            <Info
              inverse
              icon={ShieldCheck}
              label="Agree"
              value="Confirm price, documents, and terms"
            />
            <Info
              inverse
              icon={Ship}
              label="Coordinate"
              value="Plan export and shipping requirements"
            />
            <Info
              inverse
              icon={MessageCircle}
              label="Update"
              value="Receive clear next steps from our team"
            />
          </div>
        </div>
      </section>
    </>
  );
}

function SectionTitle({
  eyebrow,
  title,
  copy,
  inverse = false,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
  inverse?: boolean;
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <p
        className={`text-xs font-bold uppercase ${inverse ? "text-primary-foreground/65" : "text-primary"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-4xl font-extrabold uppercase leading-none sm:text-5xl ${inverse ? "text-primary-foreground" : ""}`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-4 leading-7 ${inverse ? "text-primary-foreground/65" : "text-muted-foreground"}`}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  inverse = false,
}: {
  icon: typeof Factory;
  label: string;
  value: string;
  inverse?: boolean;
}) {
  return (
    <div
      className={`border-b border-r p-5 ${inverse ? "border-primary-foreground/15" : "border-border"}`}
    >
      <Icon className={`h-5 w-5 ${inverse ? "text-primary-foreground" : "text-primary"}`} />
      <p
        className={`mt-4 text-xs font-bold uppercase ${inverse ? "text-primary-foreground/60" : "text-muted-foreground"}`}
      >
        {label}
      </p>
      <p className={`mt-2 text-sm font-bold leading-6 ${inverse ? "text-primary-foreground" : ""}`}>
        {value}
      </p>
    </div>
  );
}
