import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import { PageIntro, SectionHeading, VehicleGrid } from "@/components/marketplace";
import { Input } from "@/components/ui/input";
import { vehicles } from "@/lib/inventory";
import hero from "@/assets/awa-cars-category.jpg";
import globalImage from "@/assets/awa-global.jpg";
import showroom from "@/assets/awa-showroom.jpg";

export const Route = createFileRoute("/cars")({
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : "",
    brand: typeof search.brand === "string" ? search.brand : "All",
    model: typeof search.model === "string" ? search.model : "All",
    carType: typeof search.carType === "string" ? search.carType : "All",
    condition: typeof search.condition === "string" ? search.condition : "All",
  }),
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
  const navigate = Route.useNavigate();
  const { q, brand, model, carType, condition } = Route.useSearch();
  const isDetail = useRouterState({
    select: (state) => state.location.pathname.startsWith("/cars/"),
  });
  const shown = useMemo(
    () =>
      vehicles.filter(
        (v) =>
          `${v.brand} ${v.model} ${v.category ?? ""}`.toLowerCase().includes(q.toLowerCase()) &&
          (brand === "All" || v.brand === brand) &&
          (model === "All" || v.model === model) &&
          (condition === "All" || v.condition === condition) &&
          (carType === "All" || v.category === carType || getCarType(v.model) === carType),
      ),
    [q, brand, model, condition, carType],
  );
  const brands = [...new Set(vehicles.map((vehicle) => vehicle.brand))].sort();
  const models = [...new Set(vehicles.map((vehicle) => vehicle.model))].sort();
  const updateSearch = (key: "q" | "brand" | "model" | "carType" | "condition", value: string) =>
    navigate({ search: (previous) => ({ ...previous, [key]: value }) });
  const featured = vehicles.slice(0, 6);
  const hasFilters = Boolean(
    q || brand !== "All" || model !== "All" || carType !== "All" || condition !== "All",
  );
  if (isDetail) return <Outlet />;
  return (
    <>
      <PageIntro
        eyebrow="Vehicle marketplace"
        title="Find Your Next Vehicle"
        copy="Search the full gallery, refine by brand and condition, and build a shortlist for comparison."
        image={hero}
      />
      <section className="section-pad bg-secondary">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Browse by type"
            title="Choose Your Vehicle Shape"
            copy="Explore the dedicated category pages, then return here to refine your shortlist."
          />
          <div className="grid gap-5 lg:grid-cols-3">
            {vehicleTypeCategories.map((category) => (
              <Link
                key={category.type}
                to="/cars/types/$type"
                params={{ type: category.type.toLowerCase() }}
                className="group relative min-h-56 overflow-hidden bg-navy"
              >
                <img
                  src={category.image}
                  alt={`${category.type} vehicles`}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105 group-hover:opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                  <h2 className="text-3xl font-extrabold uppercase">{category.type}s</h2>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-primary-foreground/70">
                    {category.copy}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold uppercase">
                    Explore category{" "}
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-pad">
        <div className="container-shell">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              eyebrow="Refine your shortlist"
              title="All Marketplace Inventory"
              copy="Use the filters to compare by brand, model, type, and condition."
            />
          </div>
          <div className="mb-10 border border-border bg-secondary p-5">
            <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase text-primary">
              <SlidersHorizontal className="h-4 w-4" />
              Marketplace filters
            </div>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
              <label>
                <span className="sr-only">Search brand or model</span>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                  <Input
                    value={q}
                    onChange={(e) => updateSearch("q", e.target.value)}
                    placeholder="Search inventory"
                    className="pl-9"
                  />
                </div>
              </label>
              <label>
                <span className="sr-only">Filter by brand</span>
                <select
                  value={brand}
                  onChange={(e) => updateSearch("brand", e.target.value)}
                  className="h-9 w-full border border-input bg-background px-3 text-sm"
                >
                  <option value="All">All brands</option>
                  {brands.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Filter by model</span>
                <select
                  value={model}
                  onChange={(e) => updateSearch("model", e.target.value)}
                  className="h-9 w-full border border-input bg-background px-3 text-sm"
                >
                  <option value="All">All models</option>
                  {models.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
              <label>
                <span className="sr-only">Filter by car type</span>
                <select
                  value={carType}
                  onChange={(e) => updateSearch("carType", e.target.value)}
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
                  onChange={(e) => updateSearch("condition", e.target.value)}
                  className="h-9 w-full border border-input bg-background px-3 text-sm"
                >
                  <option>All</option>
                  <option>New</option>
                  <option>Pre-owned</option>
                </select>
              </label>
            </div>
          </div>
          {!hasFilters && (
            <div className="mb-16">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase text-primary">Editor&apos;s picks</p>
                  <h2 className="mt-2 text-3xl font-extrabold uppercase">Top Choices</h2>
                </div>
                <span className="hidden text-sm text-muted-foreground sm:block">
                  A considered starting point for your search
                </span>
              </div>
              <VehicleGrid items={featured} />
            </div>
          )}
          <div className="border-t border-border pt-12">
            <h2 className="mb-6 text-3xl font-extrabold uppercase">
              {hasFilters ? "Matching Vehicles" : "Explore All Vehicles"}
            </h2>
            <VehicleGrid items={shown} />
          </div>
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

const vehicleTypeCategories = [
  {
    type: "SUV",
    image: hero,
    copy: "Confident, versatile vehicles for family life and long trips.",
  },
  {
    type: "Sedan",
    image: showroom,
    copy: "Refined road cars with comfort and practical performance.",
  },
  {
    type: "Truck",
    image: globalImage,
    copy: "Hard-working vehicles for transport, trade, and operations.",
  },
] as const;
