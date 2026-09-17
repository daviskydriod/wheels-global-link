import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageIntro, SectionHeading } from "@/components/marketplace";
import { vehicles } from "@/lib/inventory";
import hero from "@/assets/awa-showroom.jpg";

export const Route = createFileRoute("/cars/models")({
  head: () => ({
    meta: [
      { title: "Browse Car Models | AWA AUTO MALL" },
      {
        name: "description",
        content: "Explore vehicle models available through AWA AUTO MALL.",
      },
    ],
  }),
  component: VehicleModelsPage,
});

function VehicleModelsPage() {
  const models = [...new Map(vehicles.map((vehicle) => [vehicle.model, vehicle])).values()];

  return (
    <>
      <PageIntro
        eyebrow="Vehicle models"
        title="Find The Model You Have In Mind"
        copy="Browse the model gallery, then open the marketplace with your selected model ready to review."
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
            eyebrow="Browse by model"
            title="Explore The Model Gallery"
            copy="Select a model to see its available vehicles, specifications, and inquiry options."
          />
          <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
            {models.map((vehicle) => (
              <Link
                key={vehicle.model}
                to="/cars"
                search={{
                  q: "",
                  brand: "All",
                  model: vehicle.model,
                  carType: "All",
                  condition: "All",
                }}
                className="group border-b border-r border-border bg-background p-5 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <div className="overflow-hidden bg-muted">
                  <img
                    src={vehicle.image}
                    alt={vehicle.model}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="mt-5 block text-xs font-bold uppercase text-primary group-hover:text-primary-foreground/70">
                  {vehicle.brand}
                </span>
                <h2 className="mt-2 text-2xl font-extrabold uppercase">{vehicle.model}</h2>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase">
                  View model{" "}
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
