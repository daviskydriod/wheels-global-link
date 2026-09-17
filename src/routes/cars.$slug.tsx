import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Factory,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  PackageCheck,
  Settings2,
  ShieldCheck,
  Ship,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { vehicles } from "@/lib/inventory";
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
      <section className="bg-navy py-6 text-primary-foreground">
        <div className="container-shell">
          <Link to="/cars" className="inline-flex items-center gap-2 text-sm">
            <ArrowLeft /> Back to cars
          </Link>
        </div>
      </section>
      <section className="section-pad bg-background">
        <div className="container-shell grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
          <div>
            <div className="overflow-hidden border border-border bg-secondary">
              <img
                src={activeImage}
                alt={`${vehicle.year} ${vehicle.brand} ${vehicle.model}`}
                width={1200}
                height={760}
                className="aspect-[16/10] w-full object-cover"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
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
          <div>
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
            <p className="mt-6 text-2xl font-bold">{vehicle.price}</p>
            <p className="mt-6 leading-7 text-muted-foreground">{vehicle.description}</p>
            <div className="mt-7 flex items-start gap-3 border-y border-border py-4 text-sm">
              <CheckCircle2 className="mt-0.5 shrink-0 text-primary" />
              <span>{vehicle.availability}. Final details are confirmed during inquiry.</span>
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Button asChild size="lg">
                <a href={whatsappUrl(requestMessage)}>Request Information</a>
              </Button>
              <Button asChild variant="automotive" size="lg">
                <a href={whatsappUrl(requestMessage)}>
                  <MessageCircle /> Chat on WhatsApp
                </a>
              </Button>
            </div>
            {vehicle.productUrl && (
              <a
                href={vehicle.productUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
              >
                View original supplier listing <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </section>
      <section className="section-pad bg-secondary">
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
      <section className="section-pad bg-background">
        <div className="container-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionTitle
              eyebrow="Source details"
              title="Know What You Are Reviewing"
              copy="This listing is part of the development inventory imported from an Alibaba supplier export. It is a starting point for sourcing, not a final sales offer."
            />
            <div className="flex items-start gap-3 border-l-2 border-primary pl-5 text-sm leading-6 text-muted-foreground">
              <ShieldCheck className="mt-1 shrink-0 text-primary" />
              Confirm specification, condition, availability, price, documentation, and delivery
              before payment.
            </div>
          </div>
          <div className="grid border-l border-t border-border sm:grid-cols-2">
            <Info
              icon={Factory}
              label="Supplier"
              value={vehicle.supplier ?? "AWA sourcing network"}
            />
            <Info
              icon={MapPin}
              label="Supplier country"
              value={vehicle.supplierCountry ?? "China"}
            />
            <Info
              icon={PackageCheck}
              label="Minimum order"
              value={vehicle.moq ?? "Confirm during inquiry"}
            />
            <Info
              icon={ShieldCheck}
              label="Verification"
              value={vehicle.isVerified ? "Supplier verified" : "Confirm supplier details"}
            />
            <Info
              icon={Gauge}
              label="Supplier rating"
              value={
                vehicle.rating && vehicle.rating !== "N/A"
                  ? `${vehicle.rating} / 5`
                  : "Not supplied"
              }
            />
            <Info
              icon={Settings2}
              label="Supplier experience"
              value={vehicle.supplierYears ?? "Not supplied"}
            />
          </div>
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
