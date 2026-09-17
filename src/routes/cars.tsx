import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageIntro, SectionHeading, VehicleGrid } from "@/components/marketplace";
import { Input } from "@/components/ui/input";
import { vehicles } from "@/lib/inventory";
import hero from "@/assets/awa-cars-category.jpg";

export const Route = createFileRoute("/cars")({
  head: () => ({
    meta: [
      { title: "Cars for Sale & Sourcing | AWA AUTO MALL" },
      {
        name: "description",
        content:
          "Explore representative vehicle inventory and request cars sourced from Guangzhou, China through AWA AUTO MALL.",
      },
      { property: "og:title", content: "Cars for Sale & Sourcing | AWA AUTO MALL" },
      {
        property: "og:description",
        content: "Browse premium SUVs and sedans available through AWA AUTO MALL.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/cars" }],
  }),
  component: CarsPage,
});
function CarsPage() {
  const [query, setQuery] = useState("");
  const [condition, setCondition] = useState("All");
  const [carType, setCarType] = useState("All");
  const isDetail = useRouterState({
    select: (state) => state.location.pathname.startsWith("/cars/"),
  });
  const shown = useMemo(
    () =>
      vehicles.filter(
        (v) =>
          `${v.brand} ${v.model}`.toLowerCase().includes(query.toLowerCase()) &&
          (condition === "All" || v.condition === condition) &&
          (carType === "All" || v.category === carType || getCarType(v.model) === carType),
      ),
    [query, condition, carType],
  );
  if (isDetail) return <Outlet />;
  return (
    <>
      <PageIntro
        eyebrow="Vehicle marketplace"
        title="Cars Sourced Around Your Needs"
        copy="Explore representative vehicles and tell us the exact make, model or specification you need."
        image={hero}
      />
      <section className="section-pad">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Browse by category"
            title="Find The Right Vehicle"
            copy="Browse by brand, model, car type, or condition to narrow your search."
          />
          <div className="mb-10 grid gap-3 border border-border bg-secondary p-4 md:grid-cols-3">
            <label>
              <span className="sr-only">Search brand or model</span>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Brand or model"
              />
            </label>
            <label>
              <span className="sr-only">Filter by car type</span>
              <select
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
                className="h-9 w-full border border-input bg-background px-3 text-sm"
              >
                <option value="All">All car types</option>
                <option>SUV</option>
                <option>Sedan</option>
                <option>Truck</option>
              </select>
            </label>
            <label>
              <span className="sr-only">Filter by condition</span>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="h-9 w-full border border-input bg-background px-3 text-sm"
              >
                <option>All</option>
                <option>New</option>
                <option>Pre-owned</option>
              </select>
            </label>
          </div>
          <VehicleGrid items={shown} />
          {shown.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              No vehicles match that search. Contact us and we can source it.
            </p>
          )}
        </div>
      </section>
      <section className="section-pad bg-secondary">
        <div className="container-shell grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-4xl font-extrabold text-primary">01</p>
            <h2 className="mt-3 text-2xl font-bold uppercase">Choose A Brand</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Compare Toyota, Lexus, Mercedes-Benz, BMW, Range Rover, and Hyundai options.
            </p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-primary">02</p>
            <h2 className="mt-3 text-2xl font-bold uppercase">Match A Model</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Search by model and review practical specifications before you enquire.
            </p>
          </div>
          <div>
            <p className="text-4xl font-extrabold text-primary">03</p>
            <h2 className="mt-3 text-2xl font-bold uppercase">Set Your Brief</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Tell us the budget, condition, year, and destination that shape your choice.
            </p>
          </div>
        </div>
      </section>
      <section className="section-pad bg-navy text-primary-foreground">
        <div className="container-shell grid gap-8 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="More than a listing"
              title="A Sourcing Partner Behind Every Vehicle"
              copy="Our gallery is a starting point. We can also search the Guangzhou market for a brand, model, or specification not shown here."
              inverse
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="border-l-2 border-primary p-4">
              <h3 className="font-bold uppercase">Verified details</h3>
              <p className="mt-2 text-sm text-primary-foreground/65">
                Clear information before you make a decision.
              </p>
            </div>
            <div className="border-l-2 border-primary p-4">
              <h3 className="font-bold uppercase">Global support</h3>
              <p className="mt-2 text-sm text-primary-foreground/65">
                Guidance from Guangzhou to your market.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function getCarType(model: string) {
  return /land cruiser|rx 350|range rover|santa fe|sport/i.test(model) ? "SUV" : "Sedan";
}
