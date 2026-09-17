import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageIntro, SectionHeading, VehicleGrid } from "@/components/marketplace";
import { vehicles } from "@/lib/inventory";
import hero from "@/assets/awa-cars-category.jpg";
import globalImage from "@/assets/awa-global.jpg";
import showroom from "@/assets/awa-showroom.jpg";

const vehicleTypes = [
  {
    type: "SUV",
    image: hero,
    copy: "Confident, versatile vehicles for family life, long trips, and everyday drive.",
  },
  {
    type: "Sedan",
    image: showroom,
    copy: "Refined road cars with comfort, presence, and practical performance.",
  },
  {
    type: "Truck",
    image: globalImage,
    copy: "Hard-working commercial vehicles for transport, trade, and ambitious operations.",
  },
] as const;

export const Route = createFileRoute("/cars/types")({
  head: () => ({
    meta: [
      { title: "Browse Vehicle Types | AWA AUTO MALL" },
      {
        name: "description",
        content: "Explore SUVs, sedans, and trucks available through AWA AUTO MALL.",
      },
    ],
  }),
  component: VehicleTypesPage,
});

function VehicleTypesPage() {
  return (
    <>
      <PageIntro
        eyebrow="Vehicle types"
        title="Choose The Shape That Fits"
        copy="Explore the gallery by the way you plan to use your vehicle, then open the full selection for that type."
        image={hero}
      />
      <section className="section-pad bg-secondary">
        <div className="container-shell">
          <Link
            to="/cars"
            className="mb-10 inline-flex items-center gap-2 text-sm font-bold uppercase text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to marketplace
          </Link>
          <SectionHeading
            eyebrow="Browse by type"
            title="Find Your Vehicle Category"
            copy="From daily comfort to serious work, start with the vehicle profile that matches your brief."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {vehicleTypes.map((item) => (
              <Link
                key={item.type}
                to="/cars/types/$type"
                params={{ type: item.type.toLowerCase() }}
                className="group relative min-h-[420px] overflow-hidden bg-navy"
              >
                <img
                  src={item.image}
                  alt={`${item.type} vehicles`}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 text-primary-foreground">
                  <h2 className="text-4xl font-extrabold uppercase">{item.type}s</h2>
                  <p className="mt-3 max-w-md text-sm leading-6 text-primary-foreground/70">
                    {item.copy}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase">
                    Explore {item.type}s{" "}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Featured from the gallery"
            title="A Starting Point For Every Brief"
            copy="Open any vehicle for full specifications, images, and an AWA AUTO MALL inquiry."
          />
          <VehicleGrid items={vehicles.slice(0, 6)} />
        </div>
      </section>
    </>
  );
}
